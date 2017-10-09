const inquirer = require('inquirer');
const plural = require('pluralize').plural;
const singular = require('pluralize').singular;
const untildify = require('untildify');
const _ = require('lodash');

const util = require('../../utilities.js');

exports.command = 'post-type <name>';
exports.desc = 'Create a new WordPress post type';
exports.builder = {
    name: {
        describe: 'Post type name',
    },
    namespace: {
        alias: 'n',
        describe: 'PHP file namespace',
        default: false,
    },
    prefix: {
        alias: 'p',
        describe: 'Prefix for the internal post type name',
        default: false,
    },
    templatePath: {
        alias: 'path',
        describe: 'Path to the template to be used',
    },
    textDomain: {
        alias: 't',
        describe: 'Translation text domain',
        default: 'text-domain',
    },
};

exports.handler = function (argv) {

    let templatePath = `${__dirname}/templates/post-type.php`;

    if(! argv.templatePath) {
        if(argv.paths && argv.paths.postType) {
            templatePath = argv.paths.postType;
        }
    }

    const data = {
        namespace: argv.namespace,
        postTypePrefix: argv.prefix,
        textDomain: argv.textDomain,
        Singular_Name: _.startCase( singular(argv.name) ),
        singular_name: _.lowerCase( singular(argv.name) ),
        _singular_name_: _.kebabCase( singular(argv.name) ),
        SingularName: util.pascalCase( singular(argv.name) ),
        singularName: _.camelCase( singular(argv.name) ),
        Plural_Name: _.startCase( plural(argv.name) ),
        plural_name: _.lowerCase( plural(argv.name) ),
        _plural_name_: _.kebabCase( plural(argv.name) ),
        PluralName: util.pascalCase( plural(argv.name) ),
        pluralName: _.camelCase( plural(argv.name) ),
    };

    const src = untildify(templatePath);
    const dest = `./${data.PluralName}.php`;

    if(util.fileExists(dest)) {
        util.throwError('File already exists.');
    }

    util.scaffold(src, dest, data);

    util.logSuccess(`Created ${data.Singular_Name} post type in ./${data.PluralName}.php`);

};
