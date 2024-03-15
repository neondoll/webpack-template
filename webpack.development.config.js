const path = require('path');

module.exports = {
  devServer   : {
    watchFiles: path.join(__dirname, 'src'),
    port      : 9000
  }
}