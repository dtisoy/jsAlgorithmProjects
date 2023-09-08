String.prototype.isPalindrome = function () {

    for (let i = 0; i <= this.length / 2; i++) {
        let opposing = (this.length - 1) - i;
        if (this[i] != this[opposing]) {
            return false;
        }
    }
    return true;
}


function palindrome(str) {
    let cleanStr = str.replace(/[_\W]/g, "").toLowerCase();
    return cleanStr.isPalindrome();
}

palindrome("A man, a plan, a canal. Panama");
palindrome("My age is 0, 0 si ega ym.");
palindrome("_eye");
palindrome("0_0 (: /-\ :) 0-0")