function Item(name, energy) {
    this.itemId = '';
    this.userId = '';
    this.name = name;
    this.energy = energy;
    this.specs = new Object();
}

Item.prototype.addSpec = function(key, value) {
    this.specs[key] = value;
};
