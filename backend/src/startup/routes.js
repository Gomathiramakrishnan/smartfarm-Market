const auth = require('../routes/auth')
const list = require('../routes/list')
const search = require('../routes/search')
const profile = require('../routes/profile')
const cart = require('../routes/cart')
const admin = require('../routes/admin')
const upload = require('../routes/upload')
const millet_item = require('../routes/millet') // ✅ make sure the path is correct


/**
 * Function that exports all the routes
 * @param {Express} app
 */

module.exports = function (app) {
  app.use('/api/auth', auth)
  app.use('/api/list', list)
  app.use('/api/search', search)
  app.use('/api/profile', profile)
  app.use('/api/cart', cart)
  app.use('/api/admin', admin)
  app.use('/api/upload', upload)
  app.use('/api/items', millet_item)  // <-- Added route prefix
}
