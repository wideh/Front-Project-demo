const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // 模式：开发模式
  entry: './src/index.jsx', // 入口文件
  output: {
    filename: 'bundle.[hash].js', // 打包后的输出文件, 中间加个hash
    path: path.resolve(__dirname, 'dist') // 输出文件的目录
  },
  resolve: {
    extensions: ['.jsx', '...'] // 除了支持jsx,还需支持原来的，用三个点就可以
  },
  module: {
    rules: [
      { 
        test: /\.jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'] // 需要额外的插件，第一个处理jsx语法，第二个处理浏览器无法兼容的ES新的语法。
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
      template: './public/index.html', // 以这个html文件为模板，自动生成一个html文件。
      files: {
        js: [],
        css: [],
      },
    })
  ].filter(Boolean),
  externals: {},
}