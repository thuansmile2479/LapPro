const UseRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')

const routes = (app) => {
    app.use('/api/user', UseRouter)
    app.use('/api/product', ProductRouter)
}

module.exports = routes