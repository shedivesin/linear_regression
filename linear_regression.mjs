import assert from "node:assert/strict";

function identity(x) {
  return x;
}

function det2(a, b, c, d) {
  return a * d - b * c;
}

function det3(a, b, c, d, e, f, g, h, i) {
  return a * det2(e, f, h, i) - b * det2(d, f, g, i) + c * det2(d, e, g, h);
}

function regression2(x, y) {
  const n = x.length;
  assert.equal(y.length, n);

  // Collapse inputs into a matrix representation.
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

  // Solve the following system of equations using Cramer's rule:
  //    n a + Σx  b = Σy
  //   Σx a + Σxx b = Σxy
  const d = det2( n, Σx, Σx , Σxx);
  const a = det2(Σy, Σx, Σxy, Σxx) / d;
  const b = det2( n, Σy, Σx , Σxy) / d;

  return [a, b];
}

function regression3(x, y, z) {
  const n = x.length;
  assert.equal(y.length, n);
  assert.equal(z.length, n);

  // Collapse inputs into a matrix representation.
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

  // Solve the following system of equations using Cramer's rule:
  //    n a + Σx  b + Σy  c = Σz
  //   Σx a + Σxx b + Σxy c = Σxz
  //   Σy a + Σxy b + Σyy c = Σyz
  const d = det3( n, Σx, Σy, Σx , Σxx, Σxy, Σy , Σxy, Σyy);
  const a = det3(Σz, Σx, Σy, Σxz, Σxx, Σxy, Σyz, Σxy, Σyy) / d;
  const b = det3( n, Σz, Σy, Σx , Σxz, Σxy, Σy , Σyz, Σyy) / d;
  const c = det3( n, Σx, Σz, Σx , Σxx, Σxz, Σy , Σxy, Σyz) / d;

  return [a, b, c];
}

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
