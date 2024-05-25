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




