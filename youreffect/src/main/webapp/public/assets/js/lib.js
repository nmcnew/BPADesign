/** current logged in user */

var curLogin = '';

var curUser = new User();

var curItems = [];

init();

function init() {
    try {
        curLogin = localStorage.getItem('curLogin');
        curUser = readUser(curLogin).data;
        curItems = readItemList(curUser.userId).data;
    }
    catch (e) {
        console.log('no login');
        localStorage.removeItem('curLogin');
        curLogin = '';
        curUser = new User();
        curItems = [];
    }
}

/** adjust context root to various subdomain structures */

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

/** joint operations */

/** validate registration */

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
    if (!($("#reg_password").val() == $("#passwordCheck").val() && $("#reg_password").val().length > 0)) {
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
    if (!($("#reg_email").val().length > 1 && $("#reg_email").val().indexOf("@") != -1)) {
        $("#reg_email").parents(".form-group").addClass("has-error");
        removeAlertClass();
        $("#dialog").addClass("alert-danger");
        $("#response-title").text("Failure!");
        errorString += "Email Invalid";
        if ($("#reg_email").val().indexOf("@") == -1) {
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

/** register user */

function register(username, email, password, state) {
    if (checkReg()) {
        var user = new User(username, email, password, state);
        var data = registerUser(user);
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
}

/** user login */

function logout() {
    localStorage.removeItem("curLogin");
    location.reload();
}

function login(username, password) {
    var user = new User(username, '', password, '');
    var data = loginUser(user);
    removeAlertClass();
    if (data.message.toString().indexOf('successful') != -1) {
        localStorage.setItem("curLogin", data.data.userId);
        init();
        $("#dialog").addClass("alert-success");
        $("#response-title").text("Success!");
        document.getElementById("curLogin").innerHTML = curUser.username;
    } else {
        $("#dialog").addClass("alert-danger");
        $("#response-title").text("Failure!");
    }
    $("#dialog").fadeIn();
    $("#response-text").html(data.message);

}
function logout(){
    if(localStorage.getItem("curLogin").indexOf > 0){
        localStorage.removeItem("curLogin");
    }
}
/** joint operations */

function saveItems(items) {
    createItemList(items);
}

/** user operations */

function registerUser(user) {
    var response;
    $.ajax({
        async : false,
        url : getContextRoot('public') + '/user/register',
        type : 'POST',
        data : JSON.stringify(user),
        contentType : "application/json; charset=utf-8",
        success : function(data) {
            var data = JSON.parse(data);
            console.log(data);
            response = data;
        }
    });
    return response;
}

function loginUser(user) {
    var response;
    $.ajax({
        async : false,
        url : getContextRoot('public') + '/user/login',
        type : 'POST',
        data : JSON.stringify(user),
        contentType : "application/json; charset=utf-8",
        success : function(data) {
            var data = JSON.parse(data);
            console.log(data);
            response = data;
        }
    });
    return response;
}

function createUser(user) {
    var response;
    $.ajax({
        async : false,
        url : getContextRoot('public') + '/user/create',
        type : 'POST',
        data : JSON.stringify(user),
        contentType : "application/json; charset=utf-8",
        success : function(data) {
            var data = JSON.parse(data);
            console.log(data);
            response = data;
        }
    });
    return response;
}

function readUser(id) {
    var response;
    $.ajax({
        async : false,
        url : getContextRoot('public') + '/user/view/'+id,
        type : 'GET',
        data : id,
        contentType : "application/json; charset=utf-8",
        success : function(data) {
            var data = JSON.parse(data);
            console.log(data);
            response = data;
        }
    });
    return response;
}

function updateUser(user) {
    var response;
    $.ajax({
        async : false,
        url : getContextRoot('public') + '/user/update',
        type : 'POST',
        data : JSON.stringify(user),
        contentType : "application/json; charset=utf-8",
        success : function(data) {
            var data = JSON.parse(data);
            console.log(data);
            response = data;
        }
    });
    return response;
}

function deleteUser(id) {
    var response;
    $.ajax({
        async : false,
        url : getContextRoot('public') + '/user/delete/' + id,
        type : 'POST',
        data : id,
        contentType : "application/json; charset=utf-8",
        success : function(data) {
            var data = JSON.parse(data);
            console.log(data);
            respons = data;
        }
    });
    return response;
}

/** item operations */

function createItem(item) {
    var response;
    $.ajax({
        async : false,
        url : getContextRoot('public') + '/item/create',
        type : 'POST',
        data : JSON.stringify(item),
        contentType : "application/json; charset=utf-8",
        success : function(data) {
            var data = JSON.parse(data);
            console.log(data);
            response = data;
        }
    });
    return response;
}

function createItemList(items) {
    var response;
    $.ajax({
        async : false,
        url : getContextRoot('public') + '/item/list/create',
        type : 'POST',
        data : JSON.stringify(items),
        contentType : "application/json; charset=utf-8",
        success : function(data) {
            var data = JSON.parse(data);
            console.log(data);
            response = data;
        }
    });
    return response;
}

function readItem(id) {
    var response;
    $.ajax({
        async : false,
        url : getContextRoot('public') + '/item/view/'+id,
        type : 'GET',
        data : id,
        contentType : "application/json; charset=utf-8",
        success : function(data) {
            var data = JSON.parse(data);
            console.log(data);
            response = data;
        }
    });
    return response;
}

function readItemList(id) {
    var response;
    $.ajax({
        async : false,
        url : getContextRoot('public') + '/item/list/view/'+id,
        type : 'GET',
        data : id,
        contentType : "application/json; charset=utf-8",
        success : function(data) {
            var data = JSON.parse(data);
            console.log(data);
            response = data;
        }
    });
    return response;
}

function updateItem(item) {
    var response;
    $.ajax({
        async : false,
        url : getContextRoot('public') + '/item/update',
        type : 'POST',
        data : JSON.stringify(item),
        contentType : "application/json; charset=utf-8",
        success : function(data) {
            var data = JSON.parse(data);
            console.log(data);
            response = data;
        }
    });
    return response;
}

function deleteItem(id) {
    var response;
    $.ajax({
        async : false,
        url : getContextRoot('public') + '/item/delete/' + id,
        type : 'POST',
        data : id,
        contentType : "application/json; charset=utf-8",
        success : function(data) {
            var data = JSON.parse(data);
            console.log(data);
            response = data;
        }
    });
    return response;
}

/** Gas Options */

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
            $(".mainForm").append('<div></div>');
            $($(".mainForm")[0].childNodes[$(".mainForm")[0].childNodes.length - 1]).load('testPage.html #furnWrap');
            $(".removeable").hide();
            $("#furnWrap").hide();
            $("#furnWrap").fadeIn();
            break;
    }
}

/** Electricity Options */

function addOptionElec() {
    var radios = document.getElementsByName('eOptions');
    var selected = "";
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            selected = radios[i].value;
            break;
        }
    }
    switch (selected) {
        case "acCentral":
            $(".mainForm").append('<div></div>');
            $($(".mainForm")[0].childNodes[$(".mainForm")[0].childNodes.length - 1]).load('testPage.html #accWrapper');
            $(".removeable").hide();
            $("#accWrapper").hide();
            $("#accWrapper").fadeIn();
            break;
        case "acRoom":
            $(".mainForm").append('<div></div>');
            $($(".mainForm")[0].childNodes[$(".mainForm")[0].childNodes.length - 1]).load('testPage.html #acrWrapper');
            $(".removeable").hide();
            $("#acrWrapper").hide();
            $("#acrWrapper").fadeIn();
            break;
        case "purifier":
            $(".mainForm").append('<div></div>');
            $($(".mainForm")[0].childNodes[$(".mainForm")[0].childNodes.length - 1]).load('testPage.html #airPureWrapper');
            $(".removeable").hide();
            $("#airPureWrapper").hide();
            $("#airPureWrapper").fadeIn();
            break;
        case "washer":
            $(".mainForm").append('<div></div>');
            $($(".mainForm")[0].childNodes[$(".mainForm")[0].childNodes.length - 1]).load('testPage.html #clothesWasherWrapper');
            $(".removeable").hide();
            $("#clothesWasherWrapper").hide();
            $("#clothesWasherWrapper").fadeIn();
            break;
        case "dehumidifier":
            $(".mainForm").append('<div></div>');
            $($(".mainForm")[0].childNodes[$(".mainForm")[0].childNodes.length - 1]).load('testPage.html #dehumidWrapper');
            $(".removeable").hide();
            $("#dehumidWrapper").hide();
            $("#dehumidWrapper").fadeIn();
            break;
        case "dishwasher":
            $(".mainForm").append('<div></div>');
            $($(".mainForm")[0].childNodes[$(".mainForm")[0].childNodes.length - 1]).load('testPage.html #dishWashWrapper');
            $(".removeable").hide();
            $("#dishWashWrapper").hide();
            $("#dishWashWrapper").fadeIn();
            break;
        case "freezer":
            $(".mainForm").append('<div></div>');
            $($(".mainForm")[0].childNodes[$(".mainForm")[0].childNodes.length - 1]).load('testPage.html #freezerWrapper');
            $(".removeable").hide();
            $("#freezerWrapper").hide();
            $("#freezerWrapper").fadeIn();
            break;
        case "lightBulb":
            if ($(".mainForm").children("#lBulbWrapper").length == 0) {
                $(".mainForm").append('<div></div>');
                $($(".mainForm")[0].childNodes[$(".mainForm")[0].childNodes.length - 1]).load('testPage.html #lBulbWrapper');
                $(".removeable").hide();
                $("#lBulbWrapper").hide();
                $("#lBulbWrapper").fadeIn();
            }
            break;
        case "fridge":
            $(".mainForm").append('<div></div>');
            $($(".mainForm")[0].childNodes[$(".mainForm")[0].childNodes.length - 1]).load('testPage.html #fridgeWrapper');
            $(".removeable").hide();
            $("#fridgeWrapper").hide();
            $("#fridgeWrapper").fadeIn();
            break;
        case "compactFridge":
            $(".mainForm").append('<div></div>');
            $($(".mainForm")[0].childNodes[$(".mainForm")[0].childNodes.length - 1]).load('testPage.html #cFridgeWrapper');
            $(".removeable").hide();
            $("#cFridgeWrapper").hide();
            $("#cFridgeWrapper").fadeIn();
            break;
    }
}

