import duckdb

DB_PATH = "staffsync_db.duckdb"

def init_db():
    conn = duckdb.connect(DB_PATH)
    conn.execute("""
    CREATE TABLE IF NOT EXISTS tenants (
        tenant_id UUID PRIMARY KEY,
        company_name VARCHAR NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS users (
        user_id UUID PRIMARY KEY,
        tenant_id UUID REFERENCES tenants(tenant_id),
        first_name VARCHAR NOT NULL,
        last_name VARCHAR NOT NULL,
        email VARCHAR NOT NULL UNIQUE,
        phone VARCHAR,
        password_hash VARCHAR NOT NULL,
        role VARCHAR NOT NULL DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)
    conn.close()

def get_db():
    conn = duckdb.connect(DB_PATH)
    try:
        yield conn
    finally:
        conn.close()
