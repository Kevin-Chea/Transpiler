# Tiny transpiler

Tiny transpiler is a minimal project to understand the key steps of a transpiler / compiler. The language is very minimal and only allows to create variables. As is, the language does not have any application at all, but is sufficient to understand the basics behind compilation and transpilation.

## Run examples

Examples are located inside the example folder. These are files with .tiny extension.

1. Build the project:

```sh
npm run build
```

2. Link the command:

```sh
npm link
```

If you get an error, you might need to give extra permission for this command (with sudo for instance)

3. Run an example:

```sh
tiny examples/basic.tiny
```

This will display in the console the created variable environment.

## How it works

This project has three main parts, the same as in any transpiler compiler

### Tokenizer

The tokenizer takes a string representing a code file and split it into a list of tokens.

It is like taking an english sentence and labelize words : this is a noun, this a a verb and so on. In programming, we recognize key words (such as let or const to declare a variable), symbols (operators, parenthesis, brakets, semicolon...), identifiers (for variables or function names) and values.

A tokenizer is dumb : if the code is nonsense, it does not detect it.

### Parser

The parser takes a list of tokens (given by the tokenizer) and create an Abstract Syntax Tree (AST) with it. It is a way to structure the program. The parser is able to detect if grammar rules are not respected. Each node of the AST contains what its type (is it an operation, a simple value, a variable declaration ?) and the necessary data.

For instance, if we want to add 2 and 3 together we could have a node like this :

```JSON
{
    "type": "ADD",
    "left": 2,
    "right": 3
}
```

And if we have the following var declaration:

```js
let x = 2 + 3;
```

We could have these nodes :

```JSON
{
    "type": "VAR_DELCARATION",
    "name": "x",
    "value": {
        "type": "ADD",
        "left": 2,
        "right": 3
    }
}
```

### Runner

Takes the AST build by the parser and run the program, with a recursive call on the AST nodes. The variables are stored in an environment.
