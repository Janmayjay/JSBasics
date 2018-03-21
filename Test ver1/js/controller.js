window.addEventListener("load",bindEvents);
const url="https://raw.githubusercontent.com/Janmayjay/JSBasics/master/test1.json";var idNo=0;
//var questionId=0;
function bindEvents(){
    document.querySelector("#loginDiv").style.display="block";
    document.querySelector("#menuDiv").style.display="none";
    document.querySelector("#questionDiv").style.display="none";
    document.querySelector("#resultDiv").style.display="none";
    document.querySelector("#logIn").addEventListener("click",userLogin);
    document.querySelector("#previous").addEventListener("click",previousQuestion);
    document.querySelector("#skip").addEventListener("click",skipQuestion);
    document.querySelector("#next").addEventListener("click",nextQuestion);
    document.querySelector("#finish").addEventListener("click",finishTest);
    if(localStorage)
        if(localStorage.items)
        {}
        else{
            fetch(url).then(data => data.json().then(dt => {
                var json=JSON.stringify(dt);
                localStorage.items=json;
            }))
        }
}
function userLogin(){
    var userNameEntered=document.querySelector("#userName").value;
    var passwordEntered=document.querySelector("#password").value;
    var user=JSON.parse(localStorage.items);
    var userList=user.users;
    for(let i in userList){
        if(userList[i].username == userNameEntered && userList[i].password == passwordEntered)
            showMenu();
            //console.log("yeah");
        //else
            //console.log("hatt bc");
    }
}
function showMenu(){
    document.querySelector("#loginDiv").style.display="none";
    document.querySelector("#menuDiv").style.display="block";
    var subjects=JSON.parse(localStorage.items);
    //console.log(subjects.tests.length);
    for(let i=0;i<subjects.tests.length;i++){
        var divMenu=document.createElement("input");
        divMenu.type="button";
        divMenu.value=subjects.tests[i].subject;
        divMenu.id=subjects.tests[i].subject;
        divMenu.onclick=function(){showQuestions(i)};
        //divMenu.setAttribute("frameNo",i);
        var insertMenu=document.querySelector("#menuItems");
        insertMenu.appendChild(divMenu);
        testID=i;
        //console.log(i);
        //console.log(divMenu.id);
    }
}
var i,j=0;var idButton,testID=0;
function showQuestions(){
    //idButton=this.id;
    //console.log(idButton);
    //console.log(document.querySelector("#"+this.id).getAttribute("frameNo"));
    //if(document.querySelector("").getAttribute("frameNo"))
    //i=questionId;
    //idButton=this.id;
    document.querySelector("#menuDiv").style.display="none";
    document.querySelector("#questionDiv").style.display="block";
    //console.log(idButton);
    
    var subjects=JSON.parse(localStorage.items);
    console.log(subjects.tests[testID],j);
    var questionList=subjects.tests[testID].questions;
    //for(let j=0;j<questionList.length;j++){
        document.querySelector("#A").innerText="";
        document.querySelector("#B").innerText="";
        document.querySelector("#C").innerText="";
        document.querySelector("#D").innerText="";
        document.querySelector("#question").innerText="";
        //console.log(questionList.length);
        document.querySelector("#A").innerHTML="<input type='radio' name='options' value='A'>"+questionList[j].optionA;
        document.querySelector("#B").innerHTML="<input type='radio' name='options' value='B'>"+questionList[j].optionB;
        document.querySelector("#C").innerHTML="<input type='radio' name='options' value='C'>"+questionList[j].optionC;
        document.querySelector("#D").innerHTML="<input type='radio' name='options' value='D'>"+questionList[j].optionD;
        // document.querySelector("#timer").innerHTML=document.querySelector("input[name='options']").value;
        document.querySelector("#question").innerText=questionList[j].question;
        //j=idNo;
    //}
}

function nextQuestion(){
    console.log(j,"next");
    j++;
    showQuestions();
    //return idNo++;
}

function previousQuestion(){
    console.log(j,"previous");
    j--;
    showQuestions();
    //return idNo--;
}

function skipQuestion(i){
    console.log(j,"skip");
    j++;
    showQuestions();
    //return idNo++;
}

function finishTest(){
    console.log("BC");
}