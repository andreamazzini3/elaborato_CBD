import json
import random
from datetime import datetime, timedelta
from bson import ObjectId
import string

MAX_ATTACHEMNT = 400
MAX_GENERAL_CONTRACT = 1200

first_names = ["Marco", "Giulia", "Luca", "Francesca", "Andrea", "Valentina", "Matteo", "Federica", "Davide", "Martina",
               "Giovanni", "Chiara", "Alessandro", "Sara", "Simone", "Elisa", "Antonio", "Elena", "Giorgio", "Alessia",
               "Fabio", "Anna", "Emanuele", "Silvia", "Riccardo", "Ilaria", "Stefano", "Claudia", "Paolo", "Laura",
               "Roberto", "Roberta", "Michele", "Cristina", "Giuseppe", "Monica", "Franco", "Giorgia", "Daniele",
               "Barbara", "Vincenzo", "Gabriella", "Pietro", "Marta", "Salvatore", "Federico", "Angelo", "Beatrice",
               "Alberto", "Serena", "Carlo", "Caterina", "Enrico", "Daniela", "Maurizio", "Manuela", "Giulio", "Alina",
               "Edoardo", "Camilla", "Franco", "Lidia", "Vito", "Liliana", "Leonardo", "Veronica", "Gabriele", "Eliana"]

last_names = ["Rossi", "Russo", "Ferrari", "Esposito", "Bianchi", "Romano", "Colombo", "Ricci", "Marino", "Greco",
              "Bruno", "Gallo", "Conti", "De Luca", "Costa", "Giordano", "Mancini", "Rizzo", "Lombardi", "Moretti",
              "Barbieri", "Fontana", "Santoro", "Mariani", "Rinaldi", "Caruso", "Ferrara", "Gatti", "Ferraro", "Leone",
              "Longo", "Martinelli", "Messina", "Sala", "Marchetti", "Guerra", "Palumbo", "Farina", "Rizzi", "Monti",
              "Cattaneo", "Bianco", "Vitale", "Lombardo", "Serra", "Coppola", "Amato", "Silvestri", "Mazza", "Testa",
              "Grassi", "Pellegrini", "Donati", "Sorrentino", "D'Angelo", "Bernardi", "Martino", "Rossetti", "Crisci",
              "Gentile", "Mariani", "Basile", "Valenti", "Orlando", "De Santis", "Fabbri", "Parisi", "Sanna", "Villa"]

def generate_random_name():
    first_name = random.choice(first_names)
    last_name = random.choice(last_names)
    return f"{first_name} {last_name}"

def generate_partita_iva():
    return ''.join(random.choices(string.digits, k=11))

street_names = [
    "Roma",
    "Milano",
    "Torino",
    "Napoli",
    "Venezia",
    "Firenze",
    "Genova",
    "Bologna",
    "Verona",
    "Padova",
    "Trieste",
    "Palermo",
    "Parma",
    "Catania",
    "Perugia",
    "Livorno",
    "Ravenna",
    "Modena",
    "Cagliari",
    "Ancona",
    "Bari",
    "Bergamo",
    "Brescia",
    "Como",
    "Ferrara",
    "Forlì",
    "Latina",
    "Lecce",
    "Lucca",
    "Mantova",
    "Massa",
    "Monza",
    "Novara",
    "Pisa",
    "Prato",
    "Ragusa",
    "Rimini",
    "Salerno",
    "Sassari",
    "Savona",
    "Siena",
    "Siracusa",
    "Taranto",
    "Terni",
    "Trapani",
    "Treviso",
    "Udine",
    "Varese",
    "Vercelli",
    "Vicenza",
    "Agrigento",
    "Alessandria",
    "Aosta",
    "Arezzo",
    "Ascoli",
    "Asti",
    "Avellino",
    "Belluno",
    "Benevento",
    "Biella",
    "Brindisi",
    "Caltanissetta",
    "Campobasso",
    "Caserta",
    "Cosenza",
    "Cremona",
    "Crotone",
    "Fermo",
    "Foggia",
    "Via Grosseto",
    "Via Imperia",
    "Isernia",
    "La Spezia",
    "L'Aquila",
    "Lodi",
    "Macerata",
    "Matera",
    "Oristano",
    "Pescara",
    "Pistoia",
    "Potenza",
    "Reggio",
    "Rovigo",
    "Sondrio",
    "Teramo",
    "Trento",
    "Vibo Valentia",
    "Viterbo",
    "Chiavari",
    "Olbia",
    "Grosio",
    "Eboli",
    "Castelnuovo",
    "Nola",
    "Gioia",
    "Gragnano",
    "Taormina",
    "Erice",
    "Augusta",
    "Tropea"
]

