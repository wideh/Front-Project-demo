const fs = require('fs');
const path = require('path');
const settingOption = require('./setting');
const { delDir, replaceFileName } = require('./utils/utils');

// 模板文件路径
let srcPath = '/src/';

// 本项目内文件路径
let distPath = path.join(__dirname, './dist/');

const isOuter = process.env.NODE_ENV === 'outer';
if (isOuter) {
	// 指定其他项目文件路径
	const rootPath = path.join(__dirname, `../${settingOption.projectName}/packages/${settingOption.packageName}`);
	distPath = path.join(rootPath, './src/');
}

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
			var data = fs.readFileSync(originItemPath, "utf8");

			// 替换文件内容里的引用文件名。以及替换页面标题
			let newData = replaceFileName(data);
			newData = newData.replace(/\<Header title=['|"](.*)['|"] \/\>/, function(item){
				const items = item.match(/\<Header title=['|"](.*)['|"] \/\>/);
				if(items[1]) {
					return item.replace(items[1], settingOption.pageTitle);
				} else {
					return item;
				}
			})
			
			let fileName = targetUrl + path.basename(originItemPath);// 获取文件名称
			// 替换文件名称
			fileName = replaceFileName(fileName)
			fs.writeFileSync(fileName, newData); // 写到这个路径
		} else {
			let fliename = path.join(`${dest}/${item}/`);
			// 替换文件名称
			fliename = replaceFileName(fliename)
			fs.mkdir(fliename, { recursive: true }, (err) => {
				if (err) {
					throw err;
				} else {
					copyDirectory(src + item + '/', fliename)
				}
			});
		}
	})
}

// 选择模式创建
process.stdin.setEncoding('utf-8');
process.stdout.write('请选择模板\n');
process.stdout.write('1:简单版(TableSimpleTamplate)\n');
process.stdout.write('2:带有状态版(TableWithStatusTemplate)\n');
process.stdout.write('3:其他临时文件\n');
process.stdin.on("data", (input) => {
	const key = input.toString().trim();
	//去掉下一行可一直监听输入，即保持标准输入流为开启模式
	process.stdin.pause();
	if(key == 1) {
		srcPath = '/src/TableSimpleTamplate/';
	} else if (key == 2) {
		srcPath = '/src/TableWithStatusTemplate/';
	} else if (key == 3) {
		srcPath = '/src/OtherTempTamplate/';
	}
	if (!isOuter) {
		// 删除本地dist文件夹
		delDir(distPath);
	}
	copyDirectory(srcPath, distPath);
})