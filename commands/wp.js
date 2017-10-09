exports.command = 'wp <command>';
exports.desc = 'Scaffold WordPress code';
exports.builder = yargs => yargs.commandDir('wp-subcommands');
exports.handler = () => {}
