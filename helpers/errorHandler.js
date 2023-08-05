const errorHandler = {
  errorLogger: (err, req, res, next) => {
    console.log(`Error: ${err}`)
    next(err)
  },
  errorResponder: (err, req, res, next) => {
    if (err instanceof Error) {
      return res.render('error', {
        err_message: err.message || 'Something went wrong'
      })
    } else {
      return res.render('error', {
        err_message: err
      })
    }
  }
}

module.exports = errorHandler
