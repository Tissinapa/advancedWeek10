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
  console.log("nappia painoit")
  
  fetch("/api/user/login",{
    method: "POST",
    headers:{
      "Content-type": "application/json"
    },
    body: JSON.stringify({email: emailData.value, password: passwordData.value}),

  })
    .then(response => response.json())
    .then((data) =>{
      if(data.token){
        storeToken(data.token);
        window.location.href="/";
  
      }else {
        if(data.message){
          console.log(data.message)
        }else{
          console.log("strange error")
        }
      }


    }) 
    
}
function storeToken(token){
  localStorage.setItem("auth_token",token)
}