const pool = require('./db')

module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });

  // POST /reset
  app.post('/reset', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if (err){
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query
        connection.query('drop table if exists test_table', function (err, rows, fields) {
          if (err) { 
            // if there is an error with the query, release the connection instance and log the error
            connection.release()
            logger.error("Problem dropping the table test_table: ", err); 
            res.status(400).send('Problem dropping the table'); 
          } else {
            // if there is no error with the query, execute the next query and do not release the connection yet
            connection.query('CREATE TABLE `db`.`test_table` (`id` INT NOT NULL AUTO_INCREMENT, `value` VARCHAR(45), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);', function (err, rows, fields) {
              if (err) { 
                // if there is an error with the query, release the connection instance and log the error
                connection.release()
                logger.error("Problem creating the table test_table: ", err);
                res.status(400).send('Problem creating the table'); 
              } else { 
                // if there is no error with the query, release the connection instance
                connection.release()
                res.status(200).send('created the table'); 
              }
            });
          }
        });
      }
    });
  });

  // POST /multplynumber
  app.post('/multplynumber', (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO `db`.`test_table` (`value`) VALUES(\'' + req.body.product + '\')', function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            res.status(200).send(`added ${req.body.product} to the table!`);
          }
        });
      }
    });
  });

  // GET /checkdb
  app.get('/values', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT value FROM `db`.`test_table`', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
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
        connection.query('SELECT * FROM `db`.`product_table` WHERE productId = (?)', productId, function (err, rows, fields) {
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

        var query = 'UPDATE `db`.`product_table`' +
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
        connection.query('DELETE * FROM `db`.`product_table` WHERE productId = (?)', productId, function (err, rows, fields) {
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
        connection.query('SELECT * FROM `db`.`order_table` ', function (err, rows, fields) {
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

        var query = 'INSERT INTO `db`.`order_table`(orderDate, deliveryAddress, carrier, sentDate, estArrival, delivered)' + 
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

  // /order/{orderID}
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
        connection.query('SELECT * FROM `db`.`order_table` WHERE orderId = (?)', orderId, function (err, rows, fields) {
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
        connection.query('SELECT * FROM `db`.`user_table` ', function (err, rows, fields) {
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
        connection.query('SELECT * FROM `db`.`user_table` WHERE userId = (?)', userId, function (err, rows, fields) {
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

        var query = 'UPDATE `db`.`user_table`' +
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

}