var userECost = .1138;
function fridgeConsumption() {
	var value;
	 $.ajax({
		url : '../assets/js/assumptions.json',
		async : false,
		dataType : 'json',
		success : function(response) {
			console.log(response);
			value = response;
			
			console.log(value);
		}
	}); 
	var userOpt = "3";
	console.log(value.assumptions[0].fridgeAssump.energyStar.volumes["type"+userOpt]);
	
	var userEnergyConsumption = 513;
	//will be dynamically driven once item API is done, need to Finish ERD
	var userVolume = 22.7;
	var energyStarConsumption = assumptions.assumptions[0].fridgeAssump.energyStar.energyConsumption["type" + userOpt];
	var savings = userEnergyConsumption - energyStarConsumption;
	return [savings, savings*userECost, userEnergyConsumption,];
}
