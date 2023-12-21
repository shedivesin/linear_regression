import assert from "node:assert/strict";
import {regression2, regression3, sinusoidal} from "./linear_regression.mjs";

function r1e3(x) {
  return Math.round(x * 1e3) / 1e3;
}

// https://en.wikipedia.org/wiki/Simple_linear_regression#Numerical_example
assert.deepEqual(
  regression2(
    [
       1.47,  1.50,  1.52,  1.55,  1.57,  1.60,  1.63,  1.65,
       1.68,  1.70,  1.73,  1.75,  1.78,  1.80,  1.83,
    ],
    [
      52.21, 53.12, 54.48, 55.84, 57.20, 58.57, 59.93, 61.29,
      63.11, 64.47, 66.28, 68.10, 69.92, 72.19, 74.46,
    ],
  ).map(r1e3),
  [-39.062, 61.272],
);

// https://www.statology.org/multiple-linear-regression-by-hand/
assert.deepEqual(
  regression3(
    [ 60,  62,  67,  70,  71,  72,  75,  78],
    [ 22,  25,  24,  20,  15,  14,  14,  11],
    [140, 155, 159, 179, 192, 200, 212, 215],
  ).map(r1e3),
  [-6.867, 3.148, -1.656],
);

assert.deepEqual(
  sinusoidal(
    [ 0,  1,  2,  3,  4,  5],
    [+1, -1, +1, -1, +1, -1],
    Math.PI,
    1.5 * Math.PI,
  ),
  [0, 1, Math.PI / 2, Math.PI],
);

assert.deepEqual(
  sinusoidal(
    [ 0,  1,  2,  3,  4,  5],
    [+1, -1, +1, -1, +1, -1],
    Math.PI,
  ),
  [0, 1, Math.PI / 2, Math.PI],
);

console.log("OK");
