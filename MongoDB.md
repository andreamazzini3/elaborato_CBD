# MongoDB:

> **richiesta**:
> dopo aver studiato il modello di mongodb mi aspetto che tu analizzi con esperimenti, le diverse strategie di ottimizzazione delle query anche in base alle stretegie di design utilizzate (embedding o referencing) inoltre mostra come opera il controllo delle transazioni e infine verifica i modelli di sicurezza che è possiible implementare.

## Intro:

MongoDB è un sistema di gestione di database NoSQL orientato ai documenti, progettato per gestire grandi volumi di dati non strutturati o semi-strutturati. A differenza dei database relazionali tradizionali che utilizzano tabelle e righe, MongoDB utilizza documenti BSON (Binary json) e collezioni per memorizzare i dati.

### Caratteristiche Principali di MongoDB

1. **Orientato ai Documenti**:
    - MongoDB memorizza i dati in documenti BSON, che sono simili ai documenti json. Questo permette di avere strutture dati flessibili e nidificate.

2. **Scalabilità Orizzontale**:  
	- MongoDB supporta la shardizzazione, una tecnica che consente di distribuire i dati su più server per garantire alte prestazioni e scalabilità.

3. **Alta Disponibilità**:
	- Utilizzando Replica Set, MongoDB replica i dati su più server, garantendo tolleranza ai guasti e alta disponibilità.

4. **Schema-less**:  
	- Non è necessario definire uno schema rigido per i dati, consentendo una grande flessibilità nell'aggiunta e modifica dei campi nei documenti.

### Struttura MongoDB

1. **Database**:
    - Il database è il livello più alto dell'organizzazione dei dati in MongoDB.
    - Contiene una o più collezioni.
    - Se un database non esiste, MongoDB crea il database quando archivi per la prima volta i dati per quel database
    - Esempio di comando per selezionare un database: `use myNewDB`
   

2. **Collezione**:
    - Una collezzione è un gruppo di documenti all'interno di un database, analogo a una tabella nei database relazionali.
    - Le collezioni sono schemaless, il che significa che i documenti all'interno di una collezione possono avere campi diversi.
    - Esempio di comando per creare una collezione: `db.createCollection("myCollection")`

3. **Documento**:
    - Un Documento è l'unità base di dati in MongoDB, simile a una riga in una tabella relazionale.
    - Memorizzato in formato BSON (Binary json).
    - I documenti possono avere strutture nidificate e incorporare array e oggetti.
    - Esempio di documento: 
  
```js
	{
		"_id": 1, 
		"nome": "Mario Rossi", 
		"età": 30, 
		"indirizzo": { 
			"via": "Via Roma", 
			"numero": 42, 
			"città": "Milano" 
		}
	}
```

---
## Schema Design:

In MongoDB, ci sono due principali modalità per modellare relazioni tra i dati: *embedding* e *referencing*. Ognuna ha i suoi vantaggi e svantaggi, e la scelta dipende spesso dalle esigenze specifiche dell'applicazione.

### Schema Embedded

L'embedding è utile quando si hanno dati strettamente correlati che vengono spesso letti insieme. In pratica, si inserisce un documento all'interno di un altro.

#### Esempio:
Immaginiamo di avere un'applicazione che gestisce ordini di acquisto. Ogni ordine ha diversi prodotti. Con l'approccio embedded, ogni prodotto può essere memorizzato all'interno del documento dell'ordine.

**Schema:**

```js
{
  "_id": ObjectId("60c5c5f3f1b22c1d2a5e5b78"),
  "customer": {
    "name": "Mario Rossi",
    "email": "mario.rossi@example.com"
  },
  "orderDate": "2023-05-27",
  "status": "processing",
  "items": [
    {
      "productId": ObjectId("60c5c5f3f1b22c1d2a5e5b79"),
      "productName": "Laptop",
      "quantity": 1,
      "price": 1000
    },
    {
      "productId": ObjectId("60c5c5f3f1b22c1d2a5e5b7a"),
      "productName": "Mouse",
      "quantity": 2,
      "price": 50
    }
  ]
}
```

In questo schema, ogni ordine contiene un array di prodotti (items). Questa struttura è efficiente per leggere e scrivere ordini completi, dato che tutte le informazioni sono contenute in un singolo documento.

**Vantaggi dell'Embedding:**
- Lettura più veloce quando i dati correlati sono spesso letti insieme.
- Meno query per ottenere dati completi.
- Coerenza dei dati garantita all'interno del documento.

**Svantaggi dell'Embedding:**
- Dimensione massima del documento di 16 MB.
- Difficoltà nella gestione di aggiornamenti frequenti in sub-documenti molto grandi.

