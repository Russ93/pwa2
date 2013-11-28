(function(){
	
var request = new XMLHttpRequest();

request.addEventListener("load", function(e){
	e = e||event
    console.log(e);
}, false);

request.open('GET', 'templates/landing.html', true),
request.send();

})();