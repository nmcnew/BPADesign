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
            var data = JSON.parse(data);
            console.log(data);
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
            $(".mainForm").append('<div></div>');
            $($(".mainForm")[0].childNodes[$(".mainForm")[0].childNodes.length - 1]).load('testPage.html #furnWrap');
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
    // iterates through all forms.
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
                //having trouble with input group
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
        console.log(item);
        saveItem(item);
    }
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