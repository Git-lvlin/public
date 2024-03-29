const PxToVw = require('postcss-px-to-viewport');

module.exports = {
  configureWebpack: {
    externals: {
      // 'OpenInstall': 'https://web.cdn.openinstall.io/openinstall.js',
      // 'jwx': 'https://dev-yeahgo.oss-cn-shenzhen.aliyuncs.com/publicMobile/jweixin-1.3.2.js'
    }
  },
  publicPath: '/',
  devServer: {
    proxy: {
      // '/activity': {
      //   target: 'https://api-dev.yeahgo.com',
      //   ws: true,
      //   changeOrigin: true,
      // },
      '/goods': {
        target: 'https://api-dev.yeahgo.com',
        ws: true,
        changeOrigin: true,
      },
      '/contestprice': {
        target: 'http://local.yeahgo.com',
        ws: true,
        changeOrigin: true,
      },
      '/activity': {
        target: 'https://api-dev.yeahgo.com',
        ws: true,
        changeOrigin: true,
      },
      '/healthy': {
        target: 'https://api-dev.yeahgo.com',
        ws: true,
        changeOrigin: true,
      },
      '/public': {
        target: 'https://api-dev.yeahgo.com',
        ws: true,
        changeOrigin: true,
      },
      '/open': {
        target: 'https://live-dev.yeahgo.com',
        ws: true,
        changeOrigin: true,
      },
    },
    https: false,
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      postcss: {
        // 给postcss-loader传递选项
        plugins: [
          new PxToVw({
            unitToConvert: 'px', // 需要转换的单位，默认为"px"；
            viewportWidth: 375, // 设计稿的视口宽度
            unitPrecision: 6, // 单位转换后保留的小数位数
            propList: ['*', '!letter-spacing'], // 要进行转换的属性列表,*表示匹配所有,!表示不转换
            viewportUnit: 'vw', // 转换后的视口单位
            fontViewportUnit: 'vw', // 转换后字体使用的视口单位
            selectorBlackList: [], // 不进行转换的css选择器，继续使用原有单位
            minPixelValue: 1, // 设置最小的转换数值
            mediaQuery: false, // 设置媒体查询里的单位是否需要转换单位
            replace: true, // 是否直接更换属性值，而不添加备用属性
            exclude: [/element-ui/] //忽略某些文件夹下的文件
          }),
        ],
      },
    },
  },
};
