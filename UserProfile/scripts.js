const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (()=>{
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
  signupBtn.click();
  return false;
});

function onSignInGoogle() {
    gapi.load('auth2', function() {
      const auth2 = gapi.auth2.init({
        client_id: '667479201644-q7d9nhslprrdmd07ljsgout049pn338a.apps.googleusercontent.com'
      });
      
      auth2.signIn().then(function(googleUser) {
        const profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());        
      });
    });
  }
  
  window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    header.classList.toggle("stickey", window.scrollY > 0);
})