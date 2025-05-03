import { describe, expect, it } from '@jest/globals';
import { interpret } from '../src/interpreter';

describe('interpreter', () => {
    it('should throw error if AST is not a program', () => {
        expect(() => interpret({ type: 'Literal', value: 2 })).toThrowError();
    });

    it('should interpret one simple var declaration', () => {
        const res = interpret({
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    name: 'x',
                    value: {
                        type: 'Literal',
                        value: 42
                    }
                }
            ]
        });

        const expected = new Map();
        expected.set('x', 42);

        expect(res).toEqual(expected);
    });

    it('should interpret one var declaration with operation', () => {
        const res = interpret({
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
        });

        const expected = new Map();
        expected.set('x', 14);

        expect(res).toEqual(expected);
    });
});
