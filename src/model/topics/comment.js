const db = require('../../util/db')

module.exports = {

	// create comments
	createComment: data => {
		let query = 'INSERT INTO comments SET ?'

		return new Promise((resolve, reject) => {
			db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res.insertId))
	    })
	},

	//get comments from Databse
	getComment: (data = {}, start, limit) => {
	    let query = `SELECT 
	    	comments.*, 
	    	DATE_FORMAT(comments.date,  "%Y/%m/%d %r") as date,
	    	users.name,
	    	users.avatar
	    	FROM comments `
	    	query += 'JOIN users ON comments.user_id = users.id ' // Join Table Query

	    //If id not null add where condition
	    if (data.id) {
	      	query += `WHERE comments.id LIKE '%${data.id}%' `
	    } else {
	    	query += `ORDER BY date DESC ` //Sort Query
	    }

	    return new Promise((resolve, reject) => {
	      db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res))
	    })
  	},

  	// update comments
  	editComment: data => {
	    const query = 'UPDATE comments SET ? WHERE ?'

	    return new Promise((resolve, reject) => {
	      db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res.affectedRows))
	    })
  	},

  	deleteComment: data => {
	    const query = 'DELETE FROM comments WHERE ?'

	    return new Promise((resolve, reject) => {
	      db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res.affectedRows))
	    })
  }
}