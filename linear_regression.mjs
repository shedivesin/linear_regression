function identity(x) {
  return x;
}

function det2(a, b, c, d) {
  return a * d - b * c;
}

function det3(a, b, c, d, e, f, g, h, i) {
  return a * det2(e, f, h, i) - b * det2(d, f, g, i) + c * det2(d, e, g, h);
}

function regression2(pairs, transform=identity) {
  const n = pairs.length;
  let Σx  = 0;
  let Σy  = 0;
  let Σxx = 0;
  let Σxy = 0;

  for(let i = 0; i < n; i++) {
    const pair = pairs[i];
    const x = transform(pair[0]);
    const y = transform(pair[1]);

    Σx  += x;
    Σy  += y;
    Σxx += x * x;
    Σxy += x * y;
  }

  // Solve the following system of equations using Cramer's rule:
  //    n a + Σx  b = Σy
  //   Σx a + Σxx b = Σxy
  const d = det2( n, Σx, Σx , Σxx);
  const a = det2(Σy, Σx, Σxy, Σxx) / d;
  const b = det2( n, Σy, Σx , Σxy) / d;

  return [a, b];
}

function regression3(triplets, transform=identity) {
  const n = triplets.length;
  let Σx  = 0;
  let Σy  = 0;
  let Σz  = 0;
  let Σxx = 0;
  let Σxy = 0;
  let Σxz = 0;
  let Σyy = 0;
  let Σyz = 0;

  for(let i = 0; i < n; i++) {
    const triplet = triplets[i];
    const x = transform(triplet[0]);
    const y = transform(triplet[1]);
    const z = transform(triplet[2]);

    Σx  += x;
    Σy  += y;
    Σz  += z;
    Σxx += x * x;
    Σxy += x * y;
    Σxz += x * z;
    Σyy += y * y;
    Σyz += y * z;
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

export {regression2, regression3};
