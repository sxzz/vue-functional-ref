import { basename, dirname, join, relative, resolve } from 'path/posix'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import fg from 'fast-glob'
import { exports as exportMap } from "../package.json";
import { mkdirSync, writeFileSync } from 'node:fs';

// fix cjs exports
const files = await fg('*.js', {
  ignore: ['index.js', 'chunk-*'],
  absolute: true,
  cwd: resolve(dirname(fileURLToPath(import.meta.url)), '../dist'),
})
for (const file of files) {
  // eslint-disable-next-line no-console
  console.log('[postbuild]', basename(file))
  let code = await readFile(file, 'utf8')
  code = code.replace('exports.default =', 'module.exports =')
  code += 'exports.default = module.exports;'
  await writeFile(file, code)
}

const ROOT_PATH = dirname(fileURLToPath(import.meta.url))
for (const ex of Object.keys(exportMap)) {
  const file = exportMap[ex as keyof typeof exportMap];
  if (ex === '.' || typeof file==='string' || !file.require) {
    continue
  }

  const [, ...folders] = ex.split('/')
  const fileName = folders.pop()

  const [, ...targetFolders] = file.require.split('/')
  const targetFileName = targetFolders.pop()
  const target = relative(
    join(ROOT_PATH, ...folders),
    join(ROOT_PATH, ...targetFolders, targetFileName!),
  )

  mkdirSync(join(ROOT_PATH, ...folders), {
    recursive: true,
  })

  writeFileSync(
    join(ROOT_PATH, ...folders, `${fileName}.js`),
    `module.exports = require('./${target}')`,
  )

  writeFileSync(
    join(ROOT_PATH, ...folders, `${fileName}.d.ts`),
    `export * from './${target.split('.')[0]}'`,
  )
}