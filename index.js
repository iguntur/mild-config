'use strict';
const path = require('path');
const dotProp = require('dot-prop');

const config = {
	sourcePath: 'resources',
	publicPath: 'public',
	assetsPath: 'assets',
	production: false,
	sourcemaps: true,
	watch: false
};

config.js = {
	sourcePath: 'scripts',
	outputPath: 'js',
	search: '**/*.js',
	options: {},
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
	}
};

config.css = {
	sourcePath: 'sass',
	outputPath: 'css',
	search: '**/*.+(sass|scss)',
	options: {
		sass: {
			outputStyle: config.production ? 'compressed' : 'expanded',
			includePaths: [
				'bower_components',
				'node_modules'
			]
		},
		autoprefixer: {
			browsers: ['> 1%'],
			cascade: false
		}
	}
};

config.img = {
	sourcePath: 'images',
	outputPath: 'img',
	options: {}
};

function setSource(name) {
	return path.join(config.sourcePath, config.assetsPath, name);
}

function setOutput(name) {
	return path.join(config.publicPath, config.assetsPath, name);
}

config.set = (key, val) => {
	if (typeof key !== 'string' && typeof key !== 'object') {
		throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof key}`);
	}

	if (typeof key === 'object') {
		Object.keys(key).forEach(k => {
			dotProp.set(config, k, key[k]);
		});
	} else {
		dotProp.set(config, key, val);
	}
};

config.get = input => {
	if (/\.(sourcePath)$/i.test(input)) {
		return setSource(dotProp.get(config, input));
	}

	if (/\.(outputPath)$/i.test(input)) {
		return setOutput(dotProp.get(config, input));
	}

	return dotProp.get(config, input);
};

module.exports = config;
