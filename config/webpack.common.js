const webpack = require('webpack');
const path = require('path');
const helpers = require('./helpers');

/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
const AssetsPlugin = require('assets-webpack-plugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlElementsPlugin = require('./html-elements-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ngcWebpack = require('ngc-webpack');
//const PreloadWebpackPlugin = require('preload-webpack-plugin');
/*
 * Webpack Constants
 */
const HMR = helpers.hasProcessFlag('hot');
const AOT = helpers.hasNpmFlag('aot');
const METADATA = {
	title: process.env.APP_TITLE || 'Demo',
	description: 'Angular 4 and Bootstrap 4 Template',
	baseUrl: '/#', 
	isDevServer: helpers.isWebpackDevServer(),
	HMR: HMR
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
	isProd = options.env === 'production';
	return {

		/*
		* Cache generated modules and chunks to improve performance for multiple incremental builds.
		* This is enabled by default in watch mode.
		* You can pass false to disable it.
		*
		* See: http://webpack.github.io/docs/configuration.html#cache
		*/
		//cache: false,

		/*
		* The entry point for the bundle
		* Our Angular.js app
		*
		* See: http://webpack.github.io/docs/configuration.html#entry
		*/
		entry: {

			'polyfills': './src/polyfills.browser.ts',
      		'vendor': './src/vendor.browser.ts',
			'main':      AOT ? './src/main.browser.aot.ts' :
				  './src/main.browser.ts'

		},

		/*
		* Options affecting the resolving of modules.
		*
		* See: http://webpack.github.io/docs/configuration.html#resolve
		*/
		resolve: {

			/*
			* An array of extensions that should be used to resolve modules.
			*
			* See: http://webpack.github.io/docs/configuration.html#resolve-extensions
			*/
			extensions: ['.ts', '.js', '.css', '.scss', '.json'],

			// An array of directory names to be resolved to the current directory
			modules: [helpers.root('src'), helpers.root('node_modules')],	
		},

		/*
		* Options affecting the normal modules.
		*
		* See: http://webpack.github.io/docs/configuration.html#module
		*/
		module: {
			rules: [
		        /*
		         * Typescript loader support for .ts
		         *
		         * Component Template/Style integration using `angular2-template-loader`
		         * Angular 2 lazy loading (async routes) via `ng-router-loader`
		         *
		         * `ng-router-loader` expects vanilla JavaScript code, not TypeScript code. This is why the
		         * order of the loader matter.
		         *
		         * See: https://github.com/s-panferov/awesome-typescript-loader
		         * See: https://github.com/TheLarkInn/angular2-template-loader
		         * See: https://github.com/shlomiassaf/ng-router-loader
		         */
		        {
		          	test: /\.ts$/,
		          	use: [
		            	{
		              	loader: '@angularclass/hmr-loader',
		              	options: {
		                	pretty: !isProd,
		                	prod: isProd
		              	}
		            },
		            { // MAKE SURE TO CHAIN VANILLA JS CODE, I.E. TS COMPILATION OUTPUT.
		              	loader: 'ng-router-loader',
		              	options: {
		                	loader: 'async-import',
		                	genDir: 'compiled',
		                	aot: AOT
		              	}
		            },
		            {
		              	loader: 'awesome-typescript-loader',
		              	options: {
		                	configFileName: 'tsconfig.webpack.json',
		                	useCache: !isProd
		              	}
		            },
		            {
              			loader: 'ngc-webpack',
           				options: {
                 			disable: !AOT,
               			}
             		},
             		{		              	
             			loader: 'angular2-template-loader'
		            }
		          ],
		          exclude: [/\.(spec|e2e-spec)\.ts$/]
		        },
				/*
				 * to string and css loader support for *.css files
				 * Returns file content as string
				 *
				 */
				{
				  	test: /\.css$/,
				  	use: ['to-string-loader', 'css-loader'],
				  	exclude: [helpers.root('src', 'styles')]
				},

				{
				  	test: /\.scss$/,
				  	exclude: /node_modules/,
				  	use: ['raw-loader', 'sass-loader']
				},

				{
				  	test: /initial\.scss$/,
				  	loader: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader!sass-loader'
				  	})
				},

				{
				  	test: /\.woff(2)?(\?v=.+)?$/,
				  	use: 'url-loader?limit=10000&mimetype=application/font-woff'
				},

				{
				  	test: /\.(ttf|eot|svg)(\?v=.+)?$/,
				  	use: 'file-loader'
				},

				{
				  	test: /bootstrap\/dist\/js\/umd\//,
				  	use: 'imports-loader?jQuery=jquery'
				},

				/* Raw loader support for *.html
				 * Returns file content as string
				 *
				 * See: https://github.com/webpack/raw-loader
				 */
				{
				  	test: /\.html$/,
				  	use: 'raw-loader',
				  	exclude: [helpers.root('src/index.html')]
				},

				/* File loader for supporting images, for example, in CSS files.
				 */
				{
				  	test: /\.(jpg|png|gif)$/,
				  	use: 'file-loader'
				},
				{
					test: /\.xlf$/,
					use: 'ignore-loader'
				}
	  		]
		},
		resolveLoader: {
		  	moduleExtensions: ['-loader']
		},		  	
		/*
		* Add additional plugins to the compiler.
		*
		* See: http://webpack.github.io/docs/configuration.html#plugins
		*/
		plugins: [
	  		new ExtractTextPlugin({filename: 'initial.css', allChunks: true}),

	  		new AssetsPlugin({
				path: helpers.root('dist'),
				filename: 'webpack-assets.json',
				prettyPrint: true
	  		}),

			  /*
			   * Plugin: ForkCheckerPlugin
			   * Description: Do type checking in a separate process, so webpack don't need to wait.
			   *
			   * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
			   */
			new CheckerPlugin(),
		  /*
		   * Plugin: CommonsChunkPlugin
		   * Description: Shares common code between the pages.
		   * It identifies common modules and put them into a commons chunk.
		   *
		   * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
		   * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
		   */
		  	new CommonsChunkPlugin({
				name: 'polyfills',
				chunks: ['polyfills']
		  	}),
	  		// This enables tree shaking of the vendor modules
			new CommonsChunkPlugin({
				name: 'vendor',
				chunks: ['main'],
				minChunks: module => /node_modules/.test(module.resource)
			}),
	  		// Specify the correct order the scripts will be injected in
	  		new CommonsChunkPlugin({
				name: ['polyfills', 'vendor'].reverse()
	  		}),

      		new CommonsChunkPlugin({
         		name: ['manifest'],
         		minChunks: Infinity,
       		}),
  		  
	  		/**
	   		* Plugin: ContextReplacementPlugin
	   		* Description: Provides context to Angular's use of System.import
	   		*
	   		* See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
	   		* See: https://github.com/angular/angular/issues/11580
	   		*/
	  		new ContextReplacementPlugin(
				// The (\\|\/) piece accounts for path separators in *nix and Windows
				/angular(\\|\/)core(\\|\/)@angular/,
				helpers.root('src') // location of your src
	  		),

		  /*
		   * Plugin: CopyWebpackPlugin
		   * Description: Copy files and directories in webpack.
		   *
		   * Copies project static assets.
		   *
		   * See: https://www.npmjs.com/package/copy-webpack-plugin
		   */
	  		new CopyWebpackPlugin([
				{ from: 'src/assets', to: 'assets' },
				{ from: 'src/meta'}
	  		]),

      		/*
		   * Plugin: HtmlWebpackPlugin
		   * Description: Simplifies creation of HTML files to serve your webpack bundles.
		   * This is especially useful for webpack bundles that include a hash in the filename
		   * which changes every compilation.
		   *
		   * See: https://github.com/ampedandwired/html-webpack-plugin
		   */
		  	new HtmlWebpackPlugin({
				template: 'src/index.html',
				title: METADATA.title,
				chunksSortMode: 'dependency',
				metadata: METADATA,
				inject: 'head'
		  	}),
      		/*
       		* Plugin: PreloadWebpackPlugin
       		* Description: Preload is a web standard aimed at improving
       		* performance and granular loading of resources.
       		*
       		* See: https://github.com/GoogleChrome/preload-webpack-plugin
       		*/
      		// new PreloadWebpackPlugin({
        // 		rel: 'preload',
        // 		as: 'script',
        // 		include: ['polyfills', 'vendor', 'main'].reverse(),
        // 		fileBlacklist: ['.css', '.map']
      		// }),
      		// new PreloadWebpackPlugin({
        // 		rel: 'prefetch',
        // 		as: 'script',
        // 		include: 'asyncChunks'
      		// }),


      		/*
      		* Plugin: HtmlWebpackPlugin
      		* Description: Simplifies creation of HTML files to serve your webpack bundles.
      		* This is especially useful for webpack bundles that include a hash in the filename
      		* which changes every compilation.
      		*
      		* See: https://github.com/ampedandwired/html-webpack-plugin
      		*/
      		new HtmlWebpackPlugin({
        		template: 'src/index.html',
        		title: METADATA.title,
        		chunksSortMode: 'dependency',
        		metadata: METADATA,
        		inject: 'body'
      		}),
		  /*
		   * Plugin: ScriptExtHtmlWebpackPlugin
		   * Description: Enhances html-webpack-plugin functionality
		   * with different deployment options for your scripts including:
		   *
		   * See: https://github.com/numical/script-ext-html-webpack-plugin
		   */
		  	new ScriptExtHtmlWebpackPlugin({
	       		sync: /polyfill|vendor/,
	       		defaultAttribute: 'async',
	       		preload: [/polyfill|vendor|main/],
	       		prefetch: [/chunk/],
        		defaultAttribute: 'defer',
		  	}),
		  /*
		   * Plugin: HtmlElementsPlugin
		   * Description: Generate html tags based on javascript maps.
		   *
		   * If a publicPath is set in the webpack output configuration, it will be automatically added to
		   * href attributes, you can disable that by adding a "=href": false property.
		   * You can also enable it to other attribute by settings "=attName": true.
		   *
		   * The configuration supplied is map between a location (key) and an element definition object (value)
		   * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
		   *
		   * Example:
		   *  Adding this plugin configuration
		   *  new HtmlElementsPlugin({
		   *    headTags: { ... }
		   *  })
		   *
		   *  Means we can use it in the template like this:
		   *  <%= webpackConfig.htmlElements.headTags %>
		   *
		   * Dependencies: HtmlWebpackPlugin
		   */
		  new HtmlElementsPlugin({
				headTags: require('./head-config.common')
		  }),

		  /**
		   * Plugin LoaderOptionsPlugin (experimental)
		   *
		   * See: https://gist.github.com/sokra/27b24881210b56bbaff7
		   */
      		new LoaderOptionsPlugin({}),
			new webpack.ProvidePlugin({
				$: "jquery",
				jQuery: "jquery",
				"window.jQuery": "jquery",
				Tether: "tether",
				"window.Tether": "tether",
				Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
				Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
				Button: "exports-loader?Button!bootstrap/js/dist/button",
				Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
				Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
				Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
				Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
				Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
				Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
				Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
				Util: "exports-loader?Util!bootstrap/js/dist/util"
			}),

     		new ngcWebpack.NgcWebpackPlugin({
 				/**
          		* If false the plugin is a ghost, it will not perform any action.
          		* This property can be used to trigger AOT on/off depending on your build target (prod, staging etc...)
          		*
          		* The state can not change after initializing the plugin.
          		* @default true
          		*/
         		disabled: !AOT,
         		tsConfig: helpers.root('tsconfig.webpack.json'),
        		/**
         		* A path to a file (resource) that will replace all resource referenced in @Components.
         		* For each `@Component` the AOT compiler compiles it creates new representation for the templates (html, styles)
         		* of that `@Components`. It means that there is no need for the source templates, they take a lot of
         		* space and they will be replaced by the content of this resource.
         		*
         		* To leave the template as is set to a falsy value (the default).
         		*
         		* TIP: Use an empty file as an overriding resource. It is recommended to use a ".js" file which
         		* usually has small amount of loaders hence less performance impact.
         		*
         		* > This feature is doing NormalModuleReplacementPlugin for AOT compiled resources.
         		*
         		* ### resourceOverride and assets
         		* If you reference assets in your styles/html that are not inlined and you expect a loader (e.g. url-loader)
         		* to copy them, don't use the `resourceOverride` feature as it does not support this feature at the moment.
         		* With `resourceOverride` the end result is that webpack will replace the asset with an href to the public
         		* assets folder but it will not copy the files. This happens because the replacement is done in the AOT compilation
         		* phase but in the bundling it won't happen (it's being replaced with and empty file...)
         		*
         		* @default undefined
         		*/
//         		resourceOverride: helpers.root('config/resource-override.js')
       		}),

     		/**
        	* Plugin: InlineManifestWebpackPlugin
        	* Inline Webpack's manifest.js in index.html
        	*
        	* https://github.com/szrenwei/inline-manifest-webpack-plugin
        	*/
       		new InlineManifestWebpackPlugin(),
      		      				
			/*

				While writing your code, you may have already added many code split points to load stuff on demand. 
				After compiling you might notice that there are too many chunks that are too small - 
				creating larger HTTP overhead. Luckily, Webpack can post-process your chunks by merging them. 

				???tony???
				I'm doing this for off-line usage - only 1 chunck ensure I can load everything
				--note this destorys the ability to debug - so it will only be on for demo's and production
			*/
//      	new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1})
 
		],

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

	};
}
