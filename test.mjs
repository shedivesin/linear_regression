import assert from "node:assert/strict";
import { regression2 } from "./linear_regression.mjs";

assert.deepEqual(
  regression2(
    [
      [1, 6],
      [2, 5],
      [3, 7],
      [4, 10],
    ],
  ),
  [3.5, 1.4],
);

console.log("OK");
