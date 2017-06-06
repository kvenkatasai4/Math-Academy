//Created by Group 8

// global variable qn is the current question number
var qn = 0;
var asyncRequest;
//for unique random numbers
var uniqueRandoms = [];
var val = 0;
//for score
var total = 0;

// loading the questions from the XML file
function getQuestions() {
	countdown(15);
	asyncRequest = new XMLHttpRequest();
	asyncRequest.onreadystatechange = function(){
		if(asyncRequest.readyState == 4 && asyncRequest.status == 200 && asyncRequest.responseXML){
			nextQuestion();
		}//end if
	}//end call back function
	asyncRequest.open("GET", "percentageTest.xml", true);
    asyncRequest.send(null);  
    document.getElementById("startques").disabled = true;
	document.getElementById("next").disabled = false;
	document.getElementById("submit").disabled = false;
	document.getElementById("answer").disabled = false;
}//end getQuestions function
		
function makeUniqueRandom() {
	//checking the length of array is 0 or not.
    if(uniqueRandoms.length == 0){
		// assigning values into uniqueRandoms array
			for (var i = 0; i < 20; i++) {
				uniqueRandoms.push(i);
			}//end for
	} //end if    
    var index = Math.floor(Math.random() * uniqueRandoms.length);
    var val = uniqueRandoms[index];
    // now removeing that value from the array to get unique numbers
    uniqueRandoms.splice(index, 1);
    return val;
}//end makeUniqueRandom function

function nextQuestion() {
	document.getElementById("next").disabled = true;
	document.getElementById("submit").disabled = false;
	document.getElementById("validation").innerHTML ="";
	//assingning array to val
    val = makeUniqueRandom();
    obj = document.getElementById("question");
    questions = asyncRequest.responseXML.getElementsByTagName("q");
    optiona = asyncRequest.responseXML.getElementsByTagName("optiona");
    optionb = asyncRequest.responseXML.getElementsByTagName("optionb");
    optionc = asyncRequest.responseXML.getElementsByTagName("optionc");
    optiond = asyncRequest.responseXML.getElementsByTagName("optiond");
    obj1 = document.getElementById("option1");
    obj2 = document.getElementById("option2");
    obj3 = document.getElementById("option3");
    obj4 = document.getElementById("option4");
    if (qn < 10) {
		//loading questions from array
        q = questions[val].firstChild.nodeValue;
        obj.firstChild.nodeValue = q;
        q1 = optiona[val].firstChild.nodeValue;
        obj1.firstChild.nodeValue = q1;
        q2 = optionb[val].firstChild.nodeValue;
        obj2.firstChild.nodeValue = q2;
        q3 = optionc[val].firstChild.nodeValue;
        obj3.firstChild.nodeValue = q3;
        q4 = optiond[val].firstChild.nodeValue;
        obj4.firstChild.nodeValue = q4;
    } else {
        obj.firstChild.nodeValue = "(no more questions)";
		obj1.firstChild.nodeValue ="";
		obj2.firstChild.nodeValue ="";
		obj3.firstChild.nodeValue ="";
		obj4.firstChild.nodeValue ="";
        document.getElementById("submit").disabled = true;
		document.getElementById("score").disabled = false;
		document.getElementById("timer").style.visibility = "hidden";
		document.getElementById("answer").disabled = true;
		document.getElementById("next").disabled = true;
    }//end if
}//end nextQuestion function

function checkAnswer() {
	document.getElementById("next").disabled = false;
	document.getElementById("submit").disabled = true;
    answers = asyncRequest.responseXML.getElementsByTagName("a");
    a = answers[val].firstChild.nodeValue;
    answerfield = document.getElementById("answer");
    if (a == answerfield.value) {
        document.getElementById("validation").innerHTML ="Correct!";
        total = total + 1;
    }
    else {
		document.getElementById("validation").innerHTML = "Incorrect. The correct answer is: " + a;
    }//end if
    qn = qn + 1;
    answerfield.value = "";   
}//end checkAnswer function

function report() {
	var percentage = ((total/10)*100);
    document.getElementById("report").innerHTML = "The overall score is :" + total + "</br>"
												+ "Number of Questions answerd :" + qn + "</br>"
												+ "Percentage :" + percentage +"%" ;
	if(percentage < 70){
		document.getElementById("result").innerHTML = "FAIL, please try again";
	}else{
		document.getElementById("result").innerHTML = "Congrates, You have passed the test";
	}//end if else
}//end report function

function countdown(minutes) {
    var seconds = 60;
    var mins = minutes
	//creating nested funtion for count down
    function tick() {
        var counter = document.getElementById("timer");
        var current_minutes = mins - 1
        seconds--;
        counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + seconds.toString();
        if (seconds > 0) {
            setTimeout(tick, 1000);
        } else {

            if (mins > 1) {
                setTimeout(function () { countdown(mins - 1); }, 1000);
            }
            else {
				if(document.getElementById("score").disabled == true) {
                setTimeout(function () { alert("sorry time up, Test is over "); }, 1000);
				document.getElementById("submit").disabled = true;
				document.getElementById("score").disabled = false;
				document.getElementById("timer").style.visibility = "hidden";
				document.getElementById("answer").disabled = true;
				document.getElementById("next").disabled = true;

				}//end of inner if
            }//end of inner else
        } //end of outer else
    }//end tick function
    tick();
}//end countdown function

window.addEventListener("load",function(){
	document.getElementById("startques").addEventListener("click",getQuestions, false );
	document.getElementById("submit").addEventListener("click",checkAnswer , false);
	document.getElementById("score").addEventListener("click", report, false);
	document.getElementById("next").addEventListener("click",nextQuestion, false );
	document.getElementById("next").disabled = true;
	document.getElementById("startques").disabled = false;
	document.getElementById("submit").disabled = true;
	document.getElementById("score").disabled = true;
	document.getElementById("answer").disabled = true;
},false);//end of load event listener

