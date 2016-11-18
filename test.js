/* eslint no-eval: "off" */
/* eslint-env es6 */

import {join, resolve} from 'path';
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
	},
	{
		query: `config.src(['sass/*.scss', '!vendor/**'])`,
		expected: [srcJoin('sass/*.scss'), `!${srcJoin('vendor/**')}`]
	},
	{
		query: `config.src(['sass/*.scss', '!./vendor/**'])`,
		expected: [srcJoin('sass/*.scss'), `!${resolve('vendor/**')}`]
	}
];

fixtures.forEach(x => {
	if (typeof x.expected === 'object') {
		test(`object: \`${x.query}\``, t => {
			const value = eval(x.query);
			t.true(typeof value === 'object');
			t.truthy(value);
			t.deepEqual(value, x.expected);
		});
	} else if (typeof x.expected === 'string') {
		test(`string: \`${x.query}\` - '${x.expected}'`, t => {
			const value = eval(x.query);
			t.is(value, x.expected);
			t.true(value === x.expected);
		});
	}
});
