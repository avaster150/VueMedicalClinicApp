const path = require('path')
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    resolve: {
      alias: {
        assets: path.resolve(__dirname, 'src/assets')
      }
    }
  }
}