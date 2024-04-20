const config = configFactory("production")

console.log('执行', config.plugins[0]);

// 配置cdn引入,这里只列举一些，可以更多
config.plugins[0].userOptions.files.js = [
  "https://unpkg.com/react@18.2.0/umd/react.production.min.js",
  "https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js",
  "https://lib.baomitu.com/redux/4.1.2/redux.min.js",
  // "https://lib.baomitu.com/axios/0.27.2/axios.min.js",
  "https://lib.baomitu.com/lodash.js/4.17.21/lodash.min.js",
  // "https://lib.baomitu.com/antd/4.21.4/antd.min.js",
  // "https://lib.baomitu.com/aplayer/1.10.1/APlayer.min.js",
];

config.plugins[0].userOptions.files.css = [];
// 配置不进行webpack打包的文件
config.externals = {
  react: "React",
  "react-dom": "ReactDOM",
  redux: "Redux",
  "redux-thunk": "ReduxThunk",
  // axios: "axios",
  // antd: "antd",
  lodash: "_",
  // aplayer: "APlayer",
};
