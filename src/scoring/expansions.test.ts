import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/*
 * The module keeps its cache and its listener set in module scope, so every
 * test loads a fresh copy through `vi.resetModules()` — otherwise state would
 * leak between cases.
 *
 * `localStorage` is faked by hand rather than by pulling in a DOM environment:
 * the module touches exactly three methods, and a fake lets us make them throw
 * on demand, which is the interesting half of the behaviour.
 */

type StorageFault = "read" | "write";

function installStorage(fault?: StorageFault) {
  const store = new Map<string, string>();

  const localStorage = {
    getItem(key: string): string | null {
      if (fault === "read") {
        throw new Error("storage is blocked");
      }
      return store.get(key) ?? null;
    },
    setItem(key: string, value: string): void {
      if (fault === "write") {
        throw new Error("storage is blocked");
      }
      store.set(key, value);
    },
    removeItem(key: string): void {
      store.delete(key);
    },
  };

  vi.stubGlobal("window", { localStorage });
  return store;
}

async function loadModule() {
  vi.resetModules();
  return import("./expansions");
}

const KEY = "board-games:expansions:everdell";

beforeEach(() => {
  // The module warns on a swallowed storage error; that is deliberate, but it
  // would drown the test output.
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("getSnapshot", () => {
  it("returns the very same object on repeated calls", async () => {
    // This is the load-bearing one: useSyncExternalStore compares snapshots by
    // reference, so a fresh array on every call means an endless re-render.
    installStorage();
    const { getSnapshot } = await loadModule();

    expect(getSnapshot("everdell")).toBe(getSnapshot("everdell"));
  });

  it("stays referentially stable after a toggle too", async () => {
    installStorage();
    const { getSnapshot, toggleExpansion } = await loadModule();

    toggleExpansion("everdell", "pearlbrook");
    expect(getSnapshot("everdell")).toBe(getSnapshot("everdell"));
  });

  it("is empty when nothing was ever saved", async () => {
    installStorage();
    const { getSnapshot } = await loadModule();

    expect(getSnapshot("everdell")).toEqual([]);
  });

  it("reads back what was saved", async () => {
    const store = installStorage();
    store.set(KEY, JSON.stringify(["pearlbrook", "newleaf"]));
    const { getSnapshot } = await loadModule();

    expect(getSnapshot("everdell")).toEqual(["pearlbrook", "newleaf"]);
  });

  it("keeps games apart", async () => {
    const store = installStorage();
    store.set(KEY, JSON.stringify(["pearlbrook"]));
    const { getSnapshot } = await loadModule();

    expect(getSnapshot("everdell")).toEqual(["pearlbrook"]);
    expect(getSnapshot("gwt")).toEqual([]);
  });
});

describe("getSnapshot with damaged storage", () => {
  it("falls back to empty on broken JSON instead of throwing", async () => {
    const store = installStorage();
    store.set(KEY, "{not json");
    const { getSnapshot } = await loadModule();

    expect(getSnapshot("everdell")).toEqual([]);
  });

  it("falls back to empty when the value is not an array", async () => {
    const store = installStorage();
    store.set(KEY, JSON.stringify({ pearlbrook: true }));
    const { getSnapshot } = await loadModule();

    expect(getSnapshot("everdell")).toEqual([]);
  });

  it("drops entries that are not strings", async () => {
    const store = installStorage();
    store.set(KEY, JSON.stringify(["pearlbrook", 42, null, "newleaf"]));
    const { getSnapshot } = await loadModule();

    expect(getSnapshot("everdell")).toEqual(["pearlbrook", "newleaf"]);
  });

  it("survives storage that refuses to be read", async () => {
    installStorage("read");
    const { getSnapshot } = await loadModule();

    expect(getSnapshot("everdell")).toEqual([]);
  });
});

describe("getServerSnapshot", () => {
  it("is always empty and always the same object", async () => {
    installStorage();
    const { getServerSnapshot } = await loadModule();

    expect(getServerSnapshot()).toEqual([]);
    expect(getServerSnapshot()).toBe(getServerSnapshot());
  });
});

describe("toggleExpansion", () => {
  it("switches an expansion on and then off", async () => {
    installStorage();
    const { getSnapshot, toggleExpansion } = await loadModule();

    toggleExpansion("everdell", "pearlbrook");
    expect(getSnapshot("everdell")).toEqual(["pearlbrook"]);

    toggleExpansion("everdell", "pearlbrook");
    expect(getSnapshot("everdell")).toEqual([]);
  });

  it("keeps the order in which expansions were switched on", async () => {
    installStorage();
    const { getSnapshot, toggleExpansion } = await loadModule();

    toggleExpansion("everdell", "newleaf");
    toggleExpansion("everdell", "pearlbrook");

    expect(getSnapshot("everdell")).toEqual(["newleaf", "pearlbrook"]);
  });

  it("persists the setup", async () => {
    const store = installStorage();
    const { toggleExpansion } = await loadModule();

    toggleExpansion("everdell", "pearlbrook");
    expect(store.get(KEY)).toBe(JSON.stringify(["pearlbrook"]));
  });

  it("removes the key rather than storing an empty list", async () => {
    const store = installStorage();
    const { toggleExpansion } = await loadModule();

    toggleExpansion("everdell", "pearlbrook");
    toggleExpansion("everdell", "pearlbrook");

    expect(store.has(KEY)).toBe(false);
  });

  it("still applies in memory when storage refuses to be written", async () => {
    installStorage("write");
    const { getSnapshot, toggleExpansion } = await loadModule();

    toggleExpansion("everdell", "pearlbrook");
    expect(getSnapshot("everdell")).toEqual(["pearlbrook"]);
  });
});

describe("subscribe", () => {
  it("notifies listeners on every toggle", async () => {
    installStorage();
    const { subscribe, toggleExpansion } = await loadModule();
    const listener = vi.fn();

    subscribe(listener);
    toggleExpansion("everdell", "pearlbrook");
    toggleExpansion("everdell", "newleaf");

    expect(listener).toHaveBeenCalledTimes(2);
  });

  it("stops notifying after unsubscribe", async () => {
    installStorage();
    const { subscribe, toggleExpansion } = await loadModule();
    const listener = vi.fn();

    const unsubscribe = subscribe(listener);
    unsubscribe();
    toggleExpansion("everdell", "pearlbrook");

    expect(listener).not.toHaveBeenCalled();
  });

  it("notifies even when persisting failed", async () => {
    installStorage("write");
    const { subscribe, toggleExpansion } = await loadModule();
    const listener = vi.fn();

    subscribe(listener);
    toggleExpansion("everdell", "pearlbrook");

    expect(listener).toHaveBeenCalledTimes(1);
  });
});
