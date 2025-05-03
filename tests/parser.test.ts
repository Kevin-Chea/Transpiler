import { describe, expect, it } from '@jest/globals';
import {
    parse,
    Parser,
    tryParseBinaryExpression,
    tryParseLiteral,
    tryParseVariableDeclaration
} from '../src/parser';
import { Token } from '../src/types/token';

describe('Tokenizer', () => {
    // #region tryParseLiteral
    it('should try Parse Literal', () => {
        const tokens: Token[] = [{ type: 'NUMBER', value: 2 }];
        const parser1 = new Parser(tokens);
        expect(parser1.tryParse(tryParseLiteral)).toEqual({
            type: 'Literal',
            value: 2
        });
        expect(parser1.cursor).toBe(1);
        expect(parser1.virtualCursor).toBe(1);

        const undefinedTokens: Token[] = [{ type: 'NUMBER' }];
        const parser2 = new Parser(undefinedTokens);
        expect(parser2.tryParse(tryParseLiteral)).toEqual(null);
        expect(parser2.cursor).toEqual(0);
        expect(parser2.virtualCursor).toBe(0);
    });

    it('should try Parse Literal undefined', () => {
        const wrongTokens: Token[] = [{ type: 'DIVIDE', value: 2 }];
        const parser1 = new Parser(wrongTokens);
        expect(tryParseLiteral(parser1)).toEqual(null);
        expect(parser1.cursor).toBe(0);
        expect(parser1.virtualCursor).toBe(0);
    });

    // #endregion

    // #region tryParseBinaryExpression
    it('should try parse binary expression', () => {
        const parser = new Parser([
            { type: 'NUMBER', value: 3 },
            { type: 'PLUS' },
            { type: 'NUMBER', value: 42 }
        ]);
        const res = parser.tryParse(tryParseBinaryExpression);
        expect(res).toEqual({
            type: 'BinaryExpression',
            operator: 'PLUS',
            left: {
                type: 'Literal',
                value: 3
            },
            right: {
                type: 'Literal',
                value: 42
            }
        });
        expect(parser.cursor).toEqual(3);
        expect(parser.virtualCursor).toEqual(3);
    });

    it('should try throw error binary expression', () => {
        const parser = new Parser([
            { type: 'NUMBER', value: 3 },
            { type: 'PLUS' },
            { type: 'MINUS', value: 42 }
        ]);
        const res = parser.tryParse(tryParseBinaryExpression);
        expect(res).toEqual(null);
        expect(parser.cursor).toEqual(0);
        expect(parser.virtualCursor).toEqual(0);
    });
    // #endregion

    // #region tryParseVarDeclaration
    it('should try parse var declaration', () => {
        const tokens: Token[] = [
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' },
            { type: 'EQUAL' },
            { type: 'NUMBER', value: 42 },
            { type: 'SEMICOLON' }
        ];
        const parser = new Parser(tokens);
        const res = parser.tryParse(tryParseVariableDeclaration);
        expect(res).toEqual({
            type: 'VariableDeclaration',
            name: 'x',
            value: {
                type: 'Literal',
                value: 42
            }
        });
    });

    it('should try parse var declaration with operation', () => {
        const tokens: Token[] = [
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' },
            { type: 'EQUAL' },
            { type: 'NUMBER', value: 42 },
            { type: 'DIVIDE' },
            { type: 'NUMBER', value: 3 },
            { type: 'SEMICOLON' }
        ];
        const parser = new Parser(tokens);
        const res = parser.tryParse(tryParseVariableDeclaration);
        expect(res).toEqual({
            type: 'VariableDeclaration',
            name: 'x',
            value: {
                type: 'BinaryExpression',
                operator: 'DIVIDE',
                left: {
                    type: 'Literal',
                    value: 42
                },
                right: {
                    type: 'Literal',
                    value: 3
                }
            }
        });
    });
    // #endregion

    // #region Parse
    it('should parse a var declaration', () => {
        const expected = {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    name: 'x',
                    value: {
                        type: 'BinaryExpression',
                        operator: 'DIVIDE',
                        left: {
                            type: 'Literal',
                            value: 42
                        },
                        right: {
                            type: 'Literal',
                            value: 3
                        }
                    }
                }
            ]
        };

        const tokens: Token[] = [
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' },
            { type: 'EQUAL' },
            { type: 'NUMBER', value: 42 },
            { type: 'DIVIDE' },
            { type: 'NUMBER', value: 3 },
            { type: 'SEMICOLON' }
        ];

        const res = parse(tokens);
        expect(res).toEqual(expected);
    });

    it('should parse two var declarations', () => {
        const expected = {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    name: 'x',
                    value: {
                        type: 'BinaryExpression',
                        operator: 'DIVIDE',
                        left: {
                            type: 'Literal',
                            value: 42
                        },
                        right: {
                            type: 'Literal',
                            value: 3
                        }
                    }
                },
                {
                    type: 'VariableDeclaration',
                    name: 'y',
                    value: {
                        type: 'Literal',
                        value: 42
                    }
                }
            ]
        };

        const tokens: Token[] = [
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'x' },
            { type: 'EQUAL' },
            { type: 'NUMBER', value: 42 },
            { type: 'DIVIDE' },
            { type: 'NUMBER', value: 3 },
            { type: 'SEMICOLON' },
            { type: 'LET' },
            { type: 'IDENTIFIER', value: 'y' },
            { type: 'EQUAL' },
            { type: 'NUMBER', value: 42 },
            { type: 'SEMICOLON' }
        ];

        const res = parse(tokens);
        expect(res).toEqual(expected);
    });
    // #endregion
});
