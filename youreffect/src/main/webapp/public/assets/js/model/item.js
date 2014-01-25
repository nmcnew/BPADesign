function Item() {
    this.itemId = '';
    this.name = '';
    this.energy = '';
    this.specs = [];
}

function Item(name, energy) {
    this.itemId = '';
    this.name = name;
    this.energy = energy;
    this.specs = [];
    console.log(this);
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
    console.log('pushed ' + key + " => " + val);
}
