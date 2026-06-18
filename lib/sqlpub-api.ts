const DEFAULT_API_BASE_URL = "https://www.sqlpub.com";

export function getSqlpubApiBaseUrl() {
  return (
    process.env.SQLPUB_API_BASE_URL ??
    process.env.NEXT_PUBLIC_SQLPUB_API_BASE_URL ??
    DEFAULT_API_BASE_URL
  ).replace(/\/$/, "");
}
