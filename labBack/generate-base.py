import sqlite3

# Connect to the SQLite3 database (creates the file if it doesn't exist)
conn = sqlite3.connect('user_database.db')

# Create a cursor object to execute SQL commands
cursor = conn.cursor()

# SQL command to create user_table
cursor.execute('''
CREATE TABLE IF NOT EXISTS user_table (
    login TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);
''')

# Insert a sample record
try:
    cursor.execute('''
    INSERT INTO user_table (login, password) 
    VALUES (?, ?);
    ''', ("example@mail.com", "example_password"))
    print("Sample record inserted successfully.")
except sqlite3.IntegrityError:
    print("Sample record already exists.")

# Commit changes and close the connection
conn.commit()
conn.close()

print("Database and table created successfully.")
