/**
 * item front-end model
 * @param name
 * @param energy
 * @constructor construct item with name and energy form
 */
function Item(name, energy) {
    this.itemId = '';
    this.userId = '';
    this.name = name;
    this.energy = energy;
    this.quantity = 0;
    this.specs = new Object();
}

/**
 * adds key/value spec pair to specs map of item
 * @param key mapped key of spec
 * @param value mapped value of spec
 */
Item.prototype.addSpec = function(key, value) {
    this.specs[key] = value;
};
