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
		const base = this.join('basePath', 'assetsPath');
		return this._withPrefix(src) ? src : path.join(base, src);
	}

	dest(dest) {
		const base = this.join('publicPath', 'assetsPath');
		return this._withPrefix(dest) ? dest : path.join(base, dest);
	}

	_withPrefix(fp) {
		if (fp.startsWith('/') || fp.startsWith('./') || fp.startsWith('../')) {
			return true;
		}

		return false;
	}
}

module.exports = Mild;
