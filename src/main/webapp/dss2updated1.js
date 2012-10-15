var fileNum           = 0;
var dfileNum =0;
var TfileNum=0;
var adapterState      = false;
var extractorState    =false;
var measureState= false;
var radioButtonsState = false;
var fileList;
var dfileList;
var adapterList = [];
var extractorList=[];
var measureList=[];
var radioPlusCount    = 0;
var radioMinusCount   = 0;
var loadingState      = 0;
var adapterMimeType;
var extractorSupportedFeature;
var measureSupportedFeatureType;
var similarFileUrls;
var dissimilarFileUrls;
var results;
var dsId = [];
var resultsState = false;
var fileUploaded=new Array(); 
var fileUploaded1=new Array();
var outputfile=[];
var xMap=new Array();
var x1Map=new Array();
var adapterselected;
var extractorselected;
var measureselected;
//var fd=new FormData();
var chosenAdapter  = "edu.illinois.ncsa.versus.adapter.impl.BufferedImageAdapter";
//fd.append("adapter",chosenAdapter);
var data="adapter="+chosenAdapter;
var data1="";
//change plus radio button icon
function displayPlus(clickedID){ 
	var radioNumber = clickedID.substr(clickedID.lastIndexOf("s")+1,clickedID.length-1);	
	$("#"+clickedID).next().attr("class","icon-plus-sign");
	$("#minusOptionsRadios"+radioNumber).next().attr("class","icon-minus"); 
}
//change minus radio button icon
function displayMinus(clickedID){ 
	var radioNumber = clickedID.substr(clickedID.lastIndexOf("s")+1,clickedID.length-1);
	$("#plusOptionsRadios"+radioNumber).next().attr("class","icon-plus");
	$("#"+clickedID).next().attr("class","icon-minus-sign");
}
//toggle button for submission based upon adapter state and radio buttons's state
function toggleSubmitButton(){ 
	if( adapterState && radioButtonsState ){
		$("#submitButton").attr("class","btn btn-primary");
	}
	else{
		$("#submitButton").attr("class","btn btn-primary disabled");
	}
}



//check all radio buttons, if there is at least one set of (+/-) unchecked, then radioButtonState is false
function checkRadioButtons(){
	
	if(fileNum > 0 ){
		for( var i=0; i<fileNum; i++){
			if( !(($("#plusOptionsRadios"+i).attr("checked") == "checked") || ($("#minusOptionsRadios"+i).attr("checked") == "checked") )){
				radioButtonsState = false;
				return;
			}
		}
		radioButtonsState = true;
	}
}
//wrapper function for the radio plus button onclick
function plusButtonClick(clickedID){
	displayPlus(clickedID);
	checkRadioButtons();
	toggleSubmitButton();
}
//wrapper function for the radio minus button onclick
function minusButtonClick(clickedID){
	displayMinus(clickedID);
	checkRadioButtons();
	toggleSubmitButton();
}
//check everything before submission
//function validateSubmission(){
	
	//close any open error alerts
