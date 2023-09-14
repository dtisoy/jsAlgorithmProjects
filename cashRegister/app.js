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
    result: { status: "OPEN", change: [] },
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
        if (founds === this.change) {
            this.result.status = "CLOSED";
        }
        return (founds >= this.change) ? true : false;
    },
    giveChange: function () {
        if (this.result.status === "CLOSED") {
            this.result.change = [...this.cid];
            return this.result;
        }
        const cidRever = this.cid.reverse()
        let keyIndex;
        let maxUnit = this.getMaxUnitChange()
        cidRever.forEach((array, idx) => {
            if (maxUnit === array[0]) {
                keyIndex = idx;
            }
        });
        let updateChange = 0;
        let remainder = this.change;

        for (keyIndex; keyIndex < cidRever.length; keyIndex++) {
            const element = cidRever[keyIndex];
            let baseValue = this.getCurrencies()[element[0].toLowerCase()];
            let aux = updateChange + element[1]
            if (aux < this.change) {
                updateChange = aux;
                remainder = this.change - updateChange;
                this.result.change.push([...element])
            } else {
                aux = parseInt(remainder / baseValue) * baseValue;
                updateChange += aux;
                remainder = this.change - updateChange;
                remainder = remainder.toFixed(2);
                if (aux) {
                    this.result.change.push([element[0], aux])
                }
            }
            if (remainder === parseFloat(0)) {
                break;
            }

        }
        return this.result;
    }
}


function checkCashRegister(price, cash, cid) {
    let change = cash - price;

    let cashReg = new CashRegister(cid, change)
    if (!(cashReg.getEnoughFounds())) {
        return { status: "INSUFFICIENT_FUNDS", change: [] }
    } else {
        return cashReg.giveChange()
    }
}
