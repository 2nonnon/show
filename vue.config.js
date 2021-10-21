// vue.config.js
module.exports = { 
    chainWebpack: config => { 
        config.plugin('html').tap(args => { 
            args[0].title = '2nonnon'      
            return args
        }) 
    },
    publicPath: process.env.NODE_ENV === "production" ? "/a-blog/" : "/"
}