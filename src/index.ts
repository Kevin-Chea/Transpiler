import * as fs from 'fs';
import { tokenize } from './tokenizer';
import { parse } from './parser';
import { interpret } from './interpreter';

console.log('hello');
// const code = fs.readFileSync('examples/basic.tiny', 'utf-8');
// const code = fs.readFileSync('examples/basicWithouthSpaces.tiny', 'utf-8');
const code = fs.readFileSync('examples/severalVarDeclarations.tiny', 'utf-8');
const tokens = tokenize(code);
const ast = parse(tokens);
const env = interpret(ast);
console.log(env);
