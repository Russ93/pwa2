/*
Description: DESCRIPTION INFO GOES HERE
1Main.js
*/
$(function(){
function loadLang(){
	$.ajax({
		url:"xhr/list.php",
		type:"get",
		dataType:"json",
		success:function(response){
			console.log(response);
			var langs=response.languages;
			var html="";
			var html=$.render(langs,"langtemplate");
			$("#languages").append(html);
		}
	});
};
//app init
function init(){
	$.get("template/languages.html", function(htmlArg){
		var lang=$(htmlArg).find("#lang-template").html();
		$.template("langtemplate",lang);
		console.log("herro");
	});
};
init();
//app events
$("button").on("click",function(e){
	loadLang();
	return false;
});
});