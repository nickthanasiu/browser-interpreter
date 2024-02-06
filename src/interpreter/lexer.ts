import { Token, TokenType, newToken, lookupIdentifer } from "./token";

export interface Lexer {
  ch: string;
  position: number;
  input: string;
}

export class Lexer implements Lexer {

  constructor(input: string) {
    this.input = input;
    this.position = 0;
    this.ch = "";

    this.readChar();
  }

  private readChar() {

    if (this.position >= this.input.length) {
      this.ch = "\0";
    } else {
      this.ch = this.input[this.position];
    }

    this.position += 1;
  }

  peekChar() {
    if (this.position >= this.input.length) {
      return "\0";
    } else {
      return this.input[this.position];
    }
  }

  public nextToken() {
    this.skipWhitespace();

    let token: Token;

    let start = this.position - 1;

    switch (this.ch) {
      case "\"": 
        const stringVal = this.readString(start);
        token = newToken(TokenType.STRING, stringVal, { start, end: this.position });
        break;
      case "=":
        if (this.peekChar() === "=") {
          this.readChar();
          token = newToken(TokenType.EQ, "==", { start, end: this.position });
        } else {
          token = newToken(TokenType.ASSIGN, "=", { start, end: this.position });
        }
        break;
      case "+":
        token = newToken(TokenType.PLUS, "+", { start, end: this.position });
        break;
      case "-":
        token = newToken(TokenType.MINUS, "-", { start, end: this.position })
        break;
      case "*":
        token = newToken(TokenType.ASTERISK, "*", { start, end: this.position });
        break;
      case "/":
        if (this.peekChar() === "/") {
          this.skipSingleLineComment();
          token = this.nextToken();
        } else if (this.peekChar() === "*") {
          this.skipMultiLineComment();
          token = this.nextToken();
        } else {
          token = newToken(TokenType.SLASH, "/", { start, end: this.position });
        }
        break;
      case "!":
        if (this.peekChar() === "=") {
          this.readChar();
          token = newToken(TokenType.NOT_EQ, "!=", { start, end: this.position });
        } else {
          token = newToken(TokenType.BANG, "!", { start, end: this.position });
        }
        break;
      case "<":
        token = newToken(TokenType.LT, "<", { start, end: this.position });
        break;
      case ">":
        token = newToken(TokenType.GT, ">", { start, end: this.position });
        break;
      case ",":
        token = newToken(TokenType.COMMA, ",", { start, end: this.position });
        break;
      case ":":
        token = newToken(TokenType.COLON, ":", { start, end: this.position });
        break;
      case ";":
        token = newToken(TokenType.SEMICOLON, ";", { start, end: this.position });
        break;
      case "(":
        token = newToken(TokenType.LPAREN, "(", { start, end: this.position });
        break;
      case ")":
        token = newToken(TokenType.RPAREN, ")", { start, end: this.position });
        break;
      case "{":
        token = newToken(TokenType.LBRACE, "{", { start, end: this.position });
        break;
      case "}":
        token = newToken(TokenType.RBRACE, "}", { start, end: this.position });
        break;
      case "[":
        token = newToken(TokenType.LBRACKET, "[", { start, end: this.position });
        break;
      case "]":
        token = newToken(TokenType.RBRACKET, "]", { start, end: this.position });
        break;
      case "\0":
        token = newToken(TokenType.EOF, "\0", { start, end: this.position });
        break;
      default:
        // Ch is either:
        // a letter (part of an Identifier or Keyword),
        if (this.isLetter(this.ch)) {
          token = this.readIdentifier();
          return token;
        } 
        // or a number (par of an INT)
        else if (this.isDigit(this.ch)) {
          token = this.readNumber();
          return token;
        }
        // or ILLEGAL, 
        else {
          console.error('Lexer does not recognize the following character ', this.ch);
          token = newToken(TokenType.ILLEGAL, this.ch, { start, end: this.position });
        }
    }

    this.readChar(); // Set this.ch, and move cursor position to next char
    return token;
  }

  readIdentifier() {

    let start = this.position - 1;

    while (this.isLetter(this.ch)) {
      this.readChar();
    }

    const text = this.input.slice(start, this.position - 1);
    return lookupIdentifer(text, { start, end: this.position - 1 });
  }

  private readNumber() {
    const start = this.position - 1;

    while (this.isDigit(this.ch)) {
      this.readChar();
    }

    const text = this.input.slice(start, this.position - 1);
    return newToken(TokenType.INT, text, { start, end: this.position - 1 });
  }

  private readString(start: number) {

    this.readChar();

    while (this.ch !== "\"" && !this.isEOF()) {
      this.readChar();
    }

    return this.input.slice(start, this.position);
  }

  private skipSingleLineComment() {
    while (!this.isNewlineChar(this.ch) && !this.isEOF()) {
      this.readChar();
    }
  }

  private skipMultiLineComment() {
    const isEndOfComment = () =>
      this.ch === "*" && this.peekChar() === "/";


    while (!isEndOfComment() && !this.isEOF()) {
      console.log('reading comment ', this.ch);
      this.readChar();
    }

    /* Now that we've reached the end of the multi-line commnet
     * let's skip ahead two characters, past \* and \/ 
     */
    this.readChar();
    this.readChar();
  }

  // Tells us if we are the end of the file by checking for "end of file" character: "\0"
  private isEOF() {
    return this.ch === "\0";
  }

  private skipWhitespace() {
    const isWhitespace = (ch: string) =>
      ch === " "  ||
      ch === "\t" ||
      this.isNewlineChar(ch)
    ;

    while (isWhitespace(this.ch)) {
      this.readChar();
    }
  }

  private isNewlineChar(ch: string) {
    return ch === "\n" || ch === "\r";
  };

  private isLetter(char: string) {
    return 'a' <= char && char <= 'z' 
      || 'A' <= char && char <= 'Z';
  }

  private isDigit(char: string) {
    return '0' <= char && char <= '9';
  }
}


export function lex(input: string) {
  const l = new Lexer(input);

  const tokens: Token[] = [];

  let t = l.nextToken();

  while (t.type !== TokenType.EOF) {
    tokens.push(t);
    t = l.nextToken();
  }

  tokens.push(newToken(TokenType.EOF, '\0', { start: l.position, end: l.position }));

  return tokens;
};