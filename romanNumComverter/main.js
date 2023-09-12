
let arabicToRoman = {
    1000: "M",
    900: "CM",
    500: "D",
    400: "CD",
    100: "C",
    90: "XC",
    50: "L",
    40: "XL",
    10: "X",
    9: "IX",
    5: "V",
    4: "IV",
    1: "I"
}

function findBaseNumber(num) {
    // return the base number which allows to write in roman
    // for 30 returns 10, for 600 return 500, for 3 return 1
    const base = Object.keys(arabicToRoman).map(e => parseInt(e));

    for (let i = 0; i < base.length; i++) {
        if (base[i] > num) {
            return base[i - 1];
        }
    }
    return base[base.length - 1];
}


function convertToRoman(num) {
    let result = [];
    // write roman number in decimal version
    // 30 -> 10 10 10; 45 -> 40 5
    let i = num;
    while (i > 0) {
        let n = findBaseNumber(i);
        result.push(n);
        i -= n;
    }
    // get the roman numbers from the object
    // 10 10 10 -> XXX; 40 5 -> XLV
    let romanResult = result.map(e => arabicToRoman[e]).join("");

    return romanResult;
}

convertToRoman(29);