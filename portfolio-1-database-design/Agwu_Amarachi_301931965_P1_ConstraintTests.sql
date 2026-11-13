-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. patient pk duplicate. Expected: pk_patient, SQLSTATE 23505.
INSERT INTO portfolio."patient" ("patient_id", "full_name", "birth_date", "contact_phone")
VALUES (1001, 'Jordan Sample', '1980-01-02', '555-0103');

-- 2. patient id null. Expected: patient_id, SQLSTATE 23502.
INSERT INTO portfolio."patient" ("patient_id", "full_name", "birth_date", "contact_phone")
VALUES (NULL, 'Jordan Sample', '1980-01-02', '555-0103');

-- 3. patient name null. Expected: full_name, SQLSTATE 23502.
INSERT INTO portfolio."patient" ("patient_id", "full_name", "birth_date", "contact_phone")
VALUES (1101, NULL, '1980-01-02', '555-0103');

-- 4. patient birth date null. Expected: birth_date, SQLSTATE 23502.
INSERT INTO portfolio."patient" ("patient_id", "full_name", "birth_date", "contact_phone")
VALUES (1102, 'Jordan Sample', NULL, '555-0103');

-- 5. appointment pk duplicate. Expected: pk_appointment, SQLSTATE 23505.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "scheduled_at", "status", "reason")
VALUES (2001, 1002, '2026-11-21T11:00:00Z', 'scheduled', 'Routine check');

-- 6. appointment fk invalid. Expected: fk_appointment_0, SQLSTATE 23503.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "scheduled_at", "status", "reason")
VALUES (2101, 9999, '2026-11-21T11:00:00Z', 'scheduled', 'Routine check');

-- 7. appointment id null. Expected: appointment_id, SQLSTATE 23502.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "scheduled_at", "status", "reason")
VALUES (NULL, 1001, '2026-11-21T11:00:00Z', 'scheduled', 'Routine check');

-- 8. appointment patient id null. Expected: patient_id, SQLSTATE 23502.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "scheduled_at", "status", "reason")
VALUES (2102, NULL, '2026-11-21T11:00:00Z', 'scheduled', 'Routine check');

-- 9. appointment time null. Expected: scheduled_at, SQLSTATE 23502.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "scheduled_at", "status", "reason")
VALUES (2103, 1001, NULL, 'scheduled', 'Routine check');

-- 10. appointment status null. Expected: status, SQLSTATE 23502.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "scheduled_at", "status", "reason")
VALUES (2104, 1001, '2026-11-21T11:00:00Z', NULL, 'Routine check');

-- 11. appointment reason null. Expected: reason, SQLSTATE 23502.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "scheduled_at", "status", "reason")
VALUES (2105, 1001, '2026-11-21T11:00:00Z', 'scheduled', NULL);

-- 12. measurement pk duplicate. Expected: pk_measurement, SQLSTATE 23505.
INSERT INTO portfolio."measurement" ("measurement_id", "appointment_id", "recorded_at", "measure_type", "numeric_value", "unit")
VALUES (3001, 2002, '2026-11-21T11:00:00Z', 'pulse', 70, 'bpm');

-- 13. measurement fk invalid. Expected: fk_measurement_0, SQLSTATE 23503.
INSERT INTO portfolio."measurement" ("measurement_id", "appointment_id", "recorded_at", "measure_type", "numeric_value", "unit")
VALUES (3101, 9999, '2026-11-21T11:00:00Z', 'pulse', 70, 'bpm');

-- 14. measurement id null. Expected: measurement_id, SQLSTATE 23502.
INSERT INTO portfolio."measurement" ("measurement_id", "appointment_id", "recorded_at", "measure_type", "numeric_value", "unit")
VALUES (NULL, 2001, '2026-11-21T11:00:00Z', 'pulse', 70, 'bpm');

-- 15. measurement appointment id null. Expected: appointment_id, SQLSTATE 23502.
INSERT INTO portfolio."measurement" ("measurement_id", "appointment_id", "recorded_at", "measure_type", "numeric_value", "unit")
VALUES (3102, NULL, '2026-11-21T11:00:00Z', 'pulse', 70, 'bpm');

-- 16. measurement recorded at null. Expected: recorded_at, SQLSTATE 23502.
INSERT INTO portfolio."measurement" ("measurement_id", "appointment_id", "recorded_at", "measure_type", "numeric_value", "unit")
VALUES (3103, 2001, NULL, 'pulse', 70, 'bpm');

-- 17. measurement type null. Expected: measure_type, SQLSTATE 23502.
INSERT INTO portfolio."measurement" ("measurement_id", "appointment_id", "recorded_at", "measure_type", "numeric_value", "unit")
VALUES (3104, 2001, '2026-11-21T11:00:00Z', NULL, 70, 'bpm');

-- 18. measurement value null. Expected: numeric_value, SQLSTATE 23502.
INSERT INTO portfolio."measurement" ("measurement_id", "appointment_id", "recorded_at", "measure_type", "numeric_value", "unit")
VALUES (3105, 2001, '2026-11-21T11:00:00Z', 'pulse', NULL, 'bpm');

-- 19. measurement unit null. Expected: unit, SQLSTATE 23502.
INSERT INTO portfolio."measurement" ("measurement_id", "appointment_id", "recorded_at", "measure_type", "numeric_value", "unit")
VALUES (3106, 2001, '2026-11-21T11:00:00Z', 'pulse', 70, NULL);

-- 20. appointment status invalid. Expected: appointment_status_check, SQLSTATE 23514.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "scheduled_at", "status", "reason")
VALUES (2106, 1001, '2026-11-21T11:00:00Z', 'pending', 'Routine check');

-- 21. appointment active slot duplicate. Expected: appointment_active_slot_unique, SQLSTATE 23505.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "scheduled_at", "status", "reason")
VALUES (2107, 1001, '2026-11-20T09:00:00Z', 'scheduled', 'Another routine check');

-- 22. measurement value negative. Expected: measurement_value_check, SQLSTATE 23514.
INSERT INTO portfolio."measurement" ("measurement_id", "appointment_id", "recorded_at", "measure_type", "numeric_value", "unit")
VALUES (3107, 2001, '2026-11-21T11:00:00Z', 'temperature', -1, 'C');