/*	$("#alertButton").click();
	
	//check if there are some files to submit
	if( fileNum < 4){
		$("#params").append('<div id="errorAlert" class="alert alert-block alert-error fade in">'+
			'<button id="alertButton" type="button" class="close" data-dismiss="alert" onclick="">&times;</button>'+
			'<h3 class="alert-heading">Submission Error!</h3>'+
			'<p>Please choose at least 4 files.</p>'+
			'</div>'
		);
		//hideSubmitButton();
		return;
	}
	//check if all the radio buttons are checked
	checkRadioButtons();
	if( !radioButtonsState ){
		$("#params").append('<div id="errorAlert" class="alert alert-block alert-error fade in">'+
				'<button id="alertButton" type="button" class="close" data-dismiss="alert" onclick="">&times;</button>'+
				'<h3 class="alert-heading">Submission Error!</h3>'+
				'<p>Please label all of your files.</p>'+
				'</div>'
			);
		//hideSubmitButton();
		return;
	}
	checkNumLabels();
	if( (radioPlusCount < 2) || (radioMinusCount < 2) ){
		$("#params").append('<div id="errorAlert" class="alert alert-block alert-error fade in">'+
				'<button id="alertButton" type="button" class="close" data-dismiss="alert" onclick="">&times;</button>'+
				'<h3 class="alert-heading">Submission Error!</h3>'+
				'<p>Make sure both the positive and negative labels have at least 2 files labeled.</p>'+
				'</div>'
			);
		//hideSubmitButton();
		return;
	}
	if( !validateAdapter() ){
		$("#params").append('<div id="errorAlert" class="alert alert-block alert-error fade in">'+
				'<button id="alertButton" type="button" class="close" data-dismiss="alert" onclick="">&times;</button>'+
				'<h3 class="alert-heading">Submission Error!</h3>'+
				'<p>The chosen files are not compatible with the specified adapter.</p>'+
				'</div>'
			);
		//hideSubmitButton();
		return;
	}
	//Now we can submit!!!
	$("#submitButton").attr("class","btn btn-primary disabled");
	$("#submitButton").html("loading...");
	*/
	
	//need to prep the data for submission, i.e. adapter, positively labeled files(similar Data), negatively labeled files (dissimilarData)
	/*var similarData    = "";
	var dissimilarData = "";
	
	for( var i=0; i< fileNum; i++){
		
		if($("#plusOptionsRadios"+i).attr("checked") == "checked"){
			similarData.push(fileList[i].name);
			fd.append("&similarFiles",fileList[i]);
		
		}
		else if($("#minusOptionsRadios"+i).attr("checked") == "checked"){
			dissimilarData.push(fileList[i].name);
			fd.append("&dissimilarFiles",fileList[i]);
		}		
	}
*/
	//upload the files to somewhere...
	//uploadImages
	//separate the uploaded files by IDs, e.g. similar and dissimilar
	
	//post the data to the server endpoint for decision support
	
	//check to see if it ever finishes
	
	//once finished display results
//}
//upload Images to the versus server
/*function uploadImages(){
	
	var data = new FormData();
	for( var i=0; i<fileNum; i++){
		data.append(fileList[i].name, fileList[i]);
	}
	$.ajax({
	    url: 'http://localhost:8182/versus/api/files/upload',
	    data: data,
	    cache: false,
	    contentType: false,
	    processData: false,
	    type: 'POST'
	});
}*/
//hide the submit button
function hideSubmitButton(){
	$("#submitButton").attr("class","btn btn-primary disabled hidden");
}
//show the submit button
function showSubmitButton(){
	$("#submitButton").attr("class","btn btn-primary disabled");
	toggleSubmitButton();
}
//count how many files are labeled positive and negative
function checkNumLabels(){
	
	for( var i=0; i<fileNum; i++){
		if( $("#plusOptionsRadios"+i).attr("checked") == "checked" ){
			radioPlusCount = radioPlusCount + 1;
		}
		else if( $("#minusOptionsRadios"+i).attr("checked") == "checked" ){
			radioMinusCount = radioMinusCount + 1;
		}
	}
}

function listFiles(){
	console.log("I am inside listFiles");
	outputfile.push('<table id="inputTable" class="table table-bordered table-striped" style="display:inline;"><th>Positive Label</th><th>Negative Label</th><th>File</th><th>Type</th>');
	console.log(fileUploaded.length);	
	for(var i=0;i<fileUploaded.length;i++){
			console.log("inside listFiles fileUploadedlist", fileUploaded[i]);
	outputfile.push('<tr id=i >',
  	'<td><input type="radio" name="rowOptionsRadio'+i+'" id="plusOptionsRadios'+i+'" onclick="plusButtonClick(this.id)" value="+" /><i class="icon-plus"></i></td>',
  	'<td><input type="radio" name="rowOptionsRadio'+i+'" id="minusOptionsRadios'+i+'" onclick="minusButtonClick(this.id);checkRadioButtons()" value="-"/><i class="icon-minus"></i></td>',
  	'<td id="r"+i+"c3">', fileUploaded[i], '</td></tr>');
	}
	document.getElementById('list1').innerHTML = outputfile.join('');
}

