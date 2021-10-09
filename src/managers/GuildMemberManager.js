'use strict';

const LimitedMap = require('../utils/LimitedMap');

class GuildMemberManager {
	constructor (client, limit) {
		this.cache = new LimitedMap(limit);
		this.client = client;
	}
}

module.exports = GuildMemberManager;
