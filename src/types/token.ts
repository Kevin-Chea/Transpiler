export type TokenType =
    | 'LET'
    | 'IDENTIFIER'
    | 'EQUAL'
    | 'NUMBER'
    | 'PLUS'
    | 'MINUS'
    | 'MULTIPLY'
    | 'DIVIDE'
    | 'SEMICOLON';

export type Token = {
    type: TokenType;
    value?: string | number;
};
