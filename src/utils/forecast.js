const request = require("request");

var poss = null;
var poss2 = null;
var msg = "";
var msg2 = "";

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/cd9ebdce570920fd0fd1d62fe3f65a42/" +
    latitude +
    "," +
    longitude +
    "?units=si";

  request({ url, json: true }, (error, { body }) => {
    function deg() {
      poss = body.currently.precipProbability * 100;
      poss2 = body.currently.temperature;
      if (poss2 <= 10) {
        msg2 = "Sıkı giyinmeye özen gösterin";
      } else if (poss2 >= 11 && poss2 <= 23) {
        msg2 = " Hava çok soğuk değil ama yine de dikkatli olun";
      } else {
        msg2 = "Güzel havanın tadını çıkarmanızı dileriz ..";
      }
      if (poss > 30) {
        msg = "Şemsiyenizi yanınızdan ayırmayın ";
      }
    }
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        deg(),
        " Şu anda sıcaklık : " +
          body.currently.temperature +
          "  derece.     " +
          " Hissedilen sıcaklık:  " +
          body.currently.apparentTemperature +
          " derece.      Yağmur olasılığı yüzde : " +
          body.currently.precipProbability * 100 +
          "    " +
          ". Ayrıca rüzgar hızı saatte :  " +
          body.currently.windSpeed +
          " km/h    " +
          msg +
          "      " +
          msg2
      );
    }
  });
};

module.exports = forecast;
