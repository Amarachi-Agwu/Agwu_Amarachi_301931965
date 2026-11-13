// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("appointment_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("appointment_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "appointment_created",
                    "appointment_cancelled"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "measurement"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "measurement_id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("appointment_events").insertMany([
    {
        "_id": "event_000001",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "appointment_created",
        "occurredAt": ISODate("2030-01-01T10:00:00Z"),
        "source": {
            "entity": "measurement",
            "key": {
                "measurement_id": 3001
            },
            "snapshot": {
                "measurement_id": 3001,
                "appointment_id": 2001,
                "recorded_at": "2026-11-20T09:15:00Z",
                "measure_type": "temperature",
                "numeric_value": 36.6,
                "unit": "C"
            }
        },
        "embedded": {
            "patient": [
                {
                    "key": {
                        "patient_id": 1001
                    },
                    "snapshot": {
                        "patient_id": 1001,
                        "full_name": "Alex Sample",
                        "birth_date": "1985-04-12",
                        "contact_phone": "555-0101"
                    },
                    "via": [
                        "measurement.appointment_id → appointment.patient_id → patient"
                    ]
                }
            ]
        },
        "references": {
            "appointment": [
                {
                    "key": {
                        "appointment_id": 2001
                    },
                    "via": [
                        "measurement.appointment_id → appointment"
                    ]
                }
            ]
        },
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "appointment_cancelled",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
        "source": {
            "entity": "measurement",
            "key": {
                "measurement_id": 3001
            },
            "snapshot": {
                "measurement_id": 3001,
                "appointment_id": 2001,
                "recorded_at": "2026-11-20T09:15:00Z",
                "measure_type": "temperature",
                "numeric_value": 36.6,
                "unit": "C"
            }
        },
        "embedded": {
            "patient": [
                {
                    "key": {
                        "patient_id": 1001
                    },
                    "snapshot": {
                        "patient_id": 1001,
                        "full_name": "Alex Sample",
                        "birth_date": "1985-04-12",
                        "contact_phone": "555-0101"
                    },
                    "via": [
                        "measurement.appointment_id → appointment.patient_id → patient"
                    ]
                }
            ]
        },
        "references": {
            "appointment": [
                {
                    "key": {
                        "appointment_id": 2001
                    },
                    "via": [
                        "measurement.appointment_id → appointment"
                    ]
                }
            ]
        },
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "attributes": [
                {
                    "entity": "appointment",
                    "key": {
                        "appointment_id": 2001
                    },
                    "field": "reason",
                    "value": "Routine check"
                }
            ],
            "examples": {
                "measurement_values": "illustrative measurement_values",
                "metadata": "illustrative metadata"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "appointment_created",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "measurement",
            "key": {
                "measurement_id": 3002
            },
            "snapshot": {
                "measurement_id": 3002,
                "appointment_id": 2002,
                "recorded_at": "2026-11-20T10:45:00+00:00",
                "measure_type": "pulse",
                "numeric_value": 72,
                "unit": "bpm"
            }
        },
        "embedded": {
            "patient": [
                {
                    "key": {
                        "patient_id": 1002
                    },
                    "snapshot": {
                        "patient_id": 1002,
                        "full_name": "Casey Example",
                        "birth_date": "1992-09-23",
                        "contact_phone": null
                    },
                    "via": [
                        "measurement.appointment_id → appointment.patient_id → patient"
                    ]
                }
            ]
        },
        "references": {
            "appointment": [
                {
                    "key": {
                        "appointment_id": 2002
                    },
                    "via": [
                        "measurement.appointment_id → appointment"
                    ]
                }
            ]
        },
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "appointment_cancelled",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "measurement",
            "key": {
                "measurement_id": 3002
            },
            "snapshot": {
                "measurement_id": 3002,
                "appointment_id": 2002,
                "recorded_at": "2026-11-20T10:45:00+00:00",
                "measure_type": "pulse",
                "numeric_value": 72,
                "unit": "bpm"
            }
        },
        "embedded": {
            "patient": [
                {
                    "key": {
                        "patient_id": 1002
                    },
                    "snapshot": {
                        "patient_id": 1002,
                        "full_name": "Casey Example",
                        "birth_date": "1992-09-23",
                        "contact_phone": null
                    },
                    "via": [
                        "measurement.appointment_id → appointment.patient_id → patient"
                    ]
                }
            ]
        },
        "references": {
            "appointment": [
                {
                    "key": {
                        "appointment_id": 2002
                    },
                    "via": [
                        "measurement.appointment_id → appointment"
                    ]
                }
            ]
        },
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "attributes": [
                {
                    "entity": "appointment",
                    "key": {
                        "appointment_id": 2002
                    },
                    "field": "reason",
                    "value": "Follow-up"
                }
            ],
            "examples": {
                "measurement_values": "illustrative measurement_values",
                "metadata": "illustrative metadata"
            }
        }
    }
]));
  await db.getCollection("appointment_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("appointment_events").find({"eventType":"appointment_created"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("appointment_events").find({"source.key.measurement_id":3001}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("appointment_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("appointment_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("appointment_events").insertOne({...{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "appointment_created",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "measurement",
        "key": {
            "measurement_id": 3001
        },
        "snapshot": {
            "measurement_id": 3001,
            "appointment_id": 2001,
            "recorded_at": "2026-11-20T09:15:00Z",
            "measure_type": "temperature",
            "numeric_value": 36.6,
            "unit": "C"
        }
    },
    "embedded": {
        "patient": [
            {
                "key": {
                    "patient_id": 1001
                },
                "snapshot": {
                    "patient_id": 1001,
                    "full_name": "Alex Sample",
                    "birth_date": "1985-04-12",
                    "contact_phone": "555-0101"
                },
                "via": [
                    "measurement.appointment_id → appointment.patient_id → patient"
                ]
            }
        ]
    },
    "references": {
        "appointment": [
            {
                "key": {
                    "appointment_id": 2001
                },
                "via": [
                    "measurement.appointment_id → appointment"
                ]
            }
        ]
    },
    "details": {
        "channel": "web"
    }
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("appointment_events").insertOne({
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "appointment_created",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "measurement",
        "key": {
            "measurement_id": 3001
        },
        "snapshot": {
            "measurement_id": 3001,
            "appointment_id": 2001,
            "recorded_at": "2026-11-20T09:15:00Z",
            "measure_type": "temperature",
            "numeric_value": 36.6,
            "unit": "C"
        }
    },
    "embedded": {
        "patient": [
            {
                "key": {
                    "patient_id": 1001
                },
                "snapshot": {
                    "patient_id": 1001,
                    "full_name": "Alex Sample",
                    "birth_date": "1985-04-12",
                    "contact_phone": "555-0101"
                },
                "via": [
                    "measurement.appointment_id → appointment.patient_id → patient"
                ]
            }
        ]
    },
    "references": {
        "appointment": [
            {
                "key": {
                    "appointment_id": 2001
                },
                "via": [
                    "measurement.appointment_id → appointment"
                ]
            }
        ]
    },
    "details": {
        "channel": "web"
    }
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("appointment_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
