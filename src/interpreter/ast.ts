import { Position } from "./token";

export type Node = Expression | Statement | Program;

////////////////
// Expressions
////////////////

export type Expression = 
    | Identifier
    | PrefixExpression
    | InfixExpression
    | IfExpression
    | FunctionExpression
    | CallExpression

    // Literals
    | StringLiteral
    | IntegerLiteral
    | BooleanLiteral
    | ObjectLiteral
    | ArrayLiteral
;

export interface Identifier extends Position {
    type: "identifier",
    value: string;
};

export function identifier(value: string, position: Position): Identifier {
    return {
        type: "identifier",
        value,
        ...position,
    }
}

export interface StringLiteral extends Position {
    type: "stringLiteral";
    value: string;
}

export const stringLiteral = (args: ASTNodeParams<StringLiteral>): StringLiteral => ({
    type: "stringLiteral",
    value: args.value,
    ...positionFromArgs(args)
});

export interface IntegerLiteral extends Position {
    type: "integerLiteral";
    value: number;
}

export function integerLiteral(value: number, position: Position): IntegerLiteral {
    return {
        type: "integerLiteral",
        value,
        ...position
    };
}

export interface BooleanLiteral extends Position {
    type: 'booleanLiteral';
    value: boolean;
}


export function booleanLiteral(value: boolean, position: Position): BooleanLiteral {
    return {
        type: "booleanLiteral",
        value,
        ...position
    }
}

export interface Property extends Position {
    type: "property",
    key: Identifier,
    value?: Expression
}

export function property(key: Identifier, value?: Expression): Property {
    return {
        type: "property",
        start: key.start,
        end: value?.end ?? key.end,
        key,
        value,
    }
}

export interface ObjectLiteral extends Position {
    type: "objectLiteral",
    properties: Property[]
}

export function objectLiteral(properties: Property[], position: Position): ObjectLiteral {
    return {
        type: "objectLiteral",
        ...position,
        properties,
    }
}

export interface ArrayLiteral extends Position {
    type: "arrayLiteral";
    elements: Expression[];
}

export const arrayLiteral = (args: ASTNodeParams<ArrayLiteral>): ArrayLiteral => ({
    type: "arrayLiteral",
    elements: args.elements,
    ...positionFromArgs(args)
});

export interface PrefixExpression extends Position {
    type: "prefixExpression";
    operator: string;
    right: Expression;
}

export function prefixExpression(operator: string, right: Expression, position: Position): PrefixExpression {
    return {
        type: "prefixExpression",
        operator,
        right,
        ...position
    }
}

interface InfixExpression extends Position {
    type: "infixExpression";
    left: Expression;
    operator: string;
    right: Expression;
}

export function infixExpression(left: Expression, operator: string, right: Expression, position: Position): InfixExpression {
    return {
        type: "infixExpression",
        left,
        operator,
        right,
        ...position
    };
}

type ASTNodeParams<T> = Omit<T, "type">;

export interface IfExpression extends Position {
    type: "ifExpression";
    condition: Expression;
    consequence: BlockStatement;
    alternative?: BlockStatement;
}

export const ifExpression = (args: ASTNodeParams<IfExpression>): IfExpression => ({
    type: "ifExpression",
    condition: args.condition,
    consequence: args.consequence,
    alternative: args.alternative,
    start: args.start,
    end: args.end
});

export interface FunctionExpression extends Position {
    type: "functionExpression";
    parameters: Identifier[];
    body: BlockStatement;
}

export const functionExpression = (args: ASTNodeParams<FunctionExpression>): FunctionExpression => ({
    type: "functionExpression",
    parameters: args.parameters,
    body: args.body,
    start: args.start,
    end: args.end
});

export interface CallExpression extends Position {
    type: "callExpression";
    function: Expression;
    arguments: Expression[];
}

function positionFromArgs(args: ASTNodeParams<Node>): Position {
    const { start, end } = args;
    return { start, end };
}

export const callExpression = (args: ASTNodeParams<CallExpression>): CallExpression => ({
    type: "callExpression",
    function: args.function,
    arguments: args.arguments,
    ...positionFromArgs(args)
});

////////////////
// Statements
////////////////

export type Statement =
    | VariableDeclaration
    | FunctionDeclaration
    | ReturnStatement
    | ExpressionStatement
    | BlockStatement
;

export interface VariableDeclaration extends Position {
    type: "variableDeclaration";
    constant: boolean;
    identifier: Identifier;
    value?: Expression | null;
}

export function variableDeclaration(
    constant: boolean,
    identifier: Identifier,
    position: Position,
    value?: Expression | null,
): VariableDeclaration {
    return {
        type: "variableDeclaration",
        ...position,
        constant,
        identifier,
        value,
    }
}

export interface FunctionDeclaration extends Position {
    type: "functionDeclaration",
    identifier: Identifier,
    parameters: Identifier[],
    body: BlockStatement
}

export const functionDeclaration = (args: ASTNodeParams<FunctionDeclaration>): FunctionDeclaration => ({
    type: "functionDeclaration",
    identifier: args.identifier,
    parameters: args.parameters,
    body: args.body,
    start: args.start,
    end: args.end,
});

export interface ReturnStatement extends Position {
    type: "returnStatement";
    returnValue: Expression;
}

export function returnStatement(expression: Expression, position: Position): ReturnStatement {
    return {
        type: "returnStatement",
        ...position,
        returnValue: expression
    };
}

export interface ExpressionStatement extends Position {
    type: "expressionStatement";
    expression: Expression;
}

export function expressionStatement(expression: Expression, position: Position): ExpressionStatement {
    return {
        type: "expressionStatement",
        ...position,
        expression
    }
}

export interface BlockStatement extends Position {
    type: "blockStatement";
    statements: Statement[];
}

export function blockStatement(statements: Statement[], position: Position): BlockStatement {
    return {
        type: "blockStatement",
        ...position,
        statements
    };
}



////////////////
// Program
////////////////

export interface Program extends Position {
    type: "program";
    body: Statement[];
}

export function program(statements: Statement[] = [], position: Position): Program {
    return {
        type: "program",
        ...position,
        body: statements,
    };
}
