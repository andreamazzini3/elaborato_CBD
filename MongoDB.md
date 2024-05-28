# MongoDB:

> **richiesta**:
> dopo aver studiato il modello di mongodb mi aspetto che tu analizzi con esperimenti, le diverse strategie di ottimizzazione delle query anche in base alle stretegie di design utilizzate (embedding o referencing) inoltre mostra come opera il controllo delle transazioni e infine verifica i modelli di sicurezza che è possiible implementare.

## Intro:

MongoDB è un sistema di gestione di database NoSQL orientato ai documenti, progettato per gestire grandi volumi di dati non strutturati o semi-strutturati. A differenza dei database relazionali tradizionali che utilizzano tabelle e righe, MongoDB utilizza documenti BSON (Binary JSON) e collezioni per memorizzare i dati.

### Caratteristiche Principali di MongoDB

1. **Orientato ai Documenti**:
    - MongoDB memorizza i dati in documenti BSON, che sono simili ai documenti JSON. Questo permette di avere strutture dati flessibili e nidificate.

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
    - Memorizzato in formato BSON (Binary JSON).
    - I documenti possono avere strutture nidificate e incorporare array e oggetti.
    - Esempio di documento: 
  
```json
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

```json
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

```json
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

```json
{
  "_id": ObjectId("60c5c5f3f1b22c1d2a5e5b79"),
  "productName": "Laptop",
  "price": 1000,
  "category": "Electronics"
}
```

```json
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

## 






