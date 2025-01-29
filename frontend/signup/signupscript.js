const signBtn = document.querySelector('.sign-btn');
const userInput = document.querySelector('.user-input');
const userEmail = document.querySelector('.user-email');
const userPassword = document.querySelector('.user-password');
const SIGNUP_URL = "http://localhost:3000/signup";
const SIGNIN_URL = "http://localhost:3000/signin";

signBtn.addEventListener('click', async () => {
  const username = userInput.value;
  const email = userEmail.value;
  const password = userPassword.value;

  fetch(SIGNUP_URL, {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify({
      username : username,
      email : email,
      password: password
    })
  })
    .then(response => response.json())
    .then(res => {
      console.log(res.message);
      if(res.error) console.log(res.error);
      else {
        window.location.href = SIGNIN_URL;
      }
    })
});