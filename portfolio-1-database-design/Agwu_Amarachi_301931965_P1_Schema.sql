-- Hospital Clinic Appointment and Measurement System: tables, keys and business constraints.
-- Run once in a fresh PostgreSQL database.
BEGIN;
SET LOCAL standard_conforming_strings = on;
CREATE SCHEMA portfolio;
CREATE TABLE portfolio."patient" (
  "patient_id" bigint NOT NULL,
  "full_name" text NOT NULL,
  "birth_date" date NOT NULL,
  "contact_phone" text,
  CONSTRAINT "pk_patient" PRIMARY KEY ("patient_id")
);
CREATE TABLE portfolio."appointment" (
  "appointment_id" bigint NOT NULL,
  "patient_id" bigint NOT NULL,
  "scheduled_at" timestamptz NOT NULL,
  "status" text NOT NULL,
  "reason" text NOT NULL,
  CONSTRAINT "pk_appointment" PRIMARY KEY ("appointment_id")
);
CREATE TABLE portfolio."measurement" (
  "measurement_id" bigint NOT NULL,
  "appointment_id" bigint NOT NULL,
  "recorded_at" timestamptz NOT NULL,
  "measure_type" text NOT NULL,
  "numeric_value" numeric(18,2) NOT NULL,
  "unit" text NOT NULL,
  CONSTRAINT "pk_measurement" PRIMARY KEY ("measurement_id")
);
ALTER TABLE portfolio."appointment" ADD CONSTRAINT "fk_appointment_0" FOREIGN KEY ("patient_id") REFERENCES portfolio."patient" ("patient_id");
ALTER TABLE portfolio."measurement" ADD CONSTRAINT "fk_measurement_0" FOREIGN KEY ("appointment_id") REFERENCES portfolio."appointment" ("appointment_id");
ALTER TABLE portfolio."appointment" ADD CONSTRAINT "appointment_status_check" CHECK (("status" = 'scheduled') OR ("status" = 'completed') OR ("status" = 'cancelled'));
CREATE UNIQUE INDEX "appointment_active_slot_unique" ON portfolio."appointment" ("patient_id", "scheduled_at") WHERE ("status" = 'scheduled');
ALTER TABLE portfolio."measurement" ADD CONSTRAINT "measurement_value_check" CHECK ("numeric_value" >= 0);
COMMIT;
