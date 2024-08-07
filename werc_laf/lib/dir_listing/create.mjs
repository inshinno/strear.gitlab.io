import fs from 'fs';
import path from 'path';
import { showInListing } from './lib.mjs';

function escapeHTML(str) {
    const escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '[': '&#91;',
        ']': '&#93;',
        '"': '&quot;',
        "'": '&#39;'
    };
    return str.replace(/[&<>"']/g, (match) => escapeMap[match]);
}

function createIndexFiles(dir, pagesRoot, collect) {
    const items = fs.readdirSync(dir).filter(showInListing);
    const subDirs = items.filter(item => fs.statSync(path.join(dir, item)).isDirectory());
    const mdFiles = items.filter(item => item.endsWith('.md') && item !== 'index.md');

    if (subDirs.length > 0 || mdFiles.length > 0) {
        const indexPath = path.join(dir, 'index.md');

        if (!fs.existsSync(indexPath)) {
            const compose = (partName) => {
                const partFile = path.join(dir, partName);
                if (fs.existsSync(partFile)) {
                    fs.appendFileSync(indexPath, fs.readFileSync(partFile));
                }
            };

            compose('_header.md');

            const subItems = [
                ...subDirs.map(subDir => `${subDir}/`),
                ...mdFiles.map(mdFile => `${mdFile.replace(/\.md$/, '')}`)
            ].sort();

            const title = '/ ' + path.relative(pagesRoot, dir).split(path.sep).join(' / ');
            const links = subItems.map(n => {
                const href = '/' + path.relative(pagesRoot, path.join(dir, n));
                return `[${escapeHTML(n)}](${encodeURI(href)})`;
            });

            const titleContent = `<h1>${escapeHTML(title)}</h1>`;
            const linksContent = links.map(html => `- ${html}`).join('\n');

            const content = `\n\n${titleContent}\n\n${linksContent}\n\n`;
            fs.appendFileSync(indexPath, content);

            compose('_footer.md');

            collect(indexPath);
        }
    }

    subDirs.forEach(subDir => createIndexFiles(path.join(dir, subDir), pagesRoot, collect));
}

const pagesRoot = './pages';
const createdFilesRecord = path.join(pagesRoot, '_created_dir_listing');

if (!fs.existsSync(createdFilesRecord)) {
    const createdFiles = [];
    createIndexFiles(pagesRoot, pagesRoot, p => createdFiles.push(p));
    fs.writeFileSync(createdFilesRecord, JSON.stringify(createdFiles));
}
