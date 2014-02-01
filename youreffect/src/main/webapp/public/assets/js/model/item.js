function Item() {
    this.itemId = '';
    this.userId = '';
    this.name = '';
    this.energy = '';
    this.specs = {};
}

function Item(name, energy) {
    this.itemId = '';
    this.userId = '';
    this.name = name;
    this.energy = energy;
    this.specs = {};
}

function Item(name, energy, specs) {
    this.itemId = '';
    this.userId = '';
    this.name = name;
    this.energy = energy;
    this.specs = specs;
}

Item.prototype.addSpec = function (k, v) {
    this.specs[k] = v;
}
