import fs from 'fs';
import path from 'path';
import Parser from '../src/lib/Parser';
import Compiler from '../src/lib/Compiler';
import options from './simplepack.config';

// const parser = new Parser();
// const code = fs.readFileSync(path.resolve(__dirname, './index.js'), { encoding: 'utf-8' });
// const ast = parser.getAST(code);
// const deps = parser.getDependencies(ast);
// const transCode = parser.transform(ast);

// console.log(ast);
// console.log(deps);
// console.log(transCode);

new Compiler(options).run();