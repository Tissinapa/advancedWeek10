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
    
    fetch("/api/user/register",{
      method: "POST",
      headers:{
        "Content-type": "application/json"
      },
      body: JSON.stringify({email: emailData.value, password: passwordData.value}),

    })
      .then(response => response.text())
      .then((data) => {
        if(data==="Password is not strong enough" || data==="Email already in use"){
          console.log(data)
        }else {
          window.location.href="/login.html"
        }
      
      })
        
      //.catch(error => console.log(JSON.stringify(error)))
}