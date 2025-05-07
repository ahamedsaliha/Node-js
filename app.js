
const express = require('express')
const path = require('path')

const app = express()
app.use(express.json())

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const dbPath = path.join(__dirname, 'cricketTeam.db')
let db = null

const intializeDb = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    app.listen(3000, () => {
      console.log('Server is connected successfully')
    })
  } catch (e) {
    console.log(`Error is found at ${e}`)
    process.exit(1)
  }
}
intializeDb()

//Getting all player details
app.get('/players/', async (request, response) => {
  const query = ` 
    SELECT 
      *
    FROM 
     cricket_team
     ORDER BY 
     player_id`
  const result = await db.all(query)
  response.send(result)
})

module.exports = app
