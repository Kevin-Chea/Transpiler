export type NodeType =
    | 'Program'
    | 'VariableDeclaration'
    | 'BinaryExpression'
    | 'Literal';

export type ASTNode =
    | { type: 'Program'; body: ASTNode[] }
    | { type: 'VariableDeclaration'; name: string; value: ASTNode }
    | {
          type: 'BinaryExpression';
          operator: string;
          left: ASTNode;
          right: ASTNode;
      }
    | {
          type: 'Literal';
          value: number | string;
      };
