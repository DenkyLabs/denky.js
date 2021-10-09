'use strict';

const LimitedMap = require('../utils/LimitedMap');

class RoleManager {
	constructor (client, limit) {
		this.cache = new LimitedMap(limit);
		this.client = client;
	}
}

module.exports = RoleManager;
