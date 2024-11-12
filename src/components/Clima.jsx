import { useState } from "react";
import { weatherApp, converterKelvinParaCelcius, getCurrentLocationCoords } from "../WeatherAPIs";

function Clima() {
  const [cidade, setCidade] = useState("");
  const [clima, setClima] = useState(null);
  const [erro, setErro] = useState(null);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await weatherApp(cidade);
      const coordenadas = await getCurrentLocationCoords(cidade)
      if (data && coordenadas) {
        const tempCelsius = converterKelvinParaCelcius(data.main.temp); // Converte a temperatura de Kelvin para Celsius
        setClima({
          nome: coordenadas[0].name,
          temp: tempCelsius,
          descricao: data.weather[0].description,
          sensacao: converterKelvinParaCelcius(data.main.feels_like), // Sensação térmica em Celsius
          umidade: data.main.humidity,
          nomeEstado: coordenadas[0].state,
          nomePais: coordenadas[0].country
        });
      } else {
        setErro("Cidade não encontrada!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex gap-10">
      <div className=" bg-slate-300 rounded-lg p-10">
        <div>
          <h1 className="font-bold text-[30px]">WeatherClim</h1>
          <form onSubmit={HandleSubmit} className="flex flex-col gap-10">
            <div>
              <p>Informe sua Cidade:</p>
              <input
                type="text"
                name=""
                id=""
                placeholder="Ex: Brejo Santo"
                onChange={(e) => setCidade(e.target.value)}
                className="p-3 rounded-lg w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-slate-600 text-white font-bold rounded-md p-2"
            >
              Pesquisar
            </button>
          </form>
        </div>
      </div>
      {/* Exibe os dados do clima se disponíveis */}
      {clima && (
        <div className="p-10 h-full text-[20px] bg-slate-200 rounded-lg">
          <h2 className="text-[30px] font-semibold">Clima em {clima.nome} <br/> {clima.nomeEstado} - {clima.nomePais}</h2>
          <p>Temperatura: {clima.temp} °C</p>
          <p>
            Sensação térmica:{" "}
            {clima.sensacao.charAt(0).toUpperCase() + clima.sensacao.slice(1)}{" "}
            °C
          </p>
          <p>
            Tempo:{" "}
            {clima.descricao.charAt(0).toUpperCase() + clima.descricao.slice(1)}
          </p>
          <p>Humidade: {clima.umidade}%</p>
        </div>
      )}

      {/* Exibe uma mensagem de erro, se houver */}
      {erro && (
        <div className="mt-5 p-5 bg-red-200 text-red-700 rounded-lg">
          {erro}
        </div>
      )}
    </section>
  );
}

export default Clima;