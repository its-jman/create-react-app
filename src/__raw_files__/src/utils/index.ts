// @ts-ignore
import _buildUrl from "axios/lib/helpers/buildURL";

export const buildUrl = _buildUrl;

export const parseQueryString = (queryString: string) => {
  const params = new URLSearchParams(queryString);
  const entries = [...params.entries()];

  const mappedObject = entries.map(([k, v]) => ({ [k.replace("[]", "")]: v }));
  return Object.assign({}, ...mappedObject);
}

export const exists = (e: any | unknown): boolean => e !== null && e !== undefined && e !== "";

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
