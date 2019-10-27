// cache DOM
const pwdDisplayEl = document.getElementById('pwd-display');
const pwdLengthEl= document.getElementById('pwd-length');
const pwdUppercaseEl = document.getElementById('pwd-uppercase');
const pwdLowercaseEl = document.getElementById('pwd-lowercase');
const pwdNumbersEl = document.getElementById('pwd-numbers');
const pwdSymbolsEl = document.getElementById('pwd-symbols');
const pwdGenerateEl = document.getElementById('pwd-generate');


/*
* event listeners
*/
pwdGenerateEl.addEventListener('click', () => {

    // get user input values
    const length = pwdLengthEl.value;
	const hasLowercase = pwdLowercaseEl.checked;
	const hasUppercase = pwdUppercaseEl.checked;
	const hasNumbers = pwdNumbersEl.checked;
    const hasSymbols = pwdSymbolsEl.checked;
    
    console.log( length, hasLowercase, hasUppercase, hasNumbers, hasSymbols);

    // run main function to generate pwd
    generatePwd();
});


/*
* generate password function
*/
const generatePwd = () => {
    console.log('works');
}

/*
* random generator helpers
*/
function getRandomLowercaseLetter() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUppercaseLetter() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.';
	return symbols[Math.floor(Math.random() * symbols.length)];
}