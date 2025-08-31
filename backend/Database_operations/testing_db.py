import duckdb

# Connect to the same DB your init_db created
conn = duckdb.connect('../staffsync_db.db')

# Show all tables in the DB
print("Available tables:")
print(conn.execute("SHOW TABLES").fetchall())

# Check if tenants table exists
if "tenants" in [t[0] for t in conn.execute("SHOW TABLES").fetchall()]:
    rows = conn.execute("SELECT * FROM tenants").df()
    print("\nTenants:\n", rows.head())
else:
    print("\nNo tenants table found.")

# Check if users table exists
if "users" in [t[0] for t in conn.execute("SHOW TABLES").fetchall()]:
    rows1 = conn.execute("SELECT email FROM users").df()
    print("\nUsers:\n", rows1.head())
else:
    print("\nNo users table found.")

conn.close()

