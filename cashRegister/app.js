function CashRegister(cid, change) {
    this.cid = cid;
    this.change = change;
}

CashRegister.prototype = {
    constructor: CashRegister,
    currencies: {
        "penny": 0.01,
        "nickel": 0.05,
        "dime": 0.1,
        "quarter": 0.25,
        "one": 1,
        "five": 5,
        "ten": 10,
        "twenty": 20,
        "one hundred": 100
    },
    getCurrencies: function () {
        return this.currencies
    },
    getMaxUnitChange: function () {
        // return the max currencie unit to give a change
        let cur = this.getCurrencies()
        // values from larger to shortest
        const cValues = Object.values(cur).reverse()

        let maxValue;

        // search for the max value
        for (let i = 0; i < cValues.length; i++) {
            const ammount = cValues[i];
            if (this.change > ammount) {
                maxValue = ammount;
                break;
            }
        }
        // search for the max key
        for (const key in cur) {
            if (cur[key] === maxValue) {
                return key.toUpperCase()
            }
        }

    },
    getEnoughFounds: function () {
        let founds = 0;
        let unitLimit = this.getMaxUnitChange();
        for (let i = 0; i < this.cid.length; i++) {
            const element = this.cid[i];
            if (element[0] === unitLimit) { founds += element[1]; break; }
            else { founds += element[1] }
        }

        return (founds > this.change) ? true : false;
    }
}


function checkCashRegister(price, cash, cid) {
    let change = cash - price;

    let cashReg = new CashRegister(cid, change)
    if (!(cashReg.getEnoughFounds())) {
        return { status: "INSUFFICIENT_FUNDS", change: [] }
    }
    return change;
}

