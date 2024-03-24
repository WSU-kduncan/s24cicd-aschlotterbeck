"use strict";

var orderForm = function() {
	var nameBox = document.getElementById("name").value;
	var phoneBox = document.getElementById("phone").value;	
	var emailBox = document.getElementById("email").value;
	var errorMessage = "";
	
	//validate entries//
	if (nameBox == "") {
		errorMessage = "You must enter a name";
		document.getElementById("name").nextElementSibling.innerHTML = errorMessage;
	}
	else {
		document.getElementById("name").nextElementSibling.innerHTML = "";
	}
	var validatePhone = /^\d{3}-\d{3}-\d{4}$/;
	var phoneIsValid = validatePhone.test(phoneBox);
	if (phoneBox == "") {
		errorMessage = "You must enter a phone number";
		document.getElementById("phone").nextElementSibling.innerHTML = errorMessage;
	}
	else if (phoneIsValid == false) {
		errorMessage = "Phone format must be 123-123-1234";
		document.getElementById("phone").nextElementSibling.innerHTML = errorMessage;
	}
	else {
		document.getElementById("phone").nextElementSibling.innerHTML = "";
	}
	if (emailBox == "") {
		errorMessage = "You must enter an email address";
		document.getElementById("email").nextElementSibling.innerHTML = errorMessage;
	}
	else {
		document.getElementById("email").nextElementSibling.innerHTML = "";
	}

	// submit the form if all entries are valid//
	if (errorMessage == "") {
      document.getElementById("orderForm").submit(); 
    }
}
	
//display hat image for the selected team//
var nats = function() {
	document.getElementById("hat_pic").src = "images/nationals.jpg";
}

var sox = function() {
	document.getElementById("hat_pic").src = "images/red_sox.jpg";
}

var cubs = function() {
	document.getElementById("hat_pic").src = "images/cubs.jpg";	
}
		
var reset_form = function() {
	document.getElementById("hat_pic").src = "images/nationals.jpg";
	document.getElementById("name").value = "";
	document.getElementById("phone").value = "";
	document.getElementById("email").value = "";
	document.getElementById("instructions").value = "";
	document.getElementById("name").nextElementSibling.innerHTML = "";
	document.getElementById("phone").nextElementSibling.innerHTML = "";
	document.getElementById("email").nextElementSibling.innerHTML = "";
	document.getElementById("Washington").checked = true;
	document.getElementById("Promotions").checked = false;
	document.getElementById("Products").checked = false;
	document.getElementById("Catalog").checked = false;
}
		
window.onload = function() {
    document.getElementById("submit_order").onclick = orderForm;
	document.getElementById("Washington").onclick = nats;
	document.getElementById("Boston").onclick = sox;
	document.getElementById("Chicago").onclick = cubs;
	document.getElementById("name").focus();
	document.getElementById("clear_form").onclick = reset_form;
}
	