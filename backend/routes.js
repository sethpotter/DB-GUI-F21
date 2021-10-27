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
}
app.use('/get', router);

router.get('/inventoryTable', function (req, res) {
	con.query("SELECT * FROM inventoryTable", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

router.get('/inventoryTable/:restaurantID', function(req, res){
    var restaurantID = req.param("restaurantID");
    con.query("SELECT * FROM inventoryTable WHERE restaurant ID = ?", restaurantID, function(err, result, fields){
        if(err) throw err;
        res.end(JSON.stringify(result));
    });
});
router.get('/inventoryTable/:productID', function(req, res){
    var productID = req.param("productID");
    con.query("SELCT * FROM inventoryTable WHERE productID = ?", productID, function(err, result, fields){
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
});
router.get('/orderDetails', function (req, res) {
	con.query("SELECT * FROM orderDetails", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});
app.use('/put', router);
router.put('/inventoryTable', function(req, res){
    con.query("UPDATE inventoryTable SET stock=? WHERE restaurantID=?", [req.body.stock, req.body.restaurantID], function(err, result, fields){
        if(err) throw err;
        res.end(JSON.stringify(result));
    });
});
app.use('/post', router)
router.put('/inventoryTable', function(req, res){
    con.query("INSERT INTO inventoryTable(restaurantID, productID, stock) VALUES(?)", [req.body.restaurantID, req.body.productID, req.body.stock], function(err, result, fields){
        if(err) throw err;
        res.end(JSON.stringify(result));
    });
});
router.put('/orderDetails', function(req, res){
    con.query("INSERT INTO orderDetails(orderID, productID, quantity) VALUES(?)", [req.body.orderID, req.body.productID, req.body.quantity], function(err, result, fields){
        if(err) throw err;
        res.end(JSON.stringify(result));
    });
});
app.use('/delete', router)
router.delete('/inventoryTable', function(req, res){
    con.query("DELETE FROM inventoryTable WHERE restaurantID=? && productID=?", [req.body.restaurantID, req.body.productID], function(err, result, fields){
        if(err) throw err;
        res.end(JSON.stringify(result));
    });
});
