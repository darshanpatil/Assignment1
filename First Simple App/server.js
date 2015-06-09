var jsonObj = require("./Source/source.json");
var express = require("express");
var fs = require('fs');

var app = express();
var obj = jsonObj.students;

app.get('/',function(req,res){
	//Store array data in file
	var data = "Id	|	First Name	|	Last Name	|	Score\n";
	for(var stud in obj) {
		data  = data + obj[stud].id + "	|	" + obj[stud].fName + "		|	" + obj[stud].lName + "			|	" + obj[stud].score + "\n";
	}
	fs.writeFile("./Source/destination.txt", data, function(err) {
		if(err) throw err;
		console.log("[INFO] Simple file write complete.");
	});
	
	//console.log(obj);
	//Sort JSON by field
	obj.sort(sort_by('fName', false, function(a){return a.toUpperCase()}));

	//Store sorted data in file
	var sortedData = "Id	|	First Name	|	Last Name	|	Score\n";
	for(var stud in obj) {
		sortedData  = sortedData + obj[stud].id + "	|	" + obj[stud].fName + "		|	" + obj[stud].lName + "			|	" + obj[stud].score + "\n";
	}
	fs.writeFile("./Source/sortedDataDestination.txt", sortedData, function(err) {
		if(err) throw err;
		console.log("[INFO] Sorted data file write complete.");
	});
	
	//console.log(obj);
	res.end("Write Complete !!!");
});

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