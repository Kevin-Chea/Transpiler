#!/usr/bin/env node

import { runFile } from './runner';
import { argv } from 'process';

if (argv.length < 3) {
    console.error('Usage: tiny <file>');
    process.exit(1);
}

const path = argv[2];

try {
    const result = runFile(path);
    console.log('Result :', result);
} catch (err) {
    console.error('Error :', err);
    process.exit(1);
}
