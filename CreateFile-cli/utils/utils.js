const fs = require('fs');
const settingOption = require('../setting');
/**
 * 删除文件以及文件夹
 * @param {*} path 
 */
function delDir(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = `${path}/${file}`;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); //递归删除文件夹
      } else {
        delFil(curPath); //删除文件
      }
    });
    fs.rmdirSync(path);
  }
}
// 删除文件
function delFil(path) {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
}

/**
 * 替换文件名
 * @param {*} fliename 文件名称
 * @returns 新的文件名
 */
function replaceFileName (fliename) {
	return fliename.replace(/%replaceFileName%/gi, settingOption.replaceFileName)
}

module.exports = {
  delDir: delDir,
  replaceFileName: replaceFileName,
}
