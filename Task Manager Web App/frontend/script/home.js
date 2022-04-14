var nameTag = document.getElementById("name");
var logoutBtn = document.getElementById("logoutBtn");

function getSessionData(){

}
logoutBtn.addEventListener("click",function(){
  endSession();
});
function endSession(){
  var req = new XMLHttpRequest();
  req.open("post","/endSess");
  req.setRequestHeader("Content-type","application/json");

  req.send(JSON.stringify({b:true}));

  req.addEventListener("load",function(){
    if(JSON.parse(req.responseText)==true){
      window.location.href = "/";
    }
  })
}
function getName(){
  var req = new XMLHttpRequest();
  req.open("get","/sessionData");
  req.setRequestHeader("Content-type","application/json");
  req.send();
  req.addEventListener("load",function(){
    nameTag.innerHTML = "Hello, " + req.responseText;
  })
}

function todosDiv(){
  var cont = document.getElementById("leftSide");
  var listobjarr = document.getElementsByClassName("listobj");
  console.log(listobjarr);
  for(var i=0,length = listobjarr.length; i < length;i++){
    var ele0arr = listobjarr[i].children;
    var ele = ele0arr[0].children;
    console.log(ele[0].innerHTML);
    childlisten(ele[0],ele[1],ele[2]);
  }
}
function childlisten(e0,e1,e2){
  e0.addEventListener("click", function(){
      console.log(e0);
      e0.style.display = "none";
      e1.style.display = "block";
      e1.value = e0.innerHTML;
      e2.style.display = "block";
      
    });
}
todosDiv();
getName();