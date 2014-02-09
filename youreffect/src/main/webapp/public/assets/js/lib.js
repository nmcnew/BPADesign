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
        s = prepareRow(item, s);
        ++count;
    });
    list.append(s);
    reply.html(count + " result(s)");

}

function prepareRow(item, s) {
    var specsStr = JSON.stringify(item.specs);
    s += ("<tr onmouseover='prepareSpecs("+specsStr+")'>");
    s += ("<td>"+item.name+"</td>");
    s += ("<td>"+item.energy+"</td>");
    s += ("<td>"+item.quantity+"</td>");
    s += ("<td>"+item.dateCreated.split("T")[0]+"</td>");
    s += ("<td><button data-toggle='modal' data-target='#myModal'>Specs</button></td>");

    // i need the item cost to be calculated and replace the $0.00 with the actual cost :)

    s += ("<td>$0.00</td>");
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
