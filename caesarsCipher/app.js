String.prototype.descipherRot13 = function () {
    // return the char desciphered 
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let cipherIndex = alphabet.indexOf(this);
    let desciphered = (cipherIndex + 13 >= alphabet.length)
        ? (cipherIndex + 13) - 26
        : cipherIndex + 13;
    return alphabet[desciphered];
}

function rot13(str) {
    let result = str.replace(/\w/g, e => e.descipherRot13());
    return result;
}

rot13("SERR PBQR PNZC"); rot13("SERR CVMMN!")