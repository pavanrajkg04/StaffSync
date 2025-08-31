import duckdb  # Assuming you're using duckdb.connect; import as needed

def init_db():
    conn = duckdb.connect('staffsync_db.db')  # Replace with your database path if different

    conn.execute("""
    CREATE TABLE IF NOT EXISTS tenants (
        tenant_id VARCHAR PRIMARY KEY,
        company_name VARCHAR NOT NULL,
        company_size VARCHAR,
        industry VARCHAR,
        website VARCHAR,
        subscribe_newsletter BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP
    );
    """)

    conn.execute("""
    CREATE TABLE IF NOT EXISTS users (
        user_id VARCHAR PRIMARY KEY,
        tenant_id VARCHAR NOT NULL,
        first_name VARCHAR NOT NULL,
        last_name VARCHAR NOT NULL,
        email VARCHAR UNIQUE NOT NULL,
        phone VARCHAR,
        role VARCHAR NOT NULL,
        job_title VARCHAR,
        password_hash VARCHAR NOT NULL,
        created_at TIMESTAMP,
        FOREIGN KEY (tenant_id) REFERENCES tenants (tenant_id)
    );
    """)

    conn.close()  # Or commit if needed, but DuckDB auto-commits by default

def get_db():
    conn = duckdb.connect('staffsync_db.db')
    try:
        yield conn
    finally:
        conn.close()

