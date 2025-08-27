import duckdb

# Connect / Create database file
con = duckdb.connect("staffsync_db.duckdb")

# Read schema.sql file OR run directly
schema_sql = open("schema.sql").read()
con.execute(schema_sql)

print("✅ Staffsync schema created successfully in DuckDB!")
con.close()
