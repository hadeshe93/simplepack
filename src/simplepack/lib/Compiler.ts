import Parser from './Parser';
import path from 'path';
import fs from 'fs';

interface IModule {
  filename: string;
  dependencies: Array<string>;
  source: string;
}
type TModules = Array<IModule>;

class Compiler {
  entry = '';
  output = null;
  // 存放最终所有构建完成的模块资源
  modules: TModules = [];
  _filename = __filename;
  _fileExt = path.extname(__filename);

  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
  }

  /**
   * 开始
   */
  run() {
    const entryModule = this.buildModule(this.entry, true);

    this.modules.push(entryModule);
    this.modules.map((_module) => {
      _module.dependencies.map((dep) => {
        this.modules.push(
          this.buildModule(dep, false)
        );
      });
    });

    this.emitFiles();
  }

  /**
   * 构建模块
   */
  buildModule(filename: string, isEntry?: boolean) {
    const parser = new Parser();
    let ast;
    let absPath = '';

    ast = parser.getAST(filename);
    absPath = filename;

    // if (isEntry) {
    //   // entry 入口文件的路径已经是绝对路径
    //   ast = parser.getAST(filename);
    //   absPath = filename;
    // } else {
    //   // 非入口文件的路径需要转化成绝对路径
    //   if (path.isAbsolute(filename)) {
    //     absPath = filename;
    //   } else {
    //     const entryFileDir = path.dirname(this.entry);
    //     absPath = path.join(entryFileDir, filename);
    //   }

    //   const absExt = path.extname(absPath);
    //   const extNames = ['.ts', '.js', '.json'];
    //   const isAbsExtValid = extNames.indexOf(absExt) >= 0;
    //   // 判断文件后缀是否合法，若不合法，则补全
    //   if (!isAbsExtValid) {
    //     const fileBasename = path.basename(absPath, absExt);
    //     const isLastCharPoint = fileBasename.slice(-1) === '.';
    //     const optionalAbsPathArr = extNames.map(ext => {
    //       if (isLastCharPoint) {
    //         return absPath + ext.slice(1);
    //       } else {
    //         return absPath + ext;
    //       }
    //     });
    //     const existsAbsPath = optionalAbsPathArr.find(oAbsPath => {
    //       return fs.existsSync(oAbsPath);
    //     });
    //     absPath = existsAbsPath;
    //   }
    //   ast = parser.getAST(absPath);
    // }

    const dependencies = parser.getDependencies(ast, absPath);
    const source = parser.transform(ast);
    return {
      filename: absPath,
      dependencies,
      source
    };
  }

  /**
   * 生成文件
   */
  emitFiles() {
    const outputFileAbsPath = path.resolve(this.output.path, this.output.filename);
    let modules = '';
    this.modules.map((_module) => {
      modules += `'${ _module.filename }': function(require, module, exports) { ${ _module.source } },`
    });
    const bundleStr = `(function(modules){
      function require(filename) {
        var fn = modules[filename];
        var module = { exports: {} };
        
        fn(require, module, module.exports);
        return module.exports;
      }
      require('${ this.entry }');
    })({${ modules }})`;

    fs.writeFileSync(outputFileAbsPath, bundleStr, { encoding: 'utf-8' });
  }
}

export default Compiler;