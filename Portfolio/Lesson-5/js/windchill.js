var ws = document.getElementById("windSpeed").textContent;
var temp = document.getElementById("temp").textContent;
var windChill = 0;

if (ws > 3 && temp < 50) {
    windChill = 35.74 + 0.6215 * temp - 35.75 * Math.pow(ws, 0.16) + 0.4275 * temp * Math.pow(ws, 0.16);
    document.getElementById('windChill').textContent=Math.round(windChill).toString() + "°F";
  } else {
    document.getElementById('windChill').textContent="N/A";
  }

