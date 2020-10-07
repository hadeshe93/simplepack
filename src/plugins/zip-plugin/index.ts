import { RawSource } from 'webpack-sources';
import JSZip = require('jszip');
import * as path from 'path';


export default class ZipPlugin {
  options = null;

  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const options = this.options || {};
    const zipFolderName = `${options.filename}.zip` || 'zipAssets.zip';
    compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
      const zip = new JSZip();
      const { assets } = compilation;
      const assetFilenameList = Object.keys(assets);
      const zipFolder = zip.folder(zipFolderName);

      assetFilenameList.forEach(assetFilename => {
        const source = compilation.assets[assetFilename].source();
        zipFolder.file(assetFilename, source);
      });

      zip.generateAsync({
        type: 'nodebuffer',
      }).then((content) => {
        const compilationOutputPath = compilation.options.output.path;
        const outputPath = path.resolve(
          compilationOutputPath,
          zipFolderName
        );
        const outputRelativePath = path.relative(compilationOutputPath, outputPath);
        compilation.assets[outputRelativePath] = new RawSource(content);

        callback();
      });
    });
  }
}