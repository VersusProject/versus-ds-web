var adapterState   = false;
var extractorState = false;
var measureState   = false;
var fileNum        = 0;

$(document).ready(function setAvailableAdapters(){
	getAdapters();
	getExtractors();
	getMeasures();
});


//check to see if the adapter has been set to a valid choice (onclick function)
function setAdapterState(){
	if(  $("#adapter").val() == "invalid"){
		adapterState = false;
	}
	else{
		adapterState = true;
	}
	toggleSubmitButton();
}
//check to see if the adapter has been set to a valid choice (onclick function)
function setExtractorState(){
	if(  $("#extractor").val() == "invalid"){
		extractorState = false;
	}
	else{
		extractorState = true;
	}
	toggleSubmitButton();
}
//check to see if the adapter has been set to a valid choice (onclick function)
function setMeasureState(){
	if(  $("#measure").val() == "invalid"){
		measureState = false;
	}
	else{
		measureState = true;
	}
	toggleSubmitButton();
}
//toggle button for submission based upon adapter state and radio buttons's state
function toggleSubmitButton(){ 
	if( adapterState && extractorState && measureState && (fileNum <=0) ){
		$("#submitButton").attr("class","btn btn-primary btn-large");
		$("#submitButton").attr("style","width:220px");
	}
	else{
		$("#submitButton").attr("class","btn btn-primary btn-large disabled");
		$("#submitButton").attr("style","width:220px");
	}
}
//set the global var adapterList: {'id':'adaptId', 'name':'name', 'mimeTypes':['application/xml', 'text/html']}
function getAdapters() {
	
	$.getJSON('api/v1/adapters', function(data) {
		$.each(data, function(index, value) {
			$('#adapter').append(
		        $('<option></option>').val(value.id).html(value.name)
		    );
		});
	});
	
	adapterList = [
	               {'id':'RGB', 'name':'RGB Adapter', 'mimeTypes':['image/gif', 'image/jpg','image/jpeg','image/png'], 'supportedExtractors':['','']},
	               {'id':'Audio', 'name':'Audio Adapter', 'mimeTypes':['audio/mpeg', 'audio/mp4'], 'supportedExtractors':['','']},
	               {'id':'Video', 'name':'Video Adapter', 'mimeTypes':['video/mpeg', 'video/quicktime'], 'supportedExtractors':['','']}
	];
}
function getExtractors() {
	
	$.getJSON('api/v1/extractors', function(data) {
		$.each(data, function(index, value) {
			$('#extractor').append(
		        $('<option></option>').val(value.id).html(value.name)
		    );
		});
	});
	
	adapterList = [
	               {'id':'RGB', 'name':'RGB Adapter','supportedAdapters':['',''] },
	               {'id':'RGB', 'name':'RGB Adapter','supportedAdapters':['','']},
	               {'id':'RGB', 'name':'RGB Adapter','supportedAdapters':['','']}
	];
}
function getMeasures() {
	
	$.getJSON('api/v1/measures', function(data) {
		$.each(data, function(index, value) {
			$('#measure').append(
		        $('<option></option>').val(value.id).html(value.name)
		    );
		});
	});
	
	adapterList = [
	               {'id':'RGB', 'name':'RGB Adapter', 'mimeTypes':['image/gif', 'image/jpg','image/jpeg','image/png'], 'supportedExtractors':['','']},
	               {'id':'Audio', 'name':'Audio Adapter', 'mimeTypes':['audio/mpeg', 'audio/mp4'], 'supportedExtractors':['','']},
	               {'id':'Video', 'name':'Video Adapter', 'mimeTypes':['video/mpeg', 'video/quicktime'], 'supportedExtractors':['','']}
	];
}




















