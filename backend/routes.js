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

const returnQuery = (res, errorMsg, query, fields) => {
    connect(res, (sql) => {
        sql.query(query, fields, (error, rows, fields) => {
            sql.release();
            if(error) {
                console.log(error);
                res.status(400).send(errorMsg);
            } else {
                res.status(200).send(JSON.stringify(rows));
            }
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
      returnQuery(res, "Failed to get all products", 'SELECT * FROM ProductTable');
  });

  // GET Product via ProductID
  app.get('/product/:productId', (req, res) => {
      let productId = req.param('productId');
      returnQuery(res, "Failed to get product from id", 'SELECT * FROM ProductTable WHERE productId = (?)', productId);
  });

    // POST Product
  app.post('/product', (req, res) => {
      let query = 'INSERT INTO ProductTable(name, description, image, priceperunit) VALUES (?,?,?,?)';
      let rq = req.query;
      let fields = [rq.name, rq.description, rq.image, rq.price];
      returnQuery(res, "Failed to add new product", query, fields);
  });

  // UPDATE Product via ProductID
  app.put('/product/:productId', (req, res) => {
      let query = 'UPDATE ProductTable SET name = (?), description = (?), image = (?), priceperunit = (?) WHERE productId = (?)';
      let productId = req.param('productId');
      let rq = req.query;
      let fields = [rq.name, rq.description, rq.image, rq.price, productId];
      returnQuery(res, "Failed to update product", query, fields);
  });

  // DELETE Product via ProductID
  app.delete('/product/:productId', (req, res) => {
      let productId = req.param('productId');
      returnQuery(res, "Failed to delete product from id", 'DELETE FROM ProductTable WHERE productId = (?)', productId);
  });

  /********** Order Routes **********/

  // GET All Orders
  app.get('/order', (req, res) => {
      returnQuery(res, "Failed to get all orders", 'SELECT * FROM `Order`');
  });

  // POST Order
  app.post('/order', (req, res) => {
      let query = 'INSERT INTO `Order`(orderDate, deliveryAddress, carrier, sentDate, estArrival, delivered, restaurantId) VALUES (?,?,?,?,?,?,?)';
      let rq = req.query;
      let fields = [rq.orderDate, rq.address, rq.carrier, rq.shippedDate, rq.arrivalDate, rq.delivered, rq.restaurantId];
      returnQuery(res, "Failed to post order", query, fields);
  });

  // PUT Order via OrderId // TODO Partially works. RestaurantID doesn't update.
  app.put('/order/:orderId', (req, res) => {
      let query = 'UPDATE `Order` SET orderDate = (?), deliveryAddress = (?), carrier = (?), sentDate = (?), estArrival = (?), delivered = (?), restaurantId = (?) WHERE orderId = (?)';
      let orderId = req.param('orderId');
      let rq = req.query;
      let fields = [rq.orderDate, rq.address, rq.carrier, rq.shippedDate, rq.arrivalDate, rq.delivered, rq.restaurantId, orderId];
      returnQuery(res, "Failed to update order", query, fields);
  });

  // DELETE Order via OrderId
  app.delete('/order/:orderId', (req, res) => {
      let orderId = req.param('orderId');
      returnQuery(res, "Failed to delete order",  'DELETE FROM `Order` WHERE orderId = (?)', orderId);
  });

  /********** OrderDetails Routes **********/

  // GET All OrderDetails // TODO Test
  app.get('/orderDetails', (req, res) => {
      returnQuery(res, "Failed to get all orderDetails", 'SELECT * FROM OrderDetails');
  });

  // GET OrderDetails via orderId // TODO Test
  app.get('/orderDetails/:orderId', (req, res) => {
      let orderId = req.param('orderId');
      returnQuery(res, "Failed to get orderDetails from orderId", 'SELECT * FROM OrderDetails WHERE orderId = (?)', orderId);
  });

  // UPDATE OrderDetails via orderId and productId // TODO Test
  app.put('/orderDetails/:orderId', (req, res) => {
      let orderId = req.param('orderId');
      let rq = req.query;
      let fields = [rq.quantity, orderId, rq.productId];
      returnQuery(res, "Failed to update orderDetails from orderId and productId", 'UPDATE OrderDetails SET quantity = (?) WHERE orderId = (?) AND productId = (?)', fields);
  });

  // DELETE OrderDetails via orderId and productId // TODO Test
  app.delete('/orderDetails/:orderId', (req, res) => {
      let orderId = req.param('orderId');
      let rq = req.query;
      let fields = [orderId, rq.productId];
      returnQuery(res, "Failed to delete orderDetails", 'DELETE FROM OrderDetails WHERE orderId = (?) AND productId = (?)', fields);
  });

    /*app.put('/orderDetails', function(req, res){
        pool.getConnection(function (err, con){
            con.query("INSERT INTO orderDetails(orderID, productID, quantity) VALUES(?)", [req.body.orderID, req.body.productID, req.body.quantity], function(err, result, fields){
                if(err) throw err;
                res.end(JSON.stringify(result));
        });
        });
    });*/

  /********** User Routes **********/

  // GET All Users // TODO Test
  app.get('/users', (req, res) => {
      returnQuery(res, "Failed to fetch all users",  'SELECT * FROM UserTable');
  });

  // GET RestaurantId via UserId (Links Employee to Restaurant) // TODO Test
  app.get('/getRestaurantId', (req, res) => {
      let userId = req.query.userId;
      returnQuery(res, "Failed to get restaurantId",  'SELECT * FROM restaurantEmployee where userId = (?)', userId);
  });

  // GET UserId via Username (Links UserId to User) // TODO Test
  app.get('/getUserId', (req, res) => {
      let username = req.query.username;
      returnQuery(res, "Failed to get UserId",  'SELECT * FROM UserTable where username = (?)', username);
  });

  // POST Register a new User (Checks if user already exists)
  app.post('/register', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {

        // Getting the variables from the body of the request
        var username = req.query.username;
        var password = req.query.password;
        var usertype = req.query.usertype;

        if(!username || !password || !usertype) {
            res.status(400).send('Invalid credentials');
            return;
        }
        if(username.length < 4) {
            res.status(400).send('Username is too short');
            return;
        }

        connection.query('SELECT * FROM UserTable where username = ?', username, function (err, rows, fields) {
          if(err) {
            connection.release();
            logger.error("Error while fetching values: \n", err);
            res.status(400).send('Problem creating account');
          } else {
            if(rows.length === 0) {
              connection.query('INSERT INTO UserTable(username, password, userType) VALUES (?,?,?)', [username, password, usertype], function (err, rows, fields) {
                connection.release();
                if (err) {
                  logger.error("Error while registering: \n", err);
                  res.status(400).send('Problem creating account');
                } else {
                  res.status(200).send('Registered account successfully');
                }
              });
            } else {
              res.status(400).send('Username already exists');
            }
          }
        });
      }
    });
  });

  // GET Logins in a User (Checks password and if account exists)
  app.get('/login', (req, res) => {
    pool.getConnection(function (err, connection) {
      if(err) {
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        var username = req.query.username;
        var password = req.query.password;

        if(!username || !password) {
            res.status(400).send('Invalid credentials');
            return;
        }

        connection.query('SELECT * FROM UserTable where username = ?', username, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).send('Username does not exist');
          } else {
            if(rows.length === 0) {
                res.status(400).send('Username does not exist');
                return;
            }
            if(password === rows[0].password) {
              res.status(200).send(rows[0]);
            } else {
              res.status(400).send('Incorrect password');
            }
          }
        });
      }
    });
  });

  // GET User via UserId // TODO Test
  app.get('/user/:userId', (req, res) => {
      let userId = req.param("userId");
      returnQuery(res, "Failed to get User from UserId",  'SELECT * FROM UserTable WHERE userId = (?)', userId);
  });

  // UPDATE User via UserId // TODO Test
  app.put('/user/:userId', (req, res) => {
      let query = 'UPDATE UserTable SET username = (?), password = (?), userType = (?), WHERE userId = (?)';
      let userId = req.param('userId');
      let rq = req.query;
      let fields = [rq.username, rq.password, rq.userType, userId];
      returnQuery(res, "Failed to update User via UserId", query, fields);
  });

  // DELETE User via userId // TODO Test
  app.delete('/user/:userId', (req, res) => {
      let userId = req.param('userId');
      returnQuery(res, "Failed to delete User via UserId", 'DELETE FROM UserTable WHERE userId = (?)', userId);
  });

  /********** Inventory Routes **********/

  // GET All Inventories
  app.get('/inventory', (req, res) => {
      returnQuery(res, "Failed to fetch all inventories", 'SELECT * FROM InventoryTable');
  });

  // GET Inventory via RestaurantId // TODO Test
  app.get('/inventory/:restaurantId', (req, res) => {
      let restaurantId = req.param("restaurantId");
      returnQuery(res, "Failed to get inventory by restaurantId", 'SELECT * FROM InventoryTable WHERE restaurantId = (?)', restaurantId);
  });

  // GET Inventory via ProductId // TODO Test
  app.get('/inventory', (req, res) => {
      let productId = req.query.productId;
      returnQuery(res, "Failed to get inventory by productId", 'SELECT * FROM InventoryTable WHERE productId = (?)', productId);
  });

  /*app.put('/inventory', function(req, res){
    pool.getConnection(function (err, con){
        con.query("UPDATE InventoryTable SET stock=? WHERE restaurantID= (?)", [req.body.stock, req.body.restaurantID], function(err, result, fields){
            if(err) throw err;
            res.end(JSON.stringify(result));
	});
    });
  });*/

  // POST Inventory (Allows for a new stock quantity in a restaurant inventory) // TODO Test
  app.post('/inventory', (req, res) => {
      let rq = req.query;
      let fields = [rq.restaurantId, rq.productId, rq.stock, rq.minVal];

      // Check if no duplicates
      connect(res, (sql) => {
          sql.query('SELECT * FROM InventoryTable WHERE restaurantId = (?) AND productId = (?)', fields, (error, rows, sqlFields) => {
              if(error) {
                  sql.release();
                  console.log(error);
                  res.status(400).send("Error occurred while checking database");
              } else {
                  if(rows.length > 0) {
                      sql.release();
                      res.status(400).send("Product already exists in this inventory");
                  } else {
                      sql.query('INSERT INTO InventoryTable (restaurantID, productID, stock, minVal) VALUES (?,?,?,?)', fields, (error, rows, fields) => {
                          sql.release();
                          if(error) {
                              console.log(error);
                              res.status(400).send("Failed to add new inventory stock");
                          } else {
                              res.status(200).send(JSON.stringify(rows));
                          }
                      });
                  }
              }
          });
      });
  });

  // UPDATE Inventory (Allows for updating stock quantity in a restaurant inventory) // TODO Test
  app.put('/inventory', (req, res) => {
      let query = 'UPDATE InventoryTable SET stock = (?), minVal = (?) WHERE restaurantId = (?) AND productId = (?)';
      let rq = req.query;
      let fields = [rq.stock, rq.minVal, rq.restaurantId, rq.productId];
      returnQuery(res, "Failed to update inventory stock", query, fields);
  });

  // DELETE Inventory (Allows deleting a product from a restaurant inventory) // TODO Test
  app.delete('/inventory/:restaurantId', (req, res) => {
      let restaurantId = req.param('restaurantId');
      let rq = req.query;
      let fields = [restaurantId, rq.productId];
      returnQuery(res, "Failed to delete product from inventory",  'DELETE FROM InventoryTable WHERE restaurantId = (?) AND productId = (?)', fields);
  });

  /********** Restaurant Routes **********/

  app.get('/restaurant', (req, res) => {
      returnQuery(res, "Failed to get all restaurants", 'SELECT * FROM Restaurant');
  });

  app.get('/restaurant/:restaurantId', (req, res) => {
      let restaurantId = req.param('restaurantId');
      returnQuery(res, "Failed to get all restaurants", 'SELECT * FROM Restaurant WHERE restaurantId = (?)', restaurantId);
  });

  app.post('/restaurant', (req, res) => {
      let rq = req.query;
      let fields = [rq.name, rq.joinedDate, rq.active];
      returnQuery(res, "Failed to post a new restaurant", 'INSERT INTO Restaurant(name, dateJoined, active) VALUES (?,?,?)', fields);
  });

  app.put('/restaurant/:restaurantId', (req, res) => {
      let restaurantId = req.param('restaurantId');
      let rq = req.query;
      let fields = [rq.activity, restaurantId];
      returnQuery(res, "Failed to get all restaurants", 'UPDATE Restaurant SET activity = (?) WHERE restaurantID = (?)', fields);
  });

  app.delete('/restaurant/:restaurantId', (req, res) => {
      let restaurantId = req.param('restaurantId');
      returnQuery(res, "Failed to delete restaurant", 'DELETE FROM Restaurant WHERE restaurantId = (?)', restaurantId);
  });

  // TODO Delete Restaurant

  /********** Supplier & Etc.. Routes **********/
	
  // Supplier
  app.get('/Supplier', function (req, res) {
    pool.getConnection(function (err, con){
	con.query("SELECT * FROM Supplier",function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
    });
  });

  // /Supplier/{supplierID}
  app.get('/Supplier', function (req, res) {
    pool.getConnection(function (err, con){
        var supplierID = req.param('supplierID');
       	con.query("SELECT * FROM Supplier WHERE supplierID = (?)", supplierID, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
    });
  });

    //PUT
  // /Supplier/{supplierID}
  app.put('/Supplier', async (req, res) => {
        pool.getConnection(function (err, con){
            var newName = req.body.newName
            var supplierID = req.param('supplierID');

            con.query("UPDATE Supplier SET supplierName = (?) WHERE supplierID = (?)", [newName, supplierID] ,function (err, result, fields) {
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        });
  });
		
  app.get('/orderRestaurantID', function (req, res) {
    pool.getConnection(function (err, con){
        var orderID = req.param('orderID');
       	con.query("select orderID, restaurantID from `Order` where supplierID = ?", orderID, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
    });
  });

  //POST
  // /Supplier
  app.post('/Supplier', async (req, res) => {
    pool.getConnection(function (err, con){
        var supplierID = req.body.supplierID
        var supplierName = req.body.supplierName
    
        con.query("INSERT INTO Supplier (supplierID, supplierName) VALUES (?, ?)", [supplierID, supplierName],function (err, result, fields) {
            if (err) throw err;
            res.end(JSON.stringify(result)); // Result in JSON format
	});
    });
  });
	
  // /Supplier/{supplierID}
  app.delete('/Supplier/:supplierID', async (req, res) => {
    pool.getConnection(function (err, con){
	var supplierID = req.param('supplierID');
	con.query("DELETE FROM Supplier WHERE supplierID = ? ", supplierID,function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result));
	});
    });
  });

}
