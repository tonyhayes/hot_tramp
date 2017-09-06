/**
 * @author: @AngularClass
 */

const helpers = require('./helpers');
const path = require('path');

/**
 * Webpack Plugins
 */
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';
const API_URL = process.env.API_URL = 'https://admin-api-dev.dexchadev.com/';
const API_REST_URL = process.env.API_REST_URL = 'https://admin-api-dev.dexchadev.com/';
const APP_TITLE = process.env.APP_TITLE = 'Spectrum';
const APP_NAME = process.env.APP_NAME = 'ADMIN';

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
	return {

		/**
		* Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
		*
		* Do not change, leave as is or it wont work.
		* See: https://github.com/webpack/karma-webpack#source-maps
		*/
		devtool: 'inline-source-map',

		/**
		* Options affecting the resolving of modules.
		*
		* See: http://webpack.github.io/docs/configuration.html#resolve
		*/
		resolve: {

			/**
			* An array of extensions that should be used to resolve modules.
			*
			* See: http://webpack.github.io/docs/configuration.html#resolve-extensions
			*/
			extensions: ['.ts', '.js'],

			/**
			* Make sure root is src
			*/
			modules: [helpers.root('src'), 'node_modules']

		},

		/**
		* Options affecting the normal modules.
		*
		* See: http://webpack.github.io/docs/configuration.html#module
		*
		* 'use:' revered back to 'loader:' as a temp. workaround for #1188
		* See: https://github.com/AngularClass/angular2-webpack-starter/issues/1188#issuecomment-262872034
		*/
		module: {

			rules: [

				/**
				* Source map loader support for *.js files
				* Extracts SourceMaps for source files that as added as sourceMappingURL comment.
				*
				* See: https://github.com/webpack/source-map-loader
				*/
				{
					enforce: 'pre',
					test: /\.js$/,
					loader: 'source-map-loader',
					exclude: [
						// these packages have problems with their sourcemaps
						helpers.root('node_modules/rxjs'),
						helpers.root('node_modules/@angular')
					]
				},

				/**
				* Typescript loader support for .ts and Angular 2 async routes via .async.ts
				*
				* See: https://github.com/s-panferov/awesome-typescript-loader
				*/
				{
					test: /\.ts$/,
					use: [
							{
								loader: 'awesome-typescript-loader',
								query: {
									// use inline sourcemaps for "karma-remap-coverage" reporter
									sourceMap: false,
									inlineSourceMap: true,
									compilerOptions: {

										// Remove TypeScript helpers to be injected
										// below by DefinePlugin
										removeComments: true

									}
								},
							},
						'angular2-template-loader'
					],
					exclude: [/\.e2e\.ts$/]
				},

				/**
				* Raw loader support for *.css files
				* Returns file content as string
				*
				* See: https://github.com/webpack/raw-loader
				*/
				{
					test: /\.css$/,
					loader: ['to-string-loader', 'css-loader'],
					exclude: [helpers.root('src/index.html')]
				},
				{
					test: /\.scss$/,
					exclude: /node_modules/,
					loader: ['raw-loader', 'sass-loader']
				},

				{
					test: /initial\.scss$/,
					loader: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						loader: 'css-loader!sass-loader'
					})
				},

				{
					test: /\.woff(2)?(\?v=.+)?$/,
					loader: 'url-loader?limit=10000&mimetype=application/font-woff'
				},

				{
					test: /\.(ttf|eot|svg)(\?v=.+)?$/,
					loader: 'file-loader'
				},

				{
					test: /bootstrap\/dist\/js\/umd\//,
					loader: 'imports-loader?jQuery=jquery'
				},


				/**
				* Raw loader support for *.html
				* Returns file content as string
				*
				* See: https://github.com/webpack/raw-loader
				*/
				{
					test: /\.html$/,
						loader: 'raw-loader',
						exclude: [helpers.root('src/index.html')]
				},
				/* File loader for supporting images, for example, in CSS files.
				 */
				{
					test: /\.(jpg|png|gif)$/,
					loader: 'file-loader'
				},
				{
					test: /\.xlf$/,
					loader: 'ignore-loader'
				},

				/**
				* Instruments JS files with Istanbul for subsequent code coverage reporting.
				* Instrument only testing sources.
				*
				* See: https://github.com/deepsweet/istanbul-instrumenter-loader
				*/
				{
					enforce: 'post',
					test: /\.(js|ts)$/,
					loader: 'istanbul-instrumenter-loader',
					include: helpers.root('src'),
					exclude: [
						/\.(e2e-spec|spec)\.ts$/,
						/node_modules/
					]
				}

			]
		},

		/**
		* Add additional plugins to the compiler.
		*
		* See: http://webpack.github.io/docs/configuration.html#plugins
		*/
		plugins: [

			new ExtractTextPlugin({filename: 'initial.css', allChunks: true}),
			new ProvidePlugin({
				jQuery: 'jquery',
				'Tether': 'tether',
				'window.Tether': 'tether'
			}),
			/**
			* Plugin: DefinePlugin
			* Description: Define free variables.
			* Useful for having development builds with debug logging or adding global constants.
			*
			* Environment helpers
			*
			* See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
			*/
			 // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
			new DefinePlugin({
				'ENV': JSON.stringify(ENV),
				'HMR': false,
				'API_URL': JSON.stringify(API_URL),
				'API_REST_URL': JSON.stringify(API_REST_URL),
				'APP_NAME': JSON.stringify(APP_NAME),
				'process.env': {
					'ENV': JSON.stringify(ENV),
					'NODE_ENV': JSON.stringify(ENV),
					'HMR': false,
		  			'API_URL': JSON.stringify(API_URL),
		  			'API_REST_URL': JSON.stringify(API_REST_URL),
		  			'APP_NAME': JSON.stringify(APP_NAME),
				}
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
				helpers.root('src'), // location of your src
				{
					// your Angular Async Route paths relative to this root directory
				}
			),

			/**
			* Plugin LoaderOptionsPlugin (experimental)
			*
			* See: https://gist.github.com/sokra/27b24881210b56bbaff7
			*/
			new LoaderOptionsPlugin({
				debug: false,
				options: {
					// legacy options go here
					context: __dirname,  
					output: { path :  './' }, //This has to be './' and not your output folder.
					sassLoader: {
						includePaths: [path.resolve(__dirname, 'src', 'scss')]
					}
				}
			}),

		],

		/**
		* Disable performance hints
		*
		* See: https://github.com/a-tarasyuk/rr-boilerplate/blob/master/webpack/dev.config.babel.js#L41
		*/
		performance: {
			hints: false
		},

		/**
		* Include polyfills or mocks for various node stuff
		* Description: Node configuration
		*
		* See: https://webpack.github.io/docs/configuration.html#node
		*/
		node: {
			global: true,
			process: false,
			crypto: 'empty',
			module: false,
			clearImmediate: false,
			setImmediate: false
		}

	};
}