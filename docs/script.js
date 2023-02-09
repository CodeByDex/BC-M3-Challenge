// Assignment code here
const lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']; 
const uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'k', 'l', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const special = [' ', '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];
let tries = 0;

// Get references to the #generate element
let generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  let passwordLength = promptUserForLength();
  
  let { includeLowercase, includeUpercase, includeNumeric, includeSpecial } = getPasswordRules();
  
  let password = generatePassword(passwordLength, includeLowercase, includeUpercase, includeNumeric, includeSpecial);

  let passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function getPasswordRules() {
  let includeLowercase = promptUserForLowerCase();
  let includeUpercase = promptUserForUpperCase();
  let includeNumeric = promptUserForNumeric();
  let includeSpecial = promptuserForSpecial();

  if (!(includeLowercase || includeUpercase || includeNumeric || includeSpecial)){
    alert("you must select at least one character type.");
    return getPasswordRules();
  };

  return { includeLowercase, includeUpercase, includeNumeric, includeSpecial };
}

function generatePassword(passwordLength, includeLowercase, includeUpercase, includeNumeric, includeSpecial){
  let useableCharacters = [];

  if (includeLowercase){
    useableCharacters = useableCharacters.concat(lowercase);
  }

  if (includeNumeric) {
    useableCharacters = useableCharacters.concat(numbers);
  }

  if (includeSpecial) {
    useableCharacters = useableCharacters.concat(special);
  }

  if (includeUpercase) {
    useableCharacters = useableCharacters.concat(uppercase);
  }

  let password = "";

  for (let index = 0; index < passwordLength; index++) {
    password += useableCharacters[Math.floor(Math.random() * useableCharacters.length)];
  }

  if (validatePassword(password.split(''), includeLowercase, includeUpercase, includeNumeric, includeSpecial)){
    tries = 0;
    return password
  }else if (tries < 10) {
    tries++;
    return generatePassword(passwordLength, includeLowercase, includeUpercase, includeNumeric, includeSpecial)
  } else {
    return "Password generation Failed after " + tries + " tries";
  }
};

//Since the password generation is random we want to validate that at least some characters of the 
//requested character types are included final password. 
function validatePassword(passwordArray, includeLowercase, includeUpercase, includeNumeric, includeSpecial){
  // If needed you can use this array to generate negative tests to validate the validation checks. 
  //let test = ['あ', 'ん'];
  
  if (includeLowercase && !passwordArray.some(l => lowercase.includes(l))) {
    return false;
  }
  
  if (includeNumeric && !passwordArray.some(l => numbers.includes(l))) {
    return false;
  }
  
  if (includeUpercase && !passwordArray.some(l => uppercase.includes(l))) {
    return false;
  }
  
  if (includeSpecial && !passwordArray.some(l => special.includes(l))) {
    return false;
  }

  return true;
};

function promptUserForLength(){
  let response = prompt("How long should the password be?");

  const min = 8;
  const max = 128;

  if (isNaN(response)){
    alert("Length must be a number!");
    response = promptUserForLength();
  } else if (min > response || response > max) {
    alert("Lenght must be between " + min + " and " + max);
    response = promptUserForLength();
  }

  return response;
};

function promptUserForLowerCase(){
  return getTrueFalseResponse("Do you want to include lowercase letters?");
};

function promptUserForUpperCase(){
  return getTrueFalseResponse("Do you want to include uppercase letters?");
};

function promptUserForNumeric(){
  return getTrueFalseResponse("Do you want to include numbers?");
};

function promptuserForSpecial(){
  return getTrueFalseResponse("Do you want to include special characters?");
};

function getTrueFalseResponse(question){
  let response = prompt(question).toUpperCase();

  if (response == "Y") {
    return true;
  } else if (response == "N") {
    return false;
  } else {
    alert("Response muts be Y or N");
    return getTrueFalseResponse(question);
  }

  return response;
};


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
