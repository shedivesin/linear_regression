function identity(x) {
  return x;
}

function det2(a, b, c, d) {
  return a * d - b * c;
}

function regression2(pairs, transform=identity) {
  const n = pairs.length;
  let Σx = 0;
  let Σy = 0;
  let Σxx = 0;
  let Σxy = 0;

  for(let i = 0; i < n; i++) {
    const pair = pairs[i];
    const x = transform(pair[0]);
    const y = transform(pair[1]);

    Σx += x;
    Σy += y;
    Σxx += x * x;
    Σxy += x * y;
  }

  // Solve the following system using Cramer's rule:
  //    n a + Σx  b = Σy
  //   Σx a + Σxx b = Σxy
  const d = det2( n, Σx, Σx , Σxx);
  const a = det2(Σy, Σx, Σxy, Σxx) / d;
  const b = det2( n, Σy, Σx , Σxy) / d;

  return [a, b];
}

export { regression2 };
