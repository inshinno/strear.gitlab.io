import fs from 'fs';
import path from 'path';

const pagesRoot = path.resolve(process.cwd(), 'pages');
const createdFilesRecord = path.join(pagesRoot, '_created_dir_listing');

if (fs.existsSync(createdFilesRecord)) {
    const jsonData = fs.readFileSync(createdFilesRecord, 'utf8');
    const createdFiles = JSON.parse(jsonData);
    
    for (const filePath of createdFiles) {
        const absolutePath = path.resolve(filePath);
        if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
        } else {
            console.error(`dir_listing: Failed to delete file: not found ${absolutePath}`);
        }
    }
    
    fs.unlinkSync(createdFilesRecord);
}
