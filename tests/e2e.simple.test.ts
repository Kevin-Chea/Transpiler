import { describe, expect, it } from '@jest/globals';
import { join } from 'path';
import { runCode, runFile } from '../src/runner';

describe('Simple code examples', () => {
    it('Code: Should declare 1 var', () => {
        const env = new Map();
        env.set('x', 8);
        expect(runCode('let x = 5 + 3;')).toEqual(env);
    });

    it('File: Should declare 1 var', () => {
        const env = new Map();
        env.set('x', 8);
        expect(runFile(join(__dirname, '../examples/basic.tiny'))).toEqual(env);
    });

    it('File: Should throw error, file not found', () => {
        const env = new Map();
        env.set('x', 8);
        expect(
            runFile(join(__dirname, '../examples/iDontExist.tiny'))
        ).toThrowError();
    });
});
