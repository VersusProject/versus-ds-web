var fileNum           = 0;
var adapterState      = false;
var radioButtonsState = false;
var fileList;
var adapterList;
var radioPlusCount    = 0;
var radioMinusCount   = 0;
var loadingState      = 0;
var adapterMimeType;
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
//set the global var adapterList: {'id':'adaptId', 'name':'name', 'mimeTypes':['application/xml', 'text/html']}
function getAdapters() {
	adapterList = [
	               {'id':'RGB', 'name':'RGB Adapter', 'mimeTypes':['image/gif', 'image/jpg','image/jpeg','image/png']},
	               {'id':'Audio', 'name':'Audio Adapter', 'mimeTypes':['audio/mpeg', 'audio/mp4']},
	               {'id':'Video', 'name':'Video Adapter', 'mimeTypes':['video/mpeg', 'video/quicktime']}
	];
}
//set the adapter options, pulled from the versus server
$(document).ready(function setAvailableAdapters(){
	getAdapters();//global car adapterList is now set
	var availableAdapters = "";
	for(var i=0; i<adapterList.length; i++){
		availableAdapters = availableAdapters+'<option value="'+adapterList[i].id+'">'+adapterList[i].name+'</option>';
	}
	$("#adapterDropDown").html('<option value="invalid">--Adapter--</option>'+availableAdapters);
});


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