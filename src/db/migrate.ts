import Umzug, { Migration } from 'umzug';

const umzug = new Umzug({
    // tslint:disable-next-line: object-literal-shorthand
    logging: function() {
        console.log.apply(null, [arguments]);
    },
    migrations: {
        path: 'dist/db/migrations',
        pattern: /\.js$/
    },
    upName: 'up',
    downName: 'down'
});

const logUmzugEvent = (eventName: string) => {
    return (name: string, migration: Migration) => {
        console.log(`${name} ${eventName}`);
    };
};

umzug.on('migrating', logUmzugEvent('migrating'));
umzug.on('migrated', logUmzugEvent('migrated'));
umzug.on('reverting', logUmzugEvent('reverting'));
umzug.on('reverted', logUmzugEvent('reverted'));

umzug.up().then(() => console.log('all migrations done'));