function submitDecisionSupport(){
	 //similarFileUrls    = ["http://isda.ncsa.illinois.edu/drupal/sites/default/files/pictures/picture-5.jpg","http://isda.ncsa.illinois.edu/drupal/sites/default/files/pictures/picture-18.jpg"];
	// dissimilarFileUrls = ["http://isda.ncsa.illinois.edu/drupal/sites/default/files/pictures/picture-16.jpg","http://isda.ncsa.illinois.edu/drupal/sites/default/files/pictures/picture-25.jpg"];
	//similarFileUrls=["http://localhost:8080/api/v1/files/Chrysanthemum5435813700382073190.jpg","http://localhost:8080/api/v1/files/Hydrangeas7970071764913148591.jpg"];
	//dissimilarFileUrls=["http://localhost:8080/api/v1/files/Jellyfish1039421237755707838.jpg","http://localhost:8080/api/v1/files/Koala168478884812044634.jpg"];
	//enc=.param({'similarFiles':fileList[i]});
	console.log("Inside submitDecisionSupport",fileUploaded.length);
	similarFileUrls=["http://localhost:8080/api/v1/files/"+fileUploaded[0],"http://localhost:8080/api/v1/files/"+fileUploaded[1]];
	dissimilarFileUrls=["http://localhost:8080/api/v1/files/"+fileUploaded[2],"http://localhost:8080/api/v1/files/"+fileUploaded[3]];
	function printObject(o) {
		  var out = '';
		  for (var p in o) {
		    out += p + ': ' + o[p] + " ";
		  }
		  alert(out);
		}
	
	/*var xhr = new XMLHttpRequest();
	if (xhr.upload) {
		// start upload
		//fd.append(file.name,file);
		xhr.open("POST", "http://localhost:8080/api/v1/decisionSupport", true);
		xhr.send(data);
	}
	else{
		console.log("xhr upload failed");
			
	}
	xhr.onreadystatechange=function(id){
		if (this.readyState==4){
			if(this.status==200){
				$("#results").html('<br> <br> <br> <br> <br> <br> <div id="loadingBar" class="progress progress-striped active"><div class="bar"style="width: 100%;"></div></div><br> <br> <br> <br> <br>');
				getDecisionSupport(id);
			}*/
	/*var data="adapter="+chosenAdapter+
	"&similarFiles="+similarFileUrls[0]+
	"&similarFiles="+similarFileUrls[1]+
	"&dissimilarFiles="+dissimilarFileUrls[0]+
	"&dissimilarFiles="+dissimilarFileUrls[1];*/
	$.ajax({
	type: 'POST',
	url: 'http://localhost:8080/api/v1/decisionSupport',
	data:data
    }).done( function( id ) {
	$("#results").html('<br> <br> <br> <br> <br> <br> <div id="loadingBar" class="progress progress-striped active"><div class="bar"style="width: 100%;"></div></div><br> <br> <br> <br> <br>');
	getDecisionSupport(id);
});
		}
function getDecisionSupport(id){
	$.getJSON('http://localhost:8080/api/v1/decisionSupport/'+id, function(json) {
		formatAndDisplayResults(json);
	});
}


function submitComparison(){
	//var adapter="edu.illinois.ncsa.versus.adapter.impl.BufferedImageAdapter";
	var adapter=adapterselected[1];
	var extractor=extractorselected[1];
	var measure=measureselected[1];
	//var extractor="edu.illinois.ncsa.versus.extract.impl.RGBHistogramExtractor";
	//var measure="edu.illinois.ncsa.versus.measure.impl.TanimotoDistanceMeasure";
	data1=data1+"&adapter="+adapter+"&extractor="+extractor+"&measure="+measure;
	//console.log("data1",data1);
	$.ajax({
		type: 'POST',
		url: 'http://localhost:8080/api/v1/comparisons',
		data:data1
	    }).done( function( id ) {
		//$("#results").html('<br> <br> <br> <br> <br> <br> <div id="loadingBar" class="progress progress-striped active"><div class="bar"style="width: 100%;"></div></div><br> <br> <br> <br> <br>');
		getComparison(id);
	});
}

function getComparison(id){
	$.getJSON('http://localhost:8080/api/v1/comparisons/'+id+'/value', function(json) {
		formatAndDisplayComparisonResults(json);
		
		/*console.log("I am inside getJSON");
		//if(json.status=="DONE"){
			$("#status").remove();
			//$("#loadingBar").remove();
			Output(json.value,"results");
		//}*/
	});
}
function formatAndDisplayComparisonResults(j){
	
	$("#status").html(j.status);

	//if status is not running then display results
	if(j.status == "DONE"){
		$("#status").remove();
		//$("#loadingBar").remove();
		console.log("I am inside format and Display");
		var output=[];
		output.push(j.value);
		document.getElementById('results').innerHTML=output.join('');
	}
}

