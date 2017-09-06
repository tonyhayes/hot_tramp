const helpers = require('./helpers');
const path = require('path');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const OfflinePlugin = require('offline-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 7000;
const PUBLIC = process.env.PUBLIC_DEV || undefined;
const HMR = helpers.hasProcessFlag('hot');
const WS_URL = process.env.WS_URL || 'localhost';
const WS_PORT = process.env.WS_PORT || '3005';
const API_URL = process.env.API_URL;
const APP_NAME = process.env.APP_NAME || 'Spectrum';
const API_REST_URL = process.env.API_REST_URL || 'https://admin-api-dev.dexchadev.com/';
const APP_TITLE = process.env.APP_TITLE || 'Spectrum';
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {
	  	host: HOST,
	  	port: PORT,
	  	public: PUBLIC,
	  	ENV: ENV,
	  	HMR: HMR,
	  	WS_URL: WS_URL,
	  	WS_PORT: WS_PORT,
	  	API_URL: API_URL,
	  	API_REST_URL: API_REST_URL,
	  	APP_TITLE: APP_TITLE,
	  	APP_NAME: APP_NAME
	  	
});

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function(options) {
  	return webpackMerge(commonConfig({env: ENV}), {

		/**
		 * Developer tool to enhance debugging
		 *
		 * See: http://webpack.github.io/docs/configuration.html#devtool
		 * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
		 */
		devtool: 'inline-source-map',

		/**
		 * Options affecting the output of the compilation.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#output
		 */
		output: {

			/**
			 * The output directory as absolute path (required).
			 *
			 * See: http://webpack.github.io/docs/configuration.html#output-path
			 */
			path: helpers.root('dist'),

			/**
			 * Specifies the name of each output file on disk.
			 * IMPORTANT: You must not specify an absolute path here!
			 *
			 * See: http://webpack.github.io/docs/configuration.html#output-filename
			 */
			filename: '[name].bundle.js',

			/**
			 * The filename of the SourceMaps for the JavaScript files.
			 * They are inside the output.path directory.
			 *
			 * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
			 */
			sourceMapFilename: '[file].map',

			/** The filename of non-entry chunks as relative path
			 * inside the output.path directory.
			 *
			 * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
			*/
			chunkFilename: '[id].chunk.js',

			library: 'ac_[name]',
			libraryTarget: 'var',
		},

		plugins: [

	  		/**
	   		* Plugin: DefinePlugin
	   		* Description: Define free variables.
	   		* Useful for having development builds with debug logging or adding global constants.
	   		*
	   		* Environment helpers
	   		*
	   		* See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
	   		*/
	  		// NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
	  		new DefinePlugin({
				'ENV': JSON.stringify(METADATA.ENV),
				'HMR': METADATA.HMR,
				'WS_URL': JSON.stringify(METADATA.WS_URL),
				'WS_PORT': METADATA.WS_PORT,
				'API_URL': JSON.stringify(METADATA.API_URL),
				'API_REST_URL': JSON.stringify(METADATA.API_REST_URL),
				'APP_TITLE': JSON.stringify(METADATA.APP_TITLE),
				'APP_NAME': JSON.stringify(METADATA.APP_NAME),
				'process.env': {
		  			'ENV': JSON.stringify(METADATA.ENV),
		  			'NODE_ENV': JSON.stringify(METADATA.ENV),
		  			'HMR': METADATA.HMR,
		  			'WS_URL': JSON.stringify(METADATA.WS_URL),
		  			'WS_PORT': METADATA.WS_PORT,
		  			'API_URL': JSON.stringify(METADATA.API_URL),
		  			'API_REST_URL': JSON.stringify(METADATA.API_REST_URL),
		  			'APP_TITLE': JSON.stringify(METADATA.APP_TITLE),
		  			'APP_NAME': JSON.stringify(METADATA.APP_NAME),


				}
	  		}),

	  		/**
	   		* Plugin: NamedModulesPlugin (experimental)
	   		* Description: Uses file names as module name.
	   		*
	   		* See: https://github.com/webpack/webpack/commit/a04ffb928365b19feb75087c63f13cadfc08e1eb
	   		*/
	  		//new NamedModulesPlugin(),

	      /**
	       * Plugin LoaderOptionsPlugin (experimental)
	       *
	       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
	       */
			new LoaderOptionsPlugin({
	        	debug: true,
	        	options: {
         			context: helpers.root('src'),
          			output: {
            			path: helpers.root('dist')
          			},	        	
          		}
	      	}),

	  		// // it always better if OfflinePlugin is the last plugin added
	  		// new OfflinePlugin({
		   //     	caches: 'all',
    	// 		updateStrategy: 'all',
     //    		version: 'v2', 
	  		// })

		],

		/**
		* Webpack Development Server configuration
	 	* Description: The webpack-dev-server is a little node.js Express server.
	 	* The server emits information about the compilation state to the client,
	 	* which reacts to those events.
	 	*
	 	* See: https://webpack.github.io/docs/webpack-dev-server.html
	 	*/
// 		devServer: {
// 	  		port: METADATA.port,
// 	  		host: METADATA.host,
// 	  		historyApiFallback: true,
// 	  // 		proxy: {
// 			// 	'/api': {
// 		 //  		target:  'ws://'+METADATA.WS_URL+':'+METADATA.WS_PORT,
// 		 //  		ws: true
// 			// }
// 	        proxy: {
// 	            '/api/*': {
// 	                target: 'http://localhost:3001',
// 	                secure: false
// 	            }
// //	        }
// 	  	},
// 	  	watchOptions: {
// 			aggregateTimeout: 300,
// 			poll: 1000
// 	  	},
// 	  	outputPath: helpers.root('dist')
// 	},
    devServer: {
      	historyApiFallback: {
         	index: '/index.html'
       	},        
       	port: METADATA.port,
        host: METADATA.host,
        public: METADATA.public,
        watchOptions: {
//            aggregateTimeout: 300,
//            poll: 1000
			ignored: /node_modules/
        },
        stats: 'minimal',
      	proxy: {
        	'/api/*': {
            	target: 'http://localhost:3000',
            	secure: false
        	}
        }
    },
	/**
	* Disable performance hints
	*
	* See: https://github.com/a-tarasyuk/rr-boilerplate/blob/master/webpack/dev.config.babel.js#L41
	*/
	performance: {
		hints: false
	},
	/*
	 * Include polyfills or mocks for various node stuff
	 * Description: Node configuration
	 *
	 * See: https://webpack.github.io/docs/configuration.html#node
	 */
	node: {
	  	global: true,
	  	crypto: 'empty',
	  	process: true,
	  	module: false,
	  	clearImmediate: false,
	  	setImmediate: false
	}

  });
}
