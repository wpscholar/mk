const _ = require('lodash');
const inquirer = require('inquirer');
const path = require('path');
const plural = require('pluralize').plural;
const singular = require('pluralize').singular;
const untildify = require('untildify');

const util = require('../../utilities.js');

exports.command = 'model';

exports.desc = 'Create a new WordPress model';

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
    modelName: {
        alias: 'name',
        describe: 'The proper name for the model',
    },
    postType: {
        alias: 'type',
        describe: 'The internal name for the post type associated with the model',
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

    let source = `${__dirname}/templates/model.php`;

    if(argv.source) {
        source = path.resolve( process.cwd(), untildify(argv.source) );
    }

    if(! argv.source && argv.config) {
        if(argv.paths && argv.paths.wp && argv.paths.wp.model) {
            source = path.resolve( path.dirname(argv.config), untildify( argv.paths.wp.model ) );
        }
    }

    const prompts = [
        {
            name: 'modelName',
            message: 'What is the name of the model?',
            filter: input => util.pascalCase( singular(input) ),
            validate: input => Boolean(input),
            when: ! Boolean(argv.modelName)
        },
        {
            name: 'namespace',
            message: 'What is the PHP namespace?',
            when: ! Boolean(argv.namespace)
        },
        {
            name: 'className',
            message: 'What is the PHP class name?',
            default: ({namespace = argv.namespace, modelName = argv.modelName}) => {
                const name = util.pascalCase( singular(modelName) );
                let className = `${name}Model`;
                if( namespace ) {
                    className = name;
                } else if(argv.classPrefix) {
                    className = `${argv.classPrefix}${name}Model`;
                }
                return className;
            },
            validate: input => Boolean(input),
            when: ! Boolean(argv.className)
        },
        {
            name: 'postType',
            message: 'What is the post type name?',
            validate: input => Boolean(input),
            when: ! Boolean(argv.postType)
        }
    ];

    inquirer
        .prompt(prompts)
        .then(
            ({
                className = argv.className,
                modelName = argv.modelName,
                namespace = argv.namespace,
                postType  = argv.postType,
            }) => {

            const data = {
                className,
                modelName: util.pascalCase( singular(modelName) ),
                namespace,
                postType,
            };

            let destination = path.resolve( process.cwd(), untildify( argv.destination ) );

            if( util.dirExists(destination) && util.isDir(destination) ) {
                const file = `${data.className}.php`;
                destination = path.join(destination, file);
            }

            if( util.fileExists(destination) ) {
                util.throwError('File already exists.');
            }

            util.scaffold(source, destination, data);

            util.logSuccess(`Created ${data.className} model in ${path.relative(process.cwd(), destination)}`);

        },
        () => util.throwError('It looks like something went wrong. Please try again.')
    );

};
