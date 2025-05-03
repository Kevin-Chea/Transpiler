import { ASTNode } from './types/ast';

export function interpret(ast: ASTNode) {
    if (ast.type !== 'Program') {
        throw new Error('Given AST is not a program');
    }

    const env = new Map();
    ast.body.forEach((node) => {
        evaluate(node, env);
    });
    return env;
}

export function evaluate(
    node: ASTNode,
    env: Map<string, string | number>
): number | string | undefined {
    switch (node.type) {
        case 'Program':
            throw new Error('Should not be a program');
        case 'VariableDeclaration':
            const value = evaluate(node.value, env);
            if (!value) {
                throw new Error('Value is undefined');
            }
            env.set(node.name, value);
            break;
        case 'BinaryExpression':
            const left = evaluate(node.left, env);
            if (Number.isNaN(Number(left)))
                throw new Error('Left is not a number');
            const right = evaluate(node.right, env);
            if (Number.isNaN(Number(right)))
                throw new Error('Right is not a number');

            const numberLeft = Number(left);
            const numberRight = Number(right);

            switch (node.operator) {
                case 'PLUS':
                    return numberLeft + numberRight;
                case 'MINUS':
                    return numberLeft - numberRight;
                case 'MULTIPLY':
                    return numberLeft * numberRight;
                case 'DIVIDE': {
                    if (right == 0) throw new Error('Division by zero !');
                    return numberLeft / numberRight;
                }
                default: {
                    throw new Error('Unknown operator');
                }
            }
        case 'Literal':
            return node.value;
        default:
            throw new Error('Unknown type in AST: ' + node);
    }
}
