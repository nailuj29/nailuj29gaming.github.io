function activate() {
$("#hidden").show(1000);
$("#title").text("Easter Egg!")
}
/*start easter egg*/
$(document).ready(function(){
$("#ee").click(function(){
$("#all").hide(1000);
setTimeout(activate, 1000);
});

});