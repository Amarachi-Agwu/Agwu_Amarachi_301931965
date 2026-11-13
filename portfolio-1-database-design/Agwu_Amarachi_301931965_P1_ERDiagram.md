# Hospital Clinic Appointment and Measurement System — ER diagram

```mermaid
erDiagram
    direction LR
    patient {
        bigint patient_id PK
        text full_name
        date birth_date
        text contact_phone "Optional"
    }
    appointment {
        bigint appointment_id PK
        bigint patient_id FK
        timestamptz scheduled_at
        text status
        text reason
    }
    measurement {
        bigint measurement_id PK
        bigint appointment_id FK
        timestamptz recorded_at
        text measure_type
        numeric numeric_value
        text unit
    }
    patient ||--o{ appointment : "patient_id"
    appointment ||--o{ measurement : "appointment_id"
```

PK identifies a record; FK links to another table; UK marks a single-field unique value. The relationship ends show exactly one, zero or one, or zero or many records. Composite unique keys and conditional rules are listed in the schema and design.

[Diagram image](../images/Agwu_Amarachi_301931965_ERDiagram.png)
