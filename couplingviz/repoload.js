jQuery(document).ready(function () {
	
	//Get module path from Drupal settings
	var modulePath = Drupal.settings.couplingviz.modulePath;
	
	// Get module base path
	var basePath = Drupal.settings.couplingviz.basePath; 
	
	// Register event listerner, onnce user request sytem to create visual  pattern 
	// Of CBO in JSONVIZ table
	document.getElementById("generate-btn").addEventListener("click", loadDoc);
	
	function loadDoc(){
		//alert("loadDoc start");
		var url = basePath + modulePath +"/couplingviz.js";
		jQuery.getScript( url, function() {
		  jQuery( "#generate-btn" ).click(function() {
			document.getElementById("main").innerHTML="";	
			document.getElementById("fanin").innrHTML="";
			document.getElementById("fanout").innrHTML="";
		  });
		});
		//alert("loadDoc end");	
	};
 }
 );
 
 console.log(Drupal.settings);