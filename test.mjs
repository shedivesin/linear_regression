import assert from "node:assert/strict";
import {regression2, regression3} from "./linear_regression.mjs";

function r1e3(x) {
  return Math.round(x * 1e3) / 1e3;
}

// https://en.wikipedia.org/wiki/Simple_linear_regression#Numerical_example
assert.deepEqual(
  regression2(
    [
      [1.47, 52.21],
      [1.50, 53.12],
      [1.52, 54.48],
      [1.55, 55.84],
      [1.57, 57.20],
      [1.60, 58.57],
      [1.63, 59.93],
      [1.65, 61.29],
      [1.68, 63.11],
      [1.70, 64.47],
      [1.73, 66.28],
      [1.75, 68.10],
      [1.78, 69.92],
      [1.80, 72.19],
      [1.83, 74.46],
    ],
  ).map(r1e3),
  [-39.062, 61.272],
);

// https://www.statology.org/multiple-linear-regression-by-hand/
assert.deepEqual(
  regression3(
    [
      [60, 22, 140],
      [62, 25, 155],
      [67, 24, 159],
      [70, 20, 179],
      [71, 15, 192],
      [72, 14, 200],
      [75, 14, 212],
      [78, 11, 215],
    ],
  ).map(r1e3),
  [-6.867, 3.148, -1.656],
);

console.log("OK");
