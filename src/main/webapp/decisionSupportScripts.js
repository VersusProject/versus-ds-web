var fileNum           = 0;
var adapterState      = false;
var radioButtonsState = false;
var fileList;
var adapterList = [];
var radioPlusCount    = 0;
var radioMinusCount   = 0;
var loadingState      = 0;
var adapterMimeType;
var similarFileUrls;
var dissimilarFileUrls;
var results;
var dsId = [];
var resultsState = false;
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

function uploadFile(){
	
	var data = new FormData();
	data.append("file-1",fileList[0]);
	
	$.ajax({
	    url: 'http://localhost:8080/api/v1/files/upload',
	    data: data,
	    cache: false,
	    contentType: 'multipart/form-data',
	    processData: false,
	    type: 'POST',
	    success: function(data){
	        alert(data);
	    }
	});
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
function validateSubmission(){
	
	//close any open error alerts
	$("#alertButton").click();
	
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
	
	
	//need to prep the data for submission, i.e. adapter, positively labeled files(similar Data), negatively labeled files (dissimilarData)
	var similarData    = "";
	var dissimilarData = "";
	for( var i=0; i< fileNum; i++){
		
		if($("#plusOptionsRadios"+i).attr("checked") == "checked"){
			similarData.push(fileList[i].name);
		}
		else if($("#minusOptionsRadios"+i).attr("checked") == "checked"){
			dissimilarData.push(fileList[i].name);
		}		
	}

	//upload the files to somewhere...
	//uploadImages
	//separate the uploaded files by IDs, e.g. similar and dissimilar
	
	//post the data to the server endpoint for decision support
	
	//check to see if it ever finishes
	
	//once finished display results
}
//upload Images to the versus server
function uploadImages(){
	
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
}
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


function submitDecisionSupport(){
	
	var chosenAdapter  = "edu.illinois.ncsa.versus.adapter.impl.BufferedImageAdapter";
	//similarFileUrls    = ["http://www.cs.washington.edu/research/imagedatabase/groundtruth/greenlake/Image01.jpg","http://www.cs.washington.edu/research/imagedatabase/groundtruth/greenlake/Image02.jpg"];
	//dissimilarFileUrls = ["http://www.cs.washington.edu/research/imagedatabase/groundtruth/swissmountains/Image01.jpg","http://www.cs.washington.edu/research/imagedatabase/groundtruth/swissmountains/Image03.jpg"];

	similarFileUrls    = ["http://isda.ncsa.illinois.edu/drupal/sites/default/files/pictures/picture-5.jpg","http://isda.ncsa.illinois.edu/drupal/sites/default/files/pictures/picture-18.jpg"];
	dissimilarFileUrls = ["http://isda.ncsa.illinois.edu/drupal/sites/default/files/pictures/picture-16.jpg","http://isda.ncsa.illinois.edu/drupal/sites/default/files/pictures/picture-25.jpg"];

	//post the data
	$.ajax({
		type: 'POST',
		url: 'http://localhost:8080/api/v1/decisionSupport',
		data: "adapter="+chosenAdapter+
			"&similarFiles="+similarFileUrls[0]+
			"&similarFiles="+similarFileUrls[1]+
			"&dissimilarFiles="+dissimilarFileUrls[0]+
			"&dissimilarFiles="+dissimilarFileUrls[1]		
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

function formatAndDisplayResults(j){
	
	$("#status").html(j.status);

	//if status is not running then display results
	if(j.status == "DONE"){
		$("#status").remove();
		$("#loadingBar").remove();
		
		var results = "<b>"+j.rankedResults.substring(0,j.rankedResults.indexOf("2.)")-1)+"</b><br><br>"+
			j.rankedResults.substring( j.rankedResults.indexOf("2.)"), j.rankedResults.indexOf("3.)")-1 )+"<br><br>"+
			j.rankedResults.substring( j.rankedResults.indexOf("3.)"), j.rankedResults.indexOf("4.)")-1 )+"<br><br>"+
			j.rankedResults.substring( j.rankedResults.indexOf("4.)"), j.rankedResults.length );

		$("#results").html("<br/><u>The Best Extractor / Measure Pairs are:</u> <br><br>"+results);
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
	$.getJSON('http://localhost:8080/api/v1/adapters/', function(json){
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
		adapterList[i] = {id:json[i].id,mimeTypes:json[i].supportedMimeTypes}; 
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
	if(  $("#adapterDropDown").val() == "invalid"){
		adapterState = false;
	}
	else{
		adapterState    = true;
		for( var i=0; i<adapterList.length; i++){
			if($("#adapterDropDown").val() == adapterList[i].id ){
				adapterMimeType = adapterList[i].mimeTypes;
			}
		}
		console.log(adapterMimeType);
	}
	toggleSubmitButton();
}