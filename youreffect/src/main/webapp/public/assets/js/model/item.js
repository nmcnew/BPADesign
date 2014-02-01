function Item() {
    this.itemId = '';
    this.userId = '';
    this.name = '';
    this.energy = '';
    this.specs = [];
}

function Item(name, energy, specs) {
    this.itemId = '';
    this.userId = '';
    this.name = name;
    this.energy = energy;
    this.specs = specs;
}

Item.prototype.name = function (name) {
    this.name = name;
}

Item.prototype.energy = function (energy) {
    this.energy = energy;
}

Item.prototype.addSpec = function (key, val) {
    var pair = {key:val};
    this.spec.push(pair);
}
