const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    lintOnSave: false,
    devServer: {
        open: true,
        historyApiFallback: true,
        noInfo: true,
        overlay: true,
        /*
    proxy: {
      '/api': {
        target: 'http://localhost',
        pathRewrite: {
          '^/api': ''
        },
        "secure": false,
        "changeOrigin": true
      }
    }
    */
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@test', resolve('tests'));
    }
}
