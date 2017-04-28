jQuery.fn.upload = function(remote, data, successFn, progressFn) {
	// if we dont have post data, move it along
	if (typeof data != "object") {
		progressFn = successFn;
		successFn = data;
	}

	var formData = new FormData();

	var numFiles = 0;
	this.each(function() {
		var i, length = this.files.length;
		numFiles += length;
		for (i = 0; i < length; i++) {
			formData.append(this.name, this.files[i]);
		}
	});

	// if we have post data too
	if (typeof data == "object") {
		for (var i in data) {
			formData.append(i, data[i]);
		}
	}

	var def = new jQuery.Deferred();
	if (numFiles > 0) {
		// do the ajax request
		jQuery.ajax({
			url: remote,
			type: "POST",
			xhr: function() {
				myXhr = jQuery.ajaxSettings.xhr();
				if(myXhr.upload && progressFn){
					myXhr.upload.addEventListener("progress", function(prog) {
						var value = ~~((prog.loaded / prog.total) * 100);

						// if we passed a progress function
						if (typeof progressFn === "function") {
							progressFn(prog, value);

						// if we passed a progress element
						} else if (progressFn) {
							jQuery(progressFn).val(value);
						}
					}, false);
				}
				return myXhr;
			},
			async:false,
			data: formData,
			dataType: "json",
			cache: false,
			contentType: false,
			processData: false,
			complete: function(res) {
				var json;
				try {
					json = JSON.parse(res.responseText);
				} catch(e) {
					json = res.responseText;
				}
				if (typeof successFn === "function") successFn(json);
				def.resolve(json);
			}
		});
	} else {
		def.reject();
	}

	return def.promise();
};
 jQuery(document).ready(function () {
	 
	jQuery("#generate-btn").bind("click", function(){
		
		jQuery("#edit-fanin").upload('http://localhost:8080/CouplingVizRestApi/rjsonfanout', 
			function(success){
				alert("edit-fanout start");
				var j = success;
				JSON.stringify(j);
				console.log(j);
				document.getElementById("fanout").innerHTML=JSON.stringify(j);
				alert("edit-fanout end");
			});
		
		jQuery("#edit-fanin").upload('http://localhost:8080/CouplingVizRestApi/rjsonfanin', 
			function(success){
				alert("edit-fanin start");
				var j = success;
				JSON.stringify(j);
				console.log(j);
				document.getElementById("fanin").innerHTML=JSON.stringify(j);
				alert("edit-fanin end");
			});		
	});
	
	document.getElementById("generate-btn").addEventListener("click", loadDoc);
	
	function loadDoc(){
		alert("loadDoc start");
		var url = "sites/all/modules/custom/couplingviz/couplingviz.js";
		jQuery.getScript( url, function() {
		  jQuery( "#refresh" ).click(function() {
			document.getElementById("main").innerHTML="";	
			document.getElementById("fanin").innrHTML="";
			document.getElementById("fanout").innrHTML="";
		  });
		});
		alert("loadDoc end");
		
		var fanoutdivelement = jQuery("#fanout").text();
		var fanindivelement = jQuery("#fanin").text();
		

		fanoutdata = {'Fanout': fanoutdivelement };
		fanindata = {'Fanin': fanindivelement };

		//data1 = jQuery(this).serialize() + "&" + jQuery.param(data1);
		
		var fanoutSettings = {
		  "async": true,
		  "crossDomain": true,
		  "data": fanoutdata,
		  "url": "http://localhost/drupal/savejsoncoupling",
		  "method": "POST",
		}
		
		var faninSettings = {
		  "async": true,
		  "crossDomain": true,
		  "data": fanindata,
		  "url": "http://localhost/drupal/savejsoncoupling",
		  "method": "POST",
		}
		
		jQuery.ajax(fanoutSettings).done(function (response) {
		  console.log(response);
		  alert(response);
		});
		
		jQuery.ajax(faninSettings).done(function (response) {
		  console.log(response);
		  alert(response);
		});
	};
 }
 );