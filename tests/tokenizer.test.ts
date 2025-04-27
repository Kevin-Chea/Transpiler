import { describe, expect, it } from '@jest/globals';
import {
    addToken,
    handleSpecialCharacter,
    tokenize,
    tokenizeWord
} from '../src/tokenizer';
import { Token } from '../src/types/token';

describe('Tokenizer', () => {
    // #region tokenize
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
    // # endregion

    // #region tokenizeWord
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

    // #region addToken
    it('should add a token', () => {
        const tokens: Token[] = [
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' }
        ];

        addToken(tokens, 'DIVIDE');
        expect(tokens).toEqual([
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' },
            { type: 'DIVIDE' }
        ]);

        addToken(tokens, 'IDENTIFIER', 'taboulé');
        expect(tokens).toEqual([
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' },
            { type: 'DIVIDE' },
            { type: 'IDENTIFIER', value: 'taboulé' }
        ]);
    });
    // #endregion

    // #region handleSpecialCharacter
    it('should handle +', () => {
        const tokens: Token[] = [
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' }
        ];
        handleSpecialCharacter('+', '', tokens);
        expect(tokens).toEqual([
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' },
            { type: 'PLUS' }
        ]);
    });

    it('should handle -', () => {
        const tokens: Token[] = [
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' }
        ];
        handleSpecialCharacter('-', '', tokens);
        expect(tokens).toEqual([
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' },
            { type: 'MINUS' }
        ]);
    });

    it('should handle *', () => {
        const tokens: Token[] = [
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' }
        ];
        handleSpecialCharacter('*', '', tokens);
        expect(tokens).toEqual([
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' },
            { type: 'MULTIPLY' }
        ]);
    });

    it('should handle +', () => {
        const tokens: Token[] = [
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' }
        ];
        handleSpecialCharacter('/', '', tokens);
        expect(tokens).toEqual([
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' },
            { type: 'DIVIDE' }
        ]);
    });

    it('should handle ;', () => {
        const tokens: Token[] = [
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' }
        ];
        handleSpecialCharacter(';', '', tokens);
        expect(tokens).toEqual([
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' },
            { type: 'SEMICOLON' }
        ]);
    });

    it('should handle ; with word', () => {
        const tokens: Token[] = [
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' }
        ];
        handleSpecialCharacter(';', 'myValue', tokens);
        expect(tokens).toEqual([
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' },
            { type: 'IDENTIFIER', value: 'myValue' },
            { type: 'SEMICOLON' }
        ]);
    });

    it('should handle space (empty word)', () => {
        const tokens: Token[] = [
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' }
        ];
        handleSpecialCharacter(' ', '', tokens);
        expect(tokens).toEqual([
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' }
        ]);
    });

    it('should handle space', () => {
        const tokens: Token[] = [
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' }
        ];
        handleSpecialCharacter(' ', 'word', tokens);
        expect(tokens).toEqual([
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' },
            { type: 'IDENTIFIER', value: 'word' }
        ]);
    });
    // #endregion
});
