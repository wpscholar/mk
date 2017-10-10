const _ = require('lodash');
const inquirer = require('inquirer');
const path = require('path');
const plural = require('pluralize').plural;
const singular = require('pluralize').singular;
const untildify = require('untildify');

const util = require('../../utilities.js');

exports.command = 'post-type';

exports.desc = 'Create a new WordPress post type';

exports.builder = {
    className: {
        alias: 'class',
        describe: 'PHP class name',
    },
    destination: {
        alias: 'dest',
        describe: 'Path to where the new file will be created',
        default: '.'
    },
    namespace: {
        alias: 'ns',
        describe: 'PHP namespace',
    },
    postTypeName: {
        alias: 'name',
        describe: 'The proper name for the post type',
    },
    postTypePrefix: {
        alias: 'prefix',
        describe: 'Prefix for the internal post type name',
    },
    'source': {
        alias: 'src',
        describe: 'Path to the template to be used'
    },
    textDomain: {
        alias: 'td',
        describe: 'Translation text domain',
    },
};

exports.handler = function (argv) {

    console.log(argv);

    let source = `${__dirname}/templates/post-type.php`;

    if(argv.source) {
        source = path.resolve( process.cwd(), untildify(argv.source) );
    }

    if(! argv.source && argv.config) {
        if(argv.paths && argv.paths.wp && argv.paths.wp.postType) {
            source = path.resolve( path.dirname(argv.config), untildify( argv.paths.wp.postType ) );
        }
    }

    const prompts = [
        {
            name: 'postTypePrefix',
            message: 'What is the prefix for the post type?',
            when: ! Boolean(argv.postTypePrefix)
        },
        {
            name: 'postTypeName',
            message: 'What is the name of the post type?',
            filter: input => singular( _.kebabCase(input) ),
            validate: input => Boolean(input),
            when: ! Boolean(argv.postTypeName)
        },
        {
            name: 'textDomain',
            message: 'What is the text domain?',
            validate: input => Boolean(input),
            when: ! Boolean(argv.textDomain)
        },
        {
            name: 'namespace',
            message: 'What is the PHP namespace?',
            when: ! Boolean(argv.namespace)
        },
        {
            name: 'className',
            message: 'What is the PHP class name?',
            default: ({namespace = argv.namespace, postTypeName = argv.postTypeName}) => {
                let className = '';
                if( namespace ) {
                    className = util.pascalCase( plural(postTypeName) );
                }
                return className;
            },
            validate: input => Boolean(input),
            when: ! Boolean(argv.className)
        }
    ];

    inquirer
        .prompt(prompts)
        .then(
            ({
                className = argv.className,
                namespace = argv.namespace,
                postTypeName = argv.postTypeName,
                postTypePrefix = argv.postTypePrefix,
                textDomain = argv.textDomain
            }) => {

            postTypeName = singular( _.kebabCase(postTypeName) );

            const data = {
                className,
                namespace,
                PluralName: _.startCase( plural(postTypeName) ),
                pluralName: _.lowerCase( plural(postTypeName) ),
                postTypeName: `${postTypePrefix}${postTypeName}`,
                restBase: _.kebabCase( plural(postTypeName) ),
                SingularName: _.startCase( singular(postTypeName) ),
                singularName: _.lowerCase( singular(postTypeName) ),
                textDomain,
            };

            let destination = path.resolve( process.cwd(), untildify( argv.destination ) );

            if( util.dirExists(destination) && util.isDir(destination) ) {
                destination = path.join(destination, `${data.className}.php`);
            }

            if( util.fileExists(destination) ) {
                util.throwError('File already exists.');
            }

            util.scaffold(source, destination, data);

            util.logSuccess(`Created ${data.postTypeName} post type in ${path.relative(process.cwd(), destination)}`);

        },
        () => util.throwError('It looks like something went wrong. Please try again.')
    );

};
