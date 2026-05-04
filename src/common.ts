export const IMPORTER_RE: RegExp = /vue-functional-ref\/dist\/index\.m?js$/

export function slash(filename: string): string {
  return filename.replaceAll('\\', '/')
}
