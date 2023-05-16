const express = require("express");
const fs=require("fs");
const port = 3000;
const app=express();

function toHTMLTable(json){
    let data=JSON.parse(json);

    let tableHTML="<table>";
    for(let i in data){
        tableHTML+=`<tr><td>${i}</td><td>${data[i]}</td></tr>`;
    }
    tableHTML+="</table>";

    return tableHTML;
}

app.get("/", function(req, res){
    fs.readFile("./index.html", "utf-8", function(err, html){
        if(err){
           console.log(err);
           res.send(String(err));
        }
        else{
            console.log("Loadint data from index.html");
            res.send(html);
        }
    });
});

app.get("/getData", function(req, res){
    fs.readFile("./data.json","utf-8",function(err, jsonData){
        if(err){
            console.log(err);
            res.send(String(err));
        }
        else{
            console.log("Loadint data from data.json");
            res.send(toHTMLTable(jsonData));
        }
    });
});

app.listen(port, function(){
    console.log("RUNNING AT PORT : "+port);
});