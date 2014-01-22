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
    switch(selected) {
        case "acCentral":
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
            $(".mainForm").append('<h3>Incandescent Bulbs</h3><div class="input-group"><input type="number" class="form-control" placeholder="Qunatity"><input type="number" class="form-control" placeholder="Average Daily Use (hours)"></div><div class="input-group"><div class="input-group-btn"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">75 W Incandescent <span class="caret"></span></button><ul class="dropdown-menu"><li><a href="#">40 W incandescent</a></li><li><a href="#">60 W incandescent</a></li><li><a href="#">75 W incandescent</a></li><li><a href="#">100 W incandescent</a></li><li><a href="#">150 W incandescent</a></li><li><a href="#">29 W Halogen(40 W Equivalent)</a></li><li><a href="#">43 W Halogen(60 W Equivalent)</a></li><li><a href="#">53 W Halogen(75 W Equivalent)</a></li><li><a href="#">72 W Halogen(100 W Equivalent)</a></li></ul></div></div><br/>');
            break;
        case "fridge":
            break;
        case "compactFridge":

            break;
    }
}