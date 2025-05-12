/* https://boolean-spec-frontend.vercel.app/freetestapi
In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:

Nome completo della città e paese da  /destinations?search=[query]
(result.name, result.country, nelle nuove proprietà city e country).
Il meteo attuale da /weathers?search={query}
(result.temperature e result.weather_description nella nuove proprietà temperature e weather).
Il nome dell’aeroporto principale da /airports?search={query}
(result.name nella nuova proprietà airport).

Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.

Attenzione: le chiamate sono delle ricerche e ritornano un’array ciascuna, di cui devi prendere il primo risultato (il primo elemento).


Note del docente:
Scrivi la funzione getDashboardData(query), che deve:
Essere asincrona (async).
Utilizzare Promise.all() per eseguire più richieste in parallelo.
Restituire una Promise che risolve un oggetto contenente i dati aggregati.
Stampare i dati in console in un messaggio ben formattato.
Testa la funzione con la query "london"
*/

//FUNZIONE GENERALE PER RACCOGLIERE LA RESPONSE 

async function fetchJson(url){
const response = await fetch(url)
const obj = await response.json();
return obj;
}

async function getDashboardData(city){
    console.log("sto caricando la dashboard per la città:" + city)
    const promiseDestinations = fetchJson(`http://localhost:5000/destinations?search=${city}`);
     
    const promiseWeathers = fetchJson(`http://localhost:5000/weathers?search=${city}`);
     
    const promiseAirports = fetchJson(`http://localhost:5000/airports?search=${city}`);

    //creo il mio array di promises da passare al promise.all()
    const promises = [promiseDestinations, promiseWeathers, promiseAirports ];

    //eseguo il promise.all()
    const [destinations, weathers, airports] = await Promise.all(promises);

    //per evitare di scrivere queste 3 righe posso direttamente assegnare le 3 variabili come array. Guarda riga 45.
    /*
    const destinations = results[0];
    const weathers = results[1];
    const airports = results[2];*/

    return {
       city: destinations[0].name,
       country: destinations[0].country,
       temperature: weathers[0].temperature,
       weather: weathers[0].weather_description,
       airport: airports[0].name
    }

}







//esempio di utilizzo
getDashboardData('london')
    .then(data => {
        console.log('Dasboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));