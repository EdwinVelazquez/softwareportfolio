var sequelize;
if (process.env.DATABASE_URL) {
  sequelize = process.env.DATABASE_URL;
}else{
  sequelize = 'postgres://oeapinlguzqxin:c24f084390a227001c9b80d98f381aaa4d927712d378305a348a9389e57aef10@ec2-23-23-86-179.compute-1.amazonaws.com:5432/d9r8lpdtffahos';
  //postgres://oeapinlguzqxin:c24f084390a227001c9b80d98f381aaa4d927712d378305a348a9389e57aef10@ec2-23-23-86-179.compute-1.amazonaws.com:5432/d9r8lpdtffahos
}
var express = require('express');
var bodyparser = require('body-parser');
//create an express application
var app = express();
app.use(bodyparser());
//include the node postgres library
var pg = require('pg');
app.use(express.static("public"));
//appServer.get('/boards', function(req, res) {
  //  res.render('pages/boards');
   //include the node postgres library
  //  var pg = require('pg');
//    //connect to a database
//     pg.connect(connectionString_bulletinboard, function(err, client, done)
//     {
//         //request all of the blogpost
//         client.query(`select * from messages`, function(err, result)
//         {
//             //console.log(result.rows);
//            for(var i = 0; i < result.rows.length; i++){
//                 console.log(result.rows[i]);
//                 // to display code here $("postInHere")
//             }
//             //let pg know we're done with this client
//            done();
//             //close the pg pool entirely.
//            // this is done so our node process will exit.
//             pg.end();
//         });
//     });
// });
app.get('/blog', function(req, res) {
  pg.connect(sequelize, function(err, client, done) {
    //request all of the colum
    client.query(`select * from blogtable`, function(err, result) {
      //localhost/test?user=fred&password=secret&ssl=true";
      res.render('blog.ejs',{
        blogtable:result.rows
      });
    //let pg know we're done with this client
      done();
    //close the pg pool entirely.//this is done so our node process will exit.
      pg.end();
    });
  });
});
 //This works!
//connect to a database
  //  pg.connect('postgres://edwin:Newcave5@localhost/blog', function(err, client, done) {
  //  //request all of the colum
  //  client.query(`select * from blogtable`, function(err, result) {
  //    //localhost/test?user=fred&password=secret&ssl=true";
  //    console.log(result.rows);
  //  //let pg know we're done with this client
  //    done();
  //  //close the pg pool entirely.//this is done so our node process will exit.
  //    pg.end();
  // });});
app.post('/blog', function (req, res, next) {
  console.log('hello')
  const blogtable = req.body
  console.log(blogtable);
  pg.connect(sequelize, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err)
    }
    client.query('INSERT INTO blogtable (name, text) VALUES ($1, $2);', [blogtable.name, blogtable.text], function (err, result) {
      done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool
      if (err) {
        // pass the error to the express error handler
        return next(err)
      }
      res.end(process.env.PORT)
    })
  })
})
app.get('/portfolio', function(req, res){
    res.render('portfolio.ejs');
});
//have the application listen on a specific port
app.listen(process.env.PORT, function () {
    console.log('Example app listening on port 3000!');
});
//Hafeez code
// app.post('/newpost',function (req,res){
//   console.log("it is me");
//   pg.connect('postgres://hafeez:88649@localhost/blog', function(err, client, done) {
//   client.query(`INSERT INTO blogs(id,name,article) VALUES(DEFAULT,$1,$2)`,[req.body.title,req.body.body]);
//    res.end('{success:"updated successfully","status":200}');
//   });
// });
