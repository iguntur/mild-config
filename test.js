/* eslint no-eval: "off" */
/* eslint-env es6 */

import {join} from 'path';
import test from 'ava';

const config = require('./');

function srcJoin(x) {
	return join(config.get('basePath'), config.get('assetsPath'), x);
}

function destJoin(x) {
	return join(config.get('publicPath'), config.get('assetsPath'), x);
}

const fixtures = [
	{
		query: `config.src('path/to/*.js');`,
		expected: srcJoin('path/to/*.js')
	},
	{
		query: `config.src('../path/to/*.js');`,
		expected: '../path/to/*.js'
	},
	{
		query: `config.src('./path/to/*.js');`,
		expected: './path/to/*.js'
	},
	{
		query: `config.dest('path/to/js');`,
		expected: destJoin('path/to/js')
	},
	{
		query: `config.dest('../path/to/js');`,
		expected: '../path/to/js'
	},
	{
		query: `config.dest('./path/to/js');`,
		expected: './path/to/js'
	},
	{
		query: `config.join('publicPath', 'assetsPath', 'gulp.src.css')`,
		expected: join(config.get('publicPath'), config.get('assetsPath'), config.get('gulp.src.css'))
	},
	{
		query: `config.join('basePath', 'gulp.src.js', 'foo.js')`,
		expected: join(config.get('basePath'), config.get('gulp.src.js'), 'foo.js')
	}
];

fixtures.forEach(x => {
	test(`paths: \`${x.query}\` - '${x.expected}'`, t => {
		const value = eval(x.query);
		t.is(value, x.expected);
		t.true(value === x.expected);
	});
});
