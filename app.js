/*
* caching DOM elements
*/
const pwdDisplayEl = document.getElementById('pwd-display');
const pwdLengthEl= document.getElementById('pwd-length');
const pwdUppercaseEl = document.getElementById('pwd-uppercase');
const pwdLowercaseEl = document.getElementById('pwd-lowercase');
const pwdNumbersEl = document.getElementById('pwd-numbers');
const pwdSymbolsEl = document.getElementById('pwd-symbols');
const pwdGenerateEl = document.getElementById('pwd-generate');
const pwdCopy = document.getElementById('pwd-copy');


/*
* event listeners
*/
pwdGenerateEl.addEventListener('click', () => {

    // get user input values
    const length = pwdLengthEl.value;
    const hasUppercase = pwdUppercaseEl.checked;
	const hasLowercase = pwdLowercaseEl.checked;
	const hasNumbers = pwdNumbersEl.checked;
    const hasSymbols = pwdSymbolsEl.checked;

    // run main function to generate pwd
    const generatedPwd = generatePwd(length, hasUppercase, hasLowercase, hasNumbers, hasSymbols);

    // diplay pwd
    pwdDisplayEl.value = generatedPwd;
});

pwdCopy.addEventListener('click', () => {
    copyToClipboard();
});

/*
* generate password function
*/
const generatePwd = (length, upper, lower, number, symbol) => {
    
    let generatedPwd = '';
    const typesArr = [{lower}, {upper}, {number}, {symbol}];                                // get all types
    const typesFilteredArr = typesArr.filter(item => Object.values(item)[0] === true);      // get only those types that are checked
    const typesFilteredArrLength = typesFilteredArr.length;                                 // types arr length

    // if no type selected, return empty string
    if(typesFilteredArrLength === 0) return '';
    
    // loop through pwd length and generate charachters randomly
	for(let i = 0; i < length; i++) {
        const randomType = typesFilteredArr[Math.floor(Math.random() * typesFilteredArrLength)];
        let currentChar = getRandomUppercaseLetter();
        const currentType =Object.keys(randomType)[0];

        switch(currentType) {
            case "upper":
                currentChar = getRandomUppercaseLetter();
                break;
            case "lower":
                currentChar = getRandomLowercaseLetter();
                break;
            case "number":
                currentChar = getRandomNumber();
                break;
            case "symbol":
                    currentChar = getRandomSymbol();
                    break;
            default:
        }

        generatedPwd += currentChar;
    }
    
    return generatedPwd;
}


/*
* copy to clipboard function
*/
const copyToClipboard = () => {

    const textarea = document.createElement('textarea');
    const pwd = pwdDisplayEl.value;
    
    if(!pwd) return;
    
	textarea.value = pwd;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard!');
}


/*
* random generator helpers
*/
function getRandomUppercaseLetter() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLowercaseLetter() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.';
	return symbols[Math.floor(Math.random() * symbols.length)];
}