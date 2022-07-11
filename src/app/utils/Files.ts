import { resolve } from 'path';
import { readFileSync } from 'fs';

export class Files {
    read(path: string): string {
        return readFileSync(resolve(path), 'utf8');
    }
}