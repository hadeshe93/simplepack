import fs from 'fs';
import path from 'path';
import traverse from '@babel/traverse';
import { transformFromAst, parse } from '@babel/core';
import { checkAndFixFileExt } from '../util/resolve-file-ext';

class Parser {
  constructor() {}

  /**
   * 转 code 为 ast 语法树
   * @param filepath 
   */
  getAST(filepath) {
    const code = fs.readFileSync(filepath, { encoding: 'utf-8' });
    return parse(code, {
      sourceType: "module",
    });
  }

  /**
   * 分析 ast 树中的依赖
   * @param ast 
   */
  getDependencies(ast, filepath) {
    const dependencies = [];

    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        // 魔改依赖路径为绝对路径，这样就可以实现模块的重用
        const depPath = path.resolve(path.dirname(filepath), node.source.value);
        const depAbsPath = checkAndFixFileExt(depPath, path.extname(filepath));
        console.log('depAbsPath: ', depAbsPath);
        dependencies.push(
          depAbsPath
        );
        node.source.value = depAbsPath;
      }
    });
    return dependencies;
  }

  /**
   * 将 ast 转成 es5 源码
   */
  transform(ast) {
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    });
    return code;
  }
}

export default Parser;