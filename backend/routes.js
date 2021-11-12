const pool = require('./db')

module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('This is the port for the API. Go to port 3000 to view the web page.');
  });

  //  --------------------- productTable ---------------------------------
  // /productTable/{productID}
  // GET
  app.get('/productTable', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // Getting the Product Id from the URL parameters
        var productId = req.params('productId');

        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query('SELECT * FROM ProductTable WHERE productId = (?)', productId, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": JSON.stringify(rows)});
          }
        });
      }
    });
  });

  // /productTable/{productID}
  // PUT
  app.put('/productTable', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // Getting the Product Id from the URL parameters
        var productId = req.params('productId');
        var name = req.body.name;
        var description = req.body.description;
        var image = req.body.image;
        var minVal = req.body.minVal;

        var query = 'UPDATE ProductTable' +
                    'SET name = (?) ' 
                    'description = (?) ' +
                    'image = (?) ' + 
                    'minVal = (?) ' +
                    'WHERE productId = (?)';


        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query(query, [name, description, image, minVal, productId], function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": JSON.stringify(rows)});
          }
        });
      }
    });
  });

  // /productTable/{productID}
  // DELETE
  app.delete('/productTable', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // Getting the Product Id from the URL parameters
        var productId = req.params('productId');

        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query('DELETE * FROM ProductTable WHERE productId = (?)', productId, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": JSON.stringify(rows)});
          }
        });
      }
    });
  });

  // /productTable/{orderID}
  // GET
  app.get('/productTable', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // Getting the Order Id from the URL parameters
        var orderId = req.params('orderId');

        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query('SELECT * FROM ProductTable WHERE orderId = (?)', orderId, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": JSON.stringify(rows)});
          }
        });
      }
    });
  });

    //  --------------------- Order ---------------------------------
  // /Order
  // GET
  app.get('/order', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {

        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query('SELECT * FROM `Order`', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": JSON.stringify(rows)});
            }
        });
      }
    });
  });

  // /Order
  // POST
  app.post('/order', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {

        // Getting the variables from the body of the request
        var orderDate = req.body.orderDate;
        var deliveryAddress = req.body.deliveryAddress;
        var carrier = req.body.carrier;
        var sentDate = req.body.sentDate;
        var estArrival = req.body.estArrival;
        var delivered = req.body.delivered;

        var query = 'INSERT INTO `Order`(orderDate, deliveryAddress, carrier, sentDate, estArrival, delivered)' + 
                    'VALUES ((?)(?)(?)(?)(?)(?))';

        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query('query', [orderDate, deliveryAddress, carrier, sentDate, estArrival, delivered], function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": JSON.stringify(rows)});
          }
        });
      }
    });
  });

  
  // /order/{orderId}
  // PUT
  app.put('/order', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // Getting the Order Id from the URL parameters
        // And the remainder of variables from the body
        var orderId = req.params('orderId');
        var orderDate = req.body.orderDate;
        var deliveryAddress = req.body.deliveryAddress;
        var carrier = req.body.carrier;
        var sentDate = req.body.sentDate;
        var estArrival = req.body.estArrival;
        var delivered = req.body.delivered;

        var query = 'UPDATE `db`.`order_table`' +
                    'SET orderDate = (?) ' 
                    'deliveryAddress = (?) ' +
                    'carrier = (?) ' + 
                    'sentDate = (?) ' +
                    'estArrival = (?) ' +
                    'delivered = (?) ' +
                    'WHERE orderId = (?)';


        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query(query, [orderDate, deliveryAddress, carrier, sentDate, estArrival, delivered, orderId], function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": JSON.stringify(rows)});
          }
        });
      }
    });
  });

  // /order/{orderId}
  // DELETE
  app.delete('/order', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // Getting the Order Id from the URL parameters
        var orderId = req.params('orderId');

        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query('DELETE * FROM `db`.`order_table` WHERE orderId = (?)', orderId, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": JSON.stringify(rows)});
          }
        });
      }
    });
  });

  // ---------------------------------------------- Users -----------------------------------
  // /user
  // GET
  app.get('/user', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query('SELECT * FROM UserTable ', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": JSON.stringify(rows)});
            }
        });
      }
    });
  });

  // /user
  // POST
  app.post('/user', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {

        // Getting the variables from the body of the request
        var username = req.body.username;
        var password = req.body.password;
        var usertype = req.body.usertype;


        var query = 'INSERT INTO `db`.`user_table`(username, password, userType)' +
                    'VALUES ((?)(?)(?))';

        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query('query', [username, password, usertype], function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": JSON.stringify(rows)});
          }
        });
      }
    });
  });

  // /user/{userId}
  // GET
  app.get('/user', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // Getting the User Id from the URL parameters
        var userId = req.params('userId');

        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query('SELECT * FROM UserTable WHERE userId = (?)', userId, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": JSON.stringify(rows)});
          }
        });
      }
    });
  });

  // /user/{userId}
  // PUT
  app.put('/user', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // Getting the User Id from the URL parameters
        var userId = req.params('userId');
        var username = req.body.username;
        var password = req.body.password;
        var userType = req.body.userType;

        var query = 'UPDATE UserTable' +
                    'SET username = (?) ' 
                    'password = (?) ' +
                    'userType = (?) ' + 
                    'WHERE userId = (?)';


        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query(query, [username, password, userType, userId], function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": JSON.stringify(rows)});
          }
        });
      }
    });
  });

  // /user/{userId}
  // DELETE
  app.delete('/user', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // Getting the User Id from the URL parameters
        var userId = req.params('userId');

        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query('DELETE * FROM `db`.`user_table` WHERE userId = (?)', userId, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": JSON.stringify(rows)});
          }
        });
      }
    });
  });


