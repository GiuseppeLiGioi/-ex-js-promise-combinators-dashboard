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
//con bonus1
/*
async function getDashboardData(city){
    console.log("sto caricando la dashboard per la città:" + city)
    const promiseDestinations = fetchJson(`http://localhost:5000/destinations?search=${city}`);
     
    const promiseWeathers = fetchJson(`http://localhost:5000/weathers?search=${city}`);
     
    const promiseAirports = fetchJson(`http://localhost:5000/airports?search=${city}`);

    //creo il mio array di promises da passare al promise.all()
    const promises = [promiseDestinations, promiseWeathers, promiseAirports ];

    //eseguo il promise.all()
    const [destinations, weathers, airports] = await Promise.all(promises);

    //per evitare di scrivere queste 3 righe posso direttamente assegnare le 3 variabili come array. Guarda riga 46.
    const destinations = results[0];
    const weathers = results[1];
    const airports = results[2];

    return {
       city: destinations && destinations.length > 0 ? destinations[0].name : null,
       country: destinations && destinations.length > 0 ? destinations[0].country : null,
       temperature: weathers && weathers.length > 0 ? weathers[0].temperature : null,
       weather: weathers && weathers.length > 0 ? weathers[0].weather_description  : null,
       airport: airports && airports.length > 0 ? airports[0].name : null
    }

}

*/

/*
🎯 Bonus 1 - Risultato vuoto
Se l’array di ricerca è vuoto, invece di far fallire l'intera funzione, semplicemente i dati relativi a quella chiamata verranno settati a null e  la frase relativa non viene stampata. Testa la funzione con la query “vienna” (non trova il meteo).
// Risposta API
{
  city: "Vienna",
  country: "Austria",
  temperature: null,
    weather: null,
  airport: "Vienna International Airport"
}
​
// Output in console
Vienna is in Austria.
The main airport is Vienna International Airport.
*/








    /*
🎯 Bonus 2 - Chiamate fallite
Attualmente, se una delle chiamate fallisce, **Promise.all()** rigetta l'intera operazione.

Modifica `getDashboardData()` per usare **Promise.allSettled()**, in modo che:
Se una chiamata fallisce, i dati relativi a quella chiamata verranno settati a null.
Stampa in console un messaggio di errore per ogni richiesta fallita.
Testa la funzione con un link fittizio per il meteo (es. https://www.meteofittizio.it).
    */


async function getDashboardData(city){
    console.log("sto caricando la dashboard per la città:" + city)
    const promiseDestinations = fetchJson(`http://localhost:5000/destinations?search=${city}`);
     
    const promiseWeathers = fetchJson(`https://www.meteofittizio.it=${city}`);
     
    const promiseAirports = fetchJson(`http://localhost:5000/airports?search=${city}`);

    //creo il mio array di promises da passare al promise.all()
    const promises = [promiseDestinations, promiseWeathers, promiseAirports ];

    //eseguo il promise.all()
    const [destinations, weathers, airports] = await Promise.allSettled(promises);
    if(destinations.status === "rejected"){
       console.log("Richiesta destinations fallita");
    }
    if(weathers.status === "rejected"){   
       console.log("Richiesta weathers fallita");
    }
    if(airports.status === "rejected"){   
       console.log("Richiesta airports fallita");
    }

    //per evitare di scrivere queste 3 righe posso direttamente assegnare le 3 variabili come array. Guarda riga 45.
    /*
    const destinations = results[0];
    const weathers = results[1];
    const airports = results[2];*/
return {
  city: destinations.status === "fulfilled" ? destinations.value[0]?.name : null,
  country: destinations.status === "fulfilled" ? destinations.value[0]?.country : null,
  temperature: weathers.status === "fulfilled" ? weathers.value[0]?.temperature : null,
  weather: weathers.status === "fulfilled" ? weathers.value[0]?.weather_description : null,
  airport: airports.status === "fulfilled" ? airports.value[0]?.name : null
};


}

//esempio di utilizzo
getDashboardData('vienna')
    .then(data => {
        console.log('Dasboard data:', data);

        let output = '';

        if(data.city && data.country){
            output += `${data.city} is in ${data.country}.\n`  
        }

         if(data.temperature && data.weather){
            output += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`  
        }

         if(data.airport){
           output += `The main airport is ${data.airport}.\n`  
        }

        console.log(output)

    
            
        
    })
    .catch(error => console.error(error));