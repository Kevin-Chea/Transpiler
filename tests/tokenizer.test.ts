import { describe, expect, it } from '@jest/globals';
import { tokenize, tokenizeWord } from '../src/tokenizer';
import { Token } from '../src/types/token';

describe('Tokenizer', () => {
    it('tokenizes a simple let statement', () => {
        const code = 'let x = 42 + 3;';
        const tokens = tokenize(code);

        expect(tokens).toEqual([
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' },
            { type: 'EQUAL' },
            { type: 'NUMBER', value: 42 },
            { type: 'PLUS' },
            { type: 'NUMBER', value: 3 },
            { type: 'SEMICOLON' }
        ]);
    });

    it('tokenizes a simple let statement without spaces', () => {
        const code = 'let x=42+3;';
        const tokens = tokenize(code);

        expect(tokens).toEqual([
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' },
            { type: 'EQUAL' },
            { type: 'NUMBER', value: 42 },
            { type: 'PLUS' },
            { type: 'NUMBER', value: 3 },
            { type: 'SEMICOLON' }
        ]);
    });

    // #region TOKENIZE WORD
    it('tokenizes a word: let', () => {
        const word = 'let';
        const tokens: Token[] = [];
        tokenizeWord(word, tokens);

        expect(tokens).toEqual([{ type: 'LET' }]);
    });

    it('tokenizes a variable: myValue', () => {
        const word = 'myValue';
        const tokens: Token[] = [{ type: 'LET' }];
        tokenizeWord(word, tokens);

        expect(tokens).toEqual([
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'myValue' }
        ]);
    });

    // #endregion
});
