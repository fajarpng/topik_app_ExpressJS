  module.exports = (response) => {
  return {
    success: response.success || false,
    message: response.msg || null,
    result: response.data || {}
  }
}