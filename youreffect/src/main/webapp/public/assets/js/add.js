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
						'<div class="formWrapper acCentralWrap"><h3>Central Air Conditioning</h3><div class="input-group removeable pull-right"><button type="button" onclick="removeButt(this)" class="btn btn-danger removeButt"><span class="glyphicon glyphicon-minus-sign"></span> Remove</button></div><div class="input-group "><input type="number" class="form-control"	placeholder="Number of Units"></div><br /><div class="input-group "><input type="number" class="form-control" placeholder="SEER Rating"></div><br /><div class="input-group"><div class="input-group-btn "><button type="button" class="btn btn-default dropdown-toggle " data-toggle="dropdown">Cooling Capacity (Btu/hr) <span class="caret"></span></button><ul class="dropdown-menu optionable"><li><a href="#">2.5 ton</a></li><li><a href="#">3.0 ton</a></li><li><a href="#">3.5 ton</a></li><li><a href="#">4.0 ton</a></li><li><a href="#">5.0 ton</a></li></ul></div></div><br /><div class="input-group"><div class="input-group-btn"><button type="button" class="btn btn-default dropdown-toggle "	data-toggle="dropdown">Thermostat? <span class="caret"></span></button><ul class="dropdown-menu optionable"><li style="color: #101010">Thermostat?</li><li><a href="#">Yes</a></li><li><a href="#">No</a></li></ul></div></div></div><br class="break"/>');
		$(".removeable").hide();
		break;
	case "acRoom":
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
							'<div class="formWrapper bulbWrap"><h3>Light Bulbs</h3>	<div class="input-group removeable pull-right"><button type="button" onclick="removeButt(this)" class="btn btn-danger"><span class="glyphicon glyphicon-minus-sign"></span> Remove</button></div><div class="input-group"><input type="number" class="form-control" placeholder="Quantity"></div><br/><div class="input-group"><input type="number" class="form-control "placeholder="Average Daily Use (hours)"></div><br/><div class="input-group"><div class="input-group-btn"><button type="button" class="btn btn-default dropdown-toggle " data-toggle="dropdown">75 W Incandescent <span class="caret"></span></button><ul class="dropdown-menu optionable"><li><a href="#">40 W incandescent</a></li><li><a href="#">60 W incandescent</a></li><li><a href="#">75 W incandescent</a></li><li><a href="#">100 W incandescent</a></li><li><a href="#">150 W incandescent</a></li><li><a href="#">29 W Halogen(40 W Equivalent)</a></li><li><a href="#">43 W Halogen(60 W Equivalent)</a></li><li><a href="#">53 W Halogen(75 W Equivalent)</a></li><li><a href="#">72 W Halogen(100 W Equivalent)</a></li></ul></div></div><br /></div><br class="break"/>');
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
	$(domElement).parents(".formWrapper").siblings(".break").remove();
	$(domElement).parents(".formWrapper").fadeOut(300, function() {
		$(this).remove;
	});
}
