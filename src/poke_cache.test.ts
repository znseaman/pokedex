import { Cache } from "./poke_cache.js";
import { test, expect } from "vitest";

test.concurrent.each([
  {
    key: "https://example.com",
    val: { createdAt: 1775176332722, val: { name: "place1" } },
    interval: 500, // 1/2 second
  },
  {
    key: "https://example.com/path",
    val: { createdAt: 1775176332722, val: { name: "place2" } },
    interval: 1000, // 1 second
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached?.val).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval * 2));
  const reaped = cache.get(key);
  expect(reaped?.val).toBe(undefined);

  cache.stopReapLoop();
});

test.concurrent.each([
  {
    key: "pikachu",
    val: {},
    interval: Infinity,
    expectedKeys: ["pikachu"],
  },
  {
    key: "squirtle",
    val: {},
    interval: Infinity,
    expectedKeys: ["squirtle"],
  },
  {
    key: "jigglypuff",
    val: {},
    interval: 500, // 1/2 second
    expectedKeys: [],
  },
])(
  "Test getAllKeys when $interval ms",
  async ({ key, val, interval, expectedKeys }) => {
    const cache = new Cache(interval);

    cache.add(key, val);
    const cached = cache.get(key);
    expect(cached?.val).toBe(val);

    const keys = cache.getAllKeys();
    expect(keys).toStrictEqual(expectedKeys);
  },
);
