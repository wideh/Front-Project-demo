module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: __dirname + '/public',
    filename: './js/[name].js'
  },
  devServer: {
    contentBase: './public', // 路径
    inline: true // 实时刷新
  }
}