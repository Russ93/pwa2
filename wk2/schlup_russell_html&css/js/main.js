/*
Description: DESCRIPTION INFO GOES HERE
1Main.js
*/
$("document").ready(function(){

$('#jlog').bind('click', login());

function login(){
	$.get("hts/login.html", function(htmlArg){
		var login=$(htmlArg).find("#jq").html();
		$.template("login",login);
		console.log("Login got clicked");
	});
}
login();

$.ajax({
		url: 'hts/login.html',
		type: 'get',
		dataType: 'json',
		success: function (response){
			console.log(response);
			var langs = response.languages;
			var html = '';
			$('#jq').append(html);
			
		}
	})

});


/*
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
*/
