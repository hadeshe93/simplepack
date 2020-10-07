"use strict";
exports.__esModule = true;
var webpack_sources_1 = require("webpack-sources");
var JSZip = require("jszip");
var path = require("path");
var ZipPlugin = /** @class */ (function () {
    function ZipPlugin(options) {
        this.options = null;
        this.options = options;
    }
    ZipPlugin.prototype.apply = function (compiler) {
        var options = this.options || {};
        var zipFolderName = options.filename + ".zip" || 'zipAssets.zip';
        compiler.hooks.emit.tapAsync('ZipPlugin', function (compilation, callback) {
            var zip = new JSZip();
            var assets = compilation.assets;
            var assetFilenameList = Object.keys(assets);
            var zipFolder = zip.folder(zipFolderName);
            assetFilenameList.forEach(function (assetFilename) {
                var source = compilation.assets[assetFilename].source();
                zipFolder.file(assetFilename, source);
            });
            zip.generateAsync({
                type: 'nodebuffer'
            }).then(function (content) {
                var compilationOutputPath = compilation.options.output.path;
                var outputPath = path.resolve(compilationOutputPath, zipFolderName);
                var outputRelativePath = path.relative(compilationOutputPath, outputPath);
                compilation.assets[outputRelativePath] = new webpack_sources_1.RawSource(content);
                callback();
            });
        });
    };
    return ZipPlugin;
}());
exports["default"] = ZipPlugin;