/** DOM manipulations */

function removeButt(domElement) {
    $(domElement).parents(".formWrapper").fadeOut(300, function() {

        $(domElement).parents(".formWrapper").remove();
    });
}

function dialogFadeOut() {
    $("#dialog").fadeOut();
}

function removeAlertClass() {
    $("#dialog").removeClass("alert-success");
    $("#dialog").removeClass("alert-info");
    $("#dialog").removeClass("alert-danger");
    $("#dialog").removeClass("alert-warning");

}

/** get form data to create items */

function submitMainForm(){
    var elecRate = $("#elecRate").val();
    var costOfGas = $("#costOfGas").val();
    if (elecRate.length > 0) {
        curUser.elecRate = parseFloat(elecRate);
    }
    if (costOfGas.length > 0) {
        curUser.costOfGas = parseFloat(costOfGas);
    }
    updateUser(curUser);
    var myForms = $("div[id$='Wrapper']");
    // iterates through all forms.
    var items = new Array();
    for(var i = 0; i < myForms.length; i++ ){
        var item = new Item();
        item.specs = {};
        var form = myForms[i];
        var children = form.childNodes;
        // gets all input name/value pairs and select name/value pairs
        for(var j = 0; j < children.length; j++) {
            var node = $(children[j]);
            if (node.is('h3')) {
                item.name = $(node).html().split("<")[0].trim();
            }
            if (node.is('input')) {
                if ($(node).attr('name') == 'energy') {
                    item.energy = $(node).val();
                }
                else if ($(node).attr('name').indexOf('uantity') != -1) {
                    var val = $(node).val();
                    item.quantity = $(node).val();
                }
                else {
                    var key = $(node).attr('name');
                    var val = $(node).val();
                    item.addSpec(key,val);
                }
            }
            if (node.is('select')) {
                var key = $(node).attr('name');
                var val = $(node).val();
                item.addSpec(key,val);
            }
            if (node.is('div') && $(node).hasClass('input-group')) {
                var arr = $(node).children();
                for(var k = 0; k < arr.length; k ++) {
                    if ($(arr[k]).is('input')) {
                        var key = $(arr[k]).attr('name');
                        var val = $(arr[k]).val();
                        item.addSpec(key,val);
                    }
                }
            }
        }
        item.userId = curUser.userId;
        item.specs = JSON.stringify(item.specs);
        items.push(item);
    }
    saveItems(items);
    window.location.replace("../CheckStats");
}