### Schema Referencing

Il referencing è utile quando si hanno dati correlati ma che possono crescere indefinitamente o che vengono letti/modificati separatamente. Invece di includere i documenti correlati direttamente, si memorizzano i riferimenti (gli ID) ai documenti correlati.

#### Esempio:
Utilizziamo lo stesso esempio degli ordini e prodotti, ma questa volta utilizzeremo il referencing.

**Schema Ordine:**

```js
{
  "_id": ObjectId("60c5c5f3f1b22c1d2a5e5b78"),
  "customer": {
    "name": "Mario Rossi",
    "email": "mario.rossi@example.com"
  },
  "orderDate": "2023-05-27",
  "status": "processing",
  "items": [
    ObjectId("60c5c5f3f1b22c1d2a5e5b79"),
    ObjectId("60c5c5f3f1b22c1d2a5e5b7a")
  ]
}
```

**Schema Prodotto:**

```js
{
  "_id": ObjectId("60c5c5f3f1b22c1d2a5e5b79"),
  "productName": "Laptop",
  "price": 1000,
  "category": "Electronics"
}
```

```js
{
  "_id": ObjectId("60c5c5f3f1b22c1d2a5e5b7a"),
  "productName": "Mouse",
  "price": 50,
  "category": "Electronics"
}
```

In questo schema, ogni ordine contiene solo i riferimenti (gli ID) ai prodotti. Per ottenere le informazioni dettagliate sui prodotti, sarà necessario eseguire query aggiuntive.

**Vantaggi del Referencing:**
- Flessibilità nella gestione di dati correlati che cambiano frequentemente.
- Adatto per relazioni molti-a-molti.
- Evita il problema della dimensione massima del documento.

**Svantaggi del Referencing:**
- Richiede più query per ottenere i dati correlati.
- Maggiore complessità nella gestione delle relazioni.

### Quando Usare Embedded o Referencing

**Usare Embedded quando:**
- I dati correlati sono strettamente legati e vengono letti insieme frequentemente.
- Le dimensioni dei documenti rimangono gestibili (inferiori a 16 MB).
- I dati correlati non cambiano spesso.

**Usare Referencing quando:**
- I dati correlati sono grandi o crescono in modo indefinito.
- I dati correlati vengono modificati frequentemente e separatamente.
- È necessario mantenere la flessibilità nella gestione delle relazioni tra i dati.

La scelta tra embedding e referencing dipende quindi dalle esigenze specifiche dell'applicazione, dal tipo di accesso ai dati, dalle dimensioni dei documenti e dalla frequenza degli aggiornamenti.

---
## Operazioni CRUD su MongoDB

#### Create

Le operazioni di creazione in MongoDB aggiungono nuovi documenti a una collezione.

1. **`insertOne`**:
   Inserisce un singolo documento nella collezione.
   ```js
   db.collection.insertOne({
     name: "Mario Rossi",
     age: 30,
     address: {
       street: "Via Roma",
       city: "Milano"
     }
   });
   ```

2. **`insertMany`**:
   Inserisce più documenti nella collezione.
   ```js
   db.collection.insertMany([
     {
       name: "Luigi Bianchi",
       age: 25,
       address: {
         street: "Via Milano",
         city: "Roma"
       }
     },
     {
       name: "Anna Verdi",
       age: 40,
       address: {
         street: "Via Napoli",
         city: "Napoli"
       }
     }
   ]);
   ```

#### Read

Le operazioni di lettura in MongoDB recuperano documenti da una collezione.

1. **`find`**:
   Recupera uno o più documenti che corrispondono a un criterio di ricerca.
   ```js
   db.collection.find({ age: { $gt: 20 } });
   ```

2. **`findOne`**:
   Recupera un singolo documento che corrisponde a un criterio di ricerca.
   ```js
	 db.collection.findOne({ name: "Mario Rossi" });
   ```

3. **`countDocuments`**:
   Conta il numero di documenti che corrispondono a un criterio di ricerca.
   ```js
   db.collection.countDocuments({ age: { $gt: 20 } });
   ```

4. **`distinct`**:
   Restituisce i valori distinti di un campo specifico.
   ```js
   db.collection.distinct("city");
   ```

#### Update

Le operazioni di aggiornamento in MongoDB modificano i documenti esistenti in una collezione.

1. **`updateOne`**:
   Aggiorna un singolo documento che corrisponde a un criterio di ricerca.
   ```js
   db.collection.updateOne(
     { name: "Mario Rossi" },
     { $set: { age: 31 } }
   );
   ```

