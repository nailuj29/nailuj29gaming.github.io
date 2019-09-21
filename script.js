function activate() {
	$("#hidden").show(1000);
	$("#title").text("Easter Egg!");
}
function deactivate() {
	$("#all").slideDown(1000);
	$("#title").text("Nailuj's Website");
}
function ultra() {
	$("#hiddener").slideDown(1000);
	$("#title").text("Easter Egg...ER");
}
/*start easter egg*/
$(document).ready(function(){
	$("#ee").click(function(){
		$("#all").hide(1000);
		setTimeout(activate, 1000);
	});
	$("#close").click(function() {
		var rand = Math.floor(Math.random() * 101);
		console.log(rand);
		if (rand !== 0) {
			$("#hidden").effect("explode", {pieces: 100}, 2500);
			setTimeout(deactivate, 2500);
		}
		else {
			$("#hidden").hide(1000);
			setTimeout(ultra, 1000);
		}
			
	});
});