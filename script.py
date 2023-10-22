#Requirements : Python compiler and MYSQL 
# After that You need to install "mysql-connector-python" 
# For that  "pip install mysql-connector-python" copy pasting this comment in your command prompt
# And simply run this code in your cmd
import mysql.connector
import getpass  


host = input("Enter the database host: ")
user = input("Enter the database username: ")
password = getpass.getpass("Enter the database password: ")
database = input("Enter the database name: ")

try:

    conn = mysql.connector.connect(
        host=host,
        user=user,
        password=password
    )

    if conn.is_connected():
        print("Connected to the database server successfully!")

        cursor = conn.cursor()

        # Create the database
        create_db_query = f"CREATE DATABASE IF NOT EXISTS {database}"
        cursor.execute(create_db_query)
        print(f"Database '{database}' created successfully!")

        # Switch to the newly created database
        conn.database = database

        create_table_query1 = """
        CREATE TABLE IF NOT EXISTS admin_info (
            admin_id INT AUTO_INCREMENT PRIMARY KEY,
            admin_username VARCHAR(255),
            admin_password VARCHAR(255)
        )
        """
        cursor.execute(create_table_query1)
        print("Table_1 created successfully!")

        create_table_query2 = """
        CREATE TABLE IF NOT EXISTS available_meals (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            description VARCHAR(255),
            price FLOAT

        )
        """
        cursor.execute(create_table_query2)
        print("Table_2 created successfully!")



        create_table_query3 = """
        CREATE TABLE IF NOT EXISTS customer_info_login (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255),
            password VARCHAR(255)

        )
        """
        cursor.execute(create_table_query3)
        print("Table_3 created successfully!")



        create_table_query4 = """
        CREATE TABLE IF NOT EXISTS orders (
            user_name VARCHAR(255),
            food_id INT,
            food_name VARCHAR(255),
            amount INT,
            price FLOAT

        )
        """
        cursor.execute(create_table_query4)
        print("Table_4 created successfully!")
        # Commit changes to the database
        conn.commit()

except mysql.connector.Error as err:
    print(f"Error: {err}")

finally:
    if 'conn' in locals() and conn.is_connected():
        cursor.close()
        conn.close()
        print("Database connection closed.")