var curUser = new User();

init();

function init() {
    try {
        curUser = JSON.parse(localStorage.getItem("curUser"));
    } catch (e) {
        console.log(e)
    }
}

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
    if (checkReg()) {
        var user = new User($('#reg_username').val(), $('#reg_email').val(), $('#reg_password').val(), $('#reg_state').val());
        $.ajax({
            url : getContextRoot('public') + '/user/register',
            type : 'POST',
            dataType : 'json',
            data : JSON.stringify(user),
            contentType : "application/json; charset=utf-8",
            success : function(data) {
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
                document.getElementById("curLogin").innerHTML = (JSON.parse(localStorage.getItem("curUser")).username);
            } else {
                $("#dialog").addClass("alert-danger");
                $("#response-title").text("Failure!");
            }
            $("#dialog").fadeIn();
            $("#response-text").html(data.message);

        }
    });
}

function saveItem(item) {
    item.userId = curUser.userId;
    $.ajax({
        url : getContextRoot('public') + '/item/save',
        type : 'POST',
        data : JSON.stringify(item),
        contentType : "application/json; charset=utf-8",
        success : function(data) {
            console.log(data);
            removeAlertClass();
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
            $(".mainForm").append('<div id="furnWrap" class="furnWrap formWrapper"><h3> Furnace <button type="button" class="btn btn-danger pull-right removeable"onclick="removeButt($(this))"><span class="glyphicon glyphicon-minus-sign"></span> Remove</button></h3><h4>Fuel Type</h4><select name="furnFuelType" id="furnFuelType" class="form-control"><option value="gas">Gas</option><option value="oil">Oil</option></select><h4>Size of Your House</h4><div class="input-group "><input name="furnHouseSize" id="furnHouseSize" type="number" class="form-control"placeholder="Size of Your House(Square Feet)"><span class="input-group-addon">Feet &sup2;</span></div><h4>Era of your House</h4><select name="furnHouseEra" id="furnHouseEra" class="form-control"><option value="pre40">Before 1940</option><option value="40to49">1940-1949</option><option value="50to59">1950-1959</option><option value="60to69">1960-1969</option><option value="70to79">1970-1979</option><option value="80to89">1980-1989</option><option value="90to00">1990-2000</option><option value="present">2000-Present</option></select><h4>Era of Furnace</h4><select name="furnEra" id="furnEra" class="form-control"><option value="1960-1969">1960-1969</option><option value="1970-1974">1970-1974</option><option value="1975-1983">1975-1983</option><option value="1984-1987">1984-1987</option><option value="1988-1991">1988-1991</option><option value="After 1992">After 1992</option><option value="New Unit">New Unit</option></select><h4>Thermostat?</h4><select name="furnThermos" id="furnThermos" class="form-control"><option value="1">Yes</option><option value="0">No</option></select></div>');
            $(".removeable").hide();
            $("#furnWrap").hide();
            $("#furnWrap").fadeIn();
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
            $(".mainForm").append('<div id="accWrapper" class="formWrapper"><h3> Central Air Conditioning<button type="button" class="btn btn-danger pull-right removeable"onclick="removeButt($(this))"><span class="glyphicon glyphicon-minus-sign"></span> Remove</button></h3><h4>Number of Units</h4><input name="accQuantity" id="accQuantity" type="number" class="form-control"placeholder="Number of Units"><h4>SEER Rating</h4><input name="seerRating" id="seerRating" type="number" class="form-control"placeholder="SEER Rating"><h4>Cooling Capcity (Btu/hr)</h4><select name="accCoolCapacity" id="accCoolCapacity" class="form-control"><option value="2.5">2.5 ton</option><option value="3.0">3.0 ton</option><option value="3.5">3.5 ton</option><option value="4.0">4.0 ton</option><option value="5.0">5.0 ton</option></select><h4>Thermostat?</h4><select name="accThermos" id="accThermos" class="form-control"><option value="1">Yes</option><option value="0">No</option></select></div>');
            $(".removeable").hide();
            $("#accWrapper").hide();
            $("#accWrapper").fadeIn();
            break;
        case "acRoom":
            $(".mainForm").append('<div id="acrWrapper" class="formWrapper"><h3> Personal Air Conditioner<button type="button" class="btn btn-danger pull-right removeable"onclick="removeButt($(this))"><span class="glyphicon glyphicon-minus-sign"></span> Remove</button></h3><h4>Number of Units</h4><input name="acrQuantity" id="acrQuantity" type="number" class="form-control"placeholder="Number of Units"><h4>EER Rating</h4><div class="input-group"><input name="eerRating" id="eerRating " type="number" class="form-control"placeholder="EER Rating"><span class="input-group-addon">Btu/hr</span></div><h4>Cooling Capacity</h4><input name="acrCoolCap" id="acrCoolCap " type="number" class="form-control"placeholder="Cooling Capacity"></div>');
            $(".removeable").hide();
            $("#acrWrapper").hide();
            $("#acrWrapper").fadeIn();
            break;
        case "purifier":
            $(".mainForm").append('<div id="airPureWrapper" class="formWrapper"><h3> Air Purifier<button type="button" class="btn btn-danger pull-right removeable"onclick="removeButt($(this))"><span class="glyphicon glyphicon-minus-sign"></span> Remove</button></h3><h4>Number of Units</h4><input name="airPureQuantity" id="airPureQuantity" type="number" class="form-control"placeholder="Quantity of Air Purifiers"><h4>Capacity - Clean Air Delievery Rate</h4><div class="input-group"><input name="airPureCap" id="airPureCap" type="number" class="form-control"placeholder="Capicty"><span class="input-group-addon">CADR</span></div><h4>Efficiency</h4><div class="input-group"><input name="airPureEff" id="airPureEff" type="number" class="form-control"placeholder="Efficiency"><span class="input-group-addon">DustCADR/Watt</span></div><h4>Average Annual Days of Operation</h4><div class="input-group"><input name="airPureDaysOfOp" id="airPureDaysOfOp" type="number" class="form-control"placeholder="Days of Operation"><span class="input-group-addon">Days/Year</span></div><h4>Average Daily Operation</h4><div class="input-group"><input name="airPureHoursADay" id="airPureHoursADay" type="number" class="form-control"placeholder="Hours a Day"><span class="input-group-addon">Hrs/Day</span></div></div>');
            $(".removeable").hide();
            $("#airPureWrapper").hide();
            $("#airPureWrapper").fadeIn();

            break;
        case "washer":
            $(".mainForm").append('<div id="clothesWasherWrapper" class="formWrapper"><h3> Clothes Washer<button type="button" class="btn btn-danger pull-right removeable"onclick="removeButt($(this))"><span class="glyphicon glyphicon-minus-sign"></span> Remove</button></h3><h4>Amount of Clothes Washers</h4><input name="airPureHoursADay" id="clothesWasherQuantity" type="number" class="form-control"placeholder="Amount"><h4>Average Loads Per Week</h4><input name="clothesWasherLoadsPerWeek" id="clothesWasherLoadsPerWeek" type="number"class="form-control" placeholder="Loads Per Week"><h4>Building Hot Water Fuel Type</h4><select name="clothesWasherBuildFuelType" id="clothesWasherBuildFuelType" class="form-control"><option value="natGas">Natural Gas</option><option value="elec">Electricity</option></select><h4>Dryer Type</h4><select name="clothesWasherDryerFuelType" id="clothesWasherDryerFuelType" class="form-control"><option value="natGas">Natural Gas</option><option value="elec">Electricity</option><option value="none">Neither</option></select><h4>Capacity</h4><div class="input-group"><input name="clothesWasherCapacity" id="clothesWasherCapacity" type="number"class="form-control" placeholder="Capacity"><span class="input-group-addon">Feet &sup3;</span></div><h4>Modified Energy Factor</h4><div class="input-group"><input name="clothesWasherMEF" id="clothesWasherMEF" type="number" class="form-control"placeholder="MEF Value"><span class="input-group-addon">MEF</span></div><h4>Water Factor</h4><div class="input-group"><input name="clothesWasherHoursADay" id="clothesWasherHoursADay" type="number"class="form-control" placeholder="WF Value"><span class="input-group-addon">WF</span></div></div>');
            $(".removeable").hide();
            $("#clothesWasherWrapper").hide();
            $("#clothesWasherWrapper").fadeIn();
            break;
        case "dehumidifier":
            $(".mainForm").append('<div id="dehumidWrapper" class="formWrapper"><h3> Dehumidifier<button type="button" class="btn btn-danger pull-right removeable"onclick="removeButt($(this))"><span class="glyphicon glyphicon-minus-sign"></span> Remove</button></h3><h4>Quantity of Dehumidifiers</h4><input name="dehumidQuantity" id="dehumidQuantity" type="number" class="form-control"placeholder="Amount"><h4>Capacity</h4><div class="input-group"><input name="dehmidCap" id="dehmidCap" type="number" class="form-control"placeholder="Capacity"><span class="input-group-addon">Pints/Day</span></div><h4>Energy Factor</h4><div class="input-group"><input name="dehumidEFactor" id="dehumidEFactor" type="number" class="form-control"placeholder="Energy Factor"><span class="input-group-addon">l/kWh</span></div><h4>Average Days of Operation</h4><div class="input-group"><input name="dehumidDaysOfOp" id="dehumidDaysOfOp" type="number" class="form-control"placeholder="Days of Operation"><span class="input-group-addon">Days/Year</span></div><h4>Average Daily Operation</h4><div class="input-group"><input name="dehumidHoursOfOp" id="dehumidHoursOfOp" type="number" class="form-control"placeholder="Hours of Operation"><span class="input-group-addon">Hours/Day</span></div></div>');
            $(".removeable").hide();
            $("#dehumidWrapper").hide();
            $("#dehumidWrapper").fadeIn();
            break;
        case "dishwasher":
            $(".mainForm").append('<div id="dishWashWrapper" class="formWrapper"><h3> Dishwasher<button type="button" class="btn btn-danger pull-right removeable"onclick="removeButt($(this))"><span class="glyphicon glyphicon-minus-sign"></span> Remove</button></h3><h4>Quantity of Dishwashers</h4><input name="dishWashQuantity" id="dishWashQuantity" type="number" class="form-control"placeholder="Amount"><h4>Type of Dishwasher</h4><select name="dishWashType" id="dishWashType" class="form-control"><option value="standard">Standard</option><option value="compact">Compact</option></select><h4>Average Cycles Per Week</h4><input name="dishWashCyclesPerWeek" id="dishWashCyclesPerWeek" type="number" class="form-control"placeholder="Cycles"><h4>Building Hot Water Fuel Type</h4><select name="dishWashHotWaterFuelType" id="dishWashHotWaterFuelType" class="form-control"><option value="natGas">Natural Gas</option><option value="elec">Electricity</option></select><h4>Rated Electricity Consumption</h4><div class="input-group"><input name="dishWashEConsumption" id="dishWashEConsumption" type="number" class="form-control"placeholder="Capacity"><span class="input-group-addon">kWh/Year</span></div><h4>Rated Water Consumption</h4><div class="input-group"><input name="dishWashMEF" id="dishWashMEF" type="number" class="form-control"placeholder="Water Consumption"><span class="input-group-addon">Gallons/Cycle</span></div></div>');
            $(".removeable").hide();
            $("#dishWashWrapper").hide();
            $("#dishWashWrapper").fadeIn();
            break;
        case "freezer":
            $(".mainForm").append('<div id="freezerWrapper" class="formWrapper"><h3> Freezer<button type="button" class="btn btn-danger pull-right removeable"onclick="removeButt($(this))"><span class="glyphicon glyphicon-minus-sign"></span> Remove</button></h3><h4>Quantity of Freezers</h4><input name="freezerAmount" id="freezerAmount" type="number" class="form-control"placeholder="Amount"><h4>Type of Freezer</h4><select name="freezerType" id="freezerType" class="form-control"><option value="type1">Chest</option><option value="type2">Compact Chest</option><option value="type3">Compact Upright (manual defrost)</option><option value="type4">Compact upright (auto defrost)</option><option value="type5">Upright (manual defrost)</option><option value="type6">Upright (auto defrost)</option></select><h4>Volume</h4><div class="input-group"><input name="freezerVolume" id="freezerVolume" type="number" class="form-control"placeholder="Volume"><span class="input-group-addon">Feet&sup3;</span></div><h4>Rated Electricity Consumption</h4><div class="input-group"><input name="freezereEConsumption" id="freezereEConsumption" type="number" class="form-control"placeholder="Electricity Consumption"><span class="input-group-addon">kWh/Year</span></div></div>');
            $(".removeable").hide();
            $("#freezerWrapper").hide();
            $("#freezerWrapper").fadeIn();
            break;
        case "lightBulb":
            if ($(".mainForm").children("#lBulbWrapper").length == 0) {
                $(".mainForm").append('<div id="lBulbWrapper" class=" formWrapper"><h3> Light Bulbs<button type="button" class="btn btn-danger pull-right removeable" onclick="removeButt($(this))"><span class="glyphicon glyphicon-minus-sign"></span> Remove</button></h3><h4>Quantity</h4><input name="bulbQuantity" id="bulbQuantity" type="number" class="form-control"placeholder="Quantity"><h4>Average Daily Use</h4><input name="bulbAvgDailyUse" id="bulbAvgDailyUse" type="number" class="form-control "placeholder="Average Daily Use (hours)"><h4>Bulb Type</h4><select name="bulbType" id="bulbType" class="form-control"><option value="40wI">40 W Incandescent</option><option value="60wI">60 W Incandescent</option><option value="75wI">75 W Incandescent</option><option value="100wI">100 W Incandescent</option><option value="150wI">150 W Incandescent</option><option value="29wH">29 W Halogen(40 W Equivalent)</option><option value="43wH">43 W Halogen(60 W Equivalent)</option><option value="53wH">53 W Halogen(75 W Equivalent)</option><option value="72wH">72 W Halogen(100 W Equivalent)</option></select></div>');
                $(".removeable").hide();
                $("#lBulbWrapper").hide();
                $("#lBulbWrapper").fadeIn();
            }
            break;
        case "fridge":
            $(".mainForm").append('<div id="fridgeWrapper" class="formWrapper"><h3> Refrigerator<button type="button" class="btn btn-danger pull-right removeable"onclick="removeButt($(this))"><span class="glyphicon glyphicon-minus-sign"></span> Remove</button></h3><h4>Quantity of Refrigerators</h4><input name="fridgeQuantity" id="fridgeQuantity" type="number" class="form-control"placeholder="Amount"><h4>Type of Refrigerator</h4><select name="fridgeType" id="fridgeType" class="form-control"><option value="type1">Refrigerator-freezer or refrigerator only (Manual or partial-auto defrost)</option><option value="type2">Top-mounted freezer or refrigerator only (automatic defrost)</option><option value="type3">Side-by-side with through-the-door ice (automatic defrost)</option><option value="type4">Side-by-side (automatic defrost)</option><option value="type5">Bottom-mounted Freezer (automatic defrost)</option><option value="type6">Bottom-mounted freezer with through-the-door ice (automatic defrost)</option></select><h4>Volume</h4><div class="input-group"><input name="fridgeVolume" id="fridgeVolume" type="number" class="form-control"placeholder="Volume"><span class="input-group-addon">Feet&sup3;</span></div><h4>Rated Electricity Consumption</h4><div class="input-group"><input name="fridgeEConsumption" id="fridgeEConsumption" type="number" class="form-control"placeholder="Electricity Consumption"><span class="input-group-addon">kWh/Year</span></div></div>');
            $(".removeable").hide();
            $("#fridgeWrapper").hide();
            $("#fridgeWrapper").fadeIn();
            break;
        case "compactFridge":
            $(".mainForm").append('<div id="cFridgeWrapper" class="formWrapper"><h3> Refrigerator - Compact<button type="button" class="btn btn-danger pull-right removeable"onclick="removeButt($(this))"><span class="glyphicon glyphicon-minus-sign"></span> Remove</button></h3><h4>Quantity of Compact Refrigerators</h4><input name="cFridgeQuantity" id="cFridgeQuantity" type="number" class="form-control"placeholder="Amount"><h4>Type of Compact Refrigerator</h4><select name="cFridgeType" id="cFridgeType" class="form-control"><option value="type1">Compact refrigerator or compact refrigerator-freezer (manual defrost)</option><option value="type2">Compact refrigerator-freezer (partial automatic defrost)</option><option value="type3">Compact top-mounted freezer or refrigerator only (automatic defrost)</option><option value="type4">Compact bottom-mounted freezer (automatic defrost)</option></select><h4>Volume</h4><div class="input-group"><input name="cFridgeVolume" id="cFridgeVolume" type="number" class="form-control"placeholder="Volume"><span class="input-group-addon">Feet&sup3;</span></div><h4>Rated Electricity Consumption</h4><div class="input-group"><input name="cFridgeEConsumption" id="cFridgeEConsumption" type="number" class="form-control"placeholder="Electricity Consumption"><span class="input-group-addon">kWh/Year</span></div></div>');
            $(".removeable").hide();
            $("#cFridgeWrapper").hide();
            $("#cFridgeWrapper").fadeIn();
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
        $("#response-title").text("Failure!");
        errorString += "Username Invalid<br/>";
        ready = false;

    } else {
        $("#reg_username").parents(".form-group").removeClass("has-error");
        dialogFadeOut();
        ready = true;
    }

    //then password stuff
    if ($("#reg_password").val() != $("#passwordCheck").val() | $("#reg_password").val() == "") {
        $("#reg_password").parents(".form-group").addClass("has-error");
        $("#passwordCheck").parents(".form-group").addClass("has-error");
        removeAlertClass();
        $("#dialog").addClass("alert-danger");
        $("#response-title").text("Failure!");
        errorString += "Passwords Do not Match/Not Long Enough<br/>";
        ready = false;
    } else {
        $("#reg_password").parents(".form-group").removeClass("has-error");
        $("#passwordCheck").parents(".form-group").removeClass("has-error");
        dialogFadeOut();
        ready = true;
    }

    //then email stuff
    if ($("#reg_email").val().length == 0 | $("#reg_email").val().indexOf("@") < 0) {
        $("#reg_email").parents(".form-group").addClass("has-error");
        removeAlertClass();
        $("#dialog").addClass("alert-danger");
        $("#response-title").text("Failure!");
        errorString += "Email Invalid";
        if ($("#reg_email").val().indexOf("@") < 0) {
            errorString += ": Forgot the @";
        }
        ready = false;
    } else {
        $("#reg_email").parents(".form-group").removeClass("has-error");
        dialogFadeOut();
        ready = true;
    }
    $("#response-text").html(errorString);

    $("#dialog").fadeIn();
    return ready;
}
function submitMainForm(){
    var myForms = $("div[id$='Wrapper']");
    for(var i = 0; i <= myForms.length; i++ ){
        if($(myForms[i]).get(0).id.indexOf("accWrapper") > -1){
            var item = new Item("Air Conditioner","electricity");
            item.specs = [];
            item.addSpec('accQuantity',$('#accQuantity').val())
            item.addSpec('seerRating',$('#seerRating').val());
            item.addSpec('accCoolCapacity',$("#accCoolCapacity").val());
            item.addSpec('accThermos',$('#accThermos').val());
            console.log(item);

            //saveItem(name,energy,arrayValues); maybe?

        }
    }
}
function dialogFadeOut() {
    $("#dialog").fadeOut();
}

function removeAlertClass() {
    console.log("what");
    $("#dialog").removeClass("alert-success");
    $("#dialog").removeClass("alert-info");
    $("#dialog").removeClass("alert-danger");
    $("#dialog").removeClass("alert-warning");

}