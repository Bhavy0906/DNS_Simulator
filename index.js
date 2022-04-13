var express = require("express");
var cors = require("cors");
var app = express();
var connection = require('./database');

app.use(express.json());
app.use(cors());

app.post('/url', (req, res) => {

    inUrl = req.body.inUrl;
    console.log(inUrl),

    connection.query('set @urlIn = (?)', [inUrl]);
    connection.query(`set @pos = locate('.', @urlIn, 5)`);
    connection.query(`set @domain = SUBSTRING(@urlIn, @pos+1)`);
    connection.query(`Call getIPfromRNS(@domain, @urlIn)`);
    connection.query(`select if(@cacheIP is not null, (select @cacheIP), "Website does not exist in database") as IP`,(err, result) => {
                if (err) {
                    res.send({err: err});
                } 
                res.send(result);
                console.log(result);
            });
});


app.listen(3001, function () {
    console.log("App is listening!");
    connection.connect(function (err) {
        if (err) throw err;
        console.log('Database connected');
        connection.query(`create temporary table rns (
            url varchar(50),
            ip varchar(50) unique not null,
            primary key (url)
            );`);
    })
});
