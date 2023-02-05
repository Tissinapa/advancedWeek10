
if (document.readyState !== "loading") {
    initializeCodeLogin();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      initializeCodeLogin();
    });
  }
  
  function initializeCodeLogin() {
    document.getElementById("login-form").addEventListener("submit", onSubmit);
}
function onSubmit(event){
  event.preventDefault()
  const emailData = document.getElementById("emailId")
  const passwordData = document.getElementById("passwordId")
  
  
  fetch("/api/user/login",{
    method: "POST",
    headers:{
      "Content-type": "application/json"
    },
    body: JSON.stringify({email: emailData.value, password: passwordData.value}),

  })
    .then(response => response.text())
    .then((data) =>{
      if(data.token){
        storeToken(data.token)
        window.location.href="/";
  
      }else {
        console.log(data)
        document.getElementById("error").innerHTML = data
      }

    }) 
    
}
function storeToken(token){
  localStorage.setItem("auth_token",token)
}
