const model = require('../../model/topics/topik')
const response = require('../../helper/response')
const moment = require('moment')

const getPage = (_page) => {
  const page = parseInt(_page)
  if (page && page > 0) {
    return page
  } else {
    return 1
  }
}

const getPerPage = (_perPage) => {
  const perPage = parseInt(_perPage)
  if (perPage && perPage > 0) {
    return perPage
  } else {
    return 12
  }
}

module.exports = {
	//Create Topik from database
	createTopik: async (req, res) => {
		const { title, content, user_id } = req.body
		if (title && content && user_id && title !== '' && content !== '' && user_id !== '') {
			const data = {
				title,
				content,
				user_id,
				date: moment().format('YYYY-MM-DD HH:mm:ss')
			}
			console.log(title)
			const result = await model.createTopik(data)

			if (result) {
				res.status(200).send(response({
						success: true,
						msg: 'Create topik success',
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

	//get Topik from database
	getTopik: async (req, res) => {
		const { id } = req.params
		const { page, limit, search } = req.query

	    const sliceStart = (getPage(page) * getPerPage(limit)) - getPerPage(limit)
	    const sliceEnd = (getPage(page) * getPerPage(limit))
	    const totalData = await model.getTopikCount({ search })
	    const totalPage = Math.ceil(totalData / getPerPage(limit))

	    const result = await model.getTopik({ id : parseInt(id), search }, sliceStart, sliceEnd)
	    
	    const data = {
	      result,
	      pageInfo: {
	        page: getPage(page),
	        totalPage,
	        perPage: getPerPage(limit),
	        totalData
	      }
	    }
	    res.status(200).send(response({
	    		success: true,
	    		msg: 'Lists Topics',
	    		data
	    	}))
	},

	//Update topk from Databse by id
  	editTopik: async (req, res) => {
	    const { id } = req.params
	    const { title, content} = req.body
	    const result = await model.getTopik({ id: parseInt(id) }, 0, 1)
	    const editData = [
	            { 
	            	title,
	            	content,
	            	date: moment().format('YYYY-MM-DD HH:mm:ss')
	            },
	            { id: parseInt(id) }
	          ]

	    if (result.length < 1) {
	      	res.status(400).send(response({
	         	 	msg: 'Topik not found'
	        	}))
	    } else {
	      	const editTopik = await model.editTopik(editData)

	      	if (editTopik) {
	        	res.status(200).send(response({
			            success: true,
			            msg: 'Update topik success',
			            data: editData[0]
	          		}))
	      	} else {
		        res.status(500).send(response({
		            	msg: 'Something wrong try again !',
		          	}))
	      }
	    }
  	},

	//delete Topik from database
	deleteTopik: async (req, res) => {
		const { id } = req.params
		const result = await model.getTopik({ id: parseInt(id) }, 0, 1)

	    if (result.length < 1) {
	      	res.status(400).send(response({
	         	 	msg: 'Topik not found'
	        	}))
	    } else {
	      	const deleteTopik = await model.deleteTopik({ id: parseInt(id) })

	      	if (deleteTopik) {
	        	res.status(200).send(response({
			            success: true,
			            msg: 'Topik deleted',
	          		}))
	      	} else {
		        res.status(500).send(response({
		            	msg: 'Something wrong try again !',
		          	}))
	      }
	    }
	},
}