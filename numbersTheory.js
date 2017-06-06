//Created by Group 8

//global variables
var asyncRequest;

function loadDivisibility(){
	asyncRequest = new XMLHttpRequest;
	asyncRequest.addEventListener("readystatechange", function(){
		if(asyncRequest.readyState == 4 && asyncRequest.status == 200 && asyncRequest.responseXML){
			//get the divisibility details
			var divisibility = asyncRequest.responseXML.getElementsByTagName("divisibility");
			for (var i =0; i<divisibility.length; i++){
				var divisibilityBy = divisibility.item(i).getElementsByTagName("divisibilityBy").item(0).firstChild.nodeValue;
				
				var pTag = document.createElement("p");
				var textNode = document.createTextNode(divisibilityBy);//text
				var radiobutton = document.createElement("input");
				//setting properties for radio button
				radiobutton.type = "radio";
				radiobutton.id = divisibilityBy;
				radiobutton.name = "divisibility";
				radiobutton.value = divisibilityBy;
				//create eventlistener for the radiobutton
				radiobutton.addEventListener("change", function(){
					//call another function to show the divisibility by supplying the radio button value property as arguments
					showDetails(this.value);
				},false);
				//adding the element to the page and parent elements:
				pTag.appendChild(radiobutton);//added radiobutton to pTag
				pTag.appendChild(textNode);//added textNode
				//add th pTag to the table (td)
				document.getElementById("divisibilityBy").appendChild(pTag);
			}//end for
		}//end if	
	},false);//eventlistener & callback
	asyncRequest.open("GET", "numbersTheory.xml", true);
	asyncRequest.send(null);
}//end loadDivisibility function

function showDetails(selectedNumber){
	asyncRequest = new XMLHttpRequest;
	asyncRequest.addEventListener("readystatechange", function(){
		if(asyncRequest.readyState == 4 && asyncRequest.status == 200 && asyncRequest.responseXML){
			//get the divisibility details
			var divisibility = asyncRequest.responseXML.getElementsByTagName("divisibility");
			for (var i =0; i<divisibility.length; i++){
				var divisibilityBy = divisibility.item(i).getElementsByTagName("divisibilityBy").item(0).firstChild.nodeValue;
				if(divisibilityBy == selectedNumber){
					var details = divisibility.item(i).getElementsByTagName("details").item(0).firstChild.nodeValue;
					document.getElementById("details").innerHTML = details;
					break;
				}//end if	
			}//end for
		}//end if	
	},false);//eventlistener & callback
	asyncRequest.open("GET", "numbersTheory.xml", true);
	asyncRequest.send(null);
}

window.addEventListener("load", function(){
	loadDivisibility();
}, false);//end load event listener