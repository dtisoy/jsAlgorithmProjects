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
    // default result
    result: { status: "INSUFFICIENT_FUNDS", change: [] },
    getCurrencies: function () {
        return this.currencies
    },
    getMaxUnitChange: function () {
        // return the max currencie unit to give a change
        let cur = this.getCurrencies();
        // values from larger to shortest
        const cValues = Object.values(cur).reverse();

        let maxValue;

        // search for the max value
        for (let i = 0; i < cValues.length; i++) {
            const ammount = cValues[i];
            if (this.change > ammount) {
                maxValue = ammount;
                break;
            }
        }
        // return the key of the max value
        for (const key in cur) {
            if (cur[key] === maxValue) {
                return key.toUpperCase();
            }
        }

    },
    getEnoughFounds: function () {
        let founds = 0;
        // get the money limit which we can give a change
        let unitLimit = this.getMaxUnitChange();
        // get the aviable founds to give a change
        for (let i = 0; i < this.cid.length; i++) {
            const element = this.cid[i];
            if (element[0] === unitLimit) { founds += element[1]; break; }
            else { founds += element[1] }
        }
        // update the result status
        if (founds === this.change) {
            this.result.status = "CLOSED";
        }
        // return true or false to know if there's enough change due
        return (founds >= this.change) ? true : false;
    },
    giveChange: function () {
        // first check and update status
        const checkFounds = this.getEnoughFounds()
        // status close we should return all the cid
        if (this.result.status === "CLOSED") {
            this.result.change = [...this.cid];
            return this.result;
        } else if (!(checkFounds)) {
            // not enought founds return the default result
            return this.result;
        }

        // no closed or there's enough founds
        // update the status
        this.result.status = "OPEN";

        const cidRever = this.cid.reverse();
        let keyIndex;
        let maxUnit = this.getMaxUnitChange();
        let updateChange = 0;
        let remainder = this.change;

        // get just all the currencies unit and its values that we need
        cidRever.forEach((array, idx) => {
            if (maxUnit === array[0]) {
                keyIndex = idx;
            }
        });
        // starts for the max currencie unit possible to give a change 
        for (keyIndex; keyIndex < cidRever.length; keyIndex++) {
            // element is the current ["cash name", "money aviable"]
            const element = cidRever[keyIndex];
            // get the value of a cash. Example 1 -> one dollar
            let baseValue = this.getCurrencies()[element[0].toLowerCase()];

            let aux = updateChange + element[1];
            if (aux < this.change) {
                /*
                take all of the current money if 
                the money is not enought to complete the change
                */
                updateChange = aux;
                remainder = this.change - updateChange;
                // update the result change with the correct format
                this.result.change.push([...element]);
            } else {
                // the money avaibla is more than we need
                // just take what is needed
                aux = parseInt(remainder / baseValue) * baseValue;
                updateChange += aux;
                remainder = this.change - updateChange;
                remainder = remainder.toFixed(2);
                if (aux) {
                    /* aux is added to the result
                    cause aux is what are actually taking 
                    from the current money*/
                    this.result.change.push([element[0], aux]);
                }
            }
            // finish if we already have all the change due
            if (remainder === parseFloat(0)) {
                break;
            }
        }

        return this.result;
    }
}


function checkCashRegister(price, cash, cid) {

    let change = cash - price;

    let cashReg = new CashRegister(cid, change);

    return cashReg.giveChange();

}

let l = checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])

console.log(l)