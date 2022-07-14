function getAlphabateArray({from}) {
    let alphabatearray = Array.from(Array(26)).map((e, i) => i + 65).map((x) => String.fromCharCode(x))
    if(from) {
        let startcount = from?.toLowerCase().charCodeAt(0) - 97 + 1
        alphabatearray = alphabatearray?.slice(startcount === 1 ? 0 : startcount)
    }
    
    return alphabatearray
}

function getNumberArray(num) {
    let numArray = Array.from(Array(num+1).keys())
    numArray.shift()
    return numArray
}

function getAlphaValue(s) {
    return s?.toLowerCase().charCodeAt(0) - 97 + 1
}

export {
    getAlphabateArray,
    getNumberArray,
    getAlphaValue
}