#! /usr/bin/env node

const findUp = require('find-up');
const fs = require('fs')
const configPath = findUp.sync(['.mkconfig', 'mkconfig.json'])
const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : {}

var argv = require('yargs')
    .commandDir('commands')
    .config(config)
    .demand(1)
    .help()
    .argv;
