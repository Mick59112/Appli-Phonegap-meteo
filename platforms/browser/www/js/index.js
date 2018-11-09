
var loader = $("#loader");
loader.hide();

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        // listener click button OK
        document.getElementById('buttonSubmitCity').addEventListener("click",submitCity);
    }
};

function submitCity() {
    var city = $("#city");

    if(city.val().length <= 0) {
        alert("Vous devez saisir une ville");
        return; // stop l'execution du programme -> sort de la fonction
    }
    loader.show();

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q="+city.val()+",fr&units=metric&appid=cd27fb59bb7ee2920b45336dba149a15",
        method: "get",
        dataType: "json",
        success: function(json) {
            loader.hide();
            var resultCity = $("#resultCity"); 
            var resultTemperature = $("#resultTemperature");
            var resultIcon = $("#resultIcon");
            
            resultCity.html(json.name);
            resultTemperature.html(json.main.temp);
            resultIcon.html('<img src="https://openweathermap.org/img/w/'+ json.weather[0].icon +'.png" width="100px" />');
        },
        error: function(response) {
            loader.hide();
            alert("Erreur serveur");

        },
    });
}