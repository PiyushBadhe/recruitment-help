export type KeywordItem = { label: string; value: string };
export type ReplacementKeywordMap = Record<string, KeywordItem[]>;

export type DropDownOptions = KeywordItem & { message: string };
export type DropDownOptionsMap = DropDownOptions[];