2. **`updateMany`**:
   Aggiorna tutti i documenti che corrispondono a un criterio di ricerca.
   ```js
   db.collection.updateMany(
     { city: "Milano" },
     { $set: { city: "Rome" } }
   );
   ```

3. **`replaceOne`**:
   Sostituisce un singolo documento che corrisponde a un criterio di ricerca con un nuovo documento.
   ```js
   db.collection.replaceOne(
     { name: "Mario Rossi" },
     {
       name: "Mario Rossi",
       age: 31,
       address: {
         street: "Via Roma",
         city: "Roma"
       }
     }
   );
   ```

#### Delete

Le operazioni di cancellazione in MongoDB rimuovono documenti da una collezione.

1. **`deleteOne`**:
   Cancella un singolo documento che corrisponde a un criterio di ricerca.
   ```js
   db.collection.deleteOne({ name: "Mario Rossi" });
   ```

2. **`deleteMany`**:
   Cancella tutti i documenti che corrispondono a un criterio di ricerca.
   ```js
   db.collection.deleteMany({ age: { $lt: 25 } });
   ```

### Pipeline e Aggregazione

La pipeline di aggregazione in MongoDB è una potente operazione che consente di eseguire trasformazioni e aggregazioni su un set di dati. Una pipeline è composta da più fasi, dove ogni fase trasforma i documenti e passa i risultati alla fase successiva.

