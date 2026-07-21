import { githubRepoConfig } from "./config";

const TOKEN_STORAGE_KEY = "yonaidissoto_admin_token";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setStoredToken(token: string) {
  window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function clearStoredToken() {
  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
}

// UTF-8 safe base64 encode/decode (plain btoa/atob only handle Latin1,
// which breaks on accented characters like the ones in this site's copy).
function utf8ToBase64(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function base64ToUtf8(input: string): string {
  const binary = atob(input.replace(/\n/g, ""));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export class GitHubApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "GitHubApiError";
  }
}

async function githubRequest(path: string, token: string, init?: RequestInit) {
  const res = await fetch(`https://api.github.com/repos/${githubRepoConfig.owner}/${githubRepoConfig.repo}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    let detail = "";
    try {
      const body = await res.json();
      detail = body?.message ?? "";
    } catch {
      // ignore body parse failure
    }
    throw new GitHubApiError(
      detail || `GitHub API error (${res.status})`,
      res.status
    );
  }

  return res.json();
}

// Verifies the token can read repo metadata — used right after the user
// pastes a token, before we trust it for real edits.
export async function verifyToken(token: string): Promise<void> {
  await githubRequest("", token);
}

export async function getJsonFile<T>(
  token: string,
  path: string
): Promise<{ data: T; sha: string }> {
  const result = await githubRequest(`/contents/${path}?ref=${githubRepoConfig.branch}`, token);
  const content = base64ToUtf8(result.content as string);
  return { data: JSON.parse(content) as T, sha: result.sha as string };
}

export async function putJsonFile(
  token: string,
  path: string,
  data: unknown,
  sha: string,
  message: string
): Promise<{ sha: string }> {
  const content = utf8ToBase64(JSON.stringify(data, null, 2) + "\n");
  const result = await githubRequest(`/contents/${path}`, token, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content,
      sha,
      branch: githubRepoConfig.branch,
    }),
  });
  return { sha: result.content.sha as string };
}
