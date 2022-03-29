export default class ingredient {
    constructor(name, quantity, unit) {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
    }

    render() {
        if(this.unit) {
            return `<strong>${this.name}: </strong>${this.quantity} ${this.unit}<br>`
        } else if(this.quantity) {
            return `<strong>${this.name}: </strong>${this.quantity}<br>`
        } else {
            return `<strong>${this.name}</strong><br>`
        }
    }
}