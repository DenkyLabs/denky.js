class LimitedMap extends Map {
	constructor (limit) {
		super();
		this.limit = limit;
	}

	set (key, value) {
		if (this.limit <= 0) return;
		if (this.size >= this.limit) {
			this.delete(this.keys().next().value);
		}
		super.set(key, value);
	}
}

module.exports = LimitedMap;