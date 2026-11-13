# Hospital Clinic Appointment and Measurement System — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| appointment_id | measurement records (list) |
| --- | --- |
| 2001 | [3001] |
| 2002 | [3002] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| measurement.measurement_id | measurement.appointment_id | measurement.measure_type | appointment.appointment_id | appointment.patient_id | appointment.status | patient.patient_id | patient.full_name |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 3001 | 2001 | temperature | 2001 | 1001 | scheduled | 1001 | Alex Sample |
| 3002 | 2002 | pulse | 2002 | 1002 | completed | 1002 | Casey Example |

Key: measurement_id.

## 2NF: depend on the whole key

The declared candidate keys do not introduce a partial dependency here, so the 1NF rows stay unchanged at this step.

## measurement_example

| measurement.measurement_id | measurement.appointment_id | measurement.measure_type | appointment.appointment_id | appointment.patient_id | appointment.status | patient.patient_id | patient.full_name |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 3001 | 2001 | temperature | 2001 | 1001 | scheduled | 1001 | Alex Sample |
| 3002 | 2002 | pulse | 2002 | 1002 | completed | 1002 | Casey Example |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## patient

| patient_id | full_name | birth_date | contact_phone |
| --- | --- | --- | --- |
| 1001 | Alex Sample | 1985-04-12 | 555-0101 |
| 1002 | Casey Example | 1992-09-23 | NULL |

## appointment

| appointment_id | patient_id | scheduled_at | status | reason |
| --- | --- | --- | --- | --- |
| 2001 | 1001 | 2026-11-20T09:00:00+00:00 | scheduled | Routine check |
| 2002 | 1002 | 2026-11-20T10:30:00+00:00 | completed | Follow-up |

## measurement

| measurement_id | appointment_id | recorded_at | measure_type | numeric_value | unit |
| --- | --- | --- | --- | --- | --- |
| 3001 | 2001 | 2026-11-20T09:15:00+00:00 | temperature | 36.6 | C |
| 3002 | 2002 | 2026-11-20T10:45:00+00:00 | pulse | 72 | bpm |

## Dependencies

- patient: (patient_id) → full_name, birth_date, contact_phone
- appointment: (appointment_id) → patient_id, scheduled_at, status, reason
- measurement: (measurement_id) → appointment_id, recorded_at, measure_type, numeric_value, unit

Joining the decomposed sample tables reproduces the original 2 example rows. The design assumes the declared keys describe the relevant business dependencies.
