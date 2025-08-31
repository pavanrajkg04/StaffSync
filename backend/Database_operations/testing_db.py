import duckdb


conn = duckdb.connect('../../staffsync_db.duckdb')

rows = conn.execute("SELECT * FROM tenants").df()
print(rows.head())

rows1 = conn.execute("SELECT * FROM users").df()
print(rows1.head())

conn.close()