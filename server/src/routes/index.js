const UseRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const OrderRouter = require('./OrderRouter')

const routes = (app) => {
    app.use('/api/user', UseRouter)
    app.use('/api/product', ProductRouter)
    app.use('/api/order', OrderRouter)
}

module.exports = routes