'use strict'

const tape = require('tape')
const util = require('./index')
const isFunction = require('lodash/isfunction')

const urlSafe = 'asd123'
const nonUrlSafe = 'asd|w«]}≠»d'
const nonString = 12345
const shortString = 'a'

tape('fptf-util.validateArgument', (t) => {
	// station, origin, destination
	for (let validateStation of [util.validateArgument.station, util.validateArgument.origin, util.validateArgument.destination]) {
		t.ok(isFunction(validateStation), 'station')

		t.ok(validateStation(urlSafe), 'station')
		t.throws(() => validateStation(nonUrlSafe), 'station')
		t.throws(() => validateStation(nonString), 'station')

		t.ok(validateStation({type: 'station', id: urlSafe, name: urlSafe}), 'station')
		t.throws(() => validateStation({type: 'station', id: nonUrlSafe, name: urlSafe}), 'station')
		t.throws(() => validateStation({type: 'station', id: nonString, name: urlSafe}), 'station')

		t.throws(() => validateStation(''), 'station')
		t.throws(() => validateStation({type: 'station', id: '', name: urlSafe}), 'station')
		t.throws(() => validateStation(), 'station')
		t.throws(() => validateStation({type: 'station', name: urlSafe}), 'station')
		t.throws(() => validateStation(null), 'station')
		t.throws(() => validateStation({type: 'station', id: null, name: urlSafe}), 'station')

		t.throws(() => validateStation({type: 'region', id: urlSafe, name: urlSafe}), 'station')
		t.throws(() => validateStation({type: 'stop', id: urlSafe, name: urlSafe}), 'station')
		t.throws(() => validateStation({id: urlSafe, name: urlSafe}), 'station')
		t.throws(() => validateStation({type: 'station', id: urlSafe}), 'station')
	}


	// query
	const validateQuery = util.validateArgument.query
	t.ok(validateQuery(urlSafe), 'query')
	t.ok(validateQuery(nonUrlSafe), 'query')
	t.ok(validateQuery(shortString), 'query')
	t.throws(() => validateQuery(nonString), 'query')
	t.throws(() => validateQuery(null), 'query')
	t.throws(() => validateQuery(), 'query')


	// query
	const validateLocation = util.validateArgument.location
	const longitude = 13.6
	const latitude = 50.25
	t.ok(validateLocation({type: 'location', longitude, latitude}), 'location')
	t.ok(validateLocation({type: 'location', longitude, latitude, otherAttribute: 'key'}), 'location')
	t.throws(() => validateLocation(), 'location')
	t.throws(() => validateLocation(null), 'location')
	t.throws(() => validateLocation(urlSafe), 'location')
	t.throws(() => validateLocation(nonString), 'location')
	t.throws(() => validateLocation({}), 'location')
	t.throws(() => validateLocation({type: 'location'}), 'location')
	t.throws(() => validateLocation({longitude, latitude}), 'location')
	t.throws(() => validateLocation({type: 'location', latitude}), 'location')
	t.throws(() => validateLocation({type: 'station', longitude, latitude}), 'location')
	t.throws(() => validateLocation({type: 'asddsa', longitude, latitude}), 'location')


	// opt
	const validateOpt = util.validateArgument.opt
	t.ok(validateOpt({}), 'opt')
	t.ok(validateOpt({attribute: 'key'}), 'opt')
	t.ok(validateOpt(), 'opt')
	t.throws(() => validateOpt(urlSafe), 'opt')
	t.throws(() => validateOpt(nonString), 'opt')
	t.throws(() => validateOpt(null), 'opt')


	// stationsOpt, stopsOpt, regionsOpt
	for (let validateStationsOpt of [util.validateArgument.stationsOpt, util.validateArgument.stopsOpt, util.validateArgument.regionsOpt]) {
		t.ok(validateStationsOpt({}), 'stationsOpt')
		t.ok(validateStationsOpt({attribute: 'key'}), 'stationsOpt')
		t.ok(validateStationsOpt(), 'stationsOpt')
		t.throws(() => validateStationsOpt(urlSafe), 'stationsOpt')
		t.throws(() => validateStationsOpt(nonString), 'stationsOpt')
		t.throws(() => validateStationsOpt(null), 'stationsOpt')
	}

	t.end()
})
