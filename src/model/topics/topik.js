const db = require('../../util/db')

module.exports = {

	// create topik
	createTopik: data => {
		let query = 'INSERT INTO topics SET ?'

		return new Promise((resolve, reject) => {
			db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res.insertId))
	    })
	},

	// Count total Topik
	getTopikCount: data => {
	    let query = 'SELECT COUNT(*) as total FROM topics '

	    // If search not null add where condition
	    if (data.search) {
	      query += `WHERE topics.title LIKE '%${data.search}%' `
	    }

	    return new Promise((resolve, reject) => {
	      db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res[0].total))
	    })
  	},

	//get topik from Databse
	getTopik: (data = {}, start, limit) => {
	    let query = `SELECT 
	    	topics.*, 
	    	DATE_FORMAT(topics.date, "%Y/%m/%d %r") as date,
	    	users.name,
	    	users.avatar
	    	FROM topics `
	    	query += 'JOIN users ON topics.user_id = users.id ' // Join Table Query

	    //If search or id not null add where condition
	    if (data.search) {
	      	query += `WHERE topics.title LIKE '%${data.search}%' `
	      	query += `ORDER BY date ASC ` //Sort Query
      		query += `LIMIT ${start}, ${limit} ` // Limit Table Query
	    } else if (data.id) {
	    	query += `WHERE topics.id LIKE '${data.id}%' `
      		query += `LIMIT ${start}, ${limit} ` // Limit Table Query
	    } else {
	    	query += `ORDER BY date DESC ` //Sort Query
      		query += `LIMIT ${start}, ${limit} ` // Limit Table Query
	    }

	    return new Promise((resolve, reject) => {
	      db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res))
	    })
  	},

  	// update topik
  	editTopik: data => {
	    const query = 'UPDATE topics SET ? WHERE ?'

	    return new Promise((resolve, reject) => {
	      db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res.affectedRows))
	    })
  	},

  	deleteTopik: data => {
	    const query = 'DELETE FROM topics WHERE ?'

	    return new Promise((resolve, reject) => {
	      db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res.affectedRows))
	    })
  }
}