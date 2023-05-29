const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
    /*devServer: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:3005',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },*/
    webpack: {
        alias: {
            '@': resolve('src'),
            'components': resolve('src/components'),
            'utils': resolve('src/utils'),
            'hooks': resolve('src/hooks'),
            'pages': resolve('src/pages'),
            'http': resolve('src/http'),
            'assets': resolve('src/assets')
        }
    }
}
