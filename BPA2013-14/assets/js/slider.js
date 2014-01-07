sliderInt = 1;
sliderNext = 2;

$(document).ready(function(){
	$("#slider > img#1").fadeIn(300);
	startSlider();
});

function startSlider(){
	count = $("#slider > img").size();
	loop = setInterval(function(){
		if($sliderNext > count){
			sliderNext = 1;
			sliderInt = 1;
		}
		$("#slider > img").fadeOut(300);
		$("#slider > img#" + sliderNext).fadeIn(300);
		
		sliderInt = sliderNext;
		sliderNext++;
		
		
	},3000);

}
