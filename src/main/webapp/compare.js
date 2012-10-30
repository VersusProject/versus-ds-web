		  
if (window.File && window.FileList && window.FileReader) {
	console.log("I am inside initialization code");
						
	Init();
	InitDissimilar();
}
				
// initialize
function Init() {
	var files = $id("files"),
    filedrag = $id("filedrag");
	//submitbutton = $id("submitbutton");
	console.log("I am inside Init()");
												 
	// file select
	files.addEventListener("change", handleFileSelect, false);
	filedrag.addEventListener("dragover", FileDragHover, false);
	filedrag.addEventListener("dragleave", FileDragHover, false);
	filedrag.addEventListener("drop", handleFileSelect, false);
	filedrag.style.display = "block";
	// remove submit button
	//submitbutton.style.display = "none";
	//}
 }
 
 
 function InitDissimilar() {
		var dfiles = $id("dfiles"),
	    filedrag1 = $id("filedrag1");
		//submitbutton = $id("submitbutton");
		console.log("I am inside dissimilar Init()");
													 
		// file select
		dfiles.addEventListener("change", handleFileSelect1, false);
		filedrag1.addEventListener("dragover", FileDragHover1, false);
		filedrag1.addEventListener("dragleave", FileDragHover1, false);
		filedrag1.addEventListener("drop", handleFileSelect1, false);
		filedrag1.style.display = "block";
		// remove submit button
		//submitbutton.style.display = "none";
		//}
	 }
 
				//file drag hover
function FileDragHover(e) {
		e.stopPropagation();
		e.preventDefault();
		e.target.className = (e.type == "dragover" ? "hover" : "");
}
				
function FileDragHover1(e) {
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "hover" : "");
}				
					
