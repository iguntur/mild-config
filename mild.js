'use strict';
const path = require('path');
const dotProp = require('dot-prop');

const init = () => Object.create(null);

class Mild {
	constructor(opts) {
		opts = opts || {};
		this.config = Object.assign(init(), opts.default, this.config);
	}

	set(key, val) {
		if (typeof key !== 'string' && typeof key !== 'object') {
			throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof key}`);
		}

		const cfg = this.config;

		if (typeof key === 'string') {
			dotProp.set(cfg, key, val);
		} else {
			Object.keys(key).forEach(k => dotProp.set(cfg, k, key[k]));
		}

		this.config = cfg;
	}

	has(key) {
		return dotProp.has(this.config, key);
	}

	delete(key) {
		return dotProp.delete(this.config, key);
	}

	get(key) {
		return dotProp.get(this.config, key);
	}

	clear() {
		this.config = init();
	}

	join() {
		let paths = [];

		for (const fp of arguments) {
			paths.push(fp);
		}

		paths = paths.map(key => this.get(key) ? this.get(key) : key);

		return path.join.apply(this, paths);
	}

	src(src) {
		const basePath = this.has('basePath') ? this.get('basePath') : 'resources';
		const assetsPath = this.has('assetsPath') ? this.get('assetsPath') : 'assets';

		const base = path.join(basePath, assetsPath);

		if (!Array.isArray(src)) {
			if (this._withPrefix(src)) {
				return src;
			}

			return path.join(base, src);
		}

		return [].concat(src).map(inputPath => {
			if (this._ignore(inputPath)) {
				inputPath = inputPath.substr(1);

				if (this._withPrefix(inputPath)) {
					return `!${path.resolve(inputPath)}`;
				}

				return path.join(`!${base}`, inputPath);
			}

			if (this._withPrefix(inputPath)) {
				return path.resolve(inputPath);
			}

			return path.join(base, inputPath);
		});
	}

	dest(dest) {
		const publicPath = this.has('publicPath') ? this.get('publicPath') : 'public';
		const assetsPath = this.has('assetsPath') ? this.get('assetsPath') : 'assets';

		const base = path.join(publicPath, assetsPath);

		return this._withPrefix(dest) ? dest : path.join(base, dest);
	}

	_withPrefix(fp) {
		if (fp.startsWith('/') || fp.startsWith('./') || fp.startsWith('../')) {
			return true;
		}

		return false;
	}

	_ignore(fp) {
		if (fp.charAt(0) === '!') {
			return true;
		}

		return false;
	}
}

module.exports = Mild;
