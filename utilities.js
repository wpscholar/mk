const _ = require('lodash');
const chalk = require('chalk');
const fs = require('fs-extra');
const Mustache = require('mustache');

exports.throwError = function (message) {
    console.error(chalk.bold.red(message));
    process.exit(1);
};

exports.logNotice = function (message) {
    console.log(chalk.blue(message));
};

exports.logInfo = function (message) {
    console.log(message);
};

exports.logSuccess = function (message) {
    console.log(chalk.bold.green(message));
};

exports.sortByKey = function (obj) {
    const sortable = _.sortBy(Object.getOwnPropertyNames(obj));
    const sortedObj = {};
    sortable.forEach(function (key) {
        sortedObj[key] = obj[key];
    });

    return sortedObj;
};

exports.replace = function (content, data) {
    return Mustache.render(content, data);
};

exports.upperCase = function (str) {
    return _.upperCase(str);
};

exports.lowerCase = function (str) {
    return _.lowerCase(str);
};

exports.startCase = function(str) {
    return _.startCase(str);
};

exports.camelCase = function (str) {
    return _.camelCase(str);
};

exports.kebabCase = function (str) {
    return _.kebabCase(str);
};

exports.pascalCase = function (str) {
    return _.upperFirst(_.camelCase(str));
};

exports.snakeCase = function (str) {
    return _.snakeCase(str);
};

exports.isFile = function (srcPath) {
    const stats = fs.statSync(srcPath);
    return stats.isFile();
};

exports.fileExists = function (srcPath) {
    return fs.existsSync(srcPath);
};

exports.readFile = function (srcPath) {
    return fs.readFileSync(srcPath, 'utf8');
};

exports.writeFile = function (destPath, content) {
    fs.writeFileSync(destPath, content, 'utf8');
};

exports.copyFile = function (srcPath, destPath, options) {
    fs.copySync(srcPath, destPath, options);
};

exports.deleteFile = function (srcPath) {
    fs.unlinkSync(srcPath);
};

exports.isDir = function (srcPath) {
    const stats = fs.statSync(srcPath);
    return stats.isDirectory();
};

exports.readDir = function (srcPath) {
    return fs.readdirSync(srcPath);
};

exports.dirExists = function (srcPath) {
    return fs.existsSync(srcPath);
};

exports.makeDir = function (dir) {
    fs.mkdirSync(dir);
};

exports.deleteDir = function (src) {
    fs.removeSync(src);
};

exports.scaffoldFile = function (srcPath, destPath, data) {
    let content = this.readFile(srcPath);
    this.writeFile(destPath, this.replace(content, data));
};

exports.scaffoldDir = function (src, dest, data) {
    const files = this.readDir(src);
    this.makeDir(dest);
    files.forEach((file) => {
        if (this.isFile(`${src}/${file}`)) {
            this.scaffoldFile(`${src}/${file}`, `${dest}/${file}`, data);
        } else if (this.isDir(`${src}/${file}`)) {
            this.scaffoldDir(`${src}/${file}`, `${dest}/${file}`, data);
        }
    });
};

exports.scaffold = function (src, dest, data) {
    if (this.isFile(src)) {
        this.scaffoldFile(src, dest, data);
    } else if (this.isDir(src)) {
        this.scaffoldDir(src, dest, data);
    }
};
