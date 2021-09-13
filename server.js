const express   = require('express');
const app       = express();


const {querydb,convertComparator,converToSql} = require('./util/functions.js')

// SERVER
app.get('/all', (req, res) => {querydb(res, 'SELECT * FROM tblPeopleSkillsScores')})

app.get('/scores', (req, res) => {
    
    // default: no conditions
    let conditions = ''
    let keyword = ''

    // if there are query parameters, then convert it to a SQL query
    if (Object.keys(req.query).length > 0) {
        keyword = 'WHERE'
        conditions = converToSql(req.query)
    } 
    let sqlQuery = `SELECT * FROM tblscores ${keyword} ${conditions}`
    
    console.log(sqlQuery)

    querydb(res, sqlQuery)
})

let localport = 8080

app.listen(
    process.env.PORT // for Heroku
    || localport, // for localhost
    () => console.log(`Listening on port ${localport}`)
);