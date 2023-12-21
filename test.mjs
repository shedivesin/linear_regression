import assert from "node:assert/strict";
import {Regression2D, Regression3D} from "./linear_regression.mjs";

function r1e3(x) {
  return Math.round(x * 1e3) / 1e3;
}

// https://en.wikipedia.org/wiki/Simple_linear_regression#Numerical_example
assert.deepEqual(
  new Regression2D().
    add(1.47, 52.21).
    add(1.50, 53.12).
    add(1.52, 54.48).
    add(1.55, 55.84).
    add(1.57, 57.20).
    add(1.60, 58.57).
    add(1.63, 59.93).
    add(1.65, 61.29).
    add(1.68, 63.11).
    add(1.70, 64.47).
    add(1.73, 66.28).
    add(1.75, 68.10).
    add(1.78, 69.92).
    add(1.80, 72.19).
    add(1.83, 74.46).
    done().
    map(r1e3),
  [-39.062, 61.272],
);

// https://www.statology.org/multiple-linear-regression-by-hand/
assert.deepEqual(
  new Regression3D().
    add(60, 22, 140).
    add(62, 25, 155).
    add(67, 24, 159).
    add(70, 20, 179).
    add(71, 15, 192).
    add(72, 14, 200).
    add(75, 14, 212).
    add(78, 11, 215).
    done().
    map(r1e3),
  [-6.867, 3.148, -1.656],
);

console.log("OK");