app.get('/inventoryTable', function (req, res) {
	con.query("SELECT * FROM inventoryTable", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

app.get('/inventoryTable/:restaurantID', function(req, res){
    var restaurantID = req.param("restaurantID");
    con.query("SELECT * FROM inventoryTable WHERE restaurant ID = ?", restaurantID, function(err, result, fields){
        if(err) throw err;
        res.end(JSON.stringify(result));
    });
});
app.get('/inventoryTable/:productID', function(req, res){
    var productID = req.param("productID");
    con.query("SELCT * FROM inventoryTable WHERE productID = ?", productID, function(err, result, fields){
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
});
app.get('/orderDetails', function (req, res) {
	con.query("SELECT * FROM orderDetails", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

app.put('/inventoryTable', function(req, res){
    con.query("UPDATE inventoryTable SET stock=? WHERE restaurantID=?", [req.body.stock, req.body.restaurantID], function(err, result, fields){
        if(err) throw err;
        res.end(JSON.stringify(result));
    });
});

app.put('/inventoryTable', function(req, res){
    con.query("INSERT INTO inventoryTable(restaurantID, productID, stock) VALUES(?)", [req.body.restaurantID, req.body.productID, req.body.stock], function(err, result, fields){
        if(err) throw err;
        res.end(JSON.stringify(result));
    });
});
app.put('/orderDetails', function(req, res){
    con.query("INSERT INTO orderDetails(orderID, productID, quantity) VALUES(?)", [req.body.orderID, req.body.productID, req.body.quantity], function(err, result, fields){
        if(err) throw err;
        res.end(JSON.stringify(result));
    });
});

app.delete('/inventoryTable', function(req, res){
    con.query("DELETE FROM inventoryTable WHERE restaurantID=? && productID=?", [req.body.restaurantID, req.body.productID], function(err, result, fields){
        if(err) throw err;
        res.end(JSON.stringify(result));
    });
});






//GET
// /orderDetail/{orderId}
app.get('/orderDetail/:orderID', function (req, res) {
    var orderID = req.param('orderID');
	con.query("SELECT * FROM orderDetails WHERE orderID = ?", orderID, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// /restaurant
app.get('/restaurant', function (req, res) {
	con.query("SELECT * FROM restaurant",function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// /restaurant/{restaurantID}
app.get('/restaurant/:restaurantID', function (req, res) {
    var restaurantID = req.param('restaurantID');
	con.query("SELECT * FROM restaurant WHERE restaurantID = ?", restaurantID, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// /productTable
app.get('/productTable', function (req, res) {
	con.query("SELECT * FROM productTable",function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});


//PUT
// /orderDetail/{orderId}
app.put('/orderDetail/:orderID', async (req, res) => {
	var newQuantity = req.body.newQuantity
	var orderID = req.param('orderID');

	 con.query("UPDATE orderDetail SET Quantity = ? WHERE orderID = ?", [newQuantity, orderId] ,function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
});

///restaurant/{restaurantID}
app.put('/restaurant/:restaurantID', async (req, res) => {
	var newActivity = req.body.newActivity
	var restaurantID = req.param('restaurantID');

	 con.query("UPDATE restaurant SET Activity = ? WHERE restaurantID = ?", [newActivity, restaurantID] ,function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
});


//POST 

// /restaurant
app.post('/restaurant', async (req, res) => {
    var restaurantID = req.body.restaurantID
    var name = req.body.name
    var dateJoined = req.body.dateJoined 
    var active = req.body.active
    
      con.query("INSERT INTO restaurant (restaurantID, name, dateJoined, active) VALUES (?, ?, ?, ?)", [restaurantID, name, dateJoined, active],function (err, result, fields) {
          if (err) throw err;
          res.end(JSON.stringify(result)); // Result in JSON format
      });
  });


// /productTable
app.post('/productTable', async (req, res) => {
    var productID = req.body.restaurantID
    var name = req.body.name
    var description = req.body.dateJoined 
    var image = req.body.active
    var minVal = req.body.minVal
    
      con.query("INSERT INTO productTable (productID, name, description, image, minVal) VALUES (?, ?, ?, ?, ?)", [productID, name, description, image, minVal ],function (err, result, fields) {
          if (err) throw err;
          res.end(JSON.stringify(result)); // Result in JSON format
      });
  });


// DELETE

// /orderDetail/{orderId}
app.delete('/orderDetail/:orderID', async (req, res) => {
	var orderID = req.param('orderID');
  
	con.query("DELETE FROM orderDetails WHERE orderID = ? ", orderID,function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); 
	  });
});



// /restaurant/{restaurantID}
app.delete('/restaurant/:restaurantID', async (req, res) => {
	var restaurantID = req.param('restaurantID');
  
	con.query("DELETE FROM restaurant WHERE restaurantID = ? ", restaurantID,function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); 
	  });
});
}
