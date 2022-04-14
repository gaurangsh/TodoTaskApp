var signInBtn = document.getElementById("signInBtn");
var nameBox = document.getElementById("name");
var useridBox = document.getElementById("emailId");
var passwordBox = document.getElementById("password");
var signUpBtn = document.getElementById("signUpBtn");

onReg();
redirectToSign();
function redirectToSign(){
  signInBtn.addEventListener("click",function(){
    window.location.replace('./signIn.html');
  });
}



function onReg(){
  signUpBtn.addEventListener("click",function(){
    signUp();
    window.location.replace('/');
  });
}

function signUp(){
  var name_text = nameBox.value;
  var email_text = useridBox.value;
  var password_text = passwordBox.value;
  
  var body={
    name: name_text,
    email: email_text,
    password: password_text
  }
  console.log(body);
  checkData(email_text,function(avail){
    if(avail == true){
      writeData(body);
      alert("Account Created Successfully");
      redirectToHome();
    }else{
      alert("Account Already Exists");
    }
  });
}

function checkData(email,onResponse){
  var req = new XMLHttpRequest();
  req.open("post","/checkAvail");
  req.setRequestHeader("Content-type","application/json");
  var body = {
    em: email
  }
  req.send(JSON.stringify(body));
  req.addEventListener("load",function(){
    var avail = req.responseText;
    avail = JSON.parse(avail);
    onResponse(avail);
  });
}

function writeData(body){
  var bb = {
    b: JSON.stringify(body)
  }
  var req = new XMLHttpRequest();
  req.open("post","/createUser");
  req.setRequestHeader("Content-type","application/json");
  req.send(JSON.stringify(bb));
}