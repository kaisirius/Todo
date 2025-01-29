const signBtn = document.querySelector('.sign-btn');
const userEmail = document.querySelector('.user-email');
const userPassword = document.querySelector('.user-password');
const SIGNIN_URL = "http://localhost:3000/signin"

signBtn.addEventListener('click', async () => {
  const email = userEmail.value;
  const password = userPassword.value;
  fetch(SIGNIN_URL, {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify({
      email : email,
      password : password
    })    
  })
    .then(response => response.json())
    .then(res => {
      if(res.token) {
        const token = res.token;
        localStorage.setItem('token', token);
        window.location.href = "http://localhost:3000/Todos";
      } else {
        console.log(res.message);
        if(res.error) console.log(res.error);
      }
    })
});