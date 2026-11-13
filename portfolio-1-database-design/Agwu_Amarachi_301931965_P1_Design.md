# Hospital Clinic Appointment and Measurement System — database design

My case study records patient, appointment, measurement.

## Users

- Clinic reception staff
- Clinicians

## Main operations

- Register synthetic patients
- Schedule, complete, or cancel appointments
- Record measurements for an appointment
- Review appointment and measurement summaries

## Entities

| Entity | Information stored |
| --- | --- |
| patient | Stores synthetic patient identity and basic demographic information. |
| appointment | Records a patient's appointment time, status, and reason for visit. |
| measurement | Stores a typed numeric measurement recorded during an appointment. |

## patient

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| patient_id | BIGINT | PK | Yes |
| full_name | TEXT |  | Yes |
| birth_date | DATE |  | Yes |
| contact_phone | TEXT |  | No |


## appointment

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| appointment_id | BIGINT | PK | Yes |
| patient_id | BIGINT | FK | Yes |
| scheduled_at | TIMESTAMPTZ |  | Yes |
| status | TEXT |  | Yes |
| reason | TEXT |  | Yes |
- patient_id → patient.patient_id

## measurement

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| measurement_id | BIGINT | PK | Yes |
| appointment_id | BIGINT | FK | Yes |
| recorded_at | TIMESTAMPTZ |  | Yes |
| measure_type | TEXT |  | Yes |
| numeric_value | NUMERIC(18,2) |  | Yes |
| unit | TEXT |  | Yes |
- appointment_id → appointment.appointment_id

## Relationships and business rules

- Every appointment must reference an existing patient.
- Every measurement must reference an existing appointment.
- Appointment status must be scheduled, completed, or cancelled.
- At most one appointment per patient may have status scheduled at a given scheduled_at timestamp; cancelled and completed appointments are excluded.
- A measurement numeric_value must be zero or greater.

## Assumptions

- All exercise records and values are synthetic; no real patient names, identifiers, or clinical data are included.
- Each appointment belongs to exactly one patient, and each measurement belongs to exactly one appointment.
- Identifier values are globally unique across the patient, appointment, and measurement tables.
- A patient may have at most one scheduled appointment at a given timestamp; cancelled or completed appointments do not reserve that slot.
- Worked normalization example: start with measurement as the root, keep measurement-specific attributes there, appointment time and patient reference in appointment, and patient demographics in patient. Each ancestor relationship appears once.
- Separate benchmark plan: generate 25000 synthetic appointment rows, compare the same scheduled_at date-range filter before and after a B-tree index on appointment.scheduled_at, and record query-plan and timing differences.

