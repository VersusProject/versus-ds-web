var fileNum           = 0;
var dfileNum =0;
var TfileNum=0;
var adapterState      = false;
var extractorState    =false;
var measureState= false;
var methodState=false;
var labelState=false;
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
var methodSelected;
var labelSelected;
//var fd=new FormData();
var chosenAdapter  = "edu.illinois.ncsa.versus.adapter.impl.BufferedImageAdapter";
//fd.append("adapter",chosenAdapter);
var data="adapter="+chosenAdapter;
var lfd=new FormData();
var data1="";


//toggle button for submission based upon adapter state and radio buttons's state
function toggleSubmitButton(){ 
	if( adapterState && radioButtonsState ){
		$("#submitButton").attr("class","btn btn-primary");
	}
	else{
		$("#submitButton").attr("class","btn btn-primary disabled");
	}
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
	 
	console.log("Inside submitDecisionSupport",fileUploaded.length);
	
	function printObject(o) {
		  var out = '';
		  for (var p in o) {
		    out += p + ': ' + o[p] + " ";
		  }
		  alert(out);
		}
	
	
	$.ajax({
	type: 'POST',
	url: 'http://localhost:8080/api/v1/multiLabelDecisionSupport',
	data:data
    }).done( function( id ) {
	//$("#results").html('<br> <br> <br> <br>  <div id="loadingBar" class="progress progress-striped active"><div class="bar"style="width: 100%;"></div></div><br> <br> <br> <br>');
	getDecisionSupport(id);
});
		}
