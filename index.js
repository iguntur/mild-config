'use strict';
const path = require('path');
const dotProp = require('dot-prop');

const config = {
	sourcePath: 'resources',
	publicPath: 'public',
	assetsPath: 'assets',
	production: false,
	sourcemaps: true,
	js: {
		sourcePath: 'scripts',
		outputPath: 'js',
		options: {}
	},
	css: {
		sourcePath: 'sass',
		outputPath: 'css',
		options: {
			includePaths: [
				'bower_components',
				'node_modules'
			],
			autoprefixer: {
				browsers: ['> 1%'],
				cascade: false
			}
		}
	},
	img: {
		sourcePath: 'images',
		outputPath: 'img',
		options: {}
	}
};

function setSource(name) {
	return path.join(config.sourcePath, config.assetsPath, name);
}

function setOutput(name) {
	return path.join(config.publicPath, config.assetsPath, name);
}

// set js
dotProp.set(config, 'js.sourcePath', setSource(config.js.sourcePath));
dotProp.set(config, 'js.outputPath', setOutput(config.js.outputPath));

// set css
dotProp.set(config, 'css.sourcePath', setSource(config.css.sourcePath));
dotProp.set(config, 'css.outputPath', setOutput(config.css.outputPath));

// set images
dotProp.set(config, 'img.sourcePath', setSource(config.img.sourcePath));
dotProp.set(config, 'img.outputPath', setOutput(config.img.outputPath));

config.get = key => dotProp.get(config, key);

module.exports = config;