function handleFileSelect(evt) {
	 FileDragHover(evt);
			  
	 var files  = evt.target.files||evt.dataTransfer.files; // FileList object
	 var output = [];	
					    
	var submitBtn=document.getElementById('submit-button-id');
	submitBtn.removeAttribute('disabled');
	//output.push('<table id="inputTable" class="table table-bordered table-striped" style="display:inline;"><th>Positive Label</th><th>Negative Label</th><th>File</th><th>Type</th><th>Thumbnail</th>');
    output.push('<table id="inputTable" class="table table-bordered table-striped" style="display:inline;"><th>File</th><th>Type</th><th>Thumbnail</th>');
	for (var i = 0, f; f = files[i]; i++) {
        var thumbnail = '';
       	var reader    = new FileReader();
		reader.readAsDataURL(f);
							
		if (f.type.match('image*')) {
					        	
		   reader.onload = (function(theFile, thmb) {
		    return function(e) {
				        	          // Render thumbnail
								        thmb += '<center><img src="'+e.target.result+'" title="'+escape(theFile.name)+'" width="75" height="75"/></center>';
										document.getElementById(escape(theFile.name)).innerHTML = thmb;
				        	    };
				           })(f,thumbnail);		
		  }

		//output.push('<tr id=i >',
		//'<td><input type="radio" name="rowOptionsRadio'+i+'" id="plusOptionsRadios'+i+'" onclick="plusButtonClick(this.id)" value="+" /><i class="icon-plus"></i></td>',
		//'<td><input type="radio" name="rowOptionsRadio'+i+'" id="minusOptionsRadios'+i+'" onclick="minusButtonClick(this.id);checkRadioButtons()" value="-"/><i class="icon-minus"></i></td>',
		//'<td id="r"+i+"c3">', escape(f.name), '</td>',
		//'<td></strong> (', f.type || 'n/a', ') </td>',
		//'<td id="'+escape(f.name)+'"><center><i class="icon-remove"></center></td>',
		 //    	'</tr>');
					      	output.push('<tr id=i >',
							      	'<td id="r"+i+"c3">', escape(f.name), '</td>',
							      	'<td></strong> (', f.type || 'n/a', ') </td>',
							      	'<td id="'+escape(f.name)+'"><center><i class="icon-remove"></center></td>',
							      	'</tr>');
					    	//fd.append(f.name,f);
		UploadFile(f);
					    	//console.log("fileSelectHandlefileUploaded[]:",fileUploaded[i]);
		}
		output.push('</table>');
		//document.getElementById('list').innerHTML = output.join('');
		tableinsert('list',output);
	  	fileNum  = files.length;
	  	fileList = files;
	  					//checkRadioButtons();
	  					//toggleSubmitButton();
	  					// listFiles();
	  				    			    
	  //InitDissimilar();				    
	 }
	function tableinsert(msg,output){
		document.getElementById(msg).innerHTML=output.join('');
	}				 
		
	function handleFileSelect1(evt) {
		 FileDragHover(evt);
				  
		 var files  = evt.target.files||evt.dataTransfer.files; // FileList object
		 var output1 = [];	
						    
		var submitBtn=document.getElementById('submit-button-id');
		submitBtn.removeAttribute('disabled');
		//output.push('<table id="inputTable" class="table table-bordered table-striped" style="display:inline;"><th>Positive Label</th><th>Negative Label</th><th>File</th><th>Type</th><th>Thumbnail</th>');
	    output1.push('<table id="inputTable" class="table table-bordered table-striped" style="display:inline;"><th>File</th><th>Type</th><th>Thumbnail</th>');
		for (var i = 0, f; f = files[i]; i++) {
	        var thumbnail = '';
	       	var reader    = new FileReader();
			reader.readAsDataURL(f);
								
			if (f.type.match('image*')) {
						        	
			   reader.onload = (function(theFile, thmb) {
			    return function(e) {
					        	          // Render thumbnail
									        thmb += '<center><img src="'+e.target.result+'" title="'+escape(theFile.name)+'" width="75" height="75"/></center>';
											document.getElementById(escape(theFile.name)).innerHTML = thmb;
					        	    };
					           })(f,thumbnail);		
			  }

			//output.push('<tr id=i >',
			//'<td><input type="radio" name="rowOptionsRadio'+i+'" id="plusOptionsRadios'+i+'" onclick="plusButtonClick(this.id)" value="+" /><i class="icon-plus"></i></td>',
			//'<td><input type="radio" name="rowOptionsRadio'+i+'" id="minusOptionsRadios'+i+'" onclick="minusButtonClick(this.id);checkRadioButtons()" value="-"/><i class="icon-minus"></i></td>',
			//'<td id="r"+i+"c3">', escape(f.name), '</td>',
			//'<td></strong> (', f.type || 'n/a', ') </td>',
			//'<td id="'+escape(f.name)+'"><center><i class="icon-remove"></center></td>',
			 //    	'</tr>');
						      	output1.push('<tr id=i >',
								      	'<td id="r"+i+"c3">', escape(f.name), '</td>',
								      	'<td></strong> (', f.type || 'n/a', ') </td>',
								      	'<td id="'+escape(f.name)+'"><center><i class="icon-remove"></center></td>',
								      	'</tr>');
						    	//fd.append(f.name,f);
			UploadFile1(f);
						    	//console.log("fileSelectHandlefileUploaded[]:",fileUploaded[i]);
			}
			output1.push('</table>');
			//document.getElementById('list').innerHTML = output.join('');
			tableinsert('list1',output1);
		  	dfileNum  = files.length;
		  	dfileList = files;
		  					//checkRadioButtons();
		  					//toggleSubmitButton();
		  				// listFiles();
		  
		  			    
		 }
	
	
	
 var submitBtn=document.getElementById('submit-button-id');
    submitBtn.onclick=function(evt){
    	console.log("I am inside click function");
    	
    	TfileNum=fileNum+dfileNum;
    	console.log("TfileNum",TfileNum);
		for( var i=0; i< fileNum; i++){
				//if($("#plusOptionsRadios"+i).attr("checked") == "checked"){
				  							
				  		for(var j=0;j<fileNum;j++){	
				  			 console.log("SimilarFiles Comparison");
				  			 console.log("fileList.name",fileList[i].name,"XMap.name",xMap[j].name);
				  			  if(fileList[i].name==xMap[j].name){
				  				if(data1=="")
				  					  data1="dataset1="+xMap[j].url;
				  				  else
				  			        data1=data1+"&dataset1="+xMap[j].url;
				  			        console.log(xMap[j].url);
				  				 }
				  		}
				  						
				 //  }
				  					
		 }
								
		for( var i=0; i< dfileNum; i++){
				  						 
			// if($("#minusOptionsRadios"+i).attr("checked") == "checked"){
				  						
				  for(var j=0;j<dfileNum;j++){
				  					
				  	console.log("DissimilarFiles Comparison");
				  	console.log("dfileList.name",dfileList[i].name,"X1Map.name",x1Map[j].name);
				  	if(dfileList[i].name==x1Map[j].name){
				  		if(data1=="")
		  					  data1="dataset2="+x1Map[j].url;
		  				  else
				  		   data1=data1+"&dataset2="+x1Map[j].url;
				  		console.log(x1Map[j].url);
				  	 }
				  }
				  						//data=data+"&dissimilarFiles="+"http://localhost:8080/api/v1/files/"+fileUploaded[i];
			//	}		
		  }
					 
					 					 
	 submitComparison();
	}
					
			 
						function UploadFile(file) {
							//if(file==null)
							//	console.log("form data is null");
							var xhr = new XMLHttpRequest();
							if (xhr.upload) {
									xhr.addEventListener('readystatechange', function completionhandler(evt) {
									onreadystatechangeHandler(file,evt)
									//console.log("File: " + file.name);
									},false);
								//xhr.setRequestHeader("X_FILENAME", file.name);
								fd=new FormData();
								fd.append(file.name,file);
								xhr.open("POST", "http://localhost:8180/api/v1/files/upload", true);
								xhr.send(fd);
								//xhr.send(file);
							}
							else{
								console.log("xhr upload failed");
							}
						}
						
						function UploadFile1(file) {
							//if(file==null)
							//	console.log("form data is null");
							var xhr = new XMLHttpRequest();
							if (xhr.upload) {
									xhr.addEventListener('readystatechange', function completionhandler(evt) {
									onreadystatechangeHandler1(file,evt)
									//console.log("File: " + file.name);
									},false);
								//xhr.setRequestHeader("X_FILENAME", file.name);
								fd=new FormData();
								fd.append(file.name,file);
								xhr.open("POST", "http://localhost:8180/api/v1/files/upload", true);
								xhr.send(fd);
								//xhr.send(file);
							}
							else{
								console.log("xhr upload failed");
							}
						}
							// Handle the response from the server

	
							//function onreadystatechangeHandler(evt) {
							 function onreadystatechangeHandler(file,evt){
							  var status = 0;
							  var readyState=0;
							  //console.log("File name: " + evt.name);
							  try {
							    status = evt.target.status;
							    readyState=evt.target.readyState;
							  }
							  catch(e) {
							    return;
							  }
							  
							  if (readyState==4){
								  if(status == 200) {
								  console.log(evt.target.responseText);
								  fileUploaded.push(evt.target.responseText);
								  //Output(evt.target.responseText,"result");
								  console.log("File: " + file.name);
								  var obj=new Object();
								  obj.name=file.name;
								  obj.url="http://localhost:8180/api/v1/files/"+evt.target.responseText;
								  xMap.push(obj);
								  console.log("fileUploaded response",fileUploaded[fileUploaded.length-1]);
								  console.log("fileUploaded responseLength:",fileUploaded.length);
							  //  var result = document.getElementById('result');
							   // result.innerHTML = '<p>The server saw it as:</p><pre>' + evt.target.responseText + '</pre>';
							   
								    if ((fileNum+dfileNum)==fileUploaded.length){
								    	for(var i=0;i<fileUploaded.length;i++)
								    		{
								    		console.log("Object map: X[].name",xMap[i].name,"X[].url=",xMap[i].url);
								    		//Init1();
								    		}
										 
										}
							        }
							 
							    }
							}
							 function onreadystatechangeHandler1(file,evt){
								  var status = 0;
								  var readyState=0;
								  //console.log("File name: " + evt.name);
								  try {
								    status = evt.target.status;
								    readyState=evt.target.readyState;
								  }
								  catch(e) {
								    return;
								  }
								  
								  if (readyState==4){
									  if(status == 200) {
									  console.log(evt.target.responseText);
									  fileUploaded1.push(evt.target.responseText);
									  //Output(evt.target.responseText,"result");
									  console.log("File: " + file.name);
									  var obj=new Object();
									  obj.name=file.name;
									  obj.url="http://localhost:8180/api/v1/files/"+evt.target.responseText;
									  x1Map.push(obj);
									  console.log("fileUploaded response",fileUploaded1[fileUploaded1.length-1]);
									  console.log("fileUploaded responseLength:",fileUploaded1.length);
								  //  var result = document.getElementById('result');
								   // result.innerHTML = '<p>The server saw it as:</p><pre>' + evt.target.responseText + '</pre>';
								   
									    if (dfileNum==fileUploaded1.length){
									    	for(var i=0;i<fileUploaded.length;i++)
									    		{
									    		console.log("Object map: X1[].name",x1Map[i].name,"X[].url=",x1Map[i].url);
									    		//Init1();
									    		}
											 
											}
								        }
								 
								    }
								}
							 function onreadystatechangeHandlerComparison(evt) {
								  var status = null;
								  var readyState=null;

								  try {
								    status = evt.target.status;
								    readyState=evt.target.readyState;
								  }
								  catch(e) {
								    return;
								  }

								  if (readyState==4){
									  if(status == '200' && evt.target.responseText) {
									  console.log(evt.target.responseText);
									  //fileUploaded.push(evt.target.responseText);
									  Output(evt.target.responseText,"result");
									  
								  //  var result = document.getElementById('result');
								   // result.innerHTML = '<p>The server saw it as:</p><pre>' + evt.target.responseText + '</pre>';
									  }
								  }
								  //console.log(fileUploaded.length);
								}
							 
							function $id(id) {
								return document.getElementById(id);
								}
							function Output(msg,mgid) {
								//	var m = $id("messages");
								var m=$id(mgid);
									m.innerHTML = msg + m.innerHTML;
								}
							
					