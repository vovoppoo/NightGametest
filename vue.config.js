// vue.config.js
module.exports = {
  // 选项...
  
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  outputDir: 'dist',
  pages: {
    index: {
      //entry for the page
      entry: 'src/main.js',
      //the source template
      template: 'public/index.html',
      //output as dist/index.html
      filename: 'index.html',
      title:'气象局项目一体化管理平台',
    },
  },
  lintOnSave: false,
  devServer: {
    port: 8090, // 端口号
    host: 'localhost',
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
  },
};
