#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const nets = (0, os_1.networkInterfaces)();
const results = Object.create(null); // Or just '{}', an empty object
for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
        if (net.family === familyV4Value && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}
const ip = results['Wi-Fi'][0];
const terminal_qr_1 = require("terminal-qr");
function help() {
    console.log(`
Usage: qr [options]

Options:
  -h, --help       output usage information
  -p, --port <n>   change port
  -v, --version    output the version number
    `);
}
const args = {};
process.argv.slice(2).forEach((arg, index) => {
    if (arg === '-h' || arg === '--help') {
        help();
        process.exit();
    }
    if (arg === '-p' || arg === '--port') {
        args.port = process.argv.slice(2)[index + 1];
    }
});
const url = `http://${ip}:${args.port}`;
console.log(url);
(0, terminal_qr_1.generate)(url, { small: true });
