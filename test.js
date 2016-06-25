import test from 'ava';
import m from './';

test(t => {
	t.true(typeof m === 'object');
	t.truthy(m);
});
