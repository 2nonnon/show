// vue.config.js
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

// const externals = { 
    // 'vue': 'Vue', 
    // 'vue-router': 'VueRouter', 
    // 'vuex': 'Vuex', 
    // 'axios': 'axios' 
// }
const cdn = { 
    'css': [], 
    'js': [
        'https://unpkg.com/vue@3.0.0/dist/vue.global.js',
        'https://unpkg.com/vue-router@4.0.0/dist/vue-router.global.js'
    ] 
}

module.exports = {
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            console.log(process.env.NODE_ENV)
            if (process.env.NODE_ENV === 'production') {
                args[0].cdn = cdn
            }
            args[0].title = '2nonnon'
            return args
        })
            // config.plugin('BundleAnalyzerPlugin').use(BundleAnalyzerPlugin),
            // config.externals(externals),
            // 移除 prefetch 插件
            // config.plugins.delete('prefetch'),
            // 移除 preload 插件
            // config.plugins.delete('preload')
    },
}