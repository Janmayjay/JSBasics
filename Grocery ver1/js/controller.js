window.addEventListener("load",bindEvents);
const url="https://raw.githubusercontent.com/Janmayjay/JSBasics/master/data2.json";
var userList=[];
function bindEvents(){
    document.querySelector("#login").addEventListener("click",userLogin);
    document.querySelector("#vegetable").addEventListener("click",showItems);
    document.querySelector("#fruit").addEventListener("click",showItems);
    document.querySelector("#fastFood").addEventListener("click",showItems);
    document.querySelector("#back").addEventListener("click",showMenu);
    var a=document.querySelector("#itemsDiv");
    a.style.display="none";
    var b=document.querySelector("#menuDiv");
    b.style.display="none";
    if(localStorage){
        if(localStorage.items){
            //console.log(localStorage);
        }
        else{
            fetch(url).then(data => data.json().then(dt => {
                var json=JSON.stringify(dt);
                localStorage.items=json;
                var temp=JSON.parse(localStorage.items);
                // console.log(temp.users[0].username,temp.users[0].password);
                userList=temp.users;
                console.log(userList);
            }).catch(err=>console.log(err)).catch(err1=>console.log(err1)))
        }
    }

}
function userLogin(){
    var usernameEntered=document.querySelector("#userName").value;
    var passwordEntered=document.querySelector("#password").value;
    //console.log("bc"+usernameEntered+passwordEntered);
    var loginCheck=userList.filter(traverse =>{
        console.log(traverse);
        // if(traverse.username==usernameEntered && traverse.password==passwordEntered)
        // return true;
    });
    if(loginCheck.length==1){
    var a=document.querySelector("#loginDiv");
    a.style.display="none";
    console.log("Login Successful...")
    showMenu();}
    else{
        console.log("Error..",loginCheck);
    }

}
function showMenu(){
    var a=document.querySelector("#itemsDiv");
    a.style.display="none";
    var b=document.querySelector("#menuDiv");
    b.style.display="block";
}
function showItems(){
    var a=document.querySelector("#itemsDiv");
    a.style.display="block";
    var b=document.querySelector("#menuDiv");
    b.style.display="none";
}
// function goBack(){
//     var a=document.querySelector("#itemsDiv");
//     a.style.display="none";
//     var b=document.querySelector("#menuDiv");
//     b.style.display="block";
// }