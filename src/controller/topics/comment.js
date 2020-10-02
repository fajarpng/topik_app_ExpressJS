const model = require('../../model/topics/comment')
const response = require('../../helper/response')
const moment = require('moment')

module.exports = {
	//Create Comment from database
	createComment: async (req, res) => {
		const { topik_id, comment, user_id } = req.body
		if (topik_id && comment && user_id && topik_id !== '' && comment !== '' && user_id !== '') {
			const data = {
				topik_id,
				comment,
				user_id,
				date: moment().format('YYYY-MM-DD HH:mm:ss')
			}
			const result = await model.createComment(data)

			if (result) {
				res.status(200).send(response({
						success: true,
						msg: 'Create comment success',
						data
					}))
			} else {
				res.status(500).send(response({
		            	msg: 'Something wrong try again !',
		          	}))
			}
		} else {
			res.status(400).send(response({
					msg: 'All form must be filled'
				}))
		}
	},

	//get Comment from database
	getComment: async (req, res) => {
	    const result = await model.getComment()
	    
	    res.status(200).send(response({
	    		success: true,
	    		msg: 'Lists Comments',
	    		data: result
	    	}))
	},

	//Update Comment from Databse by id
  	editComment: async (req, res) => {
	    const { id } = req.params
	    const { comment } = req.body
	    const result = await model.getComment({ id: parseInt(id) })
	    const editData = [
	            { 
	            	comment,
	            	date: moment().format('YYYY-MM-DD HH:mm:ss')
	            },
	            { id: parseInt(id) }
	          ]

	    if (result.length < 1) {
	      	res.status(400).send(response({
	         	 	msg: 'Comment not found'
	        	}))
	    } else {
	      	const editComment = await model.editComment(editData)

	      	if (editComment) {
	        	res.status(200).send(response({
			            success: true,
			            msg: 'Update comment success',
			            data: editData[0]
	          		}))
	      	} else {
		        res.status(500).send(response({
		            	msg: 'Something wrong try again !',
		          	}))
	      }
	    }
  	},

	//delete Comment from database
	deleteComment: async (req, res) => {
		const { id } = req.params
		const result = await model.getComment({ id: parseInt(id) })

	    if (result.length < 1) {
	      	res.status(400).send(response({
	         	 	msg: 'Comment not found'
	        	}))
	    } else {
	      	const deleteComment = await model.deleteComment({ id: parseInt(id) })

	      	if (deleteComment) {
	        	res.status(200).send(response({
			            success: true,
			            msg: 'Comment deleted',
	          		}))
	      	} else {
		        res.status(500).send(response({
		            	msg: 'Something wrong try again !',
		          	}))
	      }
	    }
	},
}