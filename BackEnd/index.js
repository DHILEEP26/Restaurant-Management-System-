const express = require("express");
const mysql = require("mysql2");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "#######", // Enter your DataBase password 
  database: "#######", // Enter the database name that your created by using script.py file
  connectionLimit: 10,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database");
  }
});

// LOGIN SEREVRS !!!!

app.post("/api/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const query = `SELECT * FROM customer_info_login WHERE username = '${username}' AND password = '${password}'`;

  connection.query(query, [username, password], (err, result) => {
    if (err) {
      console.error("Error executing SQL query: " + err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (result.length === 1) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false, error: "Unauthorized" });
    }
  });
});

app.post("/api/adminlogin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const query = `SELECT * FROM admin_info WHERE admin_username = '${username}' AND admin_password = '${password}'`;

  connection.query(query, [username, password], (err, result) => {
    if (err) {
      console.error("Error executing SQL query: " + err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (result.length === 1) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false, error: "Unauthorized" });
    }
  });
});

// DISPLAY SERVERS !!

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM available_meals WHERE id = ?";
  connection.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.get("/api/meals", (req, res) => {
  const sqlGet = "SELECT * FROM available_meals ";
  connection.query(sqlGet, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.get("/api/orderPage", (req, res) => {
  const query = `
    SELECT user_name, GROUP_CONCAT(CONCAT(food_name, ' (', amount, ')') SEPARATOR ', ') AS Order_Items
    FROM orders
    GROUP BY user_name;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data from the database: " + err.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

// STORE OR UPDATE SERVERS

app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  const checkUsernameQuery =
    "SELECT * FROM customer_info_login WHERE username = ?";
  connection.query(checkUsernameQuery, [username], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Registration failed" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Username already in use" });
    } else {
      const insertUserQuery =
        "INSERT INTO customer_info_login (username, password) VALUES (?, ?)";
      connection.query(insertUserQuery, [username, password], (error) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Registration failed" });
        }

        return res.status(200).json({ message: "Registration successful" });
      });
    }
  });
});

app.post("/api/postmeal", (req, res) => {
  const { name, description, price } = req.body;
  const sqlInsert =
    "INSERT INTO available_meals (name,description,price) VALUES (?,?,?)";
  connection.query(sqlInsert, [name, description, price], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.post("/api/orders", (req, res) => {
  const { cartItems, username } = req.body;
  for (const cartItem of cartItems) {
    const { id, name, amount, price } = cartItem;
    const sql =
      "INSERT INTO orders (user_name, food_id, food_name, amount, price) VALUES (?, ?, ?, ?, ?)";
    connection.query(
      sql,
      [username, id, name, amount, price],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Order insertion failed" });
        }
      }
    );
  }

  return res.status(200).json({ message: "Orders inserted successfully" });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const sqlUpdate =
    "UPDATE available_meals SET name = ?, description = ?, price = ? WHERE id = ?";
  connection.query(
    sqlUpdate,
    [name, description, price, id],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

// REMOVE SERVERS

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM available_meals WHERE id = ?";
  connection.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.delete("/api/removeorder/:user_name", (req, res) => {
  const { user_name } = req.params;
  const sqlRemove = "DELETE FROM orders WHERE user_name = ?";
  connection.query(sqlRemove, user_name, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