/** search functions */

function search(key, filter) {
    var items = curItems;
    var hits = [];
    $.each(items, function (itemId, item) {
        if(item.name.toLowerCase().indexOf(key.toLowerCase()) != -1 && (filter.length == 0 || (filter.length > 0 && item.energy == filter))) {
            hits.push(item);
        }
    });
    return hits;
}

function populateFilteredList(hits, list, reply) {
    list.empty();
    var s = "";
    for (var i in hits) {
        var item = hits[i];
        s = prepareRow(item, s);
    }
    list.append(s);
    reply.html(hits.length + " results");
}

function populateList(list,reply) {
    var count = 0;
    var items = curItems;
    var s = "";
    $.each(items, function (itemId, item) {
        console.log(item);
        s = prepareRow(item, s);
        ++count;
    });
    list.append(s);
    reply.html(count + " result(s)");
    generateGraph() ;
}

function prepareRow(item, s) {
    var specsStr = JSON.stringify(item.specs);
    s += ("<tr onmouseover='prepareSpecs("+specsStr+")'>");
    s += ("<td>"+item.name+"</td>");
    s += ("<td>"+item.energy+"</td>");
    s += ("<td>"+item.quantity+"</td>");
    s += ("<td>"+item.dateCreated.split("T")[0]+"</td>");
    s += ("<td><button data-toggle='modal' class='btn btn-default' data-target='#myModal'>Specs</button></td>");
    var costOf = 0;
    var mySpecs = JSON.parse(item.specs);
    switch(item.name){
        case("Light Bulbs"):
            costOf = bulbCalc(mySpecs, item.quantity);
            break;
        case("Central Air Conditioning"):
            costOf = accCalcs(mySpecs, item.quantity);
            break;
        case("Furnace"):
            costOf = furnaceCalcs(mySpecs, item.quantity);
            break;
        case("Personal Air Conditioner"):
            costOf = acrCalcs(mySpecs, item.quantity);
            break;
        case("Air Purifier"):
            costOf = airPure(mySpecs,item.quantity);
            break;
        case("Clothes Washer"):
            costOf = clothesWasher(mySpecs, item.quantity);
            break;
        case("Dehumidifier"):
            costOf = dehumidifierCalcs(mySpecs, item.quantity);
            break;
        case("Dishwasher"):
            costOf = dishwasherCalcs(mySpecs, item.quantity);
            break;
        case("Refrigerator"):
            costOf = fridgeConsumption(mySpecs,item.quantity);
            break;
        case("Refrigerator - Compact"):
            costOf = cFridgeCalcs(mySpecs,item.quantity);
            break;
        case("Freezer"):
            costOf = freezerCalcs(mySpecs,item.quantity);
            break;
    }
    s += ("<td>$"+ (costOf).toFixed(2) +"</td>");
    s += ("</tr>");
    return s;
}

