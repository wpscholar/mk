const _ = require('lodash');
const inquirer = require('inquirer');
const path = require('path');
const plural = require('pluralize').plural;
const singular = require('pluralize').singular;
const untildify = require('untildify');

const util = require('../../utilities.js');

exports.command = 'taxonomy';

exports.desc = 'Create a new WordPress taxonomy';

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
    taxonomyName: {
        alias: 'name',
        describe: 'The proper name for the taxonomy',
    },
    slugPrefix: {
        alias: 'prefix',
        describe: 'Prefix for the internal taxonomy name',
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

    let source = `${__dirname}/templates/taxonomy.php`;

    if(argv.source) {
        source = path.resolve( process.cwd(), untildify(argv.source) );
    }

    if(! argv.source && argv.config) {
        if(argv.paths && argv.paths.wp && argv.paths.wp.taxonomy) {
            source = path.resolve( path.dirname(argv.config), untildify( argv.paths.wp.taxonomy ) );
        }
    }

    const prompts = [
        {
            name: 'slugPrefix',
            message: 'What is the prefix for the taxonomy?',
            when: ! Boolean(argv.slugPrefix)
        },
        {
            name: 'taxonomyName',
            message: 'What is the name of the taxonomy?',
            filter: input => singular( _.kebabCase(input) ),
            validate: input => Boolean(input),
            when: ! Boolean(argv.taxonomyName)
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
            default: ({namespace = argv.namespace, taxonomyName = argv.taxonomyName}) => {
                const name = util.pascalCase( plural(taxonomyName) );
                let className = `${name}Taxonomy`;
                if( namespace ) {
                    className = name;
                } else if(argv.classPrefix) {
                    className = `${argv.classPrefix}${name}Taxonomy`;
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
                taxonomyName = argv.taxonomyName,
                slugPrefix = argv.slugPrefix,
                textDomain = argv.textDomain
            }) => {

            const name = singular( _.kebabCase(taxonomyName) );
            taxonomyName = `${slugPrefix}${name}`;

            const data = {
                className,
                namespace,
                PluralName: _.startCase( plural(name) ),
                pluralName: _.lowerCase( plural(name) ),
                taxonomyName,
                restBase: _.kebabCase( plural(name) ),
                SingularName: _.startCase( singular(name) ),
                singularName: _.lowerCase( singular(name) ),
                textDomain,
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

            util.logSuccess(`Created ${data.postTypeName} post type in ${path.relative(process.cwd(), destination)}`);

        },
        () => util.throwError('It looks like something went wrong. Please try again.')
    );

};