| Operazione di Pipeline | Descrizione                                                                                                                     | Esempio                                                                                                                                                                                                            |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$match`               | Filtra i documenti in ingresso per farli corrispondere a una condizione.                                                        | `{ $match: { status: "A" } }`                                                                                                                                                                                      |
| `$group`               | Raggruppa i documenti in base a un campo specifico e può eseguire operazioni di aggregazione come somma, media, conteggio, ecc. | `{ $group: { _id: "$city", total: { $sum: "$amount" } } }`                                                                                                                                                         |
| `$project`             | Modifica la struttura dei documenti, inclusi, esclusi o rinominando campi.                                                      | `{ $project: { name: 1, age: 1, city: 1 } }`                                                                                                                                                                       |
| `$sort`                | Ordina i documenti in base a un campo specifico.                                                                                | `{ $sort: { age: -1 } }`                                                                                                                                                                                           |
| `$limit`               | Limita il numero di documenti in uscita.                                                                                        | `{ $limit: 5 }`                                                                                                                                                                                                    |
| `$skip`                | Salta un numero specifico di documenti.                                                                                         | `{ $skip: 10 }`                                                                                                                                                                                                    |
| `$unwind`              | Decompone un array in più documenti, uno per ogni elemento dell'array.                                                          | `{ $unwind: "$items" }`                                                                                                                                                                                            |
| `$lookup`              | Unisce documenti da un'altra collezione (join).                                                                                 | `{ $lookup: { from: "products", localField: "product_id", foreignField: "_id", as: "productDetails" } }`                                                                                                           |
| `$out`                 | Scrive i risultati della pipeline in una nuova collezione.                                                                      | `{ $out: "newCollection" }`                                                                                                                                                                                        |
| `$merge`               | Unisce i risultati della pipeline in una collezione esistente.                                                                  | `{ $merge: { into: "targetCollection", whenMatched: "merge", whenNotMatched: "insert" } }`                                                                                                                         |
| `$addFields`           | Aggiunge nuovi campi ai documenti.                                                                                              | `{ $addFields: { totalCost: { $sum: ["$price", "$tax"] } } }`                                                                                                                                                      |
| `$set`                 | Sinonimo di `$addFields`, utilizzato per aggiungere o aggiornare campi.                                                         | `{ $set: { totalCost: { $sum: ["$price", "$tax"] } } }`                                                                                                                                                            |
| `$replaceRoot`         | Sostituisce il documento corrente con un documento specificato.                                                                 | `{ $replaceRoot: { newRoot: "$newDocument" } }`                                                                                                                                                                    |
| `$count`               | Conta il numero di documenti che attraversano la pipeline.                                                                      | `{ $count: "totalDocuments" }`                                                                                                                                                                                     |
| `$facet`               | Esegue operazioni di aggregazione multiple in parallelo e restituisce i risultati in un unico documento.                        | `{ $facet: { "categorizedByPrice": [ { $bucket: { groupBy: "$price", boundaries: [ 0, 100, 200, 300 ], default: "Other" } } ] } }`                                                                                 |
| `$bucket`              | Raggruppa i documenti in base a un intervallo di valori specificato.                                                            | `{ $bucket: { groupBy: "$price", boundaries: [ 0, 100, 200 ], default: "Other", output: { "count": { $sum: 1 } } } }`                                                                                              |
| `$bucketAuto`          | Raggruppa i documenti in un numero specifico di bucket con intervalli di valori distribuiti automaticamente.                    | `{ $bucketAuto: { groupBy: "$price", buckets: 4 } }`                                                                                                                                                               |
| `$sortByCount`         | Raggruppa i documenti per un campo specificato e conta il numero di documenti in ogni gruppo, ordinandoli per conteggio.        | `{ $sortByCount: "$category" }`                                                                                                                                                                                    |
| `$geoNear`             | Effettua una ricerca geografica nei documenti.                                                                                  | `{ $geoNear: { near: { type: "Point", coordinates: [ -73.99279 , 40.719296 ] }, distanceField: "dist.calculated", maxDistance: 2, query: { category: "Parks" }, includeLocs: "dist.location", spherical: true } }` |
| `$redact`              | Utilizzato per controllare l'accesso ai dati a livello di documento.                                                            | `{ $redact: { $cond: { if: { $gt: ["$level", 5] }, then: "$$DESCEND", else: "$$PRUNE" } } }`                                                                                                                       |
| `$sample`              | Estrae un numero casuale di documenti dalla collezione.                                                                         | `{ $sample: { size: 3 } }`                                                                                                                                                                                         |
| `$indexStats`          | Restituisce statistiche sugli indici utilizzati nella collezione.                                                               | `{ $indexStats: {} }`                                                                                                                                                                                              |
| `$addToSet`            | Aggiunge valori a un array solo se non sono già presenti.                                                                       | `{ $group: { _id: "$_id", uniqueValues: { $addToSet: "$value" } } }`                                                                                                                                               |

#### Esempio di Pipeline Completa 

Supponiamo di avere una collezione di ordini e vogliamo ottenere il totale delle vendite per ogni città, ordinato per totale in modo decrescente.

```js
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $unwind: "$items" },
  { $group: { _id: "$city", totalSales: { $sum: "$items.price" } } },
  { $sort: { totalSales: -1 } },
  { $project: { _id: 0, city: "$_id", totalSales: 1 } }
]);
```

In questa pipeline:

1. **`$match`** filtra gli ordini con stato "completed".
2. **`$unwind`** decompone l'array "items" in documenti individuali.
3. **`$group`** raggruppa i documenti per città e calcola il totale delle vendite.
4. **`$sort`** ordina i risultati in base al totale delle vendite in ordine decrescente.
5. **`$project`** ristruttura i documenti per includere solo la città e il totale delle vendite.

L'aggregazione di MongoDB è uno strumento potente che permette di eseguire analisi complesse sui dati direttamente all'interno del database, riducendo la necessità di elaborazione lato applicazione.

---
## Ottimizzazione Delle Query

- [ ] TODO: !

Per analizzare le query in mongodb ho strutturato un esempio di db, basato su un caso reale. Ho preso come esempio database di contratti tra una azienda intermediaria e delle officine, dove possiamo indivudare due entità: 
- un **contratto generale** che è l'entità che definisce il contratto tra l'officina e l'azienda intermediaria.
- un **allegato** che è un estensione del contratto generale tra l'officna e altre aziende terze che offrono all'officina di trovargli clienti tramite l'azienda che fa da intermediario del contratto generale. 

Schema della struttura del Database: [[Schema ER.canvas|Schema ER]]
![[Pasted image 20240617152517.png]]
Creo così due database con un design dello schema diverso, embedded e reference:
- [ ] TODO: definire tutte le collection !!

```json
{
  _id: string,
  service: string,
  company: string,
  pricing_table: {
    price_1: number,
    price_2: number,
    price_3: number,
  },
  date_signature: string,
  date_created: string,
  date_expiration: string,
}
```

### Find Query

in questo caso l'obiettivo della query è quello di trovare tutte le officine che hanno un contratto allegato con un azienda specifica che in questo è `HERTZ`

E' possibile fare la query e ottenere i dati che mi interessano utilizzando una pipeline di aggregazione: 

```js
client
	.contracts_embedded
	.general_contracs
	.aggregate([
	  {
	    $unwind: {
	      path: "$attachments"
	    }
	  },
	  {
	    $group: {
	      _id: "$attachments._id",
	      company: { $first: '$attachments.company' },
	      repair_shop_name: { $first: '$repair_shop_name' },
	      repair_shop_p_iva: { $first: '$repair_shop_p_iva' },
	    }
	  },
	  {
	    $match: {
	      company: "HERTZ"
	    }
	  }
	])

```







