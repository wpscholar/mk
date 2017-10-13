#! /usr/bin/env node

const findUp = require('find-up');
const fs = require('fs');
const yargs = require('yargs');

var argv = yargs
    .commandDir('commands')
    .default('config', '/dev/null', 'Path to configuration file')
    .config('config', function(configPath) {
        if( configPath === '/dev/null' ) {
            configPath = findUp.sync(['.mkconfig', 'mkconfig.json']);
        }
        return configPath ? JSON.parse(fs.readFileSync(configPath)) : {config: ''};
    })
    .demand(1)
    .help()
    .argv;
