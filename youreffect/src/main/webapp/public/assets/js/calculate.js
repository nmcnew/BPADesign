var assumptions = {
	"assumptions" : [{
		"fridgeAssump" : {
			"energyStar" : {
				"volumes" : {
					"type1" : 12.2,
					"type2" : 17.9,
					"type3" : 22.7,
					"type4" : 24.6,
					"type5" : 20,
					"type6" : 25.4
				},
				"energyConsumption" : {
					"type1" : 391,
					"type2" : 434,
					"type3" : 513,
					"type4" : 545,
					"type5" : 467,
					"type6" : 540
				}
			}
		},
		"cFridgeAssump" : {
			"energyStar" : {
				"volumes" : {
					"1" : 3.3,
					"2" : 3.2,
					"3" : 4.5,
					"4" : 5.1
				},
				"energyConsumption" : {
					"1" : 273,
					"2" : 341,
					"3" : 324,
					"4" : 335
				}
			}
		},
		"freezerAssump" : {
			"energyStar" : {
				"volumes" : {
					"1" : 15.4,
					"2" : 12.4,
					"3" : 3.0,
					"4" : 5.3,
					"5" : 12.6,
					"6" : 16.9
				},
				"energyConsumption" : {
					"1" : 366,
					"2" : 387,
					"3" : 460,
					"4" : 625,
					"5" : 414,
					"6" : 592
				}
			}
		}
	}]
};

var userECost = .1138;
function fridgeConsumption() {
	var userOpt = "3";
	var userEnergyConsumption = 513;
	//will be dynamically driven once item API is done, need to Finish ERD
	var userVolume = 22.7;
	var energyStarConsumption = assumptions.assumptions[0].fridgeAssump.energyStar.energyConsumption["type" + userOpt];
	var savings = userEnergyConsumption - energyStarConsumption;
	return [savings, savings*userECost, userEnergyConsumption];
}
