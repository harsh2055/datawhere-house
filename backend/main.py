from fastapi import FastAPI
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv
load_dotenv(dotenv_path=".env")
DATABASE_URL = os.getenv("DATABASE_URL")
print("Loaded DATABASE_URL:", DATABASE_URL)


app = FastAPI()

DATABASE_URL = os.getenv("DATABASE_URL")

print("DATABASE_URL =", DATABASE_URL)   # ✅ Now it's defined

def get_db_connection():
    return psycopg2.connect(
        DATABASE_URL,
        cursor_factory=RealDictCursor
    )

@app.get("/")
def root():
    return {
        "message": "DataWhere House API",
        "status": "Connected to Supabase"
    }

@app.get("/api/sales")
def get_sales():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT date, product_id, region, revenue, units
        FROM fact_sales
        ORDER BY date ASC;
    """)

    rows = cur.fetchall()

    cur.close()
    conn.close()

    return {
        "count": len(rows),
        "data": rows
    }
