// DOM Caching
const pwdDisplayEl = document.getElementById('pwd-display');
const pwdLengthEl= document.getElementById('pwd-length');
const pwdUppercaseEl = document.getElementById('pwd-uppercase');
const pwdLowercaseEl = document.getElementById('pwd-lowercase');
const pwdNumbersEl = document.getElementById('pwd-numbers');
const pwdSpecialEl = document.getElementById('pwd-special');
const pwdGenerateEl = document.getElementById('pwd-generate');
const pwdCopyEl = document.getElementById('pwd-copy');
const strengthMeterEl = document.getElementById('strength-meter');
const strengthMeterTextEl = document.getElementById('strength-meter-text');
const strengthMeterBgEl = document.getElementById('strength-meter-bg');

// Error messages array
const errorArr = [];


/**
 * Show generated password
 * 
 */
const showGeneratedPwd = () => {

    // Generate pwd
    const generatedPwd = generatePwd();

    // Diplay pwd or error message
    if(generatedPwd) 
    {
        pwdDisplayEl.value = generatedPwd;
        showPwdStrength(generatedPwd);
    } 
    else if (errorArr.length > 0)
    {
        pwdDisplayEl.value = errorArr[0];
    }
}


/**
 * Generate password
 * 
 * @returns {string} password 
 * 
 */
const generatePwd = () => {

    let generatedPwd = '';

    // Get user input values
    const length = pwdLengthEl.value;
    const upperChecked = pwdUppercaseEl.checked;
    const lowerChecked = pwdLowercaseEl.checked;
    const numbersChecked = pwdNumbersEl.checked;
    const specialCharsChecked = pwdSpecialEl.checked;

    // If pwd length > 20, show error message
    if(length > 20) 
    {
        errorArr.push('Password too long (max 20 chars)!');
        return;
    }

    // Get all types
    const typesArr = [{lowerChecked}, {upperChecked}, {numbersChecked}, {specialCharsChecked}];                             

    // Get only those types that are checked
    const typesFilteredArr = typesArr.filter(item => Object.values(item)[0] === true);      
    const typesFilteredArrLength = typesFilteredArr.length;                                 

    // If no types selected, show error message
    if(typesFilteredArrLength === 0) 
    {
        errorArr.push('Please select at least one type!');
        return;
    }

    // Loop through pwd length and generate charachters randomly
    for(let i = 0; i < length; i++) {
        let randomType = typesFilteredArr[Math.floor(Math.random() * typesFilteredArrLength)];
        randomType = Object.keys(randomType)[0];

        switch(randomType) {
            case "upperChecked":
                generatedPwd += getRandomUppercaseLetter();
                break;
            case "lowerChecked":
                generatedPwd += getRandomLowercaseLetter();
                break;
            case "numbersChecked":
                generatedPwd += getRandomNumber();
                break;
            case "specialCharsChecked":
                generatedPwd += getRandomSpecialChar();
                break;
            default:
                generatedPwd += getRandomUppercaseLetter();
        }
    }

    return generatedPwd;
}


/**
 * Calculate password strength
 * 
 * @param {string} password  
 * 
 * @returns {number} password strength 
 * 
 */
const calculatePwdStrength = (pwd) => {

    // Set initial strength to 100
    let pwdStrength = 100;

    // Get strength factors
    const length = pwd.length;
    const containsLowerCase = pwd.match(/[a-z]/g) || [];
    const containsUpperCase = pwd.match(/[A-Z]/g) || [];
    const containsNumber = pwd.match(/[0-9]/g) || [];
    const containsSpecialCharacters = pwd.match(/[^0-9a-zA-Z\s]/g) || [];
    const containsRepeatCharacters = pwd.match(/(.)\1/g) || [];

    // Deduct points for pwd length weakness
    if(length <= 3) 
    {
        pwdStrength = pwdStrength - 90;
    } 
    else if (length <= 5) 
    {
        pwdStrength = pwdStrength - 40;
    } 
    else if (length <= 10) 
    {
        pwdStrength = pwdStrength - 15;
    }

    // Deduct points for lowercase weaknesses
    if (containsLowerCase.length === 0) 
    {
        pwdStrength = pwdStrength - 20;
    } 
    else if (containsLowerCase.length < 3) 
    {
        pwdStrength = pwdStrength - 5;
    }

    // Deduct points for uppercase weaknesses
    if (containsUpperCase.length === 0) 
    {
        pwdStrength = pwdStrength - 20;
    } 
    else if (containsUpperCase.length < 3) 
    {
        pwdStrength = pwdStrength - 5;
    }

    // Deduct points for number weaknesses
    if (containsNumber.length === 0) 
    {
        pwdStrength = pwdStrength - 20;
    } 
    else if (containsNumber.length < 3) 
    {
        pwdStrength = pwdStrength - 5;
    }

    // Deduct points for special chars weaknesses
    if (containsSpecialCharacters.length === 0) 
    {
        pwdStrength = pwdStrength - 20;
    } 
    else if (containsSpecialCharacters.length < 3) 
    {
        pwdStrength = pwdStrength - 5;
    }

    // Deduct points for repeat chars weaknesses
    if(containsRepeatCharacters.length > 0) 
    {
        pwdStrength = pwdStrength - (containsRepeatCharacters.length * 10);
    } 

    if (pwdStrength < 5) {
        pwdStrength = 5;
    }

    return pwdStrength;
}


/**
 * Show password strength
 * 
 */
const showPwdStrength = (pwd) => {
    const pwdStrength = calculatePwdStrength(pwd);
    strengthMeterBgEl.className = '';
    strengthMeterBgEl.style.setProperty('--strength', pwdStrength);

    // Show password status
    if(pwdStrength <= 50) 
    {
        strengthMeterTextEl.textContent = 'Password Strength: Weak';
        strengthMeterBgEl.classList.add('weak');
    }
    else if (pwdStrength <= 80)
    {
        strengthMeterTextEl.textContent = 'Password Strength: Medium';
        strengthMeterBgEl.classList.add('medium');
    }
    else {
        strengthMeterTextEl.textContent = 'Password Strength: Strong';
        strengthMeterBgEl.classList.add('strong');
    }
}


/**
 *  Copy to clipboard function 
 * 
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


/**
 * Generate random chars helpers
 * 
 * @returns {string} character
 * 
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

function getRandomSpecialChar() {
    const specialChars = '!@#$%^&*(){}[]=<>/,.';
    return specialChars[Math.floor(Math.random() * specialChars.length)];
}


/**
 * Event listeners
 * 
 */
pwdGenerateEl.addEventListener('click', showGeneratedPwd);
pwdCopyEl.addEventListener('click', copyToClipboard);