function getDecisionSupport(id){
	$.getJSON('http://localhost:8080/api/v1/multiLabelDecisionSupport/'+id, function(json) {
		console.log("Inside getDecisionSupport id");
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
	console.log("data1",data1);
	$.ajax({
		type: 'POST',
		url: 'http://localhost:8080/api/v1/comparisons',
		data:data1
	    }).done( function( id ) {
		$("#results").html('<br> <br> <br> <br> <br> <br> <div id="loadingBar" class="progress progress-striped active"><div class="bar"style="width: 100%;"></div></div><br> <br> <br> <br> <br>');
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
	
	//$("#status").html(j.status);

	//if status is not running then display results
	console.log(j);
	if(j.status == "DONE"){
		//$("#status").remove();
		//$("#loadingBar").remove();
		console.log("I am inside format and Display");
		var output=[];
		if(methodSelected=="probabilistic"){
		output.push('<table class="table table-bordered table-striped" style="display:inline;"><th>Rank</th><th>Extractor</th><th>Measure</th><th>PEvalue</th>');
		}
		else{
			output.push('<table class="table table-bordered table-striped" style="display:inline;"><th>Rank</th><th>Extractor</th><th>Measure</th><th>MeanSum</th>');
		}
		//var results="<table class='table table-bordered table-striped' style='display:inline;'><th>Rank</th><th>Extractor</th><th>Measure/th><th>PEvalue</th>";
		//results=;
		var pair1e=j.rankedResults.substring(4,j.rankedResults.indexOf("1-"));
		var pair1m=j.rankedResults.substring(j.rankedResults.indexOf("1-")+2,j.rankedResults.indexOf("1:"));
		var pair2e=j.rankedResults.substring(j.rankedResults.indexOf("2.)")+3,j.rankedResults.indexOf("2-"));
		var pair2m=j.rankedResults.substring(j.rankedResults.indexOf("2-")+2, j.rankedResults.indexOf("2:"));
		var pair3e=j.rankedResults.substring(j.rankedResults.indexOf("3.)")+3,j.rankedResults.indexOf("3-"));
		var pair3m=j.rankedResults.substring(j.rankedResults.indexOf("3-")+2, j.rankedResults.indexOf("3:"));
		var pair4e=j.rankedResults.substring(j.rankedResults.indexOf("4.)")+3,j.rankedResults.indexOf("4-"));
		var pair4m=j.rankedResults.substring(j.rankedResults.indexOf("4-")+2, j.rankedResults.indexOf("4:"));
         var suf1="Rank 1: "+pair1e+"-"+pair1m+" pair";
         var suf2="Rank 2: "+pair2e+"-"+pair2m+" pair";
         var suf3="Rank 3: "+pair3e+"-"+pair3m+" pair";
         var suf4="Rank 4: "+pair4e+"-"+pair4m+" pair";
         var head="Best Extractor-Measure Pairs";
		Output(head,"heading1");
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
				
		 document.getElementById('results').innerHTML=output.join('');
		// $("#results").html("<br/><u>The Best Extractor / Measure Pairs are:</u> <br><br>"+output.join(''));
		 
		 
		
		// $(function () {
		    // var d1 = [];
		     //for (var i = 0; i < 14; i += 0.5)
		     //    d1.push([i, Math.sin(i)]);
		   /*  var s1=j.distanceValues.substring(0,j.distanceValues.indexOf("(1)")).split(",");
              console.log("distancevalues s1:",s1);
              var sp1=[];
              
             // var snumber=[];
		   // for(var i=0;i<s1.length;i++){
           // 	  snumber[i]=0.0;
            // }
             
              for(var i=1;i<s1.length;i++)
            	{
            	  
            	 // snumber[i]=Number(s1[i]);
            	  sp1.push([i,Number(s1[i])]);
            	}  
             
             var d1=j.distanceValues.substring(j.distanceValues.indexOf("(1)")+3,j.distanceValues.indexOf("{1}")).split(",");
              console.log("distancevalues d1:",d1);
              var dp1=[];
             
             // var dnumber=[];
              
		     //for(var i=0;i<d1.length;i++){
            //	  dnumber[i]=0.0;
            	//  df[i]=0;
             // }
              
              for(var i=1;i<d1.length;i++){
            	 // dnumber[i]=Number(d1[i]);
            	  dp1.push([i,Number(d1[i])]);
            	  }
              
              
              var options = {
            	        xaxes: [{
            	            axisLabel: 'Similarity Values (x)',
            	        }],
            	        yaxes: [{
            	            position: 'left',
            	            axisLabel: 'Probaility Density Function : p(x)',
            	        }, {
            	            position: 'right',
            	            axisLabel: 'bleem'
            	        }],
            	        HtmlText: true,
                        title: "My Plot"
            	    };
               
               Output(suf1,"graph1h1");
              //var m=document.getElementById("#graph1h1");
             // m.innerHTML=pair1e+"-"+pair1m+m.innerHTML;
              //$("graph1h1").html(pair1e);
              
		     $.plot($("#graph1"),
		    		 [{
		    			 label: "Similar Files",
		    			 data: sp1
		    			 },
		    		  {label: "Disimilar Files",
		    		   data:   dp1
		    		  }
		    		], options
		        );
		// });
		      var s2=j.distanceValues.substring(j.distanceValues.indexOf("{1}")+3,j.distanceValues.indexOf("(2)")).split(",");
		      console.log("distancevalues s2:",s2);
	             var sp2=[];
	             //for(var i=0;i<s2.length;i++){
	           	 //  snumber[i]=0.0;
	           	 // }
	             
	             for(var i=1;i<s2.length;i++){
	            	 //snumber[i]=Number(s2[i]);
	           	      sp2.push([i,Number(s2[i])]);
	           	  }
	             
	             var d2=j.distanceValues.substring(j.distanceValues.indexOf("(2)")+3,j.distanceValues.indexOf("{2}")).split(",");
	             console.log("distancevalues d2:",d2);
	             var dp2=[];
	           //for(var i=0;i<d2.length;i++){
	           //	  dnumber[i]=0.0;
	           //	 }
	              
	             for(var i=1;i<d2.length;i++){
	            	 //dnumber[i]=Number(d2[i]);
	           	  dp2.push([i,Number(d2[i])]);
	           	  }
	             
	             
	             
			     //$.plot($("#graph2"), [sp2,dp2]);
	             Output(suf2,"graph2h2");
	             $.plot($("#graph2"),
			    		 [{
			    			 label: "Similar Files",
			    			 data: sp2
			    			 },
			    		  {label: "Disimilar Files",
			    		   data:   dp2
			    		  }
			    		], options
			        );
	             
	             
	             
	             
		      
			     var s3=j.distanceValues.substring(j.distanceValues.indexOf("{2}")+3,j.distanceValues.indexOf("(3)")).split(",");
			      console.log("distancevalues s3:",s3);
		             var sp3=[];
		           /*  for(var i=1;i<s3.length;i++){
		           	   snumber[i]=0.0;
		           	  }*/
		             
		           /*  for(var i=1;i<s3.length;i++){
		            	 //snumber[i]=Number(s3[i]);
		           	      sp3.push([i,Number(s3[i])]);
		           	  }
		             
		             var d3=j.distanceValues.substring(j.distanceValues.indexOf("(3)")+3,j.distanceValues.indexOf("{3}")).split(",");
		             console.log("distancevalues d3:",d3);
		             var dp3=[];
		           //for(var i=0;i<d3.length;i++){
		           //	  dnumber[i]=0.0;
		          // 	 }
		              
		             for(var i=1;i<d3.length;i++){
		            //	 dnumber[i]=Number(d3[i]);
		           	  dp3.push([i,Number(d3[i])]);
		           	  }
		             
		             
		             Output(suf3,"graph3h3");
				   //  $.plot($("#graph3"), [sp3,dp3]);
		             $.plot($("#graph3"),
				    		 [{
				    			 label: "Similar Files",
				    			 data: sp3
				    			 },
				    		  {label: "Disimilar Files",
				    		   data:   dp3
				    		  }
				    		], options
				        );
		      
		      
		 
		      var s4=j.distanceValues.substring(j.distanceValues.indexOf("{3}")+3,j.distanceValues.indexOf("(4)")).split(",");
		     		     
             console.log("distancevalues s4:",s4);
             var sp4=[];
            // for(var i=0;i<s4.length;i++){
           	//   snumber[i]=0.0;
           	//  }
             
             for(var i=1;i<s4.length;i++){
            	 //snumber[i]=Number(s4[i]);
           	      sp4.push([i,Number(s4[i])]);
           	  }
             
            var d4=j.distanceValues.substring(j.distanceValues.indexOf("(4)")+3,j.distanceValues.indexOf("{4}")).split(",");
             console.log("distancevalues d4:",d4);
             var dp4=[];
           //for(var i=0;i<d4.length;i++){
           //	  dnumber[i]=0.0;
           //	 }
              
             for(var i=1;i<d4.length;i++){
            	 //dnumber[i]=Number(d4[i]);
           	  dp4.push([i,Number(d4[i])]);
           	  }
             
             
             Output(suf4,"graph4h4");
		    // $.plot($("#graph4"), [sp4,dp4]);
             $.plot($("#graph4"),
		    		 [{
		    			 label: "Similar Files",
		    			 data: sp4
		    			 },
		    		  {label: "Disimilar Files",
		    		   data:   dp4
		    		  }
		    		], options
		        );
		     */
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
$(document).ready(function(){
	
	getAdapters();//global car adapterList is now set

setMethodList();
setLabelList();
}
);

function setMethodList(){
	var availableMethod="";
	availableMethod=availableMethod+'<option  value=probabilistic>'+"probabilistic"+'</option>'+'<option  value=inverseKmeans>'+"inverseKmeans"+'</option>';
	$("#methodDropDown").html('<option value="invalid">--Method--</option>'+availableMethod);
}
function setLabelList(){
	var availableLabel='<option  value=2>'+"2"+'<option  value=3>'+"3"+'<option  value=4>'+"4"+'<option  value=5>'+"5"
	$("#labelDropDown").html('<option value="invalid">--Label--</option>'+availableLabel);
}
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
		lfd.append("adapter",adapterselected[1]);
	}
	//toggleSubmitButton();
}
function setMethodState(){
	if($("#methodDropDown").val()=="invalid"){
		methodState=false;
	}
	else{
		methodState=true;
		console.log(methodState);
		console.log("method",$("#methodDropDown").val());
		if($("#methodDropDown").val()=="probabilistic"){
			console.log("method",$("#methodDropDown").val());
			methodSelected="probabilistic";
		}
		else
			methodSelected="inverseKmeans";
	  console.log(methodSelected);	
	  data=data+"&method="+methodSelected;
	  lfd.append("method",methodSelected);
	}
}
function setLabelState(){
	if($("labelDropDown").val=="invalid"){
		labelState=false;
	}
	else{
		labelState=true;
		for(i=2;i<=5;i++){
		if($("#labelDropDown").val()==i){
			console.log($("#labelDropDown").val());
			labelSelected=$("#labelDropDown").val();
			data=data+"&k="+labelSelected;
			lfd.append("k",labelSelected);
			break;
		}
		}
	}
}