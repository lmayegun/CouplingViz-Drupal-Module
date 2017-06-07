/**
* Reponsible for output visual patterns of CBO.
*/

	var width =  800;   
		height = 600;  
	var color = d3.scale.category20();

	/*
	 * the gap is the space between two classes
	 */
	var gap = 6;
	/*
	 * The space between the left edge of the screen and the left edge 
	 * of the canvas
	 */
	var xMargin = 100; 
	/*
	 * The space between the upper edge of the screen and the upper edge 
	 * of the canvas
	 */
	var yMargin = 100;	
	/*
	 * The size of a node. The width and the height of the node is the same
	 */
	var size = 4; 
	var colr = "gray";
	/*
	 * x represents the x coordinate of a node
	 */
	var x = xMargin;
	/*
	 * y represents the y coordinate of a node
	 */
	var y = 0;	
	/*
	 * This variable is used to hold the row count (the number of rows) a 
	 * node is found at.
	 */
	var rowCount = 0;
	/*
	 * This boolean variable is used to indicate the first allocation of the 
	 * x coordinate to the classes in 
	 * the getX function 
	 */
	var firstTime = true; 
	/*
	 * bgCount counts the number of backgrounds created and is used to suffix 
	 * the background name eg. background1 
	 */
	var bgCount = 1;  

	/*
	 * rowHeight measures the height of a row without being scaled
	 */
	var rowHeight = 18; 

	/*
	 * xIndent is the space between the start of the background on the left and
	 * the first class node on the background
	 */
	var xIndent = 8;
	/*
	 * yIndent is the space between the start of the background  on the upper side
	 * and the first class node on the background
	 */
	var yIndent = rowHeight - size;
	/*
	 * xCls the most left x-coordinate of  all class nodes
	 */
	var xCls = xMargin + xIndent;	
	/*
	 * yCls represent the upper most y-coordinate of all class nodes on a row
	 */
	var yCls = yMargin + rowHeight - size  
	/*
	 * vGap is the vertical gap between two backgrounds
	 */
	var vGap = 3;
	/*
	 * radius is the radius of the circle that represents an interface
	 */
	var radius =2;
	/*
	 * circles is an array that holds the circle data for the interfaces
	 */
	var circles = [];
	/*
	 * bgClr1 and bgClr2 are the alternating back ground colours for the differing 
	 * packages with in the program
	 */
	var bgClr1 = "#ffaabb"; 
	/*
	 * bgClr1 and bgClr2 are the alternating back ground colours for the differing
	 * packages with in the program
	 */
	var bgClr2 = "#FFbbaa"; 

	/*
	 * packagenameOfClass represents the name of the package of a class
	 */
	var packagenameOfClass = "abc";	
	/*
	 * pkgClr is the colour that is assigned to a background. It is alternated 
	 * between bgClr1 and bgClr2
	 */
	var pkgClr = bgClr1;
	/*
	 * bodyClr represents the colour of the background of the body of the page.
	 */
	var bodyClr = "#ffa999"; 
	/*
	 * dashedLines is an array the holds the line data for creating the packages
	 */
	var dashedLines = [];
	/*
	 *  gapBeteenClsNHighlightRect represents the space between class nodes and 
	 *  a highlighting rectangle that is 
	 *  created when one clicks on a class node
	 */
	var gapBeteenClsNHighlightRect = 1;
	/*
	 * highlightRectSize is the size( width and height) of a highlighting rectangle
	 */
	var highlightRectSize = size + gapBeteenClsNHighlightRect;
	/*
	 * arrowClicked is a boolean that switches to true and false when an arrow is
	 *  clicked.
	 */
	var arrowClicked = false;	
	/*
	 * ARROW is a value that gives a meaningful representation of one type of the 
	 * arrows. This type of arrow is created when a class node is clicked on
	 */
	var ARROW = 1;
	/*
	 * The other type of the arrow is ARROW_HIGHLIGHT which is created when an 
	 * arrow of type ARROW is clicked on.
	 */
	var ARROW_HIGHLIGHT = 2;
	/*
	 * This is the value that would be assigned to the height of class nodes 
	 * with no coupling value.
	 */
	var COUPLINGVIZ_NOCLASS_HEIGHT = size/2;	
	/*
	 * The value represents the colour of segment (at extended scales) of a class 
	 * node collaborating with interface  
	 */
	var INTERFACE_COLOUR = "#5af038";	
	/*
	 * The value represents the colour of segment (at extended scales) of a class 
	 * node doing OO mechanism in form of foreign inheritance 
	 */
	var FOREIGN_COLOUR = "#d42096";	
	/*
	 * The value represents the colour of segment (at extended scales) of a class 
	 * node doing direct collaboration with other classes
	 */
	var DIRECT_COLOUR = "blue";	
	/*
	 * The value represents the colour of segment (at extended scales) of a 
	 * class node doing OO mechanism in form of native inheritance 
	 */
	var NATIVE_COLOUR = "yellow"; 
	/*
	 * stackD is set here to nothing but holds later on the class data that are 
	 * stacked with the function stackData()
	 */
	var stackD;	
	/*
	 * This boolean variable is applied in the function reverseStack() when a class
	 * is spliced in to/ out of the clazzzes
	 */
	var spliced = false;
	/*
	 * scaleVal is set here to 0 as default and is usually used to store the current 
	 * scale chosen from the dropdownlist control on the page
	 */
	var scaleVal = 0; 
	var gtempId = "";
	/*
	 * gSelectedNode is a variable that store the selected object (class) globally
	 * when a class node is clicked on
	 */
	var gSelectedNode = null;	
	/*
	 * A boolean that switches the assignment of the height of a node in the 
	 * renderClazzes function between a full * length and percentage of a height
	 * when the percentage is less than 1
	 */
	var heightAssigned = false;	
	/*
	 * collaborationModeIn is a boolean that is set true when the collaboration mode 
	 * is fanin and false when it is fanout.
	 */
	var collaborationModeIn = true;	
	var pkgBgColourOn = true;	

	var displayBg = false;
	var packageGap = 2;//6;
	var gPercentage = 0;
	var gHeight = 0;
	var gTotalH = 0;
	var hideLines = false;
	var legendOff = true;
	/*
	 * This is the scaling factor which is multiplied with the scale (0,1,2,3) to get
	 * how much a component grows when scaled.
	 */
	var gScaleFactor = 20;
	/*
	 * when segments exceed rowHeight and have extension rectangle, this will be wider 
	 * than the segment  and EXTENSION_OFFSET sets the * x- coordinate of the 
	 * extension rectangle. 
	 */
	var EXTENSION_OFFSET = 0.5; 
	/*
		A JSON array holding the json objects representing the classes. The JSON 
		objects are	obtained from the JSP page (the view Display) this script is 
		embedded. The Welcome controller passes the JSON objects to the Display view
		as a model. The JSON objects are composed using the	JsonSerializer class 
		which implements Jackson core and couplingVizNbcel jar.
	*/

	var clazzes = JSON.parse(document.getElementById('fanout').textContent);

	var tepmClazzes = clazzes;


	/*
	 * create canvas for drawing components of visualization.
	 */
	var canvas = d3.select('#main').append('svg')
		.attr("viewBox", "100,100,720,900");
	 
	var clsG = canvas.append("g");

	/* 
		Appending a group element to the svg container that was created before and
		assign it to a variable.
	*/
	var g = canvas.append("g");


	/*
	 * invoke the function displayLegend when document loads
	 */
	displayLegend();

	/*  
	Selecting a document element by id (#maincontainer) and appending a div element to
	it. The variable sets also some attribute and styles to the div. This selection 
	serves as the container of the details of collaboration of a class with another, 
	when one click  on the arrow over the other class.
	*/	
	var tooltipArrow = d3.select("#maincontainer")
		.append("div")
		.attr("id", "tt")
		.style("z-index", "10")
		.style("position", "absolute")
		.style("cursor","pointer")
		.style("visibility", "hidden")
		.on("mouseover", function (d) {
				//alert("hi");
				if(!(d.id === "a")){
					console.log("I am in mousover!");
					return toolOverArrow();
				}
			})
		.on("mousemove", function () {
					var m = d3.mouse(this);
					mx = m[0];
					my = m[1];
					return toolMove(mx, my, d);
			})
		.on("mouseout", function (d) {
			  return toolOut(d, this);
			})
		.on("click", function(){ tooltipScroll()
				console.log("I am in click!");
			});
			
	/* *************************************************************************** */

	//Calling the drawComponents function to invoke it.
	drawComponents();

	/* 
	This function calls other functions to draw the different components of the 
	visualization.The order of the call is important.First backgraound on which 
	classes and interfaces can be drawn then the package markers can follow on 
	the top.
	*/
	function drawComponents(){
		addBackground();
		renderClazzes(clazzes,0, "node");
		addInterfaces();
		addPackageMarker(clazzes);
	}

	/* **************************************** addBackground ******************** */
	/*
		The function addBackground() adds the background rectangles for each package.
		If there are more than one packages in the source code, each package will get
		a background of alternating colours
	*/
	function addBackground(){
		pkgClr = bgClr1;
		updateCoords();
		
		var tempBg = [];
		var bgData = [];
		var pkgChange = 0;
		var tempRow = 0;
		var tempX = xMargin;
		var tempY = yMargin;
		var tempH = rowHeight + vGap;
		var rowcnt = 0;	
		
		for(var j = 0 ; j < clazzes.length; j++){
				if(!(packagenameOfClass === clazzes[j].packagename)){
					swapBG();
					packagenameOfClass = clazzes[j].packagename;
					if(clazzes[j].properties.coords[0].y <= yMargin + tempH * 
							(tempRow+1)){
						if(j == 0){
							tempBg.unshift({id:"a", properties:{name:"background" + 
				bgCount ,clr: pkgClr, coords:[{x:tempX, y:  tempY }], targets:[]}});
							tempBg[0].properties.targets.push(width- tempX);
							renderClazzes(tempBg,0, "nodebg");
							tempBg = [];
							
						}else{
							tempX = clazzes[j].properties.coords[0].x - packageGap;
							tempBg.unshift({id:"a", properties:{name:"background" +
				bgCount , clr: pkgClr, coords:[{x:tempX, y:  tempY }], targets:[]}});
							tempBg[0].properties.targets.push(width -
									clazzes[j].properties.coords[0].x + size);
							renderClazzes(tempBg,0, "nodebg");
							tempBg = [];
						}
					}else{
							tempRow++;
						var tempVal = ((clazzes[j].properties.coords[0].y -
								tempY)/tempH);
						if(clazzes[j].properties.coords[0].y  > tempY+tempH){
							tempY += tempH;
						}
						swapBG();
						tempX =clazzes[j].properties.coords[0].x - packageGap;
						tempVal = parseInt(tempVal);
						var offSwap = true;
						while(tempVal > 1){
							tempBg.unshift({id:"a", properties:{name:"background" +
				bgCount ,clr: pkgClr, coords:[{x:xMargin, y:  tempY }], targets:[]}});
							tempBg[0].properties.targets.push(width - xMargin);
							renderClazzes(tempBg,0, "nodebg");
							tempBg = [];
							tempY += (rowHeight+vGap);
							tempRow++;
							tempVal--;
						}
						
						if(clazzes[j].properties.coords[0].y < yMargin + tempH * 
								(tempRow+1)){
							tempBg.unshift({id:"a", properties:{name:"background" + 
			bgCount , clr: pkgClr, coords:[{x:xMargin, y:  tempY }], targets:[]}});
							tempBg[0].properties.targets.push(tempX - xMargin);
							renderClazzes(tempBg,0, "nodebg");
							tempBg = [];
						}
							
						if(!(packagenameOfClass === clazzes[j].packagename)){
								swapBG();
								packagenameOfClass = clazzes[j].packagename;
							}else{
								swapBG();
							}
							
						tempBg.unshift({id:"a", properties:{name:"background" + 
				bgCount ,clr: pkgClr, coords:[{x:tempX, y:  tempY }], targets:[]}});
						tempBg[0].properties.targets.push(width - tempX);
						tempX += clazzes[j].properties.coords[0].x
						renderClazzes(tempBg,0, "nodebg");
						tempBg = [];
					}	
				}
				if(j == clazzes.length - 1){
					var tempVal = ((clazzes[j].properties.coords[0].y -tempY)/
							(rowHeight +vGap));
					tempY = clazzes[j].properties.coords[0].y - (rowHeight-size);
					tempX = clazzes[j].properties.coords[0].x
					tempBg.unshift({id:"a", properties:{name:"background" + 
	bgCount , clr: bodyClr, coords:[{x:tempX + size +gap, y:  tempY }], targets:[]}});	
					tempBg[0].properties.targets.push(width - tempX);
					renderClazzes(tempBg,0, "nodebg");
					tempBg = [];
					var offSwap = false;
					renderClazzes(tempBg,0, "nodebg");
					while(tempVal >= 1){
							tempBg.unshift({id:"a", properties:{name:"background" +
			bgCount , clr: pkgClr, coords:[{x:xMargin, y:  tempY }], targets:[]}});
							tempBg[0].properties.targets.push(clazzes[j].properties.coords[0].x +
									size + gap - xMargin);
							renderClazzes(tempBg,0, "nodebg");
							tempBg = [];
							tempVal--;
					
						}  
				}
		}
		
	}

	/* 
	The function updateCoords goes through the json array and set the coordinates of 
	each class on the screen.
	*/
	function updateCoords(){
		for(var i = 0; i < clazzes.length; i++){
			
			clazzes[i].properties.coords[0].x = getX(clazzes[i]);
			clazzes[i].properties.coords[0].y = getY(clazzes[i]);
			
		}
	}
	/* 
		The function getX take an element of the json for the classes and returns 
		the x coordinate of that class. 
	*/
	function getX(cls){
		
		if(!((cls.properties.name.substring(0,10)) === "background")){
		
			if(firstTime){
				x = xCls;
				firstTime = false;
			}else if(x < (width -2*(size+gap))){
				x +=  size + gap;
			}else{
				rowCount++;
				x = xCls;
			}
			return x;
		}
	}
	/* 
		The function getY take an element of the json for the classes and returns 
		the y coordinate of that class. 
	*/
	function getY(cls){
		
		if(!((cls.properties.name.substring(0,10)) === "background")){
			if(rowCount == 0){
				y = yCls ;
			}else{
				y = rowCount * (rowHeight + vGap) + yCls;
			}
			return y;
		}
	}
	/* 
	This function swaps the alternating background colours.
	*/
	function swapBG(){
		if( pkgClr === bgClr1){
			pkgClr = bgClr2;
		}else{
			pkgClr = bgClr1;
		}
	}
	/* ********************************** renderClazzes ************************** */

	/* 
	This function adds a group element to the base group element and append rectangles
	to it. It takes classes as parameter and pass the classes data to the selection. 
	It defines the different attributes of the rectangle. The attributes are dependent
	on the values of the class data. the attribute class depends on the value of cls.
	properties.isInterface. If truethe attribute class will be 'circ' otherwise 'node'.
	the attribute height depends on cls.id and cls.properties.isInterfaceIf cls.id is 
	'a' height= rowHeight  if cls.properties.isInterface is true height= 0 otherwise 
	height = size. Each rectangle representing the classes is attached a text, the 
	name of the class/interface and the value of coupling.
	*/
	function renderClazzes(data,val,nodeClass){
		var g1 = canvas.append("g");
		 g1.selectAll("." + nodeClass)   
				.data(data)  
			.enter().append("rect")  // enter
				.attr("class", function(d){
					return nodeClass;}	);
		 g1.selectAll("." + nodeClass)  
		   .data(data)
				.exit().remove();
		
		//Update
		 g1.selectAll("." + nodeClass)
			.data(data)
			.attr("id", function(d) { return d.id; })
			.attr("x", function(d) { 
				console.log("x");
				console.log(d.properties.coords[0].x);
				return d.properties.coords[0].x ; })
			.attr("y", function(d,i) { 
				console.log("y");
				var tepmY;			 
				if((d.id.indexOf("_FI") == -1) &&  (d.id.indexOf("_DI") == -1)   &&  
					(d.id.indexOf("_NI") == -1)   && (d.id.indexOf("_IF") == -1) ){ 
					d.properties.coords[0].y0 = 0;
				}else if((d.id.indexOf("_FI") > -1) ||  (d.id.indexOf("_DI") > -1)|| 
						(d.id.indexOf("_NI")
						> -1)   || (d.id.indexOf("_IF") > -1) ){
					d.properties.coords[0].y0 = (parseInt(d.properties.coords[0].y/yMargin) - 1) *
					(rowHeight + vGap)  + yCls;
				}
				console.log(d.properties.coords[0].y0 + d.properties.coords[0].y);
				console.log(d.id);
				console.log(d.properties.coords[0].y0);
				console.log(d.properties.coords[0].y);
					return d.properties.coords[0].y; 
				})
			.attr("height", function(d,i) { 
				var h;
				var hh;
				 var interfaced = d.properties.noOfInterfaceOrAbstract;
				 var foreignInheritance = d.properties.noOfCalssWithForeignInheritance;
				 var directInheritance = d.properties.noOfDirectcalss;
				 var nativeInheritance = d.properties.noOfCalssWithNativeInheritance;
				 var total = interfaced + foreignInheritance + directInheritance + nativeInheritance;
				 var percentage = 1;
				if(val == 0){
					if(d.id == "a"){
						h = rowHeight;
					}else if(d.properties.isInterface){
						addCircleData(d);
						h = 0;
					}else if(d.properties.cbowithAbstract == 0){
						h = COUPLINGVIZ_NOCLASS_HEIGHT;
					}else {
						h = size;} 
					
				 }else{
					if(d.id.indexOf("_FI") > -1){ 
						percentage = foreignInheritance/total;
					} 
					if(d.id.indexOf("_DI") > -1){
						percentage = directInheritance/total;
					}  
					if(d.id.indexOf("_NI") > -1){
						percentage = nativeInheritance/total;
					}  
					if(d.id.indexOf("_IF") > -1){ 
						percentage = interfaced/total;
					}

					if(d.id == "a"){
						h = rowHeight;
					}else if(d.properties.isInterface){
						addCircleData(d);
						h = 0;
					}else if(d.properties.cbowithAbstract == 0){
						h = COUPLINGVIZ_NOCLASS_HEIGHT;
					}else {
						var tempH = val * ( 2*d.properties.cbowithAbstract); 
						
						if(percentage < 1){
							gPercentage += percentage;
							if(!heightAssigned){
								h = tempH;
								gHeight = tempH * percentage;
								gTotalH += gHeight;
								heightAssigned = true;
							}else{
								
								if(gPercentage < 1){
									h = tempH - gTotalH;
									gHeight = tempH * percentage;
									gTotalH += gHeight;
									
								}else{
									h = tempH * percentage;
									gHeight = 0;
									gPercentage = 0;
									gTotalH = 0;
									heightAssigned = false;
								}
							}
													
						}else{
							h = tempH;
							gHeight = 0;
							gPercentage = 0;
							gTotalH = 0;
							heightAssigned = false;
						}
						if(h > (gScaleFactor * val) + size){
							var rectData = [];
							var diffH = h - ((gScaleFactor * val) + size);
							h = (gScaleFactor * val) + size;
							
							diffH = diffH * .01;
							rectData = addRectData(d.properties.coords[0].x - 
							EXTENSION_OFFSET ,  d.properties.coords[0].y + size + 
							(gScaleFactor * val) + ( gScaleFactor * val)*
							(parseInt((d.properties.coords[0].y - yMargin)/
							(rowHeight + vGap))) , (2 * EXTENSION_OFFSET) + size, diffH );
							appendRect(rectData,d.properties.name + ":" +
									d.properties.cbowithAbstract, "overflowRect");
							
						}
					}
				 }
				return h;})
			.attr("width",function(d) { 
				if(d.id == "a"){
					
					return d.properties.targets[0]; 
				}else if(d.properties.isInnercalss){
					return size/2;
				}else if(d.properties.isInterface){
					return 0;
				}
				else{
					return size; }})
			.style("fill",function(d){
				return d.properties.clr; })  
			.on("click", function(d){clicked(d)})
			.on("mousemove", function (d) {
					var m = d3.mouse(this);
					mx = m[0];
					my = m[1];
					return toolMove(mx, my, d);
			})
			.append('title')
			.text(function(d) { 
				if(!(d.id === "a")){
					return d.properties.name + ":" + d.properties.cbowithAbstract;
				}
			});							
	}	

	/*
	 * The function addCircleData takes a class (a json object) and create another 
	 * JSON object  that can represent an interface then populate (with push) the
	 * circle array with this JSON. The function addCircleData is called within the 
	 * function renderClazzes when assigning the height attribute, if cls.properties.
	 * isInterface is true, addCircleData is called with the selected class passed in.
	 */
	function addCircleData(cls){
		circles.push({id:cls.id, packagename:cls.packagename,
			properties:{name:cls.properties.name, isInterface : cls.properties.isInterface, 
				isInnerCls : cls.properties.isInnerCls, coords:{x:cls.properties.coords[0].x,
					y: cls.properties.coords[0].y}, targets:[]}});
	}


	/* *********************************    clicked    ************************ */
	function clicked(selected){
			if(selected.id != "a"){
				gSelectedNode = selected;
			}else{
				gSelectedNode = null;
			}
			
			d3.selectAll(".line").remove();
			d3.selectAll(".highlightNode").remove();
			d3.selectAll(".arrowzH").remove();
			d3.selectAll(".arrowz").remove(); 
		
			var g2 = canvas.append("g");
			
			var tempY = selected.properties.coords[0].y;   
			var localVal = parseInt(scaleVal); // turns the string scaleVal into int
			if( selected.id !="a" && !selected.properties.noOfTotalCouples == 0 ){  
					switch(scaleVal){
					case "0":
						selected.properties.coords[0].y = tempY  + ( gScaleFactor * localVal)*(parseInt((selected.properties.coords[0].y-yMargin)/(rowHeight + vGap)));
						break;
					case "1":
						selected.properties.coords[0].y = tempY + ( gScaleFactor * localVal)*(parseInt((selected.properties.coords[0].y-yMargin)/(rowHeight + vGap)));
						break;
					case "2":
						selected.properties.coords[0].y = tempY + ( gScaleFactor * localVal)*(parseInt((selected.properties.coords[0].y-yMargin)/(rowHeight + vGap)));
						break;
					case "3":
						selected.properties.coords[0].y = tempY + ( gScaleFactor * localVal)*(parseInt((selected.properties.coords[0].y-yMargin)/(rowHeight + vGap)));
						break;
					default:
						break;
				}
			}
			var xCoord = selected.properties.coords[0].x;
			xCoord = xCoord + size/2;
			var yCoord = selected.properties.coords[0].y;
			if(scaleVal == "0"){
				yCoord = yCoord +  size/2;
			}else{
				if(scaleVal *(size +	 selected.properties.cbowithAbstract) > (gScaleFactor * scaleVal) + size ){
					yCoord = yCoord +  (((gScaleFactor * scaleVal) + size )/2);
				}else{
					yCoord = yCoord +  (size + (localVal * selected.properties.cbowithAbstract)/2);
				}
			}
			var len = selected.properties.targets.length;
			var path = "M" + xCoord + "," + yCoord;   
			var allPath = "";
			tooltipArrow.style("visibility", "hidden");
			var rectData = [];
			rectData = addRectData(selected.properties.coords[0].x - 1, selected.properties.coords[0].y - highlightRectSize - gapBeteenClsNHighlightRect, highlightRectSize, highlightRectSize);
			if(selected.id != "a"){
				console.log(selected);
				appendRect(rectData, selected.packagename,"highlightNode");
			}
			var tempYArr =[];
			for(var i=0; i < len; i++){
				var targetId = selected.properties.targets[i];
				var targetClz = getClazz(targetId);
				tempYArr[i] = targetClz.properties.coords[0].y;
					switch(scaleVal){
						case "0":
							targetClz.properties.coords[0].y = targetClz.properties.coords[0].y + ( gScaleFactor * localVal)*(parseInt((targetClz.properties.coords[0].y-yMargin)/(rowHeight + vGap)));
							break;
						case "1":
							targetClz.properties.coords[0].y = targetClz.properties.coords[0].y + ( gScaleFactor * localVal)*(parseInt((targetClz.properties.coords[0].y-yMargin)/(rowHeight + vGap)));
							break;
						case "2":
							targetClz.properties.coords[0].y = targetClz.properties.coords[0].y + ( gScaleFactor * localVal)*(parseInt((targetClz.properties.coords[0].y-yMargin)/(rowHeight + vGap)));
							break;
						case "3":
							targetClz.properties.coords[0].y = targetClz.properties.coords[0].y + ( gScaleFactor * localVal)*(parseInt((targetClz.properties.coords[0].y-yMargin)/(rowHeight + vGap)));
							break;
						default:
							break;
					}
					var pathArrow =  addArrowPath(targetClz.properties.coords[0].x, targetClz.properties.coords[0].y,ARROW);
					drawArrow(selected, targetClz, pathArrow,ARROW);
				targetId = "#" + targetId;
				var target = d3.select(targetId);
				var xTrgCoord = targetClz.properties.coords[0].x;   
				var yTrgCoord = targetClz.properties.coords[0].y;    
				if(!hideLines){
				allPath +=   path + "L" + xTrgCoord  + "," +  yTrgCoord;
				}
			}
				selected.properties.coords[0].y = tempY;
				for(var i=0; i < len; i++){
					var targetId1 = selected.properties.targets[i];
					var targetClz1 = getClazz(targetId1);
					targetClz1.properties.coords[0].y = tempYArr[i];
				}
				g2.selectAll(".line")
				 .data(clazzes)
				 .enter()
					.append("path")
					.attr("class", "line")
					.attr("id", function(d) {
						return d.properties.id;
						})
					.attr("d", allPath)
					.style("stroke-width", 0.01)
					.style("stroke", "#000")
					.style("fill", "#fff")
				 ;
	}
	/* **********************************     addRectData   ********************** */
	function addRectData(x, y, width, height){
		var rects =[
				{ "x":x , "y":y , "width":width , "height":height }
				];
		return rects;
	}
	/* ***************************************     getClazz  ********************* */
	/*
	 * The function takes classID as parameter and finds the class with that classID 
	 * and returns the class.
	 */
	function getClazz(classID){
		
		var clz = [];
		var tempID;
		for( var i = 0; i < clazzes.length; i++){
			if(clazzes[i].id === 'ID_Log4JLogChute_NI'){
				console.log("clazzes[i].id  " + clazzes[i].id ); 
			}
			tempID =clazzes[i].id;
			if(clazzes[i].id.lastIndexOf('_') > 3){
				var idSuffix = clazzes[i].id.substring(clazzes[i].id.lastIndexOf('_')+1,clazzes[i].id.length);
				if(idSuffix === 'DI' || idSuffix === 'FI' || idSuffix === 'NI' || idSuffix === 'IF'){
					tempID = clazzes[i].id.substring(0,clazzes[i].id.length-3); 
				}
			}	
			if(classID === tempID ) { 
				clz = clazzes[i];
				break;
			}
		}
		return clz;
	}
	/*  ***************************     appendRect     ************************** */
	/*
	 * The function appendRect draws rectangle based on the passed in data and
	 * attaches the package name as title.
	 */
	function appendRect(data,pkg, cssCls){
		  g2 = canvas.append("g");
		  g2.selectAll("." + cssCls)
			.data(data).enter()
			.append("rect")
			.attr("class", cssCls)
			.attr("x", function(d) { return d.x; })
			.attr("y", function(d) { return d.y; })
			.attr("height", function(d) { return d.height; })
			.attr("width", function(d) { return d.width; })
			.append("title")
			.text(pkg);
	}
	/*  ************************     addArrowPath     *************************** */
	function addArrowPath(x,y,arrowType){
		if(arrowType == ARROW){
			var arrowY = y - gapBeteenClsNHighlightRect;
			var arrowHeight = (y - gapBeteenClsNHighlightRect) - 2*size/4;
			var arrowPath = "M" + x + "," + arrowY + "L" + x + "," + arrowHeight + " "  + ( x+size+4) + "," + (arrowHeight + size/3) + "Z";
			console.log("arrowPath ....  ");
			console.log(arrowPath);
		}else if(arrowType == ARROW_HIGHLIGHT){
			var arrowPath = "M" + (x - 4) + "," + (y + size) + "L" + (x - 4) + "," + (y - size/2) + " "  + ( x+size+5) + "," + (y + size/2) + "Z";
			console.log("arrowPath 1....  ");
			console.log(arrowPath);
		}
		return arrowPath;
	}

	/*  *****************************     drawArrrow     ************************* */
	/* This function draws an arow over a target when a class is selected. It will 
	 * draw the arrow with the colour representing the object oriented mechanism of 
	 * the coupling involved betqeen the target and the source. If the coupling 
	 * involves more than one type of  * object oriented mechanism, this will be 
	 * displayed by drawing an additional arrow above the other with a different 
	 * colour. The  * drawArrowUpper function is called to draw the upper arrow.
	 *  
	 */
	function drawArrow( selected, target,path,arrowType){
		var g6 = canvas.append("g");
		console.log(" target in drawArow");
		console.log(target);
		console.log(" selected in drawArow");
		console.log(selected);
		var arc = d3.svg.symbol().type('triangle-up')
				   .size(function(d){ return scale(d); });
		var scale = d3.scale.linear()
							.domain([1,6])
							.range([1,1.5]);
		var data = [250]; 
		console.log("target.properties.coords.x, +','+ target.properties.coords.y " + target.properties.coords[0].x +', '+ target.properties.coords[0].y );
		g6.selectAll(".arrowz")
		 .data(data).enter()
		 .append("path")
		 .attr("class", function(){
				if(arrowType == ARROW){
					return "arrowz";
				}else if(arrowType == ARROW_HIGHLIGHT){
					return "arrowzH";
				}})
		 .attr("d", path)
		 .style("stroke-width", .5)
		 .style("fill-opacity",function(){
				if(arrowType == ARROW){
					return 1;
				}else if(arrowType == ARROW_HIGHLIGHT){
					return .1;
				}})
		 .style("stroke",  function(){
				if(arrowType == ARROW){
					console.log("classID2target.properties.isTarget-stroke  " + target.properties.isTarget);
					var strokeClr = DIRECT_COLOUR;
					var strokeClrUp = DIRECT_COLOUR;
					var targetID = target.id;
					targetID = targetID.substring(3,targetID.length);
					var idSuffix = targetID.substring(targetID.lastIndexOf('_')+1,targetID.length);
					var upper = false;
					if(idSuffix =="IF" || idSuffix =="DI" ||idSuffix =="FI" || idSuffix =="NI"){ //(targetID.indexOf('_') > 0)
						targetID = targetID.substring(0,targetID.indexOf('_'));
					}
					if(selected.properties.isTarget){
						if(selected.properties.targetTypes[targetID].isInterfaceTarget){
							strokeClrUp = INTERFACE_COLOUR;
							upper = true;
						}
						if(selected.properties.targetTypes[targetID].isLocalInheritanceTarget){
							strokeClrUp = NATIVE_COLOUR;
							upper = true;
						}
						if(selected.properties.targetTypes[targetID].isForeignInheritanceTarget){
							strokeClrUp = FOREIGN_COLOUR;
							upper = true;
						}
						if(selected.properties.targetTypes[targetID].isDirectTarget){
							strokeClr = DIRECT_COLOUR;
							if(upper){
								drawArrowUpper( selected, target, strokeClrUp, ARROW)
							}
						}else{
							strokeClr = strokeClrUp;
						}
					}	
					return strokeClr;
				}else if(arrowType == ARROW_HIGHLIGHT){
					return "black";
				}})
		 .style("fill", function(){
				if(arrowType == ARROW){
					var fillClr = DIRECT_COLOUR;
					var fillClrUp = DIRECT_COLOUR;
					var upper = false;
					console.log("classID2target.properties.isTarget- fill " + selected.properties.isTarget +   selected.id);
					var targetID = target.id;
					targetID = targetID.substring(3,targetID.length);
					var idSuffix = targetID.substring(targetID.lastIndexOf('_')+1,targetID.length);
					if(idSuffix =="IF" || idSuffix =="DI" ||idSuffix =="FI" || idSuffix =="NI"){ //(targetID.indexOf('_') > 0)
						targetID = targetID.substring(0,targetID.indexOf('_'));
					}
					if(selected.properties.isTarget){
						if(selected.properties.targetTypes[targetID].isInterfaceTarget){
							fillClrUp = INTERFACE_COLOUR;
							upper = true;
						}
						if(selected.properties.targetTypes[targetID].isLocalInheritanceTarget){
							fillClrUp = NATIVE_COLOUR;
							upper = true;
						}
						if(selected.properties.targetTypes[targetID].isForeignInheritanceTarget){
							fillClrUp = FOREIGN_COLOUR;
							upper = true;
						}
						if(selected.properties.targetTypes[targetID].isDirectTarget){
							fillClr = DIRECT_COLOUR;
							if(upper){
								drawArrowUpper( selected, target, fillClrUp, ARROW)
							}
						}else{
							if(upper){
								fillClr = fillClrUp;
							}	
						}
					}				
					return fillClr;
				}else if(arrowType == ARROW_HIGHLIGHT){
					return "white";
				}})
		 .on("click", function(){
				if(arrowType == ARROW){
					clickedArrow(selected, target,ARROW);
				}else if(arrowType == ARROW_HIGHLIGHT){
					clickedArrow(selected, target, ARROW_HIGHLIGHT);
				}
			})
			.append('title')
			.text(function(d) { 
				if(arrowType == ARROW_HIGHLIGHT){
					return target.properties.name;
				}else if(arrowType == ARROW){
					if(target.id in  selected.properties.targetMethods){
						var t = selected.properties.targetMethods[target.id].length;
						return target.properties.name + ' x'+ t;
					}
				}
			});		
	}
	/*  ***************************     drawArrrow     **************************** */

	function drawArrowUpper( selected, target, clr, ARROW){
		var g6 = canvas.append("g");
		console.log(" target in drawArow");
		console.log(target);
		console.log(" selected in drawArow");
		console.log(selected);
		path = addArrowPath(target.properties.coords[0].x, target.properties.coords[0].y - size,ARROW);
		var arc = d3.svg.symbol().type('triangle-up')
				   .size(function(d){ return scale(d); });
		var scale = d3.scale.linear()
							.domain([1,6])
							.range([1,1.5]);
		var data = [250]; 
		console.log("target.properties.coords.x, +','+ target.properties.coords.y " + target.properties.coords[0].x +', '+ target.properties.coords[0].y );
		g6.selectAll(".arrowz")
		 .data(data).enter()
		 .append("path")
		 .attr("class","arrowz")
		 .attr("d", path)
		 .style("stroke-width", .5)
		 .style("fill-opacity",1)
		 .style("stroke",  clr)
		 .style("fill",clr)
		 .on("click", function(){
					clickedArrow(selected, target,ARROW);
			});
	}
	/*  *************************     clickedArrow     ************************** */
	function clickedArrow(selected, target, arrowType ){
		
		
		
		if(arrowType == ARROW){
			if(!arrowClicked){
				console.log(" in ARROW when false ")
				var path;
				var localVal = parseInt(scaleVal);
				 
				if(scaleVal != "0"){
					path =  addArrowPath(target.properties.coords[0].x, target.properties.coords[0].y + ( gScaleFactor * localVal)*(parseInt((target.properties.coords[0].y-yMargin)/(rowHeight + vGap))),ARROW_HIGHLIGHT);
				}else{
					path =  addArrowPath(target.properties.coords[0].x, target.properties.coords[0].y,ARROW_HIGHLIGHT);
				}
				drawArrow(selected, target, path, ARROW_HIGHLIGHT); 
				toolOverArrow();
				showTooltip(selected,target);
				arrowClicked = true;
			}else{
				console.log(" in ARROW when true ")
				toolOutArrow();
				d3.selectAll(".arrowzH").remove();
				arrowClicked = false;
			}
		}else if(arrowType == ARROW_HIGHLIGHT){
			if(arrowClicked){
				console.log(" in ARROW_HIGHLIGHT when true ")
				toolOutArrow();
				d3.selectAll(".arrowzH").remove();
				arrowClicked = false;
			}
		}
	}
	/* *******************************     toolOver      ************************ */
	/* 
		toolOver sets the type of cursor when mouseover a class node(rect) and sets
		also the cursor visible
	*/	
	function toolOver(v, thepath) {

		d3.select(thepath).style({
			"cursor":"pointer"
		});
		return tooltipArrow.style("visibility", "visible");
	};

	function toolOverArrow() {
		tooltipArrow.style({
			"cursor":"pointer"
		});
		return tooltipArrow.style("cursor","pointer");
	};

	function tooltipScroll(){
		var scrollable = d3.select("#tt"); 
		scrollable.transition()
				  .delay(1500)
				  .duration(7500)
				  .tween("tooltipScroll", scrollTopTween(200));

	}

	function scrollTopTween(scrollTop) { 
		return function() { 
			var i = d3.interpolateNumber(this.scrollTop, scrollTop); 
			return function(t) { this.scrollTop = i(t); }; 
		}; 
	} 


	function toolOutArrow() {
		tooltipArrow.style({   
			"cursor":""
		});
		return tooltipArrow.style("visibility", "hidden");
	};


	/* ***************************      toolOut          ************************** */
	/* 
		toolOut sets the type of cursor when mouseout a class node(rect) and sets 
		also the cursor hidden.
	*/	
	function toolOut(m, thepath) {
		d3.select(thepath).style({
			"cursor":""
		});
		return tooltipArrow.style("visibility", "hidden");
	};

	/* *****************************   toolMove    ********************************** */
	/* 
		toolMove sets the type of cursor when mouseover a class node(rect) and sets 
		also the cursor visible
	*/	
	function toolMove(mx, my, data) {

		return  tooltipArrow.style("top", my + 100 + "px").style("left", mx +100 + "px");
	};


	/* ***************************   showTooltip    ****************************** */
	/* 
		toolMove sets the type of cursor when mouseover a class node(rect) and sets
		also the cursor visible
	*/	
	function showTooltip(selected, target) {

		var collaborationDirection;
		if(collaborationModeIn){
			collaborationDirection = "to";
		}else{
			collaborationDirection = "from";
		}
		console.log("selected in showTooltip");
		console.log(selected);
		console.log("target in showTooltip");
		console.log(target);
		var tempID; 
		if(target.id[target.id.length-3] === "_"){
			tempID = target.id.substring(0,target.id.length-3);
		}else{
			tempID = target.id;
		}
		var tempMethods = "";
		for(var i = 0; i < selected.properties.targetMethods[tempID].length; i++){
			tempMethods += selected.properties.targetMethods[tempID][i];
			tempMethods += "<br>";
		}  
		return tooltipArrow.style("top", (selected.properties.coords[0].y ) + "px").style("cursor","pointer").style("left", selected.properties.coords[0].x + "px").style("visibility", "visible").html("<div class = 'itemconfiguration' id='tipContainer'><div id='tipLocation'><b>  " + selected.properties.name + "</b></div><div id='tipKey'>  <b> " + target.properties.name + "</b><br>" + collaborationDirection + "<br><b>" + selected.properties.name + "</b><br><hr> <b>" + tempMethods +	
		"</b></div><div class='tipClear'></div> </div>");
	};


	/*
	 * The function addInterfaces appends a group element to the svg contatiner. the 
	 * group element then selects all classes of 'circ' adds the circles data and 
	 * append circles which will take attributes from the circles data. The purpose 
	 * of this function is to represent Intrefaces in the JSON objects as circles.
	 */
	function addInterfaces(){
		var g3 = canvas.append("g");
			g3.selectAll(".circ")
			 .data(circles)
			 .enter().append("circle")
			 .attr("class", "circ")
			 .attr("cx", function(d) {
				 console.log(d.properties.coords);
				 return d.properties.coords.x + 2;})
			 .attr("cy", function(d) { return d.properties.coords.y ;})
			 .attr("r", radius)
			 .style("fill", "gray")
			 .style("fill-opacity", 0.0)
			 .style("stroke-width", 0.3)
			 .append("title")
			 .text(function(d){ return d.properties.name + ":" + 0;});
			 
	}
	/* 
		This function adds a package marker by appending a g element to the base group 
		element g. The	package marker is drawn as a line with dashed stroke. 
	*/
	 function addPackageMarker(classes){
		packagenameOfClass = "abc";
		var dashedLines = [];
		 g1 = canvas.append("g");
		 
		for(var i = 0; i < classes.length; i++){
			dashedLines = addLineData(classes[i].properties.coords[0].x, classes[i].properties.coords[0].y);
			if(!(packagenameOfClass === classes[i].packagename)){
				var g2 = canvas.append("g"); 
				g2.selectAll(".marker")
				.data(dashedLines)
				.enter().append("line")
				.attr("class","marker")
				.attr("x1", function(d){ 
					return d.x1})
				.attr("x2", function(d){
					return d.x2})
				.attr("y1", function(d){ 
					return d.y1})
				.attr("y2", function(d){ 
					return d.y2})
				.style("stroke-dasharray", ".8,.8")
				.style("stroke","black")
				.style("stroke-width",3)
				.append('title')
				.text(classes[i].packagename);
				packagenameOfClass = classes[i].packagename;
				
			}
		}
	}



	 /* 
		The function addLineData takes two parameters x and y and create a one element
		array of json object.
	 */
	 function addLineData(x,y){
		var dlines =[
				{ "x1":x - packageGap, "y1":y - 5, "x2":x -packageGap, "y2":y }
				];
		return dlines;
	 }
	/* *********************************************************   */
	function displayLines(cb){

		if(!cb.checked){
			d3.selectAll(".line").remove();
			hideLines = true;
		}else{
			hideLines = false;
			clicked(gSelectedNode);
		}
		
	}
	/*
	 * The function swapCollaboration is an onclick function call for the radio buttons
	 * on the Display view. It takes the radio object that is just clicked as parameter.
	 * Based on the value of this radio object, the corresponding JSON array is assigned 
	 * to the clazzes variable that holds the JSON objects and the screen is redrawn on 
	 * the basis of the assigned JSON objects.
	 */
	function swapCollaboration(radio){
		if(radio.value === "fanin"){
			clazzes = JSON.parse(document.getElementById('fanin').textContent);    
			collaborationModeIn = true;
			displayBg = true;
			redrawComponents();
			
		}else{ 
			clazzes = JSON.parse(document.getElementById('fanout').textContent);     
			collaborationModeIn = false;
			redrawComponents();
			displayBg = false;
			
		}
		restoreState();
	}
	function restoreState(){
		var tempID;
		for(var i = 0; i < clazzes.length; i++){
			if(gSelectedNode != null){
				if(gSelectedNode.id[gSelectedNode.id.length-3] == "_"){
					tempID = gSelectedNode.id.substring(0,gSelectedNode.id.length-3);
					if(tempID == clazzes[i].id){
						gSelectedNode =  clazzes[i];
					}
				}else if(clazzes[i].id[clazzes[i].id.length-3] == "_"){
					tempID = clazzes[i].id.substring(0,clazzes[i].id.length-3);
					if(tempID == gSelectedNode.id){
					}
				}else if(clazzes[i].id == gSelectedNode.id){
					gSelectedNode =  clazzes[i];
				}
			}
		}
		if(scaleVal != "0"){
			stackD = undefined;
			scaleNodes(scaleVal);
		}
	}
	/*
	 * The function displayPackageBg is an onclick function for the 'packages' checkbox
	 * on the Display view. It takes the checkbox object as parameter. Depending on
	 * whether the checkbox is checked or not, the function displayes or hides the 
	 * background and redraws the screen.
	 */
	function displayPackageBg(val){
		if(val.checked){
			pkgClr = bodyClr;
			bgClr12= bodyClr;
			if(collaborationModeIn && displayBg){ //|| !displayBg
				clazzes = JSON.parse(document.getElementById('fanin').textContent); 
			}else{
				clazzes = JSON.parse(document.getElementById('fanout').textContent); 
			}
		}else{
			
			pkgClr = bgClr1;
			var bg =d3.selectAll(".nodebg");
			bg.remove();
		}
	}
	/*
	 * The reset function resets most of the gloabal variables to the original values.
	 */
	function reset(){
	 color = d3.scale.category20();	
	 gap = 6;
	 xMargin = 100;
	 yMargin = 100;
	 size = 4;
	 colr ="gray";
	 x = xMargin;
	 y = 0;
	 rowCount = 0;
	 firstTime = true;
	 count = 1;
	 rowHeight = 18;
	 xCls = xMargin + xIndent  ;
	 yCls = yMargin + rowHeight - size
	 vGap = 3;
	 radius = 2;
	 circles = [];
	 bgClr1 = "#ffaabb"; 
	 bgClr2 = "#ffbbaa"; 
	 packagenameOfClass = "abc";
	 dashedLines = [];
	}
	/*
	 * The function redrawComponents redraws the screen by resting the global values 
	 * to original and removing any existing svg elements and finally drawing the 
	 * screen again with class/interface values. 
	 */
	function redrawComponents(){
		reset();
		canvas.selectAll(".nodebg").remove();
		canvas.selectAll(".node").remove();
		canvas.selectAll(".circ").remove();
		canvas.selectAll(".marker").remove();
		canvas.selectAll(".line").remove();
		canvas.selectAll(".highlightNode").remove();
		drawComponents();
	}


	function restore(){
		redrawComponents();
		restoreState();
	}

	function checkObj(obj,arr){
		var bol = false;
		for(var i = 0; i < arr.length; i++){
			if(arr[i] == obj){
				bol = true;
			}
		}
		return bol;
	}	

	/* ************************** stackData ************************************* */
	/* The function stackData calls the splitNodes function to split the classes with
	 * couplings involving OO mechnism and stacks the y- coordinate preparing them 
	 * for the segments in the bar view.  
	 */
	function stackData(data){
		var layers1 = splitNodes(clazzes);
		var stacked ;
		var layersAll = [];
		var stack = d3.layout.stack()
			.values(function(d) { return d.properties.coords; })
			.x(function(d) { return d.x; })
			.y(function(d) { return d.y; });
		for(var i = 0; i < layers1.length; i++){
			if(layers1[i].id.indexOf("_FI") != -1 ||  layers1[i].id.indexOf("_DI") != -1   ||  layers1[i].id.indexOf("_NI") != -1   ||layers1[i].id.indexOf("_IF") != -1 ){   
				var temp =[];
				temp.push(layers1[i]);
				stacked = stack(temp);
				layersAll.push(temp[0]);
			}else {
				layersAll.push(layers1[i]);
			}
		}
		return layersAll;
	}
	/* ************************ reverseStack  ************************************ */
	function reverseStack(data){
		var substituted = false;
		var tempData = null;
		var line ="";
		var deleteID = "";
		var orgY = 0;
		for(var i = 0; i < data.length; i++){
			
			if(data[i].properties.coords[0].y >= orgY){
				orgY = data[i].properties.coords[0].y;
			}
			if(spliced){
				i--;
				spliced = false;
			}
			if(data[i].id[data[i].id.length-3] === '_'){
				var tempID = data[i].id.substring(0,data[i].id.length-3);
			}
			if(line != tempID){
				substituted = false;
			}
			if(data[i].id.indexOf("_FI") != -1 ){  
				deleteID = data[i].id;
				line = data[i].id.substring(0,data[i].id.length-3);
				tempData =  data.splice(i,1);
				spliced = true;
			}else
			if(data[i].id.indexOf("_NI") != -1 ){  
				deleteID = data[i].id;
				line = data[i].id.substring(0,data[i].id.length-3);		
				tempData =  data.splice(i,1);
				spliced = true;
			}else
			if(data[i].id.indexOf("_IF") != -1 ){ 
				deleteID = data[i].id;
				line = data[i].id.substring(0,data[i].id.length-3);
				tempData =  data.splice(i,1);
				spliced = true;
			}else
			if(data[i].id.indexOf("_DI") != -1 ){ 
				deleteID = data[i].id;
				line = data[i].id.substring(0,data[i].id.length-3);
				tempData =  data.splice(i,1);
				spliced = true;		
			}
			if(deleteID.indexOf("_FI") != -1 || deleteID.indexOf("_NI") != -1 || deleteID.indexOf("_IF") != -1 || deleteID.indexOf("_DI") != -1 ){
				var dd = 0;
				if(line === tempID){
					if(!substituted){
						tempData[0].id = line;
						tempData[0].properties.coords[0].y = orgY;	
						tempData[0].properties.clr = tempData[0].properties.rsrvClr;
						data.splice(i,0,tempData[0]);
						spliced = false;
						substituted = true;
					}
				}else{
					line = tempID;
				}
			}
		}
		return data;
	}

	/* ********************************** scaleNodes  **************************** */
	function scaleNodes(val){
		var newGap = 0;
		var newHeight = 0;
		var newbgh = 0;
		var scaling = 0;
		var background = d3.selectAll(".nodebg")
					.transition().remove();
		legendOff = false;
		d3.selectAll(".node")
			.transition().remove();
		d3.selectAll(".marker")
			.transition().remove();
		d3.selectAll(".circ")
			.transition().remove();
		d3.selectAll(".overflowRect")
			.transition().remove();
		
		switch(val){
			case "0":
				legendOff = true;
				displayLegend();
				background.transition()
				.attr("height", function(){
					return rowHeight + gScaleFactor*val;
				} );
				clazzes = reverseStack(stackD);
				clazzes = stackD;
				renderClazzes(clazzes,0, "node");
				stackD = undefined;
				addInterfaces();
				addPackageMarker(clazzes);
				break;
			case "1":
				d3.select(".legend")
					.data([2,5])
					.enter().append("rect")
						.attr("class", "legend")
					.attr("x",600)
					.attr("y",50);
				background.transition()
				.attr("height", function(){
					return rowHeight + gScaleFactor*val;
				} );
				
				if(stackD == undefined){;
					stackD = stackData(clazzes);
				}
				renderClazzes(stackD,1, "node"); 
				addInterfaces();
				addPackageMarker(stackD);
				displayLegend();
				break;
			case "2":
				background.transition()
				.attr("height", function(){
					return rowHeight + gScaleFactor*val;
				} );
				
				if(stackD == undefined){;
					stackD = stackData(clazzes);
				}
				renderClazzes(stackD,2, "node");
				addInterfaces();
				addPackageMarker(stackD);
				displayLegend();
				break;
			case "3":
				background.transition()
				.attr("height", function(){
					return rowHeight + gScaleFactor*val;
				} );
				
				if(stackD == undefined){;
					stackD = stackData(clazzes);
				}
				renderClazzes(stackD,3, "node");
				addInterfaces();
				addPackageMarker(stackD);
				displayLegend();
				break;
			default:
				break;
		}
		scaleVal = val;
		var translateVal = 0;
		d3.selectAll(".nodebg")
		 .attr("transform",function(d) { 
				if((d.properties.coords[0].y > yMargin + rowHeight)){
					translateVal =(((gScaleFactor * val)*(d.properties.coords[0].y - yMargin)/(rowHeight + vGap)) );
					return "translate(0," +   translateVal  +")";
				}});
		d3.selectAll(".node")
		 .attr("transform",function(d) { 
				if((d.properties.coords[0].y > yMargin + rowHeight)){
					translateVal = ( gScaleFactor * val)*(parseInt((d.properties.coords[0].y - yMargin)/(rowHeight + vGap)));
					return "translate(0," + translateVal  + ")";
				}});
		
		d3.selectAll(".hightlightNode")
		 .attr("transform",function(d) { 
				if((d.properties.coords[0].y > yMargin + rowHeight)){
					translateVal = ( gScaleFactor * val)*(parseInt((d.properties.coords[0].y - yMargin)/(rowHeight + vGap)));
					return "translate(0," + translateVal  + ")";
				}});
		d3.selectAll(".marker")
		 .attr("transform",function(d) { 
			 if((d.y2 > yMargin + rowHeight)){
					return "translate(0," +  ( gScaleFactor * val)*(parseInt((d.y2-yMargin)/(rowHeight + vGap))) + ")";
		 }});
		d3.selectAll(".circ")
		 .attr("transform",function(d) { 
			 if(d.properties.coords.y  > yMargin + rowHeight){
					return "translate(0," +   ( gScaleFactor * val)*(parseInt((d.properties.coords.y -yMargin)/(rowHeight + vGap))) + ")";
			 }});
		
		d3.selectAll(".arrowzH")
		 .attr("transform",function(d) { 
			 if(d.properties.coords.y  > yMargin + rowHeight){
					return "translate(0," +   ( gScaleFactor * val)*(parseInt((d.properties.coords.y -yMargin)/(rowHeight + vGap))) + ")";
			 }});
		
		if(gSelectedNode != null){
			clicked(gSelectedNode);
		}
	}
	/* ********************************  checkObj ********************************* */
	/* The checkObj function takes two parameters an object and an array and checkes 
	 * if the object is in the array and returns true if it finds the object in the
	 * array or false otherwise.
	 */
	function checkObj(obj,arr){
		var bol = false;
		for(var i = 0; i < arr.length; i++){
			if(arr[i] == obj){
				bol = true;
				break;
			}
		}
		return bol;
	}	
	/* ************************************ splitNodes **************************** */
	/* The function splitNodes splits those classes whose coupling involve object 
	 * oriented mechanism into relevant categories. and attaches appropraite suffix 
	 * to the splitted classes susch as _DI, _IF, _NI, _FI and also to the clr 
	 * attribute of properties object corresponding colour. 
	 */
	function splitNodes(clzzes){
		var tempClazzs = clzzes;
		var startIndex, endIndex;
		var strtIndx = true;
		var isSetIndex = true;
		var count = 0;
		var lastIndex = 0;
		var processedArr = [];
		var tempArr =[];  
		var j = 0;
		tempClazzs.forEach(function(d,i,tempClazzs){
				var stacked = [];
				console.log("steps " + count);
				console.log(tempClazzs[0]);
				console.log(d);
				console.log(tempClazzs.length);
				if(isSetIndex){
					lastIndex = tempClazzs.length;
					tempArr = tempClazzs;
					isSetIndex = false;
				}
				console.log(tempClazzs[0]);
				console.log(tempArr);
				console.log(tempClazzs);
				console.log(checkObj(tempClazzs[0],tempArr));
				if(count < lastIndex && checkObj(tempClazzs[0],tempArr))
				{
					if(tempClazzs[0].properties.cbowithAbstract > 0){
						if(tempClazzs[0].id === 'ID_Resource'){
							console.log(tempClazzs[0].id );
						}
						 var interfaced = tempClazzs[0].properties.noOfInterfaceOrAbstract;
						 var foreignInheritance = tempClazzs[0].properties.noOfCalssWithForeignInheritance;
						 var directInheritance = tempClazzs[0].properties.noOfDirectcalss;
						 var nativeInheritance = tempClazzs[0].properties.noOfCalssWithNativeInheritance;
						 var posX = tempClazzs[0].properties.coords[0].x;
						 var posY = tempClazzs[0].properties.coords[0].y;
						 var total = interfaced + foreignInheritance + directInheritance + nativeInheritance;
						 var objIF =  (JSON.parse(JSON.stringify(tempClazzs[0]))); 
						 var objFI = (JSON.parse(JSON.stringify(tempClazzs[0])));  
						 var objDI = (JSON.parse(JSON.stringify(tempClazzs[0])));  
						 var objNI = (JSON.parse(JSON.stringify(tempClazzs[0])));
						 if(directInheritance != 0 ){
							 var x = posX;
								var id = tempClazzs[0].id;
									objDI.id =id + "_DI";
								objDI.properties.coords[0].x= x;
								objDI.properties.coords[0].y= posY; 
								objDI.properties.rsrvClr = tempClazzs[0].properties.clr;
								objDI.properties.clr = DIRECT_COLOUR
								tempClazzs.push(objDI);
								console.log(objDI);
							}
						  if(foreignInheritance != 0 ){
							  var x = posX;
								var id = tempClazzs[0].id;
								objFI.id = id + "_FI";
								objFI.properties.coords[0].x= x;
								objFI.properties.coords[0].y= posY; 
								objFI.properties.rsrvClr = tempClazzs[0].properties.clr;
								objFI.properties.clr = FOREIGN_COLOUR
								tempClazzs.push(objFI);
								console.log("foreignInheritance   " + objFI.id );
								console.log(objFI);							
							}
						  if(nativeInheritance != 0){
							  var x = posX;
								var id = tempClazzs[0].id;
								objNI.id = id + "_NI";
								objNI.properties.coords[0].x= x;
								objNI.properties.coords[0].y= posY; 
								objNI.properties.rsrvClr = tempClazzs[0].properties.clr;
								objNI.properties.clr = NATIVE_COLOUR
								tempClazzs.push(objNI);
								console.log("nativeInheritance   " + objNI.id );
								console.log(objNI);						   
							}
						 if(interfaced != 0){
								var x = posX;
								var id = tempClazzs[0].id;
								objIF.id = id + "_IF";
								objIF.properties.coords[0].x= x;
								objIF.properties.coords[0].y= posY; 
								objIF.properties.rsrvClr = tempClazzs[0].properties.clr;
								objIF.properties.clr = INTERFACE_COLOUR
								tempClazzs.push(objIF);
								console.log("interfaced   " + objIF.id );
								console.log(objIF);
							}
						console.log("cutting " + count);
						console.log(tempClazzs);
						endIndex = tempClazzs.indexOf(tempClazzs[0]);
						tempClazzs.splice(endIndex,1);  
						console.log(endIndex);
						console.log(tempClazzs);
					}else {
						var mvdElmt = tempClazzs.shift();
						tempClazzs.push(mvdElmt);
					}
					count++;
				}
		});
		return tempClazzs;
	}	
	/* 
		The function addCircle appends a group element to the svg contatiner and then
		appends circles to this group element. It takes circls (the circle aaray) as a
		parameter and passes this to the group element as data. This function is called 
		within the renderClasses function to add circles as interfcaes. 
	*/
	function addCircle(circls){
		var g3 = canvas.append("g");
			g3.selectAll(".circ")
			 .data(circls)
			 .enter().append("circle")
			 .attr("class", "circ")
			 .attr("cx", function(d) { return d.cx;})
			 .attr("cy", function(d) { return d.cy;})
			 .attr("r", function(d) { return d.r;})
			 .style("fill", "gray")
			 .style("fill-opacity", 0.0);
	}
	/*
	 *  The function displayLegend displays and hides the colour rectangles (legend) that 
	 *  show the segment colours in the bar view.
	 */
	function displayLegend(){
		if(legendOff){		
			d3.select('#legendBtn').style("visibility", "visible");
			d3.selectAll('.legend').style("visibility", "hidden");
			legendOff = false;
		}else{
			
			d3.select('#legendBtn').style("visibility", "hidden");
			d3.selectAll('.legend').style("visibility", "visible");
			legendOff = true;
		}
	}
