import { Token, TokenType } from './types/token';

const specialCharacters = ['+', '-', '*', '/', ' ', ';', '=', '\n'];

export function tokenize(code: string) {
    const tokens: Token[] = [];

    let currentWord = '';

    for (let i = 0; i < code.length; i++) {
        const char = code[i];

        if (specialCharacters.includes(char)) {
            handleSpecialCharacter(char, currentWord, tokens);
            currentWord = '';
            continue;
        }

        currentWord += char;
    }
    return tokens;
}

export function tokenizeWord(currentWord: string, tokens: Token[]) {
    if (!currentWord.length) return;

    switch (currentWord) {
        case 'let':
            addToken(tokens, 'LET');
            break;
        default:
            const mayBeNumber = Number(currentWord);
            if (!Number.isNaN(mayBeNumber)) {
                addToken(tokens, 'NUMBER', mayBeNumber);
            } else {
                addToken(tokens, 'IDENTIFIER', currentWord);
            }
    }
}

export function handleSpecialCharacter(
    char: string,
    currentWord: string,
    tokens: Token[]
) {
    tokenizeWord(currentWord, tokens);
    switch (char) {
        case '+':
            addToken(tokens, 'PLUS');
            break;
        case '-':
            addToken(tokens, 'MINUS');
            break;
        case '*':
            addToken(tokens, 'MULTIPLY');
            break;
        case '/':
            addToken(tokens, 'DIVIDE');
            break;
        case ';':
            addToken(tokens, 'SEMICOLON');
            break;
        case '=':
            addToken(tokens, 'EQUAL');
            break;
    }
}

export function addToken(
    tokens: Token[],
    type: TokenType,
    value?: string | number
) {
    tokens.push({
        type,
        value
    });
}
