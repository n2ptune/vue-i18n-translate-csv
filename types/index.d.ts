interface SearchNodeConfig {
    ignore: string[];
    searchPattern: RegExp[];
    startPath: string;
    specificSearchDir: string[];
}
interface ResultI18nPath {
    ko: string;
    en: string;
    i18nPath: string;
}
declare const __DIR_NAME__: string;
declare const __FILE_NAME__: string;
declare const filePattern: RegExp[];
declare const defaultSearchNodeConfig: SearchNodeConfig;
declare function getI18nPath(inputPath?: string): ResultI18nPath;
declare function getSearchNodes(config?: SearchNodeConfig): string[];

declare function genPath(_path: string): string;
declare function randomString(length: number): string;

interface UserI18n<T = string> {
    ko: Record<string, T>;
    en: Record<string, T>;
}
interface UserI18nMap {
    ko: Map<string, string>;
    revKo: Map<string, string>;
    en: Map<string, string>;
    revEn: Map<string, string>;
}
declare function generateMapFromUserI18n(i18n: UserI18n): UserI18nMap;
declare function extractMatchString(files: string[]): string[];
declare function filterGenerateTarget(korean: string[], i18nMap: UserI18nMap): string[];
declare function extractCurrentI18n(i18nPath: ResultI18nPath): Promise<UserI18n<any>>;
declare function extractI18nFileRaw(i18nPath: ResultI18nPath): {
    ko: string[];
    en: string[];
};
declare function parseToObjectFromString(str: string): string[];

export { ResultI18nPath, SearchNodeConfig, UserI18n, UserI18nMap, __DIR_NAME__, __FILE_NAME__, defaultSearchNodeConfig, extractCurrentI18n, extractI18nFileRaw, extractMatchString, filePattern, filterGenerateTarget, genPath, generateMapFromUserI18n, getI18nPath, getSearchNodes, parseToObjectFromString, randomString };