function formatAndDisplayResults(j){
	
	$("#status").html(j.status);

	//if status is not running then display results
	if(j.status == "DONE"){
		$("#status").remove();
		$("#loadingBar").remove();
		console.log("I am inside format and Display");
		var output=[];
		/*output.push('<table class="table table-bordered table-striped" style="display:inline;"><th>Rank</th><th>Extractor</th><th>Measure</th><th>PEvalue</th>');
		//var results="<table class='table table-bordered table-striped' style='display:inline;'><th>Rank</th><th>Extractor</th><th>Measure/th><th>PEvalue</th>";
		//results=;
		
		output.push('<tr>','<td>',1,'</td>','<td>',j.rankedResults.substring(4,j.rankedResults.indexOf("1-")),'</td>','<td>',j.rankedResults.substring(j.rankedResults.indexOf("1-")+2,j.rankedResults.indexOf("1:")),'</td>','<td>',j.rankedResults.substring(j.rankedResults.indexOf("1:")+2,j.rankedResults.indexOf("2.)")-1),'</td>','</tr>',
				'<tr>','<td>',2,'</td>','<td>',j.rankedResults.substring(j.rankedResults.indexOf("2.)")+3,j.rankedResults.indexOf("2-")),'</td>','<td>',j.rankedResults.substring(j.rankedResults.indexOf("2-")+2, j.rankedResults.indexOf("2:")),'</td>','<td>',j.rankedResults.substring( j.rankedResults.indexOf("2:")+2, j.rankedResults.indexOf("3.)")-1 ),'</td>','</tr>',
				'<tr>','<td>',3,'</td>','<td>',j.rankedResults.substring(j.rankedResults.indexOf("3.)")+3,j.rankedResults.indexOf("3-")),'</td>','<td>',j.rankedResults.substring(j.rankedResults.indexOf("3-")+2, j.rankedResults.indexOf("3:")),'</td>','<td>',j.rankedResults.substring( j.rankedResults.indexOf("3:")+2, j.rankedResults.indexOf("4.)")-1 ),'</td>','</tr>',
				'<tr>','<td>',4,'</td>','<td>',j.rankedResults.substring(j.rankedResults.indexOf("4.)")+3,j.rankedResults.indexOf("4-")),'</td>','<td>',j.rankedResults.substring(j.rankedResults.indexOf("4-")+2, j.rankedResults.indexOf("4:")),'</td>','<td>',j.rankedResults.substring( j.rankedResults.indexOf("4:")+2, j.rankedResults.length),'</td>','</tr>');

				output.push('</table>');
		
		/* output.push("<b>"+j.rankedResults.substring(0,j.rankedResults.indexOf("2.)")-1)+"</b><br><br>"+
			j.rankedResults.substring( j.rankedResults.indexOf("2.)"), j.rankedResults.indexOf("3.)")-1 )+"<br><br>"+
			j.rankedResults.substring( j.rankedResults.indexOf("3.)"), j.rankedResults.indexOf("4.)")-1 )+"<br><br>"+
			j.rankedResults.substring( j.rankedResults.indexOf("4.)"), j.rankedResults.length )+"<\table>");*/

		//$("#results").html("<br/><u>The Best Extractor / Measure Pairs are:</u> <br><br>"+results);
				
		// document.getElementById('results').innerHTML=output.join('');*/
		// $("#results").html("<br/><u>The Best Extractor / Measure Pairs are:</u> <br><br>"+output.join(''));
		 
		 
		
		
		   /* var s1=j.distanceValues.substring(0,j.distanceValues.indexOf("(1)")).split(",");
              console.log("distancevalues s1:",s1);
              var sp1=[];
              
                          
              for(var i=1;i<s1.length;i++)
            	{
            	  
            	  	  sp1.push([i,Number(s1[i])]);
            	}  
             
             var d1=j.distanceValues.substring(j.distanceValues.indexOf("(1)")+3,j.distanceValues.indexOf("{1}")).split(",");
              console.log("distancevalues d1:",d1);
              var dp1=[];
             
                           
              for(var i=1;i<d1.length;i++){
            	 // dnumber[i]=Number(d1[i]);
            	  dp1.push([i,Number(d1[i])]);
            	  }
              
              
              
		     $.plot($("#graph1"), [sp1,dp1]);
		
		      var s2=j.distanceValues.substring(j.distanceValues.indexOf("{1}")+3,j.distanceValues.indexOf("(2)")).split(",");
		      console.log("distancevalues s2:",s2);
	             var sp2=[];
	            
	             
	             for(var i=1;i<s2.length;i++){
	            	  sp2.push([i,Number(s2[i])]);
	           	  }
	             
	             var d2=j.distanceValues.substring(j.distanceValues.indexOf("(2)")+3,j.distanceValues.indexOf("{2}")).split(",");
	             console.log("distancevalues d2:",d2);
	             var dp2=[];
	          	              
	             for(var i=1;i<d2.length;i++){
	            	 dp2.push([i,Number(d2[i])]);
	           	  }
	             
	             
	             
			     $.plot($("#graph2"), [sp2,dp2]);
		      
		      
			     var s3=j.distanceValues.substring(j.distanceValues.indexOf("{2}")+3,j.distanceValues.indexOf("(3)")).split(",");
			      console.log("distancevalues s3:",s3);
		             var sp3=[];
		           
		             
		             for(var i=1;i<s3.length;i++){
		            	 sp3.push([i,Number(s3[i])]);
		           	  }
		             
		             var d3=j.distanceValues.substring(j.distanceValues.indexOf("(3)")+3,j.distanceValues.indexOf("{3}")).split(",");
		             console.log("distancevalues d3:",d3);
		             var dp3=[];
		           		              
		             for(var i=1;i<d3.length;i++){
		                  	  dp3.push([i,Number(d3[i])]);
		           	  }
		             
		             
		             
				     $.plot($("#graph3"), [sp3,dp3]);
		      
		      
		 
		      var s4=j.distanceValues.substring(j.distanceValues.indexOf("{3}")+3,j.distanceValues.indexOf("(4)")).split(",");
		     		     
             console.log("distancevalues s4:",s4);
             var sp4=[];
                         
             for(var i=1;i<s4.length;i++){
            	  	      sp4.push([i,Number(s4[i])]);
           	  }
             
            var d4=j.distanceValues.substring(j.distanceValues.indexOf("(4)")+3,j.distanceValues.indexOf("{4}")).split(",");
             console.log("distancevalues d4:",d4);
             var dp4=[];
                        
             for(var i=1;i<d4.length;i++){
            	 
           	  dp4.push([i,Number(d4[i])]);
           	  }
             
             
             
		     $.plot($("#graph4"), [sp4,dp4]);*/
		     
		     var mid=[];
		    var dml=new Array(10);
		     //var dml=[];
		     var ml=[];
		     var ind="";
		     var ind1="";
		     var output1=[];
			output1.push('<table id="table2" class="table table-bordered table-striped" style="display:inline;"><th>Rank</th><th>Measure</th><th>Mean</th><th>Standard Deviation</th>');
		    for(var k=0;k<10;k++){
		    	ind="("+k+")";
		    	console.log("ind:",ind);
		    	console.log("index of measureSpread ind",j.MeasureSpread.indexOf(ind));
		    	if(k==0)
		    	  mid[0]=j.MeasureSpread.substring(0,j.MeasureSpread.indexOf(ind));
		    	else 
		    		mid[k]=j.MeasureSpread.substring(j.MeasureSpread.indexOf("{"+(k-1)+"}")+3,j.MeasureSpread.indexOf("("+k+")"));
		    	 console.log(mid[k]);
		    	 //ml=j.measureSpread.substring(j.measureSpread.indexOf("(1)"+3),j.measureSpread.indexOf("{1}")).split(",");
		    	 //ind="(",k,")";
		    	 ml=j.MeasureSpread.substring(j.MeasureSpread.indexOf("("+k+")")+3,j.MeasureSpread.indexOf("{"+k+"}")).split(",");
		    	 console.log(ml);
		    	 output1.push('<tr>','<td>',k+1,'</td>','<td>',mid[k],'</td>','<td>',ml[0],'</td>','<td>',ml[1],'</td>','</tr>');
                            
		    }
		    output1.push('</table>');
		    document.getElementById('statistics').innerHTML=output1.join('');
			
					                     
		 
		resultsState = true;
	}
	//if status has error then display error
	else if(j.status == "FAILED"){
		$("#status").remove();

		$("#loadingBar").remove();
		$("#results").append("Failed!");
		resultsState = true;
	}
}

