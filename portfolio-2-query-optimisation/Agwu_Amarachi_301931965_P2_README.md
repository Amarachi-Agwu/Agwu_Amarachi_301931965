# Hospital Clinic Appointment and Measurement System — SQL queries

## 1. Show related patient, appointment records (up to 20).

```sql
SELECT t0."patient_id" AS "patient_patient_id",
       t0."full_name" AS "patient_full_name",
       t1."appointment_id" AS "appointment_appointment_id",
       t1."scheduled_at" AS "appointment_scheduled_at"
FROM portfolio."patient" t0
JOIN portfolio."appointment" t1 ON t1."patient_id" = t0."patient_id"
ORDER BY t0."patient_id", t1."appointment_id"
LIMIT 20;
```

| patient_patient_id | patient_full_name | appointment_appointment_id | appointment_scheduled_at |
| --- | --- | --- | --- |
| 1001 | Alex Sample | 2001 | 2026-11-20T09:00:00+00:00 |
| 1002 | Casey Example | 2002 | 2026-11-20T10:30:00+00:00 |

## 2. Find appointment records where scheduled_at matches "2026-11-20T09:00:00Z" (up to 20).

```sql
SELECT * FROM portfolio."appointment"
WHERE "scheduled_at" IS NOT DISTINCT FROM '2026-11-20T09:00:00Z'
ORDER BY "appointment_id"
LIMIT 20;
```

| appointment_id | patient_id | scheduled_at | status | reason |
| --- | --- | --- | --- | --- |
| 2001 | 1001 | 2026-11-20T09:00:00+00:00 | scheduled | Routine check |

## 3. Count appointment records for each patient_id (up to 20 groups).

```sql
SELECT "patient_id", count(*) AS record_count
FROM portfolio."appointment"
GROUP BY "patient_id"
ORDER BY record_count DESC, "patient_id" NULLS LAST
LIMIT 20;
```

| patient_id | record_count |
| --- | --- |
| 1001 | 1 |
| 1002 | 1 |

## 4. Count appointment records for each patient_id (up to 20 groups).

```sql
SELECT "patient_id", count(*) AS record_count
FROM portfolio."appointment"
GROUP BY "patient_id"
ORDER BY record_count DESC, "patient_id" NULLS LAST
LIMIT 20;
```

| patient_id | record_count |
| --- | --- |
| 1001 | 1 |
| 1002 | 1 |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 1.349 | 1.222, 1.349, 2.057 | Sort → Seq Scan | 139 |
| After index | 0.202 | 0.202, 0.271, 0.198 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 30 |

The median execution time changed from 1.349 ms to 0.202 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=1.194..1.195 rows=25 loops=1)
  Seq Scan on appointment (actual time=0.014..1.159 rows=25 loops=1)
Planning Time: 0.326 ms
Execution Time: 1.222 ms
```

### Before index, run 2

```text
Sort (actual time=1.319..1.321 rows=25 loops=1)
  Seq Scan on appointment (actual time=0.014..1.282 rows=25 loops=1)
Planning Time: 0.339 ms
Execution Time: 1.349 ms
```

### Before index, run 3

```text
Sort (actual time=2.029..2.031 rows=25 loops=1)
  Seq Scan on appointment (actual time=0.015..1.989 rows=25 loops=1)
Planning Time: 0.448 ms
Execution Time: 2.057 ms
```

### After index, run 1

```text
Sort (actual time=0.147..0.149 rows=25 loops=1)
  Bitmap Heap Scan on appointment (actual time=0.026..0.111 rows=25 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.013..0.013 rows=25 loops=1)
Planning Time: 0.523 ms
Execution Time: 0.202 ms
```

### After index, run 2

```text
Sort (actual time=0.199..0.201 rows=25 loops=1)
  Bitmap Heap Scan on appointment (actual time=0.037..0.146 rows=25 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.018..0.019 rows=25 loops=1)
Planning Time: 0.83 ms
Execution Time: 0.271 ms
```

### After index, run 3

```text
Sort (actual time=0.147..0.148 rows=25 loops=1)
  Bitmap Heap Scan on appointment (actual time=0.026..0.109 rows=25 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.013..0.013 rows=25 loops=1)
Planning Time: 0.54 ms
Execution Time: 0.198 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run Agwu_Amarachi_301931965_P2_Queries.sql, then Agwu_Amarachi_301931965_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/Agwu_Amarachi_301931965_P2_QueryResults.png) · [Index comparison](screenshots/Agwu_Amarachi_301931965_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

