const UseRouter = require('./UserRouter')

const routes = (app) => {
    app.use('/api/user', UseRouter)
}

module.exports = routes