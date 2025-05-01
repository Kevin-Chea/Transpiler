import { describe, expect, it } from '@jest/globals';
import { isOperator } from './nodeTypeHelper';

describe('Type helper', () => {
    it('Should recognize operator', () => {
        expect(isOperator('PLUS')).toEqual(true);
        expect(isOperator('MINUS')).toEqual(true);
        expect(isOperator('DIVIDE')).toEqual(true);
        expect(isOperator('MULTIPLY')).toEqual(true);

        expect(isOperator('SEMICOLON')).toEqual(false);
    });
});
