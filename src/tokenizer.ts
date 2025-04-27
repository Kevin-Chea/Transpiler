import { Token } from './types/token';

const operators = ['+', '-', '*', '/'];

export function tokenize(code: string) {
    const tokens: Token[] = [];

    let currentWord = '';

    for (let i = 0; i < code.length; i++) {
        const char = code[i];

        // Space: skip it
        if (char == ' ') {
            tokenizeWord(currentWord, tokens);
            currentWord = '';
            continue;
        }

        if (char == '+') {
            tokenizeWord(currentWord, tokens);
            tokens.push({
                type: 'PLUS'
            });
            currentWord = '';
            continue;
        }

        if (char == '=') {
            tokenizeWord(currentWord, tokens);
            tokens.push({
                type: 'EQUAL'
            });
            currentWord = '';
            console.log(currentWord);
            continue;
        }

        if (char == ';') {
            tokenizeWord(currentWord, tokens);
            tokens.push({
                type: 'SEMICOLON'
            });
            currentWord = '';
            continue;
        }

        currentWord += char;
    }
    return tokens;
}

export function tokenizeWord(currentWord: string, tokens: Token[]) {
    if (currentWord.length) {
        switch (currentWord) {
            case 'let':
                tokens.push({
                    type: 'LET'
                });
                break;
            default:
                const mayBeNumber = Number(currentWord);
                if (!Number.isNaN(mayBeNumber)) {
                    tokens.push({
                        type: 'NUMBER',
                        value: mayBeNumber
                    });
                } else {
                    tokens.push({
                        type: 'IDENTIFIER',
                        value: currentWord
                    });
                }
        }
    }
}
