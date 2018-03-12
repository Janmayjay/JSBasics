var basicSalary=0;

function sal(){
basicSalary=document.querySelector("#tf1").value;
document.querySelector("#s1").innerText=basicSalary;
}

var object={};

function print(){
        object={"hra":hra,
            "da":da,
            "ta":ta,
            "pf":pf,
            "ma":ma,
            "gross":gross,
            "tax":tax,
            "net":net
};
    for(let x in object){
        document.querySelector("#"+x).innerText=object[x]();
    }
}

function clear(){
    object={"hra":hra,
            "da":da,
            "ta":ta,
            "pf":pf,
            "ma":ma,
            "gross":gross,
            "tax":tax,
            "net":net
};
    for(let x in object){
        document.querySelector("#"+x).innerText="bc";
    }
}

const hra = ()=> basicSalary * 0.3;
const da = ()=> basicSalary * 0.1;
const ta = ()=> basicSalary * 0.1;
const ma = ()=> basicSalary * 0.15;
const pf = ()=> basicSalary * 0.05;
const gross = ()=> basicSalary + hra() + da() + ta() + ma() - pf();
const tax = ()=> basicSalary*0.1;
const net = ()=> gross() - tax();