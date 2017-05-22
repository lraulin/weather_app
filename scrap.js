$(document).ready(function() {
  var lat, long, temp;
  var tempSwap = true;

  function windDir(d) {
    if (d > 22.5 && d <= 67.5) {
      return "NE";
    } else if (d > 67.5 && d <= 112.5) {
      return "E";
    } else if (d > 112.5 && d <= 157.5) {
      return "SE";
    } else if (d > 157.5 && d <= 202.5) {
      return "S";
    } else if (d > 202.5 && d <= 247.5) {
      return "SW";
    } else if (d > 247.5 && d <= 292.5) {
      return "W";
    } else if (d > 292.5 && d <= 337.5) {
      return "NW";
    } else {
      return "N";
    }
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      api = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=5196b461d290b522c0076a1f69a98612";
      $("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
      $.getJSON(api, function(data) {
        var weatherType = data.weather[0].description;
        var tempK = data.main.temp;
        var tempC = Math.round(tempK - 273.15) + " °C";
        var tempF = Math.round(tempK * 1.8 - 459.67) + " °F";
        var windSpeed = data.wind.speed + " mph ";
        var wdir = windDir(data.wind.direction);
        var city = data.name;

        console.log(city);
        console.log(api);
        console.log(weatherType);
        console.log(tempC + " " + tempF);

        $('#city').text(city);
        $('#temp').text(tempK);
        $('#weather').text(weatherType);
        $('#wind-speed').text(windSpeed);
        $('#wind-dir').text(wdir);
        $('tempF').text(tempF);

        $('#tempF').click(function() {
          if (tempSwap === true) {
            $('#tempF').text(tempC);
            tempSwap = false;
          } else {
            $('#tempF').text(tempF);
            tempSwap = true;
          }
        });

        if (weatherType.includes("overcast") | weatherType.includes("cloud")) {
          $.css("background-image", "url('cloudy-day-5.jpg')");
        }

      });
    });
  }
});
