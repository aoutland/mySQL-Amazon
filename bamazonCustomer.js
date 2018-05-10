require("dotenv").config();
//npm installs
var password = require('./password').database.password,
    inquirer = require('inquirer'),
    mysql = require('mysql'),
    table = require('cli-table'),
    items = []
//where the connection of database will take place
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root', 
    password: password,
    database: 'bamazon'
});
//connection
connection.connect(function(err){
    if(err);
    console.error("error connecting: " + err.stack);
    loadProducts()
})
//database table 
function loadProducts() {
    connection.query('SELECT * FROM Products', function(err, res){
        if (err) throw err;
        console.table(res);

        var table = new table({
            head:[ 'Item ID', 'Product Name', 'Department Name', 'Price', 'Stock'],
        })
        res.forEach(function(itm){
            var itemInfo = [itm.item_ID, itm.product_name, itm.department_name, itm.price, itm.stock_quantity]

            items.push(itm.product_name.toLowerCase())
            table.push(itemInfo)
        })

        console.log(table.toString());

        promptForItem(res);
    });
}

function promptForItem() {
    inquirer
    .prompt([
        {
            name: "item",
            type: "input",
            message: "Which item do you wish to purchase?",
        },
        {
            name: "number",
            type: "input",
            message: "Quantity of item"
        }
    ]).then(function(answer){
        var control = answer.item.toLowerCase()

        if(isNaN(answer.number)){
            console.log("Enter a number")
        } else if (items.includes(item)){
            makePurchase(item, answer.number)}
                else{
                    console.log('Choose an item')
                    promptForItem();
                }
    })
}

function makePurchase(item, number) {
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    {product_name: item},
    function(err, res){
        if(err) throw err;
        var stock = res[0].stock_quantity
        var price = res[0].price
        if(number <= stock){
            itemPurchase(item, number, stock, price)
        } else {
            console.log("Not enough in stock")
            connection.end()
        }
    })
}

function itemPurchase(item, number, stock, price) {
    connection.query(
        "UPDATE products SET ? WHERE ?"
        [
            {
                stock_quantity: stock - number
            }, {
                product_name: item
            }
        ],
        function(err, res){
            if(err) throw err

            updateSales(price, number, item)
        }
    )
}

function updateSales(price, number, item){
    connection.query(
        "UPDATE products SET ? WHERE ? ",
        [
            {
                product_price: price * number
            }, {
                product_name : item
            }
        ],
        function(err, res) {
            if (err) throw err
            console.log("The item total has come to $" + price * number)

            connection.end()
        }
    )
}