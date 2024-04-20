const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs'); // 引入exceljs模块
const { delDir } = require('./utils/utils');

// 模板文件路径
let srcPath = '/src/Json/';

// 本项目内文件路径
let distPath = path.join(__dirname, './dist/');

/**
 * 将指定src目录下的所有文件剪切到指定目标dest目录下
 * @param src 源目录
 * @param dest 目标目录
 */
function copyDirectory(src, dest) {
  const originPath = __dirname + src;
  var targetUrl = dest;

  if (!fs.existsSync(targetUrl)) { // 判断目标文件目录是否存在，不存在则创建
    fs.mkdir(targetUrl, { recursive: true }, (err) => {
      if (err) throw err;
    });
  }

  var files = fs.readdirSync(originPath);
  files.forEach(item => {
    var originItemPath = originPath + item
    var itemStat = fs.statSync(originItemPath);// 获取文件信息
    if (itemStat.isFile()) {
      var data = fs.readFileSync(originItemPath);
      const JsonData = JSON.parse(data);

      // 创建新的工作簿对象
      const workbook = new ExcelJS.Workbook();

      // 添加工作表
      const worksheet = workbook.addWorksheet("Sheet1");

      // 设置表格标题样式
      worksheet.columns = [
        { header: '页面名称', key: 'name', width: 32 },
        { header: '路径', key: 'path', width: 200 },
      ];

      const titleFont = { name: '宋体', bold: true };
      worksheet.getCell('A1').font = titleFont
      worksheet.getCell('B1').font = titleFont

      if (JsonData) {
        const keys = Object.keys(JsonData);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (key === 'pages' || key === 'subPackages') {
            const pageList = JsonData[key];
            if (key === 'pages') {
              for (let j = 0; j < pageList.length; j++) {
                const page = pageList[j];
                if (['pages/index/hello'].includes(page.path) || ['缴费成功', 'pms支付'].includes(page?.style?.navigationBarTitleText)) {
                  continue;
                }
                if (page?.style?.navigationBarTitleText) {
                  const data = {
                    path: page.path,
                    name: page?.style?.navigationBarTitleText ?? ''
                  }
                  // 添加行，根据column的key来填充数据
                  worksheet.addRow(data);
                }
              }
            }
            else if (key === 'subPackages') {
              for (let j = 0; j < pageList.length; j++) {
                const rootPage = pageList[j];
                const rootName = rootPage?.root + '/';
                const pagesList = rootPage?.pages;
                if (pagesList?.length > 0) {
                  for (let i = 0; i < pagesList.length; i++) {
                    const page = pagesList[i];
                    if (page?.style?.navigationBarTitleText) {
                      const data = {
                        path: rootName + page.path,
                        name: page?.style?.navigationBarTitleText ?? ''
                      }
                      worksheet.addRow(data);
                    }
                  }
                }
              }
            }
          }
        }
      }

      // 保存工作簿到指定路径
      workbook.xlsx.writeFile(targetUrl + '微信小程序路径.xlsx').then(() => {
        console.log(`成功将JSON数据写入到${targetUrl}`);
      }).catch((error) => {
        console.error(`写入失败： ${error}`);
      });
    }
  })
}

delDir(distPath);
copyDirectory(srcPath, distPath)