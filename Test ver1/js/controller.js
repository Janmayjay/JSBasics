window.addEventListener("load",bindEvents);
const url="https://raw.githubusercontent.com/Janmayjay/JSBasics/master/test.json";var idNo=0;
function bindEvents(){
    document.querySelector("#loginDiv").style.display="block";
    document.querySelector("#menuDiv").style.display="none";
    document.querySelector("#questionDiv").style.display="none";
    document.querySelector("#resultDiv").style.display="none";
    document.querySelector("#logIn").addEventListener("click",showMenu);
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
        divMenu.onclick=showQuestions(i);
        var insertMenu=document.querySelector("#menuItems");
        insertMenu.appendChild(divMenu);
        //console.log(i);
        //console.log(divMenu.id);
    }
}

function showQuestions(questionId){
    var idButton=this.id;
    document.querySelector("#menuDiv").style.display="none";
    document.querySelector("#questionDiv").style.display="block";
    //console.log(idButton);
    var subjects=JSON.parse(localStorage.items);
    var questionList=subjects.tests[questionId].questions;
    for(let j=0;j<questionList.length;j++){
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
    }
}

function nextQuestion(idNo){
    console.log(idNo,"next");
    return idNo++;
}

function previousQuestion(idNo){
    console.log(idNo,"previous");
    return idNo--;
}

function skipQuestion(idNo){
    console.log(idNo,"skip");
    return idNo++;
}

function finishTest(){
    console.log("BC");
}