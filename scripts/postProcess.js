// postprocess.js
import { promises as fs } from 'fs';
import path from 'path';

async function fixImports(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            await fixImports(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.js')) {
            let content = await fs.readFile(fullPath, 'utf8');
            content = content.replace(
                /from\s+["'](\.\/[^"']+?)["']/g,
                (match, importPath) => {
                    if (
                        !importPath.endsWith('.js') &&
                        !importPath.startsWith('http')
                    ) {
                        return `from "${importPath}.js"`;
                    }
                    return match;
                }
            );
            await fs.writeFile(fullPath, content);
        }
    }
}

await fixImports('./dist');