function prepareSpecs(s) {
    var r = "";
    var obj = JSON.parse(s);
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            r += "<tr><td>"+prop + "</td><td>" + obj[prop] + "</td></tr>";
        }
    }
    r += "<tr><td></td><td></td></tr>"
    $("#specs").html(r);
}

function generateGraph() {
    var monthtotals = [0,0,0,0,0,0,0,0,0,0,0,0];

    var M = $("#item-list");
    var rows = M.children();
    for (var i = 0; i < rows.length; i ++) {
        var row = rows[i];
        var cols = $(row).children();
        var cost = parseFloat(($(cols[cols.length-1]).html()).toString().split("$")[1]);
        var mo = parseInt(($(cols[cols.length-3]).html()).toString().split("-")[1])-1;
        monthtotals[mo] += cost;
    }

    var data = {
        labels : ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets : [
            {
                fillColor : "rgba(151,187,205,0.5)",
                strokeColor : "rgba(151,187,205,1)",
                data : monthtotals
            }
        ]
    }

    var options = {

        //Boolean - If we show the scale above the chart data
        scaleOverlay : false,

        //Boolean - If we want to override with a hard coded scale
        scaleOverride : false,

        //** Required if scaleOverride is true **
        //Number - The number of steps in a hard coded scale
        scaleSteps : null,
        //Number - The value jump in the hard coded scale
        scaleStepWidth : null,
        //Number - The scale starting value
        scaleStartValue : 0,

        //String - Colour of the scale line
        scaleLineColor : "rgba(0,0,0,.1)",

        //Number - Pixel width of the scale line
        scaleLineWidth : 1,

        //Boolean - Whether to show labels on the scale
        scaleShowLabels : true,

        //Interpolated JS string - can access value
        scaleLabel : "<%=value%>",

        //String - Scale label font declaration for the scale label
        scaleFontFamily : "'Arial'",

        //Number - Scale label font size in pixels
        scaleFontSize : 12,

        //String - Scale label font weight style
        scaleFontStyle : "normal",

        //String - Scale label font colour
        scaleFontColor : "#666",

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,

        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth : 1,

        //Boolean - If there is a stroke on each bar
        barShowStroke : true,

        //Number - Pixel width of the bar stroke
        barStrokeWidth : 2,

        //Number - Spacing between each of the X value sets
        barValueSpacing : 5,

        //Number - Spacing between data sets within X values
        barDatasetSpacing : 1,

        //Boolean - Whether to animate the chart
        animation : true,

        //Number - Number of animation steps
        animationSteps : 60,

        //String - Animation easing effect
        animationEasing : "easeOutQuart",

        //Function - Fires when the animation is complete
        onAnimationComplete : null

    }

    //Get the context of the canvas element we want to select
    var ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx).Bar(data,options);
}

function sum(arr) {
    var total = 0;
    for (var i = 0; i < arr.length ; i ++) {
        total += arr[i];
    }
    return total;
}

