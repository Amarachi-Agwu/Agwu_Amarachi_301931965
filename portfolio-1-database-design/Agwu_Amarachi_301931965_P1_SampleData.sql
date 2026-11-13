-- Fictional sample records for Hospital Clinic Appointment and Measurement System.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."patient" ("patient_id", "full_name", "birth_date", "contact_phone") VALUES (1001, 'Alex Sample', '1985-04-12', '555-0101');
INSERT INTO portfolio."patient" ("patient_id", "full_name", "birth_date", "contact_phone") VALUES (1002, 'Casey Example', '1992-09-23', NULL);
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "scheduled_at", "status", "reason") VALUES (2001, 1001, '2026-11-20T09:00:00Z', 'scheduled', 'Routine check');
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "scheduled_at", "status", "reason") VALUES (2002, 1002, '2026-11-20T10:30:00+00:00', 'completed', 'Follow-up');
INSERT INTO portfolio."measurement" ("measurement_id", "appointment_id", "recorded_at", "measure_type", "numeric_value", "unit") VALUES (3001, 2001, '2026-11-20T09:15:00Z', 'temperature', 36.6, 'C');
INSERT INTO portfolio."measurement" ("measurement_id", "appointment_id", "recorded_at", "measure_type", "numeric_value", "unit") VALUES (3002, 2002, '2026-11-20T10:45:00+00:00', 'pulse', 72, 'bpm');
COMMIT;
