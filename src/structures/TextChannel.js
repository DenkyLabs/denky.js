const Requester = require('../utils/Requester');

class TextChannel {
	constructor (client, data, guild) {
		this.client = client;
		this.guild = guild;
		this.parseData(data);
	}

	setName (name) {
		return Requester.create(this.client, `/channels/${this.id}`, 'PATCH', true, { name });
	}

	setPosition (position = 0) {
		return Requester.create(this.client, `/channels/${this.id}`, 'PATCH', true, { position });
	}

	setTopic (topic = null) {
		return Requester.create(this.client, `/channels/${this.id}`, 'PATCH', true, { topic });
	}

	setRateLimitPerUser (seconds = 0) {
		return Requester.create(this.client, `/channels/${this.id}`, 'PATCH', true, { rate_limit_per_user: seconds });
	}

	setType (type) {
		if (typeof type === 'number') return Requester.create(this.client, `/channels/${this.id}`, 'PATCH', true, { type });

		if (!['GUILD_TEXT', 'GUILD_NEWS'].includes(type)) throw new Error('Invalid channel type');
		return Requester.create(this.client, `/channels/${this.id}`, 'PATCH', true, { type: type === 'GUILD_TEXT' ? 0 : 5 });
	}

	async delete () {
		return Requester.create(this.client, `/channels/${this.id}`, 'DELETE', true);
	}

	toString () {
		return `<#${this.id}>`;
	}

	parseData (data) {
		if (!data) return;

		this.id = data.id;

		this.nsfw = data.nsfw ?? false;
		this.topic = data.topic ?? null;
		this.slowmode = data.rate_limit_per_user;

		this.lastMessageId = data.last_message_id;
		this.parentId = data.parent_id;

		this.name = data.name;
		this.type = 'GUILD_TEXT';

		this.parent = this.client.caches.channels.get(this.parentId);
	}
}

module.exports = TextChannel;
