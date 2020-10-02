const db = require('../../util/db')

module.exports = {

	// create User
	createProfile: data => {
		let query = 'INSERT INTO users SET ?'

		return new Promise((resolve, reject) => {
			db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res.insertId))
	    })
	},

	//get profile from Databse by condition
	getProfile: data => {
	    let query = 'SELECT * FROM users WHERE ?'

	    return new Promise((resolve, reject) => {
	      db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res))
	    })
  	},

  	editProfile: data => {
  		// update user data in table user_details
	    const query = 'UPDATE users SET ? WHERE ?'

	    return new Promise((resolve, reject) => {
	      db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res.affectedRows))
	    })
  	},
}