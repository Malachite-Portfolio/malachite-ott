export const storageKeys = {
  login: "malachite:isLoggedIn",
  profile: "malachite:selectedProfile",
  myList: "malachite:myList",
  continueWatching: "malachite:continueWatching",
};

export type ContinueWatchingEntry = {
  title: string;
  progress: number;
};

export function readStringArray(key: string) {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as string[]) : [];
  } catch {
    return [];
  }
}

export function readContinueWatching() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const value = window.localStorage.getItem(storageKeys.continueWatching);
    return value ? (JSON.parse(value) as ContinueWatchingEntry[]) : [];
  } catch {
    return [];
  }
}

export function writeJson(key: string, value: unknown) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}
