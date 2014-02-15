var userECost = curUser.elecRate;
function getAssumptions(){
   return JSON.parse($.ajax({type: "GET", url: "../assets/js/assumptions.json", async: false}).responseText);
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
    var eStarOpEnergy = .02 * userHours * userDays;
    //Standby Energy
    var userStandby = (8760- userHours * userDays)* .001;
    var eStarStandby = (8760- userHours * userDays)* .00006;
    return [(userOpEnergy*userStandby) * quantity * userECost, (eStarOpEnergy + eStarStandby) * quantity * userECost];
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
    var eStarArc = 417;
    //Total Electricity, based on electric dryer
    var userTotalEDryer = userCapacity/userMEF*userLoadsAYear;
    var eStarTotalEDryer = userCapacity/2.0*userLoadsAYear;
    //Electric and Gas Stuff
    var userECons = userArc * .2 ;
    var eStarECons = eStarArc * .2;
    //Hot water Heating Energy
    if(userHotWaterFuel == "elec"){
        userECons += .8 * userArc;
        eStarECons += .8 * eStarArc;
    }
    //Dryer Energy
    if(userDryerType == "elec"){
        userECons += userTotalEDryer - userArc;
        eStarECons += eStarTotalEDryer - 417;
    }

    return [userECons * userECost * quantity, eStarECons * userECost * quantity];
}

function dehumidifierCalcs(specs, quantity){
    var userCap = Number(specs.dehmidCap);
    var userEF = Number(specs.dehumidEFactor);
    var userDays = Number(specs.dehumidDaysOfOp);
    var userHours = Number(specs.dehumidHoursOfOp);
    var usage = (userCap *.473)/userEF/24*userHours*userDays;
    var eStarUsage = (userCap *.473)/((userCap >= 75) ? 2.8 : 1.85)*userHours*userDays;
    return [usage * userECost * quantity, eStarUsage * userECost * quantity];
}
function dishwasherCalcs(specs, quantity){
    var userCycles = Number(specs.dishWashCyclesPerWeek);
    var userHotWaterFuel = Number(specs.dishWashHotWaterFuelType);
    var userREC = Number(specs.dishWashEConsumption);
    var userType = specs.dishWashType;
    //machine energy
    var userEnergy= (userREC*(1 -.56))/215;
    var eStarEnergy = (userType.indexOf("compact") > 0) ? 222 : 285;
    //Water Heater Energy
    if(userHotWaterFuel == "elec"){
        userEnergy += userREC*.56/215
    }
    userEnergy = userEnergy * userCycles * 52;
    //return calculated values
    return [userEnergy * userECost * quantity, eStarEnergy * userECost * quantity];
}
function fridgeConsumption(specs, quantity) {
    var value = getAssumptions();
    var userOpt = specs.fridgeType;
    var userECons = Number(specs.fridgeEConsumption);
    var energyStarConsumption = value.fridgeAssump.energyStar.energyConsumption[userOpt];
    return [userECons * userECost * quantity, energyStarConsumption * userECost * quantity];
}
function cFridgeCalcs(specs, quantity){
    var value = getAssumptions();
    var userOpt = specs.cFridgeType;
    var userECons = Number(specs.cFridgeEConsumption);
    var energyStarConsumption = value.cFridgeAssump.energyStar.energyConsumption[userOpt];
    return [userECons * userECost * quantity, energyStarConsumption * userECost * quantity];
}
function freezerCalcs(specs, quantity){
    var value = getAssumptions();
    var userOpt = specs.freezerType;
    var userECons = Number(specs.freezereEConsumption);
    var energyStarConsumption = value.freezerAssump.energyStar.energyConsumption[userOpt];
    return [userECons * userECost * quantity, energyStarConsumption * quantity * userECost];
}
function acrCalcs(specs, quantity){//Room Air conditioning
    var value = getAssumptions();
    var userCoolCap = Number(specs.acrCoolCap);
    var userEER = Number(specs.eerRating);
    var userState = curUser.state;
    var userEnergyCons = (quantity * (userCoolCap/userEER)*value.roomACassumps.stateFullLoadCoolingHours[userState]);
    var eStarEER = 0;
    if(userCoolCap <= 8000){
        eStarEER = 10.4;
    }
    else{
        eStarEER = 9.8;
    }
    var eStarEnergyCons = (quantity *userCoolCap/eStarEER)*value.roomACassumps.stateFullLoadCoolingHours[userState];
    return [userEnergyCons * userECost, eStarEnergyCons * userECost];
}
function accCalcs(specs, quantity){
    var value = getAssumptions();
    var userThermos = Number(specs.accThermos);
    var userState = curUser.state;
    var userSEER = Number(specs.seerRating);
    var userCoolCap = Number(specs.accCoolCapacity);
    var calcCoolCap;
    var userEnergyCons;
    var eStarEnergyCons;
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
        userEnergyCons = .84*quantity*value.roomACassumps.stateFullLoadCoolingHours[userState]*36000*(1/userSEER)/1000;
        eStarEnergyCons = .84*quantity*value.roomACassumps.stateFullLoadCoolingHours[userState]*36000*(1/14)/1000;
    }
    else{
        userEnergyCons = quantity*value.roomACassumps.stateFullLoadCoolingHours[userState]*36000*(1/userSEER)/1000;
        eStarEnergyCons = quantity*value.roomACassumps.stateFullLoadCoolingHours[userState]*36000*(1/14)/1000;
    }
    return [userEnergyCons * userECost, eStarEnergyCons * userECost];
}
function furnaceCalcs(specs, quantity){
    var value = getAssumptions();
    var userHeatHouseFuel = specs.furnFuelType;
    var userGasRate = curUser.costOfGas;
    var userHouseSize = Number(specs.furnHouseSize);
    var userHouseDate = specs.furnHouseEra;
    var userFurnaceDate = specs.furnEra;
    var userThermos = Number(specs.furnThermos);
    var userECons;
    var userMMBTU = userHouseSize * value.HouseYear[userHouseDate] / (value.furnYear[userHeatHouseFuel][userFurnaceDate] * value.HouseYear[userHouseDate]);
    var eStarMMBTU = userHouseSize * value.HouseYear[userHouseDate] / (((userHeatHouseFuel.indexOf("gas") > 0) ? 0.9 : 0.85) * value.HouseYear[userHouseDate]);

    var eStarECons;
    if(userThermos == 1){
        userMMBTU = userMMBTU * (0.86);
        eStarMMBTU *= 0.86
    }
    if(userHeatHouseFuel.indexOf("gas") >= 0 ){
        userECons = userMMBTU/100000;
        eStarECons = eStarMMBTU/10000;
    }
    else if(userHeatHouseFuel.indexOf("oil") >= 0){
        userECons = userMMBTU/138690*1000000;
        eStarECons = eStarMMBTU/138690*1000000;
    }
    return [userECons * userGasRate * quantity, eStarECons * userGasRate * quantity];
}
function bulbCalc(specs, quantity){
    var value = getAssumptions();
    var userBulbType = Number(specs.bulbType);
    var userHours = Number(specs.bulbAvgDailyUse);
    var userLifetime = Number(specs.bulbLife);
    var userConsumption = (userHours/1000 * userBulbType * (userLifetime / 24))*quantity;
    var eStarCons = (userHours/1000 * value.lightBulbComp[userBulbType.toString()] * (userLifetime / 24) * quantity)
    return [userConsumption * userECost, eStarCons * userECost];

}