'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const deploy_folder=path.resolve(__dirname)+"/dist/index.html";
console.log("Deploy in folder -> "+deploy_folder)
module.exports = {
    devServer: {
        // Paths
        // publicPath: 'public',
        // proxy: 'http://localhost:4000',
        overlay: {
            warnings: true,
            errors: true
        },
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        https: false,
        hotOnly: false,
        // See https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#Configuration agent
        disableHostCheck: true
    },
    lintOnSave:false,
    productionSourceMap: true,
    publicPath: '/',
    chainWebpack:(config)=>{
        config.resolve.alias
            .set('@',path.resolve(__dirname,'src/'))
            .set('@modules',path.resolve(__dirname,'src/modules'))
    },
    assetsDir: 'static',
    // https://webpack.js.org/configuration/devtool/#production
    indexPath: deploy_folder,
    filenameHashing:false,
    css: {
        // requireModuleExtension: false,
        // loaderOptions: {
            // css: {
            //     modules: {
            //         localIdentName: '[name]-[hash]'
            //     },
            //     localsConvention: 'camelCaseOnly'
            // },
            // postcss: {
            //     options here will be passed to postcss-loader
            // }
        // }
    },
    pages: {
        index: {
            // entry for the page
            entry: 'src/main.js',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'index.html',
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'ANF_Laravel Page',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        // when using the entry-only string format,
        // template is inferred to be `public/subpage.html`
        // and falls back to `public/index.html` if not fo  und.
        // Output filename is inferred to be `subpage.html`.
        // subpage: 'src/subpage/main.js'
    }

}

