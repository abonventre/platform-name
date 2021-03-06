'use strict';

const inspect = require('util').inspect;

const inspectWithKind = require('inspect-with-kind');

const map = new Map([
	['aix', 'AIX'],
	['android', 'Android'],
	['darwin', 'macOS'],
	['freebsd', 'FreeBSD'],
	['linux', 'Linux'],
	['openbsd', 'OpenBSD'],
	['sunos', 'Solaris'],
	['win32', 'Windows']
]);

const ERR = 'Expected a string one of \'aix\', \'android\', \'darwin\', \'freebsd\', \'linux\', \'openbsd\', \'sunos\' and \'win32\'';

module.exports = function platformName(id) {
	if (id === undefined) {
		return map.get(process.platform);
	}

	if (typeof id !== 'string') {
		throw new TypeError(`${ERR}, but got a non-string value ${inspectWithKind(id)}.`);
	}

	const result = map.get(id);

	if (!result) {
		throw new RangeError(`${ERR}, but got ${id.length === 0 ? '\'\' (empty string)' : inspect(id)}.`);
	}

	return result;
};

Object.defineProperty(module.exports, 'map', {
	value: map,
	enumerable: true
});
