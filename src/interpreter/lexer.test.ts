import { Lexer } from "./lexer";

test('Calling readChar advances pointer', () => {
  const input = "{};"
  const l = new Lexer(input);

  const startingPosition = l.position;
  l.readChar();

  expect(l.position).toBe(startingPosition + 1);
});

test(`readChar sets ch to "\0 when finished reading all input`, () => {
  const input = "{};";
  const l = new Lexer(input);

  for (let i = 0; i < input.length; i++) {
    l.readChar();
  }

  expect(l.ch).toBe("\0");
});

 // TODO: as position to tokens. For now just commenting out this test

/*
test(`nextToken works`, () => {
  const input = `
    let five = 5;
    let ten = 10;

    let add = fn(x, y) {
      x + y;
    }

    let result = add(five, ten);

    !-/*5;
    5 < 10 > 5;

    if (5 < 10) {
      return true;
    } else {
      return false;
    }

    10 == 10;
    10 != 9;
  `;

 
  const expectedTokens: Token[] = [
    { type: TokenType.LET, literal: "let" },
    { type: TokenType.IDENT, literal: "five" },
    { type: TokenType.ASSIGN, literal: "=" },
    { type: TokenType.INT, literal: "5" },
    { type: TokenType.SEMICOLON, literal: ";" },

    { type: TokenType.LET, literal: "let" },
    { type: TokenType.IDENT, literal: "ten" },
    { type: TokenType.ASSIGN, literal: "=" },
    { type: TokenType.INT, literal: "10" },
    { type: TokenType.SEMICOLON, literal: ";"},

    { type: TokenType.LET, literal: "let" },
    { type: TokenType.IDENT, literal: "add" },
    { type: TokenType.ASSIGN, literal: "=" },
    { type: TokenType.FUNCTION, literal: "fn" },
    { type: TokenType.LPAREN, literal: "(" },
    { type: TokenType.IDENT, literal: "x"},
    { type: TokenType.COMMA, literal: ","},
    { type: TokenType.IDENT, literal: "y"},
    { type: TokenType.RPAREN, literal: ")" },
    { type: TokenType.LBRACE, literal: "{" },
    { type: TokenType.IDENT, literal: "x" },
    { type: TokenType.PLUS, literal: "+" },
    { type: TokenType.IDENT, literal: "y" },
    { type: TokenType.SEMICOLON, literal: ";" },
    { type: TokenType.RBRACE, literal: "}" },

    { type: TokenType.LET, literal: "let" },
    { type: TokenType.IDENT, literal: "result" },
    { type: TokenType.ASSIGN, literal: "=" },
    { type: TokenType.IDENT, literal: "add" },
    { type: TokenType.LPAREN, literal: "(" },
    { type: TokenType.IDENT, literal: "five" },
    { type: TokenType.COMMA, literal: "," },
    { type: TokenType.IDENT, literal: "ten" },
    { type: TokenType.RPAREN, literal: ")" },
    { type: TokenType.SEMICOLON, literal: ";" },

    { type: TokenType.BANG, literal: "!" },
    { type: TokenType.MINUS, literal: "-" },
    { type: TokenType.SLASH, literal: "/" },
    { type: TokenType.ASTERISK, literal: "*" },
    { type: TokenType.INT, literal: "5" },
    { type: TokenType.SEMICOLON, literal: ";" },

    { type: TokenType.INT, literal: "5" },
    { type: TokenType.LT, literal: "<" },
    { type: TokenType.INT, literal: "10" },
    { type: TokenType.GT, literal: ">" },
    { type: TokenType.INT, literal: "5" },
    { type: TokenType.SEMICOLON, literal: ";" },

    { type: TokenType.IF, literal: "if" },
    { type: TokenType.LPAREN, literal: "(" },
    { type: TokenType.INT, literal: "5" },
    { type: TokenType.LT, literal: "<" },
    { type: TokenType.INT, literal: "10" },
    { type: TokenType.RPAREN, literal: ")"},
    { type: TokenType.LBRACE, literal: "{" },
    { type: TokenType.RETURN, literal: "return" },
    { type: TokenType.TRUE, literal: "true" },
    { type: TokenType.SEMICOLON, literal: ";" },
    { type: TokenType.RBRACE, literal: "}" },
    { type: TokenType.ELSE, literal: "else"},
    { type: TokenType.LBRACE, literal: "{" },
    { type: TokenType.RETURN, literal: "return" },
    { type: TokenType.FALSE, literal: "false" },
    { type: TokenType.SEMICOLON, literal: ";" },
    { type: TokenType.RBRACE, literal: "}" },

    { type: TokenType.INT, literal: "10" },
    { type: TokenType.EQ, literal: "==" },
    { type: TokenType.INT, literal: "10" },
    { type: TokenType.SEMICOLON, literal: ";" },

    { type: TokenType.INT, literal: "10" },
    { type: TokenType.NOT_EQ, literal: "!=" },
    { type: TokenType.INT, literal: "9" },
    { type: TokenType.SEMICOLON, literal: ";" },

    { type: TokenType.EOF, literal: "\0" },
  ];

  const tokens = lex(input);

  expect(tokens).toStrictEqual(expectedTokens);
});

*/