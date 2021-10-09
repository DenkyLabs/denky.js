'use strict';

const TextChannel = require('../structures/TextChannel');
const LimitedMap = require('../utils/LimitedMap');
const Requester = require('../utils/Requester');

class ChannelManager {
  constructor(client, limit) {
    this.cache = new LimitedMap(limit);
    this.client = client;
  }

  async fetch(id) {
    if (this.cache.has(id)) return this.cache.get(id);

    const data = await Requester.create(this.client, `/channels/${id}`, 'DELETE', true);
    let channel = null;
    switch (data.type) {
      case 0:
        channel = new TextChannel(this.client, data, this.client.guilds.cache.get(data.guild_id));
        break;
    }

    if (channel) {
      this.cache.set(id, channel);
      this.client.channels.cache.set(id, channel);
    }
    return channel;
  }
}

module.exports = ChannelManager;
