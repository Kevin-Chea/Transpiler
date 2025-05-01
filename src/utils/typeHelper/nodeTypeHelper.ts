import { TokenType } from '../../types/token';

export function isOperator(type: TokenType) {
    return ['PLUS', 'MULTIPLY', 'MINUS', 'DIVIDE'].includes(type);
}
