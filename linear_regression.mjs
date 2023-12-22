import assert from "node:assert/strict";

// Give the determinant of the matrix:
//   a c
//   b d
function det2(a, b, c, d) {
  return a * d - c * b;
}

// Give the determinant of the matrix:
//   a d g
//   b e h
//   c f i
function det3(a, b, c, d, e, f, g, h, i) {
  return a * det2(e, f, h, i) - d * det2(b, c, h, i) + g * det2(b, c, e, f);
}

// Solve the linear system of equations:
//   a x + c y = e
//   b x + d y = f
function solve2(a, b, c, d, e, f) {
  const det = det2(a, b, c, d);
  const x = det2(e, f, c, d) / det;
  const y = det2(a, b, e, f) / det;

  return [x, y];
}

// Solve the linear system of equations:
//   a x + d y + g z = j
//   b x + e y + h z = k
//   c x + f y + i z = l
function solve3(a, b, c, d, e, f, g, h, i, j, k, l) {
  const det = det3(a, b, c, d, e, f, g, h, i);
  const x = det3(j, k, l, d, e, f, g, h, i) / det;
  const y = det3(a, b, c, j, k, l, g, h, i) / det;
  const z = det3(a, b, c, d, e, f, j, k, l) / det;

  return [x, y, z];
}

// Run an ordinary least squares regression on a + b x = y.
function regression2(x, y) {
  const n = x.length;
  assert.equal(y.length, n);

  let Σx  = 0;
  let Σy  = 0;
  let Σxx = 0;
  let Σxy = 0;

  for(let i = 0; i < n; i++) {
    Σx  += x[i];
    Σy  += y[i];
    Σxx += x[i] * x[i];
    Σxy += x[i] * y[i];
  }

  return solve2(n, Σx, Σx, Σxx, Σy, Σxy);
}

// Run a multilinear ordinary least squares regression on a + b x + c y = z.
function regression3(x, y, z) {
  const n = x.length;
  assert.equal(y.length, n);
  assert.equal(z.length, n);

  let Σx  = 0;
  let Σy  = 0;
  let Σz  = 0;
  let Σxx = 0;
  let Σxy = 0;
  let Σxz = 0;
  let Σyy = 0;
  let Σyz = 0;

  for(let i = 0; i < n; i++) {
    Σx  += x[i];
    Σy  += y[i];
    Σz  += z[i];
    Σxx += x[i] * x[i];
    Σxy += x[i] * y[i];
    Σxz += x[i] * z[i];
    Σyy += y[i] * y[i];
    Σyz += y[i] * z[i];
  }

  return solve3(n, Σx, Σy, Σx, Σxx, Σxy, Σy, Σxy, Σyy, Σz, Σxz, Σyz);
}

// Find the best fit to the function a + b sin(phase + frequency x) = y.
// Input frequency is required, but input phase may be omitted (in which case a
// best fit will be found).
// Returns [a, b>=0, -π<=phase<π, frequency].
function sinusoidal(x, y, frequency, phase=NaN) {
  const n = x.length;
  assert.equal(y.length, n);

  // Phase is known.
  if(Number.isFinite(phase)) {
    // Transform input into the correct form.
    const sin_x = new Array(n);

    for(let i = 0; i < n; i++) {
      sin_x[i] = Math.sin(x[i] * frequency + phase);
    }

    // Find the best fit, and convert it into our desired form.
    const fit = regression2(sin_x, y);
    const mean = fit[0];
    let amplitude = fit[1];

    // Amplitude should be positive.
    if(amplitude < 0) {
      amplitude = -amplitude;
      phase += Math.PI;
    }

    // Phase should be in the range [-π, π).
    phase -= Math.floor((phase + Math.PI) / (Math.PI * 2)) * (Math.PI * 2);

    // Return the answer directly.
    return [mean, amplitude, phase, frequency];
  }

  // Phase is unknown.
  else {
    // Transform input into independent terms, because we can use these to find
    // the best-fit phase.
    const sin_x = new Array(n);
    const cos_x = new Array(n);

    for(let i = 0; i < n; i++) {
      sin_x[i] = Math.sin(x[i] * frequency);
      cos_x[i] = Math.cos(x[i] * frequency);
    }

    // Find the best fit, and convert it into our desired form.
    const fit = regression3(sin_x, cos_x, y);
    const mean = fit[0];
    const amplitude = Math.hypot(fit[1], fit[2]);
    phase = Math.atan2(fit[2], fit[1]);

    return [mean, amplitude, phase, frequency];
  }
}

export {regression2, regression3, sinusoidal};
