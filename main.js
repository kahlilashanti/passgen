// DOM elements

const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const symbolsEl = document.getElementById('symbols');
const numbersEl = document.getElementById('numbers');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');


//object to include below functions
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

//add an event listener for the generate function

generateEl.addEventListener('click', () => {
    //when this is clicked we need to get the values of the elements we specify
    //this generates a string but we want it to be a number by adding +
    // const length = lengthEl.value; 
    // console.log(typeof length)
    const length = +lengthEl.value; 
    //we want to check if the lowercase box is ticked
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    
    // console.log(hasLower,hasUpper,hasNumber,hasSymbol)
    resultEl.innerText = generatePassword(hasLower,hasUpper,hasNumber,hasSymbol, length);
    
});

//copy generatedPassword to clipboard
clipboardEl.addEventListener('click', ()=> {
    //create a DOM element
    const textarea = document.createElement('textarea');
    // grab the password value we have already generated
    const password = resultEl.innerText;

    //if the password field is blank we do nothing
    if(!password){
        return
    };
    //otherwise return the value of the textarea with value of password into it
    textarea.value = password
    document.body.appendChild(textarea);
    textarea.select();
    // to copy to clipboard
    document.execCommand('copy');
    // then remove textarea
    textarea.remove();
    //let user know it's copied
    alert('password copied to clipboard!');
});

function generatePassword(lower,upper,number,symbol,length){
    // 1. initialize a password variable. A string we'll build on to create the password
    let generatePassword = ''

    // need to be able to count the number of characters
    const typesCount = lower + upper + number + symbol;

    // console.log('typesCount: ', typesCount)
    //create an array based on these checked or selected values 
    //make them objects by wrapping the in curly braces
    
    // 2. filter out unchecked types
    const typesArr = [{lower},{upper},{number},{symbol}].filter(item => Object.values(item)[0]);
    //use .filter to filter out the false values
    // console.log('typesArr: ', typesArr)
    //if none checked don't proceed - use typesCount for this 
    if(typesCount === 0){
        return '';
    }
    // 3. loop over the length, call generator function for each type

        for(let i = 0; i < length; i += typesCount){
            typesArr.forEach(type => {
                const funcName = Object.keys(type)[0];
                // console.log('funcName: ', funcName);

                generatePassword += randomFunc[funcName]();
            })
        }
        // console.log(generatePassword.slice(0, length));
        const finalPassword = (generatePassword.slice(0, length));
        return finalPassword;
    // 4. add final password to password variable and return it
}

//generator functions

//generate a random lowercase letter
function getRandomLower(){
    // return String.fromCharCode(97);
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
// console.log(getRandomLower())
//returns a number related to specific alphabet letters up to 26 (26 letters in the alphabet)
// console.log(Math.random() * 26);
//we want whole numbers so we wrap it in Math.floor()
// console.log(Math.floor(Math.random() * 26) + 97);

//generate a random uppercase letter
function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
// console.log(getRandomUpper())

//generate a random number
function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
// console.log(getRandomNumber())

//generate a random symbol
function getRandomSymbol(){
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    // return symbols[1]; instead of hard coding we'll make it random
    return symbols[Math.floor(Math.random() * symbols.length)];
}
// console.log(getRandomSymbol())

//make sure sw are supported

if ('serviceWorker' in navigator) {
    window.addEventListener('load', ()=> {
        navigator.serviceWorker
        .register('sw_cached_pages.js')
        .then(reg => console.log('service worker: registered'))
        .catch(err => console.log(`service worker: Error: ${err}`))
    })
}