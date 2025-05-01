import { ASTNode } from './types/ast';
import { Token, TokenType } from './types/token';
import { isOperator } from './utils/typeHelper/nodeTypeHelper';

export class Parser {
    tokens: Token[];
    cursor: number = 0;
    // Use in try parse function
    virtualCursor: number = 0;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    advanceCursorToVirtualCursor() {
        this.cursor = this.virtualCursor;
    }

    resetVirtualCursor() {
        this.virtualCursor = this.cursor;
    }

    incVirtualCursor() {
        this.virtualCursor++;
    }

    peek() {
        return this.tokens[this.virtualCursor] ?? null;
    }

    expect(type: TokenType) {
        const token = this.peek();
        if (!token || token.type !== type) {
            this.resetVirtualCursor();
            return null;
        }
        this.incVirtualCursor();
        return token;
    }

    tryParse<T>(fn: (parser: Parser) => T | null) {
        const initialCursorPos = this.cursor;
        this.resetVirtualCursor();
        const result = fn(this);
        if (result !== null) {
            this.advanceCursorToVirtualCursor();
        } else {
            this.cursor = initialCursorPos;
            this.virtualCursor = initialCursorPos;
        }
        return result;
    }
}

export function parse(tokens: Token[]) {
    const programAST: ASTNode = { type: 'Program', body: [] };
    const parser = new Parser(tokens);
    while (parser.peek()) {
        const res = parser.tryParse(tryParseVariableDeclaration);
        // TODO: throw error
        if (!res) break;
        programAST.body.push(res);
    }
    return programAST;
}

export function tryParseLiteral(parser: Parser): ASTNode | null {
    const token = parser.expect('NUMBER');
    if (!token || token.value === undefined) {
        parser.resetVirtualCursor();
        return null;
    }

    return {
        type: 'Literal',
        value: token.value
    };
}

export function tryParseBinaryExpression(parser: Parser): ASTNode | null {
    // Left
    const left = parser.tryParse(tryParseLiteral);
    if (!left) return null;

    // Get type and advance cursor
    const tokenOperator = parser.peek();
    if (!tokenOperator || !isOperator(tokenOperator.type)) return null;
    parser.cursor++;
    parser.virtualCursor++;
    const operator = tokenOperator.type;

    // Right
    const right = parser.tryParse(tryParseLiteral);
    if (!right) return null;

    return {
        type: 'BinaryExpression',
        operator,
        left,
        right
    };
}

export function tryParseVariableDeclaration(parser: Parser): ASTNode | null {
    const letToken = parser.expect('LET');
    if (!letToken) return null;

    const identifierToken = parser.expect('IDENTIFIER');
    if (!identifierToken) return null;

    const equalToken = parser.expect('EQUAL');
    if (!equalToken) return null;

    parser.advanceCursorToVirtualCursor();
    const expression =
        parser.tryParse(tryParseBinaryExpression) ||
        parser.tryParse(tryParseLiteral);

    if (!expression) return null;

    const semiColonToken = parser.expect('SEMICOLON');
    if (!semiColonToken) return null;

    return {
        type: 'VariableDeclaration',
        name: identifierToken.value as string,
        value: expression
    };
}
