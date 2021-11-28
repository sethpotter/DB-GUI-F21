const pool = require('./db')

const connect = (res, callback) => {
    pool.getConnection((error, connection) => {
        if(error) {
            logger.error('Problem obtaining MySQL connection', error);
            res.status(400).send('Problem obtaining MySQL connection');
        } else {
            callback(connection);
        }
    });
}

const simpleQuery = (res, sql, query, fields, callback) => {
    sql.query(query, fields, (error, rows, fields) => {
        if(error) {
            sql.release();
            console.log(error);
            res.status(400).send("An error has occurred");
        } else {
            callback(rows);
        }
    });
}

const returnQuery = (res, query, fields) => {
    connect(res, (sql) => {
        simpleQuery(res, sql, query, fields, (rows) => {
            res.status(200).send(JSON.stringify(rows));
            sql.release();
        });
    });
}

module.exports = function routes(app, logger) {

    app.get('/', (req, res) => {
        res.status(200).send('This is the port for the API. Go to port 3000 to view the web page.');
    });

    /********** Product Routes **********/

    // GET All Products
    app.get('/product', (req, res) => {
        returnQuery(res, 'SELECT * FROM ProductTable');
    });

    // GET Product via ProductID
    app.get('/product/:productId', (req, res) => {
        let productId = req.param('productId');
        returnQuery(res, 'SELECT * FROM ProductTable WHERE productId = (?)', productId);
    });

    // POST Product
    app.post('/product', (req, res) => {
        let rq = req.query;
        let fields = [rq.name, rq.description, rq.image, rq.price];
        returnQuery(res, 'INSERT INTO ProductTable(name, description, image, priceperunit) VALUES (?,?,?,?)', fields);
    });

    // UPDATE Product via ProductID
    app.put('/product/:productId', (req, res) => {
        let productId = req.param('productId');
        let rq = req.query;
        let fields = [rq.name, rq.description, rq.image, rq.price, productId];
        returnQuery(res, 'UPDATE ProductTable SET name = (?), description = (?), image = (?), priceperunit = (?) WHERE productId = (?)', fields);
    });

    // DELETE Product via ProductID
    app.delete('/product/:productId', (req, res) => {
        let productId = req.param('productId');
        returnQuery(res, 'DELETE FROM ProductTable WHERE productId = (?)', productId);
    });

    /********** Order Routes **********/

    // GET All Orders
    app.get('/order', (req, res) => {
        returnQuery(res, 'SELECT * FROM `Order`');
    });

    // POST Order
    app.post('/order', (req, res) => {
        let query = 'INSERT INTO `Order`(orderDate, deliveryAddress, carrier, sentDate, estArrival, delivered, restaurantId) VALUES (?,?,?,?,?,?,?)';
        let rq = req.query;
        let fields = [rq.orderDate, rq.address, rq.carrier, rq.shippedDate, rq.arrivalDate, rq.delivered, rq.restaurantId];
        returnQuery(res, query, fields);
    });

    // PUT Order via OrderId // TODO Partially works. RestaurantID doesn't update.
    app.put('/order/:orderId', (req, res) => {
        let query = 'UPDATE `Order` SET orderDate = (?), deliveryAddress = (?), carrier = (?), sentDate = (?), estArrival = (?), delivered = (?), restaurantId = (?) WHERE orderId = (?)';
        let orderId = req.param('orderId');
        let rq = req.query;
        let fields = [rq.orderDate, rq.address, rq.carrier, rq.shippedDate, rq.arrivalDate, rq.delivered, rq.restaurantId, orderId];
        returnQuery(res, query, fields);
    });

    // DELETE Order via OrderId
    app.delete('/order/:orderId', (req, res) => {
        let orderId = req.param('orderId');
        returnQuery(res, 'DELETE FROM `Order` WHERE orderId = (?)', orderId);
    });

    /********** OrderDetails Routes **********/

    // GET All OrderDetails // TODO Test
    app.get('/orderDetails', (req, res) => {
        returnQuery(res, 'SELECT * FROM OrderDetails');
    });

    // GET OrderDetails via orderId // TODO Test
    app.get('/orderDetails/:orderId', (req, res) => {
        let orderId = req.param('orderId');
        returnQuery(res, 'SELECT * FROM OrderDetails WHERE orderId = (?)', orderId);
    });

    // TODO Add post

    // UPDATE OrderDetails via orderId and productId // TODO Test
    app.put('/orderDetails/:orderId', (req, res) => {
        let orderId = req.param('orderId');
        let rq = req.query;
        let fields = [rq.quantity, orderId, rq.productId];
        returnQuery(res, 'UPDATE OrderDetails SET quantity = (?) WHERE orderId = (?) AND productId = (?)', fields);
    });

    // DELETE OrderDetails via orderId and productId // TODO Test
    app.delete('/orderDetails/:orderId', (req, res) => {
        let orderId = req.param('orderId');
        let rq = req.query;
        let fields = [orderId, rq.productId];
        returnQuery(res, 'DELETE FROM OrderDetails WHERE orderId = (?) AND productId = (?)', fields);
    });

    /********** User Routes **********/

    // GET All Users
    app.get('/user', (req, res) => {
        returnQuery(res, 'SELECT * FROM UserTable');
    });

    // GET All Employees
    app.get('/employee', (req, res) => {
        returnQuery(res, 'SELECT * FROM restaurantEmployee');
    });

    // GET RestaurantId via UserId (Links Employee to Restaurant) // TODO Test
    app.get('/getRestaurantId', (req, res) => {
        let userId = req.query.userId;
        returnQuery(res, 'SELECT * FROM restaurantEmployee where userId = (?)', userId);
    });

    // GET UserId via Username (Links UserId to User) // TODO Test
    app.get('/getUserId', (req, res) => {
        let username = req.query.username;
        returnQuery(res, 'SELECT * FROM UserTable where username = (?)', username);
    });

    // POST Register a new User (Checks if user already exists)
    app.post('/register', (req, res) => {
        connect(res, (sql) => {

            let username = req.query.username;
            let password = req.query.password;
            let email = req.query.email;
            let usertype = req.query.usertype;
            let restaurantName = req.query.restaurantName;

            let userId, restaurantId;

            if (!username || !password || !email || !usertype || usertype <= 0) {
                res.status(400).send('Invalid credentials');
                return;
            }
            if (usertype < 3 && !restaurantName) {
                res.status(400).send('Restaurant name is required');
                return;
            }
            if (username.length < 4) {
                res.status(400).send('Username is too short');
                return;
            }

            // Sorry about this mess.

            simpleQuery(res, sql, 'SELECT * FROM UserTable where username = (?)', username, (rows) => {
                if (rows.length > 0) {
                    sql.release();
                    res.status(400).send("Username already exists");
                } else {
                    simpleQuery(res, sql, 'SELECT * FROM Restaurant where name = (?)', restaurantName, (rows) => {
                        if (rows.length <= 0 && usertype < 3) {
                            sql.release();
                            res.status(400).send("Restaurant does not exist");
                        } else {
                            if(rows.length > 0)
                                restaurantId = rows[0].restaurantID;
                            simpleQuery(res, sql, 'INSERT INTO UserTable(username, password, email, userType) VALUES (?,?,?,?)', [username, password, email, usertype], (rows) => {
                                if (usertype >= 3) { // If they're a supplier resolve.
                                    sql.release();
                                    res.status(200).send("Registered account successfully");
                                } else {
                                    userId = rows.insertId;
                                    simpleQuery(res, sql, 'INSERT INTO restaurantEmployee (userID, restaurantID) VALUES (?,?)', [userId, restaurantId], (rows) => {
                                        sql.release();
                                        res.status(200).send("Registered account successfully");
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
    });

    // GET Logins in a User (Checks password and if account exists)
    app.get('/login', (req, res) => {
        connect(res, (sql) => {
            let username = req.query.username;
            let password = req.query.password;

            if(!username || !password) {
                res.status(400).send('Invalid credentials');
                return;
            }

            simpleQuery(res, sql, 'SELECT * FROM UserTable where username = ?', username, (rows) => {
                sql.release();
                if(rows.length === 0) {
                    res.status(400).send('Username does not exist');
                } else {
                    if(password === rows[0].password) {
                        res.status(200).send(rows[0]);
                    } else {
                        res.status(400).send('Incorrect password');
                    }
                }
            });
        });
    });

    // GET User via UserId // TODO Test
    app.get('/user/:userId', (req, res) => {
        let userId = req.param("userId");
        returnQuery(res, 'SELECT * FROM UserTable WHERE userId = (?)', userId);
    });

    // UPDATE User via UserId // TODO Test
    app.put('/user/:userId', (req, res) => {
        let query = 'UPDATE UserTable SET username = (?), password = (?), userType = (?), WHERE userId = (?)';
        let userId = req.param('userId');
        let rq = req.query;
        let fields = [rq.username, rq.password, rq.userType, userId];
        returnQuery(res, query, fields);
    });

    // DELETE User via userId // TODO Test
    app.delete('/user/:userId', (req, res) => {
        let userId = req.param('userId');
        connect(res, (sql) => {
            simpleQuery(res, sql, 'DELETE FROM restaurantEmployee WHERE userID = (?)', userId, (rows) => {
                simpleQuery(res, sql, 'DELETE FROM UserTable WHERE userID = (?)', userId, (rows) => {
                    sql.release();
                    res.status(200).send("Deleted User: " + userId);
                });
            });
        });
    });

    // DELETE Employee via userId
    app.delete('/employee/:userId', (req, res) => {
        let userId = req.param('userId');
        returnQuery(res, 'DELETE FROM restaurantEmployee WHERE userID = (?)', userId);
    });

    /********** Inventory Routes **********/

    // GET All Inventories
    app.get('/inventory', (req, res) => {
        returnQuery(res, 'SELECT * FROM InventoryTable');
    });

    // GET Inventory via RestaurantId // TODO Test
    app.get('/inventory/:restaurantId', (req, res) => {
        let restaurantId = req.param("restaurantId");
        returnQuery(res, 'SELECT * FROM InventoryTable WHERE restaurantId = (?)', restaurantId);
    });

    // GET Inventory via ProductId // TODO Test
    app.get('/inventory', (req, res) => {
        let productId = req.query.productId;
        returnQuery(res, 'SELECT * FROM InventoryTable WHERE productId = (?)', productId);
    });

    // POST Inventory (Allows for a new stock quantity in a restaurant inventory) // TODO Test
    app.post('/inventory', (req, res) => {
        let rq = req.query;
        let fields = [rq.restaurantId, rq.productId, rq.stock, rq.minVal];

        // Check if no duplicates
        connect(res, (sql) => {
            simpleQuery(res, sql, 'SELECT * FROM InventoryTable WHERE restaurantId = (?) AND productId = (?)', fields, (rows) => {
                if(rows.length > 0) {
                    sql.release();
                    res.status(400).send("Product already exists in this inventory");
                } else {
                    simpleQuery(res, sql, 'INSERT INTO InventoryTable (restaurantID, productID, stock, minVal) VALUES (?,?,?,?)', fields, (rows) => {
                        sql.release();
                        res.status(200).send(JSON.stringify(rows));
                    });
                }
            });
        });
    });

    // UPDATE Inventory (Allows for updating stock quantity in a restaurant inventory) // TODO Test
    app.put('/inventory', (req, res) => {
        let query = 'UPDATE InventoryTable SET stock = (?), minVal = (?) WHERE restaurantId = (?) AND productId = (?)';
        let rq = req.query;
        let fields = [rq.stock, rq.minVal, rq.restaurantId, rq.productId];
        returnQuery(res, query, fields);
    });

    // DELETE Inventory (Allows deleting a product from a restaurant inventory) // TODO Test
    app.delete('/inventory/:restaurantId', (req, res) => {
        let restaurantId = req.param('restaurantId');
        let rq = req.query;
        let fields = [restaurantId, rq.productId];
        returnQuery(res, 'DELETE FROM InventoryTable WHERE restaurantId = (?) AND productId = (?)', fields);
    });

    /********** Restaurant Routes **********/

    app.get('/restaurant', (req, res) => {
        returnQuery(res, 'SELECT * FROM Restaurant');
    });

    app.get('/restaurant/:restaurantId', (req, res) => {
        let restaurantId = req.param('restaurantId');
        returnQuery(res, 'SELECT * FROM Restaurant WHERE restaurantId = (?)', restaurantId);
    });

    app.post('/restaurant', (req, res) => {
        let rq = req.query;
        let fields = [rq.name, rq.joinedDate, rq.active];
        returnQuery(res, 'INSERT INTO Restaurant(name, dateJoined, active) VALUES (?,?,?)', fields);
    });

    app.put('/restaurant/:restaurantId', (req, res) => {
        let restaurantId = req.param('restaurantId');
        let rq = req.query;
        let fields = [rq.activity, restaurantId];
        returnQuery(res, 'UPDATE Restaurant SET activity = (?) WHERE restaurantID = (?)', fields);
    });

    app.delete('/restaurant/:restaurantId', (req, res) => {
        let restaurantId = req.param('restaurantId');
        returnQuery(res, 'DELETE FROM Restaurant WHERE restaurantId = (?)', restaurantId);
    });

}
