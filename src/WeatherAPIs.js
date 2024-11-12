const key = "9e51861c311aa213c12f1f896c9c185a";

async function weatherCurrent(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=pt_br`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Erro:", error);
  }
}

async function getCurrentLocationCoords(cidade) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cidade},&limit=${1}&appid=${key}`
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Erro:", error);
  }
}

async function weatherApp(cidade) {
  const coordenadas = await getCurrentLocationCoords(cidade, 1);

  if (coordenadas && coordenadas.length > 0) {
    const lat = coordenadas[0].lat;
    const lon = coordenadas[0].lon;

    return weatherCurrent(lat, lon);
  } else {
    console.log("Coordenadas não encontradas para a cidade especificada.");
  }
}

function converterKelvinParaCelcius(kelvin) {
  return (kelvin - 273.15).toFixed(2);
}

export { converterKelvinParaCelcius, weatherApp, getCurrentLocationCoords };
