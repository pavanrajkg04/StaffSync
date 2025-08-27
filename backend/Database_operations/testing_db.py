import duckdb


conn = duckdb.connect('../../staffsync_db.duckdb')

rows = conn.execute("SELECT * FROM tenants").df()
print(rows.head())

conn.close()