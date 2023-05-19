const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
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