function getAdapters() {
	$.getJSON('api/v1/adapters/', function(json){
		setAdapterList(json);
	});
}
//set the adapter options, pulled from the versus server
$(document).ready(function setAvailableAdapters(){
	getAdapters();//global car adapterList is now set
});

function setAdapterList(json){
	var availableAdapters = "";
	for(var i=0; i<json.length; i++){
		availableAdapters  = availableAdapters+'<option value="'+json[i].id+'" >'+json[i].name+'</option>';
		//adapterList[i] = {id:json[i].id,mimeTypes:json[i].supportedMimeTypes};
		adapterList[i] = {name:json[i].name,id:json[i].id,mimeTypes:json[i].supportedMimeTypes};
	}
	$("#adapterDropDown").html('<option value="invalid">--Adapter--</option>'+availableAdapters);
}

function validateAdapter(){
	//get the current setting of the adapter selector
	var adapterVal = $("#adapterDropDown").val();
	if( adapterVal == "invalid"){
		return false;
	}
	var fileTypeMatch = 0;
	//cycle through the mimetypes
	for( var i=0; i< adapterMimeType.length; i++){
		for( var j=0; j< fileList.length; j++){
			if( adapterMimeType[i] == fileList[j].type){
				fileTypeMatch++;
			}
		}
	}
	if( fileTypeMatch == fileNum ){
		return true;
	}
	else{
		return false;
	}
}

