function getContextRoot(key) {
	var s = "";
	var j = -1;
	var frags = window.location.href.split("/");
	for (var i = 0; i < frags.length; i++) {
		if (frags[i] == key) {
			j = i;
		}
	}
	for (var i = 0; i < j; i++) {
		s += frags[i] + '/';
	}
	return s.substr(0, s.length - 1);
}

function register(username, email, password, state) {
	var user = new User(username, email, password, state);
	$.ajax({
		url : getContextRoot('public') + '/user/register',
		type : 'POST',
		dataType : 'json',
		data : JSON.stringify(user),
		contentType : "application/json; charset=utf-8",
		success : function(data) {
			console.log(data);
			removeAlertClass();
			if (data.message.toString().indexOf('successful') != -1) {
				$("#dialog").addClass("alert-success");
				$("#response-title").text("Success!");

			} else {

				$("#dialog").addClass("alert-danger");
				$("#response-title").text("Failure!");
			}
			$("#dialog").fadeIn();
			$("#response-text").html(data.message);

		}
	});
}

function login(username, password) {
	var user = new User(username, '', password, '');
	$.ajax({
		url : getContextRoot('public') + '/user/login',
		type : 'POST',
		dataType : 'json',
		data : JSON.stringify(user),
		contentType : "application/json; charset=utf-8",
		success : function(data) {
			console.log(data);

			removeAlertClass();
			if (data.message.toString().indexOf('successful') != -1) {
				localStorage.setItem("curUser", JSON.stringify(data.data));
				$("#dialog").addClass("alert-success");
				$("#response-title").text("Success!");
				document.getElementById("curLogin").innerHTML = (JSON
						.parse(localStorage.getItem("curUser")).username);
			} else {
				$("#dialog").addClass("alert-danger");
				$("#response-title").text("Failure!");
			}
			$("#dialog").fadeIn();
			$("#response-text").html(data.message);

		}
	});
}
function addOptionGas() {
	var radios = document.getElementsByName("gOptions");
	var selected = "";
	for (var i = 0, length = radios.length; i < length; i++) {
		if (radios[i].checked) {
			selected = radios[i].value;
			break;
		}
	}
	switch (selected) {
	case "furn":
		$(".mainForm")
				.append(
						'<div id="furnWrap" class="furnWrap formWrapper"><h3>Furnace</h3><!-- Remove Button --><div class="input-group removeable pull-right"><button type="button" class="btn btn-danger " onclick="removeButt($(this))"><span class="glyphicon glyphicon-minus-sign"></span> Remove</button></div><div id="fuelType" class="input-group"><div class="input-group-btn "><button type="button" class="btn btn-default dropdown-toggle "data-toggle="dropdown">Fuel <span class="caret"></span></button><ul class="dropdown-menu optionable"><li class="item">Gas</a></li><li class="item">Oil</a></li></ul></div></div><br /><div class="input-group "><input id="houseSize" type="number" class="form-control"placeholder="Size of Your House(Square Feet)"></div><br /><div id="houseEra" class="input-group"><div class="input-group-btn "><button type="button" class="btn btn-default dropdown-toggle "data-toggle="dropdown">Era of House <span class="caret"></span></button><ul class="dropdown-menu optionable" role="menu"><li>Era of House</li><li class="item">Before 1940</li><li class="item">1940-1949</li><li class="item">1950-1959</li><li class="item">1960-1969</li><li class="item">1970-1979</li><li class="item">1980-1989</li><li class="item">1990-2000</li><li class="item">2000-Present</li></ul></div></div><br /><div id="unitEra" class="input-group"><div class="input-group-btn "><button type="button" class="btn btn-default dropdown-toggle "data-toggle="dropdown">Era of Unit <span class="caret"></span></button><ul class="dropdown-menu optionable" role="menu"><li>Era of Unit</li><li class="item">1960-1969</li><li class="item">1970-1974</li><li class="item">1975-1983</li><li class="item">1984-1987</li><li class="item">1988-1991</li><li class="item">After 1992</li><li class="item">New Unit</li></ul></div></div><br /><div class="input-group"><div class="input-group-btn"><button type="button" class="btn btn-default dropdown-toggle "data-toggle="dropdown">Thermostat? <span class="caret"></span></button><ul class="dropdown-menu optionable"><li>Thermostat?</li><li class="item">Yes</a></li><li class="item">No</a></li></ul></div></div></div>');
		$(".removeable").hide();
		break;
	}
}
function addOptionElec() {
	var radios = document.getElementsByName('eOptions');
	var selected = "";
	for (var i = 0, length = radios.length; i < length; i++) {
		if (radios[i].checked) {
			selected = radios[i].value;
			break;
		}
	}
	console.log(selected);
	switch (selected) {
	case "acCentral":
		$(".mainForm")
				.append(
						'<div class="accWrapper formWrapper"><h3>Central Air Conditioning</h3><div class="input-group removeable pull-right"><button type="button" class="btn btn-danger" onclick="removeButt($(this))"><span class="glyphicon glyphicon-minus-sign"></span> Remove</button></div><div class="input-group "><input type="number" class="form-control"placeholder="Number of Units"></div><br /><div class="input-group "><input type="number" class="form-control" placeholder="SEER Rating"></div><br /><div class="input-group"><div class="input-group-btn "><button type="button" class="btn btn-default dropdown-toggle "data-toggle="dropdown">Cooling Capacity (Btu/hr) <span class="caret"></span></button><ul class="dropdown-menu optionable"><li class="item">2.5 ton</a></li><li class="item">3.0 ton</a></li><li class="item">3.5 ton</a></li><li class="item">4.0 ton</a></li><li class="item">5.0 ton</a></li></ul></div></div><br /><div class="input-group"><div class="input-group-btn"><button type="button" class="btn btn-default dropdown-toggle "data-toggle="dropdown">Thermostat? <span class="caret"></span></button><ul class="dropdown-menu optionable"><li style="color: #101010">Thermostat?</li><li class="item">Yes</a></li><li class="item">No</a></li></ul></div></div></div>');
		$(".removeable").hide();
		$(".accWrapper").hide();
		$(".accWrapper").fadeIn();
		break;
	case "acRoom":
		$(".mainForm")
				.append(
						'<div id="acrWrapper" class="formWrapper"><h3>Personal Air Conditioner</h3><div class="input-group removeable pull-right"onclick="removeButt($(this))"><button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-minus-sign"></span> Remove</button></div><div class="input-group "><input id="acrNumOfUnits" type="number" class="form-control"placeholder="Number of Units"></div><h4>EER Rating</h4><div class="input-group "><input id="eerRating " type="number" class="form-control"placeholder="EER Rating"></div><h4>Cooling Capacity</h4><div class="input-group "><input id="acrCoolCap " type="number" class="form-control"placeholder="Cooling Capacity"></div></div>');
		$(".removeable").hide();
		$("#acrWrapper").hide();
		$("#acrWrapper").fadeIn();
		break;
	case "purifier":
		break;
	case "washer":
		break;
	case "dehumidifier":
		break;
	case "dishwasher":
		break;
	case "freezer":
		break;
	case "lightBulb":
		console.log($(".bulbWrap").length);
		if ($(".mainForm").children(".bulbWrap").length == 0) {
			$(".mainForm")
					.append(
							'<div class="lBulbCover formWrapper"><h3>Light Bulbs</h3><div class="input-group removeable pull-right"><button type="button" class="btn btn-danger" onclick="removeButt($(this))"><span class="glyphicon glyphicon-minus-sign"></span> Remove</button></div><div class="input-group"><input type="number" class="form-control" placeholder="Quantity"></div><br /><div class="input-group"><input type="number" class="form-control "placeholder="Average Daily Use (hours)"></div><br /><div class="input-group"><div class="input-group-btn"><button type="button" class="btn btn-default dropdown-toggle "data-toggle="dropdown">75 W Incandescent <span class="caret"></span></button><ul class="dropdown-menu optionable"><li class="item">40 W incandescent</a></li><li class="item">60 W incandescent</a></li><li class="item">75 W incandescent</a></li><li class="item">100 W incandescent</a></li><li class="item">150 W incandescent</a></li><li class="item">29 W Halogen(40 W Equivalent)</a></li><li class="item">43 W Halogen(60 W Equivalent)</a></li><li class="item">53 W Halogen(75 W Equivalent)</a></li><li class="item">72 W Halogen(100 W Equivalent)</a></li></ul></div></div></div>');
			$(".removeable").hide();
		}

		break;
	case "fridge":
		break;
	case "compactFridge":

		break;
	}
}
function removeButt(domElement) {
	$(domElement).parents(".formWrapper").fadeOut(300, function() {

		$(domElement).parents(".formWrapper").remove();
	});
}
function checkReg() {
	var ready = false;
	var errorString = "";
	//first checks username
	if ($("#reg_username").val().length < 3) {
		$("#reg_username").parents(".form-group").addClass("has-error");
		removeAlertClass();
		$("#dialog").addClass("alert-danger");
		$("#dialog").fadeIn();
		$("#response-title").text("Failure!");
		errorString += "Username Invalid<br/>";
		ready = false;

	} else {
		$("#reg_username").parents(".form-group").removeClass(
				"has-error");
		dialogFadeOut();
		ready = true;
	}

	//then email stuff
	if ($("#reg_email").val().length == 0) {
		$("#reg_email").parents(".form-group").addClass("has-error");
		removeAlertClass();
		$("#dialog").addClass("alert-danger");
		$("#dialog").fadeIn();
		$("#response-title").text("Failure!");
		errorString += "Email Invalid<br/>";
		ready = false;
	} else {
		$("#reg_email").parents(".form-group").removeClass("has-error");
		dialogFadeOut();
		ready = true;
	}

	//then password stuff
	if ($("#reg_password").val() != $("passwordCheck")) {
		console.log("PWord Don't match");
		$("#reg_password").parents(".form-group").addClass("has-error");
		$("#passwordCheck").parents(".form-group")
				.addClass("has-error");
		removeAlertClass();
		$("#dialog").addClass("alert-danger");
		$("#dialog").fadeIn();
		$("#response-title").text("Failure!");
		errorString +="Passwords Do not Match";
		ready = false;
	} else {
		$("#reg_password").parents(".form-group").removeClass(
				"has-error");
		$("#passwordCheck").parents(".form-group").removeClass(
				"has-error");
		dialogFadeOut();
		ready = true;
	}
	$("#response-text").html(errorString);
	if (ready) {
		register($('#reg_username').val(), $('#reg_email').val(), $(
				'#reg_password').val(), $('#reg_state').val());
	}
}
function dialogFadeOut(){
	$("#dialog").fadeOut(300, function(){
		removeAlertClass();
	});
}
function removeAlertClass() {
	$("#dialog").removeClass("alert-success");
	$("#dialog").removeClass("alert-info");
	$("#dialog").removeClass("alert-danger");
	$("#dialog").removeClass("alert-warning");

}
