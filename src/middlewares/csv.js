import fs from 'fs';
import { parse } from 'csv-parse';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToCsv = `${__dirname}/tasks.csv`;


export async function processFile() {
 const tasks = []
  const parser = fs.createReadStream(pathToCsv).pipe(parse({
    // Opções do CSV, se houverem
  }));
  let isFirstLine = true;
  for await (const record of parser) {
    if (isFirstLine) {
        isFirstLine = false;
        continue; // Pula a primeira linha (cabeçalho)
      }
    const [title,description] = record; 
    try {
       await axios.post('http://localhost:3333/tasks', {title:title,description:description});
    } catch (error) {
      console.error('Erro na requisição POST para /tasks:', error.message);
    }
  }
  return tasks
}
