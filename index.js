'use strict';
const Mild = require('./mild');

const config = new Mild();

config.set({
	watch: false,
	production: false,
	basePath: 'resources',
	publicPath: 'public',
	assetsPath: 'assets',
	gulp: {
		src: {
			js: 'scripts',
			sass: 'sass',
			css: 'css'
		},
		dest: {
			js: 'js',
			css: 'css'
		}
	},
	plugins: {
		sourcemaps: {
			enabled: true,
			init: {},
			write: ['.', {}]
		},
		webpack: {
			devtool: 'eval-cheap-module-source-map',
			module: {
				loaders: [
					{
						test: /\.js$/,
						loader: 'buble',
						exclude: /node_modules/
					}
				]
			},
			watchOptions: {
				poll: true,
				aggregateTimeout: 500,
				ignored: /node_modules/
			}
		},
		autoprefixer: {
			browsers: ['> 1%'],
			cascade: false
		},
		sass: {
			outputStyle: 'expanded',
			includePaths: [
				'bower_components',
				'node_modules'
			]
		}
	}
});

module.exports = config;
module.exports.Mild = Mild;
