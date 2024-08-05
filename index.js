const inputSlider=document.querySelector("[data-length-slider]");

const lengthDisplay = document.querySelector("[data-length-number]");

const passwordDisplay=document.querySelector("[data-passwordDisplay]");

const datacopyMsg = document.querySelector("[data-copymsg]"); 

const datacopyBtn=document.querySelector("[data-copybtn]");
const lowerCaseCheck=document.querySelector("#lowercase");
const upperCaseCheck = document.querySelector("#uppercase");
const numbers=document.querySelector("#numbers");
const symbols=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generatebtn=document.querySelector(".generate-btn");
const allCheckBoxes=document.querySelectorAll("input[type=checkbox]");

const symbolslist=`!@#$%^&*()_+[]{}\|;:'"<,./>?/*-+`;

let password=""
 let passwordlength=10;    //By default password length is 10
 let checkCount=0;   //By default 0 check box is ticked
 handleslider();
 //set password length according to the slider
function handleslider(){
    inputSlider.value=passwordlength;
    lengthDisplay.innerText = passwordlength;
}

function setIndicator(color)
{
    indicator.style.backgroundColor= color;
}


 function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function generaterandomNumber(){
 return getRndInteger(0,9) 

}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generatesymbols(){
    const randnum=getRndInteger(0,symbolslist.length);
    return symbolslist.charAt(randnum);
}

// calcstrength function left have to add
async function copyContent(){
    try{
       await navigator.clipboard.writeText(passwordDisplay.value);
        datacopyMsg.innerText="Copied";
    }

    catch(e){
        datacopyMsg.innerText="Failed"
    }
    datacopyMsg.classList.add("active");
    
    setTimeout(() => {
        datacopyMsg.classList.remove("active");


    },2000);
}


// eventlistener
inputSlider.addEventListener('input',(e)=>{
    passwordlength=e.target.value;
    handleslider();
});

function handleCheckBoxChange(){
    checkCount=0
    allCheckBoxes.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
        console.log(checkCount);
    })

    //Special Case
    if(passwordlength <checkCount){
        passwordlength=checkCount;
        handleslider();
    }    
}
allCheckBoxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
});

datacopyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
        document.querySelector('.tooltip').classList.add('active');
    }
    if(passwordDisplay.value===""){
        document.querySelector('.tooltip').classList.remove('active');
        alert('Please generate password to copy!')
    }
});


generatebtn.addEventListener('click',()=>{
    //none of the checkbox is checked
    if(checkCount<=0){
        return alert('Please Select the options to generate Password');
    }
    //Making our password empty
    password=""

    // let's make our new password on the basis of selected check box
    // if(upperCaseCheck.checked){
    //     password+=generateUpperCase();
    // }

    // if(lowerCaseCheck.checked){
    //     password+=generateLowerCase();
    // }
    
    // if(numbers.checked){
    //     password+=generaterandomNumber();
    // }

    // if(symbols.checked){
    //     password+=generatesymbols();
    // }

    //here we made a array beacuse we if want length of password to be 10 and a person checked 4 boxes 
    //then we can add only 4 password characters 6 remains left to make it 10 so we made a array from which we can execute
    let funarr=[];
    if(upperCaseCheck.checked){
        funarr.push(generateUpperCase);
    }

    if(lowerCaseCheck.checked){
        funarr.push(generateLowerCase);
    }

    if(numbers.checked){
        funarr.push(generaterandomNumber);
    }

    if(symbols.checked){
        funarr.push(generatesymbols);
    }

    //Compulsory addition
    for(let i=0;i<funarr.length;i++){
        password+=funarr[i]();
    }

    // remaining password addition //changing i=0 to passwordlength
    // for(let i=0;i<passwordlength-funarr.length;i++){
    //     let randIndx = getRndInteger(0,funarr.length);
    //     if (typeof funarr[randIndx] === 'function')
    //     password += funarr[randIndx]();
    // }
    // Calculate remaining characters needed
let remainingChars = passwordlength - password.length;

// Add remaining characters
for(let i = 0; i < remainingChars; i++){
    let randIndx = getRndInteger(0, funarr.length - 1);
    if (typeof funarr[randIndx] === 'function') {
        password += funarr[randIndx]();
    }
}

    //shuffle the password
    password=shufflePassword(Array.from(password));
    passwordDisplay.value = password;

    // calcstrength() -> left
})
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
