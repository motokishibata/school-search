import * as remark from 'remark';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { getSchool } from '../repositories/schoolList';

const postsDirectory = path.join(process.cwd(), 'src', 'posts');

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark.remark()
    .use(remarkGfm)
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const school = getSchool(id);

  return {
    id,
    school,
    contentHtml,
    ...matterResult.data
  };
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    };
  });
}