import { defineConfig } from "eslint/config";
import prettier from "eslint-plugin-prettier";
import eslintPluginTs from "@typescript-eslint/eslint-plugin"
import parser from "@typeScript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{

    plugins: {
        prettier,
        "@typescript-eslint": eslintPluginTs
    },

    languageOptions: {
        parser: parser,
    },

    rules: {
        '@typescript-eslint/no-unused-vars': 'warn',

        'prettier/prettier': 'error'
    },
}]);