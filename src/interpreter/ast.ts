
export type Node = Expression | Statement | Program;

////////////////
// Expressions
////////////////

export type Expression = 
    | Identifier
    | PrefixExpression
    | InfixExpression

    // Literals
    | IntegerLiteral
    | BooleanLiteral
    | Object
;

export interface Identifier {
    type: "identifier",
    value: string;
};

export function identifier(value: string): Identifier {
    return {
        type: "identifier",
        value
    }
}

export interface IntegerLiteral {
    type: "integerLiteral";
    value: number;
}

export function integerLiteral(value: number): IntegerLiteral {
    return {
        type: "integerLiteral",
        value
    };
}

export interface BooleanLiteral {
    type: 'booleanLiteral';
    value: boolean;
}


export function booleanLiteral(value: boolean): BooleanLiteral {
    return {
        type: "booleanLiteral",
        value
    }
}

export interface Property {
    type: "property",
    key: string,
    value?: Expression
}

export interface ObjectLiteral {
    type: "objectLiteral",
    properties: Property[]
}

export function objectLiteral() {
    return;
}

export interface PrefixExpression {
    operator: string;
    right: Expression;
}

export function prefixExpression(operator: string, right: Expression): PrefixExpression {
    return {
        operator,
        right
    }
}

interface InfixExpression {
    left: Expression;
    operator: string;
    right: Expression;
}

export function infixExpression(left: Expression, operator: string, right: Expression): InfixExpression {
    return {
        left,
        operator,
        right
    };
}

////////////////
// Statements
////////////////

export type Statement =
    | VariableDeclarationStatement
    | ReturnStatement
    | ExpressionStatement
;

export interface VariableDeclarationStatement {
    type: "variableDeclaration";
    constant: boolean;
    identifier: Identifier;
    value?: Expression | null;
}

export function variableDeclaration(constant: boolean, identifier: Identifier, value?: Expression | null): VariableDeclarationStatement {
    return {
        type: "variableDeclaration",
        constant,
        identifier,
        value
    }
}

export interface ReturnStatement {
    type: "returnStatement";
    returnValue: Expression;
}

export function returnStatement(expression: Expression): ReturnStatement {
    return {
        type: "returnStatement",
        returnValue: expression
    };
}

export interface ExpressionStatement {
    type: "expressionStatement";
    expression: Expression;
}

export function expressionStatement(expression: Expression): ExpressionStatement {
    return {
        type: "expressionStatement",
        expression
    }
}

////////////////
// Program
////////////////

export interface Program {
    type: "program";
    body: Statement[];
}

export function program(statements: Statement[] = []): Program {
    return {
        type: "program",
        body: statements
    };
}
