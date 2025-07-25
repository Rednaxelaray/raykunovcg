// scripts/gen-md.js
import fs from 'node:fs';
import path from 'node:path';

const imgRoot = 'public/images';
const mdRoot  = 'src/content/projects';

// Убедимся, что папка с проектами есть
fs.mkdirSync(mdRoot, { recursive: true });

/** утилита: преобразуем slug в «Матрасы cut 02» (по желанию) */
function prettify(slug) {
  return slug
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

for (const dirent of fs.readdirSync(imgRoot, { withFileTypes: true })) {
  if (!dirent.isDirectory()) continue;

  const slug = dirent.name;
  const mdPath = path.join(mdRoot, `${slug}.md`);
  if (fs.existsSync(mdPath)) continue;           // уже создан

  const imgDir = path.join(imgRoot, slug);
  const files = fs.readdirSync(imgDir)
    .filter(f => /\.(jpe?g|png|webp)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (files.length === 0) continue;              // в папке нет картинок

  const fmLines = [
    '---',
    `title: "${prettify(slug)}"`,
    `cover: "/images/${slug}/${files[0]}"`,
    'gallery:',
    ...files.map(f => `  - "/images/${slug}/${f}"`),
    '---',
    '',
    '>',
    ''
  ];

  fs.writeFileSync(mdPath, fmLines.join('\n'));
  console.log('✓ created', mdPath);
}
