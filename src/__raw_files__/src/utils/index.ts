import qs, { ParsedUrlQueryInput } from "querystring";

export const buildUrl = (url: string, params?: ParsedUrlQueryInput): string => {
  let out = url;
  if (params) {
    const queryString = qs.stringify(params);
    if (queryString.trim().length > 0) out += "?" + queryString;
  }
  return out;
};

export const parseQueryString = (queryString: string) => {
  return qs.parse(queryString.replace("?", ""));
};

export const exists = (e: any | unknown): boolean =>
  e !== null && e !== undefined && e !== "";

export const cloneDeep = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const gcn = (...classNames: (string | undefined | null | false)[]) =>
  classNames.filter((cn) => !!cn).join(" ");

export const getEnumEntries = (inp: { [k: string]: string | number }) => {
  const entries: any = {};
  for (const [k, v] of Object.entries(inp)) {
    if (isNaN(k as any)) entries[v] = k;
  }

  const sorted = Object.keys(entries).sort();

  return sorted.map((s) => [entries[s], s]);
};
