import {join} from 'path';
import test from 'ava';
import m from './';

test('throw', t => {
	t.throws(() => m.set());
	t.throws(() => m.set(function () {}));
});

test(`config.get('js.sourcePath')`, t => {
	const jsPath = m.get('js.sourcePath');
	const expected = join(m.sourcePath, m.assetsPath, m.js.sourcePath);

	t.is(jsPath, expected);
	t.true(jsPath === expected);
});

test(`config.get('js.outputPath')`, t => {
	const jsPath = m.get('js.outputPath');
	const expected = join(m.publicPath, m.assetsPath, m.js.outputPath);

	t.is(jsPath, expected);
	t.true(jsPath === expected);
});

test(`config.get('js.sourcePath') !== config.js.sourcePath`, t => {
	const jsPath = m.get('js.sourcePath');
	const originalPath = m.js.sourcePath;

	t.not(jsPath, originalPath);
	t.true(jsPath !== originalPath);
	t.false(jsPath === originalPath);
});

test(`config.get('js.outputPath') !== config.js.outputPath`, t => {
	const jsPath = m.get('js.outputPath');
	const originalPath = m.js.outputPath;

	t.not(jsPath, originalPath);
	t.true(jsPath !== originalPath);
	t.false(jsPath === originalPath);
});