//check to see if the adapter has been set to a valid choice (onclick function)
function setAdapterState(){
	if($("#adapterDropDown").val() == "invalid"){
		adapterState = false;
	}
	else{
		adapterState    = true;
		for( var i=0; i<adapterList.length; i++){
			if($("#adapterDropDown").val() == adapterList[i].id ){
				console.log("AdapterDropdown",$("#adapterDropDown").val());
				console.log("Adapter name selected",adapterList[i].name,"adapterList[i].id=",adapterList[i].id);
				adapterMimeType = adapterList[i].mimeTypes;
				adapterselected=adapterList[i].id.split(" ");
			}
		}
		console.log("adapterMimeType",adapterMimeType);
		console.log(adapterselected[1]);
	}
	//toggleSubmitButton();
}

function getExtractors() {
	$.getJSON('api/v1/extractors/', function(json){
		setExtractorList(json);
	});
}
//set the adapter options, pulled from the versus server
$(document).ready(function setAvailableExtractors(){
	getExtractors();//global car extractorList is now set
});

function setExtractorList(json){
	var availableExtractors = "";
	for(var i=0; i<json.length; i++){
		availableExtractors  = availableExtractors+'<option value="'+json[i].id+'" >'+json[i].name+'</option>';
		//adapterList[i] = {id:json[i].id,mimeTypes:json[i].supportedMimeTypes};
		extractorList[i] = {name:json[i].name,id:json[i].id,supportedFeature:json[i].supportedFeature};
	}
	$("#extractor").html('<option value="invalid">--Extractor--</option>'+availableExtractors);
}


function setExtractorState(){
	if($("#extractor").val() == "invalid"){
		extractorState = false;
	}
	else{
		extractorState    = true;
		for( var i=0; i<extractorList.length; i++){
			if($("#extractor").val() == extractorList[i].id ){
				console.log("extractorList",$("#extractor").val());
				console.log("Extractor name selected",extractorList[i].name,"extractorList[i].id=",extractorList[i].id);
				extractorSupportedFeature = extractorList[i].supportedFeature;
				extractorselected=extractorList[i].id.split(" ");
			}
		}
		console.log("extractorSupportedFeatures:",extractorSupportedFeature);
		console.log(extractorselected[1]);
	}
	//toggleSubmitButton();
}

function getMeasures() {
	$.getJSON('api/v1/measures/', function(json){
		setMeasureList(json);
	});
}
//set the adapter options, pulled from the versus server
$(document).ready(function setAvailableMeasures(){
	getMeasures();//global  measureList is now set
});

function setMeasureList(json){
	var availableMeasures = "";
	for(var i=0; i<json.length; i++){
		availableMeasures  = availableMeasures+'<option value="'+json[i].id+'" >'+json[i].name+'</option>';
		//adapterList[i] = {id:json[i].id,mimeTypes:json[i].supportedMimeTypes};
		measureList[i] = {name:json[i].name,id:json[i].id,supportedFeatureType:json[i].supportedFeatureType};
	}
	$("#measure").html('<option value="invalid">--Measure--</option>'+availableMeasures);
}


function setMeasureState(){
	if($("#measure").val() == "invalid"){
		measureState = false;
	}
	else{
		measureState    = true;
		for( var i=0; i<measureList.length; i++){
			if($("#measure").val() == measureList[i].id ){
				console.log("measureList",$("#measure").val());
				console.log("Measure name selected: ",measureList[i].name," measureList[i].id=",measureList[i].id);
				measureSupportedFeatureType = measureList[i].supportedFeatureType;
				measureselected=measureList[i].id.split(" ");
			}
		}
		console.log("MeasureSupportedFeatureType:",measureSupportedFeatureType);
		console.log(measureselected[1]);
	}
	//toggleSubmitButton();
}
