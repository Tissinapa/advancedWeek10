
if (document.readyState !== "loading") {
    initializeCodeLogin();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
        initializeCodeLogin();
    });
  }
  
  function initializeCodeLogin() {
    
    loadContent()
}
function loadContent() {
    //document.getElementById("login-form").addEventListener("submit", onSubmit);
    //function initializeCodeLogin(event){
        
    const auth_token = localStorage.getItem("auth_token")
    if(!auth_token) return;
    fetch("/api/private",{
        method: "GET",
        headers:{
            "authorization": "Bearer " + auth_token
        }
        
    })
        .then(response => response.text())
        .then((hiddenpage) =>{
            //const contentBody = document.getElementById("secretContent")
            const logoutBtn = document.createElement("button")
            logoutBtn.setAttribute("id", "logout")
            //contentBody.appendChild(logoutBtn)
            logoutBtn.innerHTML="Logout"
            document.body.appendChild(logoutBtn)
            document.getElementById("secretContent").innerHTML = hiddenpage
            
            let logLink = document.getElementById("logId")
            let regLink = document.getElementById("regId")

            logLink.style.display= "none"
            regLink.style.display= "none"
            document.getElementById("logout").addEventListener("click", logoutFunction);
        }) 
        .catch(error => console.log(error))
        
    
}

function logoutFunction(){
    localStorage.removeItem("auth_token")
    let logLink = document.getElementById("logId")
    let regLink = document.getElementById("regId")

    logLink.style.display= "block"
    regLink.style.display= "block"
    window.location.href = "/"
}

