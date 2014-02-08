var userECost = .1138;
function getAssumptions(){
    $.ajax({
        url : '../assets/js/assumptions.json',
        async : false,
        dataType : 'json',
        success : function(response) {
            return response;
        }
    });
}
function airPure(){//Completed Energy Star and User Sides
    //load variables
    var userCap;
    var userEff;
    var userHours;
    var userDays;
    var userQuantity;
    //Operation Power, does not have a use other than in this calc
    var userOpPower = userCap/userEff/1000;
    //Operation Energy
    var userOpEnergy = userOpPower * userHours * userDays;
    var eStarOpEnergy = .03 * userHours * userDays;
    //Standby Energy
    var userStandby = (8760- userHours * userDays)* .001;
    var eStarStandby = (8760- userHours * userDays)* .6/1000;
    //Annual Use
    var userAnnual = userStandby + userOpEnergy;
    var eStarAnnual = eStarStandby + eStarOpEnergy;
    return[userOpEnergy * userQuantity ,eStarOpEnergy * userQuantity, userAnnual * userQuantity, eStarAnnual * userQuantity];
}
function clothesWasher(){//completed User side
    //load vars
    var userQuantity;
    var userLoads;
    var userHotWaterFuel;
    var userREC;
    var userDryerType;
    var userCapacity;
    var userMEF;
    var userWF;
    //loads a year, used only in this calc
    var userLoadsAYear = userLoads*52;
    //adjusted rated unit electricity consumption, referred to as ARC
    var userArc = (userREC * userLoadsAYear)/392;
    //Total Electricity, based on electric dryer
    var userTotalEDryer = userCapacity/userMEF*userLoadsAYear;
    //Electric and Gas Stuff
    var userGasCons;
    var userECons = userArc * .2 ;
    //Hot water Heating Energy
    if(userHotWaterFuel == "elec"){
        userECons += .8 * userArc;
    }
    else if(userHotWaterFuel == "natGas"){
        userGasCons += (.8 * userArc) / .78 * .0341; //.0341 is the therm/kWh converter
    }
    //Dryer Energy
    if(userDryerType == "elec"){
        userECons += userTotalEDryer - userArc;
    }
    else if(userDryerType == "natGas"){
        userGasCons += (userTotalEDryer - userArc) * .03421;
    }
    var userWaterConsumption = userWF * userCapacity * userLoadsAYear;

    return[];
}

function dehumidifierCalcs(){
    var userCap ;
    var userEF;
    var userDays;
    var userHours;
    var usage = (userCap *.473)/userEF/24*userHours*userDays;
    return usage;
}
function dishwasherCalcs(){
    var userType;
    var userCycles;
    var userHotWaterFuel;
    var userREC;
    var userRWC;
    var userGasCons;
    //machine energy
    var userEnergy= (userREC*(1 -.56))/215;
    //Water Heater Energy
    if(userHotWaterFuel == "elec"){
        userEnergy += userREC*.56/215
    }
    else if(userHotWaterFuel == "natGas"){

        userGasCons = (userREC*.56/.75*.0341/215)*userCycles*52;
    }
    userEnergy = userEnergy * userCycles * 52;
    var userWC = userRWC * userCycles * 52;
    //return calculated values
}
function fridgeConsumption() {
    var value = getAssumptions();
    var userOpt;
    var userECons;
    var energyStarConsumption = value.assumptions[0].fridgeAssump.energyStar.energyConsumption[userOpt];
    var savings = userECons - energyStarConsumption;
    return [savings, savings*userECost, userEnergyConsumption,];
}
function cFridgeCalcs(){

}