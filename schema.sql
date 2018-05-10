DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("War Craft", "Video Games", 439.95, 75),
  ("LuDo", "Board Games", 19.99, 150),
  ("Coke", "Food and Drink", 2.50, 50),
  ("Demin Jacket", "Apparel", 24.99, 25),
  ("Worn Denim Jeans", "Apparel", 54.25, 35),
  ("Bath Towel Set", "Necessities", 14.98, 15),
  ("Love and Basketball", "Films", 15.00, 10),
  ("Captain Planet", "Films", 25.50, 21),
  ("Monopoly", "Board Games", 30.50, 11),
  ("Yahtzee", "Board Games", 19.95, 3);
