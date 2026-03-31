export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  // #reapIntervalId = NodeJS.Timeout | undefined = undefined;
  #reapIntervalId: any;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    if (interval != Infinity) this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    this.#cache.set(key, { createdAt: Date.now(), val });
  }

  get<T>(key: string) {
    return this.#cache.get(key);
  }

  #reap() {
    let reapTime = Date.now() - this.#interval;

    for (let [key, value] of this.#cache) {
      if (reapTime > value.createdAt) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
