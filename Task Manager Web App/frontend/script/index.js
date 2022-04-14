var regBtn = document.getElementById("signUpBtn");

var signInBtn = document.getElementById("signInBtn");
var useridBox = document.getElementById("emailId");
var passwordBox = document.getElementById("password");


redirectToReg();
function redirectToReg(){
  regBtn.addEventListener("click",function(){
    window.location.replace('./signup.html');
  });
}

signInBtn.addEventListener("click",function(){
  if(useridBox.value && password.value){
    var request = new XMLHttpRequest();
    
    
    request.open("post","/login");
    request.setRequestHeader("Content-type","application/json");
    request.send(JSON.stringify({username: useridBox.value, password:passwordBox.value}));

    request.addEventListener("load",function(){
      if(request.status===200){
        window.location.href = "/";
        console.log(request.responseText);
      }else{
        console.log("login err",request.responseText);
      }
    })
  }
});
