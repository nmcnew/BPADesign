var userECost = curUser.elecRate;
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
function airPure(specs, quantity){//Completed Energy Star and User Sides
    //load variables
    var userCap = Number(specs.airPureCap);
    var userEff = Number(specs.airPureEff);
    var userHours = Number(specs.airPureHoursADay);
    var userDays = Number(specs.airPureDaysOfOp);
    //Operation Power, does not have a use other than in this calc
    var userOpPower = userCap/userEff/1000;
    //Operation Energy
    var userOpEnergy = userOpPower * userHours * userDays;
    var eStarOpEnergy = .03 * userHours * userDays;
    //Standby Energy
    var userStandby = (8760- userHours * userDays)* .001;
    return (userOpEnergy*userStandby) * quantity * userECost;
}
function clothesWasher(specs, quantity){//completed User side
    //load vars
    var userLoads = Number(specs.clothesWasherLoadsPerWeek);
    var userHotWaterFuel = Number(specs.clothesWasherBuildFuelType);
    var userREC = Number(specs.clothesWasherECons);
    var userDryerType = Number(specs.clothesWasherDryerFuelType);
    var userCapacity = Number(specs.clothesWasherCapacity);
    var userMEF = Number(specs.clothesWasherMEF);
    //loads a year, used only in this calc
    var userLoadsAYear = userLoads*52;
    //adjusted rated unit electricity consumption, referred to as ARC
    var userArc = (userREC * userLoadsAYear)/392;
    //Total Electricity, based on electric dryer
    var userTotalEDryer = userCapacity/userMEF*userLoadsAYear;
    //Electric and Gas Stuff
    var userECons = userArc * .2 ;
    //Hot water Heating Energy
    if(userHotWaterFuel == "elec"){
        userECons += .8 * userArc;
    }
    //Dryer Energy
    if(userDryerType == "elec"){
        userECons += userTotalEDryer - userArc;
    }

    return userECons * userECost * quantity;
}

function dehumidifierCalcs(specs, quantity){
    var userCap = Number(specs.dehmidCap);
    var userEF = Number(specs.dehumidEFactor);
    var userDays = Number(specs.dehumidDaysOfOp);
    var userHours = Number(specs.dehumidHoursOfOp);
    var usage = (userCap *.473)/userEF/24*userHours*userDays;
    return usage * userECost * quantity;
}
function dishwasherCalcs(specs, quantity){
    var userCycles = Number(specs.dishWashCyclesPerWeek);
    var userHotWaterFuel = Number(specs.dishWashHotWaterFuelType);
    var userREC = Number(specs.dishWashEConsumption);
    //machine energy
    var userEnergy= (userREC*(1 -.56))/215;
    //Water Heater Energy
    if(userHotWaterFuel == "elec"){
        userEnergy += userREC*.56/215
    }
    userEnergy = userEnergy * userCycles * 52;
    //return calculated values
    return userEnergy * userECost * quantity;
}
function fridgeConsumption(specs, quantity) {
    var value = getAssumptions();
    var userOpt = specs.fridgeType;
    var userECons = Number(specs.fridgeEConsumption);
    var energyStarConsumption = value.assumptions[0].fridgeAssump.energyStar.energyConsumption[userOpt];
    var savings = userECons - energyStarConsumption;
    return userECons*userECost;
}
function cFridgeCalcs(specs, quantity){
    var value = getAssumptions();
    var userOpt = specs.cFridgeType;
    var userECons = Number(specs.cFridgeEConsumption);
    var energyStarConsumption = value.assumptions[0].cFridgeAssump.energyStar.energyConsumption[userOpt];
    var savings = userECons - energyStarConsumption;
    return userECons*userECost;
}
function freezerCalcs(specs, quantity){
    var value = getAssumptions();
    var userOpt = specs.freezerType;
    var userECons = Number(specs.freezereEConsumption);
    var energyStarConsumption = value.assumptions[0].freezerAssump.energyStar.energyConsumption[userOpt];
    var savings = userECons - energyStarConsumption;
    return userECons*userECost;
}
function acrCalcs(specs, quantity){//Room Air conditioning
    var userCoolCap = Number(specs.acrCoolCap);
    var userEER = Number(specs.eerRating);
    var userState = curUser.state;
    var value = getAssumptions();
    var userEnergyCons = (quantity * (userCoolCap/userEER)*value.assumptions[0].roomACassumps.stateFullLoadCoolingHours[userState]);
    return userEnergyCons * userECost * quantity;
}
function accCalcs(specs, quantity){
    var userThermos = Number(specs.accThermos);
    var userState = curUser.state;
    var userSEER = Number(specs.seerRating);
    var userCoolCap = Number(specs.accCoolCapacity);
    var calcCoolCap;
    var userEnergyCons;
    switch(userCoolCap){
        case(2.5):
            calcCoolCap = 30000;
            break;
        case(3.0):
            calcCoolCap = 36000;
            break;
        case(3.5):
            calcCoolCap = 42000;
            break;
        case(4.0):
            calcCoolCap = 48000;
            break;
        case(5.0):
            calcCoolCap = 60000;
            break;
    }
    if(userThermos == 1){
        userEnergyCons = .84*quantity*userState*(1/userSEER)/1000;
    }
    else{
        userEnergyCons = quantity*userState*(1/userSEER)/1000;
    }
    return userEnergyCons * userECost;
}
function furnaceCalcs(specs, quantity){
    var value = getAssumptions();
    var userHeatHouseFuel = Number(specs.furnFuelType);
    var userGasRate = curUser.costOfGas;
    var userHouseSize = Number(specs.furnHouseSize);
    var userHouseDate = Number(specs.furnHouseEra);
    var userFurnaceDate = Number(specs.furnEra);
    var userThermos = Number(specs.furnThermos);
    var userECons;
    var userMMBTU = userHouseSize * value.assumptions[0].HouseYear[userHouseDate] / value.assumptions[0].furnYear[userHeatHouseFuel][userFurnaceDate];
    if(userThermos == 1){
        userMMBTU = userMMBTU * (.86);
    }
    if(userHeatHouseFuel == "gas"){
        userECons = userMMBTU/100000;
    }
    else if(userHeatHouseFuel == "oil"){
        userECons = userMMBTU/138690*1000000;
    }
    return userECons * userGasRate * quantity;
}
function bulbCalc(specs, quantity){
    var userBulbType = Number(specs.bulbType);
    var userHours = Number(specs.bulbAvgDailyUse);
    var userConsumption = (userHours/1000 *userBulbType * 365)*quantity;
    return userConsumption*userECost * quantity;

}