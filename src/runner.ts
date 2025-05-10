import * as fs from 'fs';
import { tokenize } from './tokenizer';
import { parse } from './parser';
import { interpret } from './interpreter';

export function runFile(filepath: string) {
    const code = fs.readFileSync(filepath, 'utf-8');
    return runCode(code);
}

export function runCode(code: string) {
    const tokens = tokenize(code);
    const ast = parse(tokens);
    const env = interpret(ast);
    return env;
}
