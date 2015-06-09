var jsonObj = require("./Source/source.json");
var express = require("express");
var js2xmlparser = require("js2xmlparser");
var fs = require('fs');

var app = express();
var obj = jsonObj.student;

app.get('/',function(req,res){
	//Store array data in file
	var data = "Id	|	First Name	|	Last Name	|	Score\n";
	for(var stud in obj) {
		data  = data + obj[stud].id + "	|	" + obj[stud].fName + "		|	" + obj[stud].lName + "			|	" + obj[stud].score + "\n";
	}
	writeToFile("./Source/destination.txt", data);
	
	//Sort JSON by field
	obj.sort(sort_by('fName', false, function(a){return a.toUpperCase()}));

	//Store sorted data in file
	var sortedData = "Id	|	First Name	|	Last Name	|	Score\n";
	for(var stud in obj) {
		sortedData  = sortedData + obj[stud].id + "	|	" + obj[stud].fName + "		|	" + obj[stud].lName + "			|	" + obj[stud].score + "\n";
	}
	writeToFile("./Source/sortedDataDestination.txt", sortedData);
	
	//Generate XML from JSON and store it in file
	var xmlData = js2xmlparser("Students", jsonObj);
	writeToFile("./Source/XMLDataDestination.xml", xmlData);
	
	res.end("Write Complete !!!");
});

//File write method
function writeToFile(fileName, data) {
	fs.writeFile(fileName, data, function(err) {
		if(err) throw err;
		console.log("[INFO] File write complete.");
	});
}

//Sort array by any columnName, sortOrder, dataType(for int pass 'parseInt', for float pass 'parseFloat')
var sort_by = function(field, reverse, primer){

   var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field]};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 
}

//Start server on 3000 port
app.listen(3000,function(){
    console.log("[INFO] Server started on port 3000");
});