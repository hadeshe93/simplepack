import fs from 'fs';
import path from 'path';

/**
 * 检查文件路径是否存在扩展名，若不存在，则补全
 * @param filepath 
 * @param preferExt 
 * @param optionalExts 
 */
export const checkAndFixFileExt = function(filepath: string, preferExt?: string,  optionalExts?: Array<string>) {
  optionalExts = optionalExts ? [ ...optionalExts ] : [ '.ts', '.js', '.json' ];

  const fileExt = path.extname(filepath);
  const isFileExtValid = optionalExts.indexOf(fileExt) >= 0;

  if (isFileExtValid) {
    return filepath;
  }

  if (preferExt) {
    const pos = optionalExts.indexOf(preferExt);
    if (pos > 0) {
      // 调整位置，优先匹配
      optionalExts.splice(pos, 1);
      optionalExts.unshift(preferExt);
    }
  }

  const pathObj = path.parse(filepath);
  const fileBasename = pathObj.base;
  const isLastCharPoint = fileBasename.slice(-1) === '.';
  const optionalFilePathArr = optionalExts.map(ext => {
    let oAbsPath = '';
    if (isLastCharPoint) {
      oAbsPath = filepath + ext.slice(1);
    } else {
      oAbsPath = filepath + ext;
    }
    return oAbsPath;
  });
  const existsFilePath = optionalFilePathArr.find(oAbsPath => {
    return fs.existsSync(oAbsPath);
  });
  return existsFilePath;
};