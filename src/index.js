//function que obtiene la informacion solicitada desde la API
//function que usa async y wait para obtener la info de la info de apicaller
// y function sacar solo los datos solicitados para el DOM
import "./styles.css";

const inputWeather = document.getElementById("input-location");
const searchBtn = document.getElementById("searchBtn");
const weatherInfo = document.getElementById("wheater-info-box");

//factory function to fetch the data
const requestData = (function () {
  function fetchData(locationInfo) {
    let request;
    let t = new Date().toISOString().split("T")[0];
    let actualTime = `/${t}`;
    if (locationInfo === "") {
      request = "/Argentina";
    } else {
      request = `/${locationInfo}`;
    }
    return fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline" +
        request +
        actualTime +
        "?unitGroup=metric&include=current&key=DUCM6VUKKLGAHXXSRLE8EUPBV&contentType=json",
      {
        mode: "cors",
      },
    );
  }

  return { fetchData };
})();

//prepare DOM
function displayDOM(dataJSON) {
  weatherInfo.textContent = "";
  const location = document.createElement("p");
  (location.className = "location"), (location.textContent = dataJSON.location);
  const temperature = document.createElement("p");
  (temperature.className = "temperature"),
    (temperature.textContent = `${dataJSON.temp} °C`);
  const humidity = document.createElement("p");
  (humidity.className = "humidity"),
    (humidity.textContent = `Humidity: ${dataJSON.humidity}%`);
  const windspeed = document.createElement("p");
  (windspeed.className = "windspeed"),
    (windspeed.textContent = `Windspeed: ${dataJSON.windspeed}km/h`);
  const condition = document.createElement("p");
  (condition.className = "condition"),
    (condition.textContent = dataJSON.condition),
    weatherInfo.appendChild(location),
    weatherInfo.appendChild(temperature),
    weatherInfo.appendChild(humidity),
    weatherInfo.appendChild(windspeed),
    weatherInfo.appendChild(condition);
}

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  requestData
    .fetchData(inputWeather.value)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const info = {
        location: data.resolvedAddress,
        temp: data.days[0].temp,
        humidity: data.days[0].humidity,
        windspeed: data.days[0].windspeed,
        condition: data.days[0].conditions,
      };
      console.log(info);
      displayDOM(info);
    })
    .catch((e) => console.error("Fetch error:", e));
});