street_types = ["via", "piazza", "viale", "corso", "vicolo", "strada"]
cities = ["Roma", "Milano", "Torino", "Napoli", "Venezia", "Firenze", "Genova", "Bologna", "Verona", "Padova",
          "Trieste", "Palermo", "Parma", "Catania", "Perugia", "Livorno", "Ravenna", "Modena", "Cagliari", "Ancona"]

def generate_random_address():
    street = f"{random.choice(street_types)} {random.choice(street_names)} {random.randint(1, 100)}"
    city = random.choice(cities)
    postal_code = ''.join(random.choices(string.digits, k=5))
    return f"{street}, {postal_code} {city}"

def generate_pricing_table():
    return {
        "price_1": round(random.uniform(100, 1000), 2),
        "price_2": round(random.uniform(100, 1000), 2),
        "price_3": round(random.uniform(100, 1000), 2),
    }

contracts_embedded = []

num_records = MAX_GENERAL_CONTRACT
services = ['VRENTAL', 'VFLEET', 'VINSURANCE', 'VDRIVER']
companies = ['HERTZ', 'AVIS', 'VERTI', 'ZITY', 'SHARENOW', 'VANFORYOU', 'ENJOY', 'VEYCORE', 'SASCOM']

for _ in range(num_records):
    contract_embedded = {
        # "service": random.choice(services),
        # "company": random.choice(companies),
        "contract_date_creation": (datetime.utcnow() - timedelta(days=random.randint(0, 365))).isoformat() + 'Z',
        "contract_date_signature": (datetime.utcnow() - timedelta(days=random.randint(0, 365))).isoformat() + 'Z',
        "repair_shop_name": generate_random_name(),        
				"repair_shop_p_iva": generate_partita_iva(),
        "repair_shop_location": generate_random_address(),
        "attachments": []
    }

    num_attachments = random.randint(1, MAX_ATTACHEMNT)  # number of attachments per contract
    for _ in range(num_attachments):
        attachment = {
            "_id": str(ObjectId()),
            "service": random.choice(services),
            "company": random.choice(companies),
            "pricing_table": generate_pricing_table(),
            "date_signature":(datetime.utcnow() - timedelta(days=random.randint(0, 365))).isoformat() + 'Z',
            "date_created": (datetime.utcnow() - timedelta(days=random.randint(0, 365))).isoformat() + 'Z',
            "date_expiration": (datetime.utcnow() - timedelta(days=random.randint(0, 365))).isoformat() + 'Z',
        }
        contract_embedded["attachments"].append(attachment)

    contracts_embedded.append(contract_embedded)


# Save the embedded contracts data to a JSON file
with open('contracts_embedded_data.json', 'w') as f_out:
    json.dump(contracts_embedded, f_out, indent=2)

contracts_referencing = []
attachments_referencing = []
# Create contract (referencing)
for _ in range(num_records):
    contract_referencing = {
        # "service": random.choice(services),
        # "company": random.choice(companies),
        "contract_date_creation": (datetime.utcnow() - timedelta(days=random.randint(0, 365))).isoformat() + 'Z',
        "contract_date_signature": (datetime.utcnow() - timedelta(days=random.randint(0, 365))).isoformat() + 'Z',
        "repair_shop_name": generate_random_name(),        
				"repair_shop_p_iva": generate_partita_iva(),
        "repair_shop_location": generate_random_address(),
        "attachment": []
    }

    # Create attachments
    num_attachments = random.randint(1, MAX_ATTACHEMNT)  # number of attachments per contract
    for _ in range(num_attachments):
        attachment_id = str(ObjectId())
        attachment = {
            "_id": attachment_id,
            "service": random.choice(services),
            "company": random.choice(companies),
            "pricing_table": generate_pricing_table(),
            "date_signature": (datetime.utcnow() - timedelta(days=random.randint(0, 365))).isoformat() + 'Z',
            "date_created": (datetime.utcnow() - timedelta(days=random.randint(0, 365))).isoformat() + 'Z',
            "date_expiration": (datetime.utcnow() - timedelta(days=random.randint(0, 365))).isoformat() + 'Z',
        }
        contract_referencing["attachment"].append(attachment_id)
        attachments_referencing.append(attachment)

    contracts_referencing.append(contract_referencing)

# Save the referencing contracts data to a JSON file
with open('contracts_referencing_data.json', 'w') as f_out:
    json.dump(contracts_referencing, f_out, indent=2)

# Save the attachments data to a JSON file
with open('attachments_referencing_data.json', 'w') as f_out:
    json.dump(attachments_referencing, f_out, indent=2)



