export const new_contracts = [
  {
    contract_date_creation: "2023-11-01T08:20:15.123456Z",
    contract_date_signature: "2023-12-01T08:20:15.123456Z",
    repair_shop_name: "Luca Bianchi",
    repair_shop_p_iva: "72948175938",
    repair_shop_street: "via Milano 14",
    repair_shop_city: "Napoli",
    repair_shop_postalcode: "80122",
    attachments: [
      {
        _id: "666161ffb7f72d420001ddc3",
        service: "VCAR",
        company: "DRIVEMAX",
        pricing_table: {
          price_1: 320.50,
          price_2: 580.75,
          price_3: 480.25
        },
        date_signature: "2023-08-10T09:15:11.240053Z",
        date_created: "2023-11-01T09:15:11.240053Z",
        date_expiration: "2024-01-01T09:15:11.240053Z"
      }
    ]
  },

  {
    contract_date_creation: "2023-12-10T09:30:20.789456Z",
    contract_date_signature: "2024-01-15T09:30:20.789456Z",
    repair_shop_name: "Marta Rossi",
    repair_shop_p_iva: "83749261504",
    repair_shop_street: "corso Torino 22",
    repair_shop_city: "Firenze",
    repair_shop_postalcode: "50123",
    attachments: [
      {
        _id: "666161ffb7f72d420001ddc4",
        service: "VSERVICE",
        company: "MECHPRO",
        pricing_table: {
          price_1: 150.75,
          price_2: 250.50,
          price_3: 350.25
        },
        date_signature: "2023-10-05T09:15:11.240053Z",
        date_created: "2023-12-10T09:15:11.240053Z",
        date_expiration: "2024-02-10T09:15:11.240053Z"
      }
    ]
  },

  {
    contract_date_creation: "2023-09-15T10:40:30.345678Z",
    contract_date_signature: "2023-10-20T10:40:30.345678Z",
    repair_shop_name: "Giovanni Verdi",
    repair_shop_p_iva: "75934817264",
    repair_shop_street: "piazza Roma 5",
    repair_shop_city: "Bologna",
    repair_shop_postalcode: "40121",
    attachments: [
      {
        _id: "666161ffb7f72d420001ddc5",
        service: "VREPAIR",
        company: "AUTOFIX",
        pricing_table: {
          price_1: 200.25,
          price_2: 400.50,
          price_3: 600.75
        },
        date_signature: "2023-07-15T09:15:11.240053Z",
        date_created: "2023-09-15T09:15:11.240053Z",
        date_expiration: "2023-11-15T09:15:11.240053Z"
      }
    ]
  }
]

interface Attachment {
  _id: string;
  service: string;
  company: string;
  pricing_table: {
    price_1: number;
    price_2: number;
    price_3: number;
  };
  date_signature: string;
  date_created: string;
  date_expiration: string;
}

interface Contract {
  contract_date_creation: string;
  contract_date_signature: string;
  repair_shop_name: string;
  repair_shop_p_iva: string;
  repair_shop_street: string;
  repair_shop_city: string;
  repair_shop_postalcode: string;
  attachments: string[];
}

export const new_contract_ref: Contract[] = [
  {
    contract_date_creation: "2023-11-01T08:20:15.123456Z",
    contract_date_signature: "2023-12-01T08:20:15.123456Z",
    repair_shop_name: "Luca Bianchi",
    repair_shop_p_iva: "72948175938",
    repair_shop_street: "via Milano 14",
    repair_shop_city: "Napoli",
    repair_shop_postalcode: "80122",
    attachments: []
  },
  {
    contract_date_creation: "2023-09-15T10:40:30.345678Z",
    contract_date_signature: "2023-10-20T10:40:30.345678Z",
    repair_shop_name: "Giovanni Verdi",
    repair_shop_p_iva: "75934817264",
    repair_shop_street: "piazza Roma 5",
    repair_shop_city: "Bologna",
    repair_shop_postalcode: "40121",
    attachments: []
  },
  {
    contract_date_creation: "2023-09-15T10:40:30.345678Z",
    contract_date_signature: "2023-10-20T10:40:30.345678Z",
    repair_shop_name: "Giovanni Verdi",
    repair_shop_p_iva: "75934817264",
    repair_shop_street: "piazza Roma 5",
    repair_shop_city: "Bologna",
    repair_shop_postalcode: "40121",
    attachments: []
  }

]

export const attachments: Attachment[] = [
  {
    _id: "666161ffb7f72d420001ddc6",
    service: "VMAINTENANCE",
    company: "AUTOCARE",
    pricing_table: {
      price_1: 150.00,
      price_2: 300.00,
      price_3: 450.00
    },
    date_signature: "2023-08-01T09:15:11.240053Z",
    date_created: "2023-08-05T09:15:11.240053Z",
    date_expiration: "2023-12-01T09:15:11.240053Z"
  },
  {
    _id: "666161ffb7f72d420001ddc7",
    service: "VCLEANING",
    company: "CLEANCAR",
    pricing_table: {
      price_1: 80.00,
      price_2: 160.00,
      price_3: 240.00
    },
    date_signature: "2023-09-10T09:15:11.240053Z",
    date_created: "2023-09-15T09:15:11.240053Z",
    date_expiration: "2024-01-10T09:15:11.240053Z"
  }
]

export const attachments2: Attachment[] = [
  {
    _id: "666161ffb7f72d420001ddc9",
    service: "VTOWING",
    company: "TOWPRO",
    pricing_table: {
      price_1: 50.00,
      price_2: 150.00,
      price_3: 250.00
    },
    date_signature: "2023-10-12T09:15:11.240053Z",
    date_created: "2023-10-14T09:15:11.240053Z",
    date_expiration: "2024-04-12T09:15:11.240053Z"
  },
  {
    _id: "666161ffb7f72d420001ddca",
    service: "VREPAIR",
    company: "FIXIT",
    pricing_table: {
      price_1: 200.00,
      price_2: 400.00,
      price_3: 600.00
    },
    date_signature: "2023-11-15T09:15:11.240053Z",
    date_created: "2023-11-20T09:15:11.240053Z",
    date_expiration: "2024-05-15T09:15:11.240053Z"
  },
  {
    _id: "666161ffb7f72d420001ddcb",
    service: "VPAINT",
    company: "PAINTPRO",
    pricing_table: {
      price_1: 300.00,
      price_2: 600.00,
      price_3: 900.00
    },
    date_signature: "2023-12-10T09:15:11.240053Z",
    date_created: "2023-12-15T09:15:11.240053Z",
    date_expiration: "2024-06-10T09:15:11.240053Z"
  }
]

export const attachments3: Attachment[] = [
  {
    _id: "666161ffb7f72d420001ddc8",
    service: "VINSPECTION",
    company: "AUTOCHECK",
    pricing_table: {
      price_1: 100.00,
      price_2: 200.00,
      price_3: 300.00
    },
    date_signature: "2023-07-20T09:15:11.240053Z",
    date_created: "2023-07-22T09:15:11.240053Z",
    date_expiration: "2024-01-20T09:15:11.240053Z"
  }
]
