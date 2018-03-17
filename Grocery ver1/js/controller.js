window.addEventListener("load",bindEvents);
const url="https://raw.githubusercontent.com/Janmayjay/JSBasics/master/data2.json";
var userList; var cartItems=[];var bill=0;
function bindEvents(){
    var a=document.querySelector("#itemsDiv");
    a.style.display="none";
    var b=document.querySelector("#menuDiv");
    b.style.display="none";
    var c=document.querySelector("#cartDiv");
    c.style.display="none";
    document.querySelector("#login").addEventListener("click",userLogin);
    document.querySelector("#vegetables").addEventListener("click",showItems);
    document.querySelector("#fruits").addEventListener("click",showItems);
    document.querySelector("#fastFood").addEventListener("click",showItems);
    document.querySelector("#back").addEventListener("click",showMenu);
    document.querySelector("#cart").addEventListener("click",showCart);
    document.querySelector("#backCart").addEventListener("click",showItems);
    if(localStorage){
        if(localStorage.items){
            //console.log(localStorage);
        }
        else{
            fetch(url).then(data => data.json().then(dt => {
                var json=JSON.stringify(dt);
                localStorage.items=json;
                
            }).catch(err=>console.log(err)).catch(err1=>console.log(err1)))
        }
    }

}
function userLogin(){
    var usernameEntered=document.querySelector("#userName").value;
    var passwordEntered=document.querySelector("#password").value;
    var temp=JSON.parse(localStorage.items);
                // console.log(temp.users[0].username,temp.users[0].password);
                userList=temp.users;
                //console.log(userList);
    //console.log("bc  "+usernameEntered+passwordEntered,userList.length);


    // var loginCheck=userList.filter(traverse => {
    //     for(let i=0;i<userList.length;i++)
    //     traverse[i].username==usernameEntered;
        


    //     // if(traverse.username==usernameEntered && traverse.password==passwordEntered)
    //     // return true;
    // });
    // console.log(loginCheck);
    var loginCheck=0;
    for(let i=0;i<userList.length;i++)
        {if(userList[i].username==usernameEntered && userList[i].password==passwordEntered)
            loginCheck++;
        }
    if(loginCheck==1){
    var a=document.querySelector("#loginDiv");
    a.style.display="none";
    //console.log("Login Successful...")
    showMenu();}
    else{
        //console.log("Error..",loginCheck);
    }

}
function showMenu(){
    var a=document.querySelector("#itemsDiv");
    a.style.display="none";
    var b=document.querySelector("#menuDiv");
    b.style.display="block";
    // var c=document.querySelector("#cartDiv");
    // c.style.display="none";
}
var idButton;

function showItems(){
    if(this.id!="backCart")
    if(this.id)
    idButton=this.id;
    var tbody=document.querySelector("#showItemTable");
    tbody.innerHTML="";
    var a=document.querySelector("#itemsDiv");
    a.style.display="block";
    var b=document.querySelector("#menuDiv");
    b.style.display="none";
    var c=document.querySelector("#cartDiv");
    c.style.display="none";
    var displayItems=JSON.parse(localStorage.items);
    //console.log(displayItems,idButton);
    var displayListOfItems=displayItems[idButton];
    //console.log(displayListOfItems,idButton);
    
    for(let i=0;i<displayListOfItems.length;i++){
        var tr=tbody.insertRow();
        tr.insertCell(0).innerText=displayListOfItems[i].itemId;
        tr.insertCell(1).innerText=displayListOfItems[i].itemName;
        tr.insertCell(2).innerText=displayListOfItems[i].itemPrice;
        tr.insertCell(3).innerHTML="<img src='"+displayListOfItems[i].itemPic+"' height='70px' width='70px'>";
        tr.insertCell(4).innerText=displayListOfItems[i].quantity;
        tr.insertCell(5).innerText=displayListOfItems[i].discount;
        var cartButton=document.createElement("input");
        cartButton.type="button";
        cartButton.value="Add To Cart";
        cartButton.setAttribute("cartId",displayListOfItems[i].itemId);
        cartButton.setAttribute("cartParent",idButton);
        //console.log(idButton);
        cartButton.onclick=addToCart;
        cartButton.id=idButton;
        tr.insertCell(6).appendChild(cartButton);
        //innerHTML="<button onclick='addToCart(jay)' >Add to Cart</button>";
    }
    

}
function addToCart(){
    var idCart=parseInt(this.getAttribute("cartId"));
    var idButton=this.getAttribute("cartParent");
    //console.log(idCart,idButton);
    var tempe=JSON.parse(localStorage.items);
    //console.log(tempe[idButton],idCart);
    for(var i=0;i<tempe[idButton].length;i++){
        //console.log(tempe[idButton]);
        if(tempe[idButton][i].itemId===idCart){
            //console.log(tempe,idButton,tempe[idButton][i]);
            tempe[idButton][i].quantity--;
            var netPrice=(tempe[idButton][i].itemPrice*(1-(tempe[idButton][i].discount/100)));
            cartItems.push({"itemId":tempe[idButton][i].itemId,"itemName":tempe[idButton][i].itemName,"itemPrice":tempe[idButton][i].itemPrice,"itemPic":tempe[idButton][i].itemPic,"discount":tempe[idButton][i].discount,"netPrice":netPrice});
            bill=bill+netPrice;
            //console.log(cartItems);
            //console.log(localStorage);
            localStorage.clear();
            //console.log(localStorage,tempe);
            var json=JSON.stringify(tempe);
            //console.log(json);
            localStorage.items=json;
            //console.log(localStorage);
            showItems();
        }
    }
    //console.log(tempe[idButton]);

    // var currentRow=this.parentNode.parentNode;
    // console.log(currentRow);
}
// function goBack(){
//     var a=document.querySelector("#itemsDiv");
//     a.style.display="none";
//     var b=document.querySelector("#menuDiv");
//     b.style.display="block";
// }

function showCart(){
    var a=document.querySelector("#itemsDiv");
    a.style.display="none";
    var c=document.querySelector("#cartDiv");
    c.style.display="block";
    var tbody=document.querySelector("#cartBody");
    tbody.innerHTML="";
    for(let i=0;i<cartItems.length;i++){
        var tr=tbody.insertRow();
        tr.insertCell(0).innerText=cartItems[i].itemId;
        tr.insertCell(1).innerText=cartItems[i].itemName;
        tr.insertCell(2).innerText=cartItems[i].itemPrice;
        tr.insertCell(3).innerHTML="<img src='"+cartItems[i].itemPic+"' height='70px' width='70px'>";
        tr.insertCell(4).innerText=cartItems[i].discount;
        tr.insertCell(5).innerText=cartItems[i].netPrice;
        document.querySelector("#bill").innerText=bill;
    }
}