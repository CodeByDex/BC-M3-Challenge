// Assignment code here


// Get references to the #generate element
let generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  let passwordLength = promptUserForLength();
  let password = generatePassword(passwordLength);
  let passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function generatePassword(passwordLength){
  return "The password length should be: " + passwordLength;
};

function promptUserForLength(){
  let response = prompt("How long should the password be?");

  if (isNaN(response)){
    alert("Length must be a number!");
    response = promptUserForLength();
  } else if (8 > response || response > 128) {
    alert("Lenght must be between 8 and 128");
    response = promptUserForLength();
  }

  return response;
};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
