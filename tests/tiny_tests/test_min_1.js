// Input 0
function b(a, f, n) {
  this.left = a;
  this.right = f;
  this.item = n;
}
function c(a) {
  return null == a.left ? a.item : a.item + c(a.left) - c(a.right);
}
function d(a, f) {
  return 0 < f ? new b(d(2 * a - 1, f - 1), d(2 * a, f - 1), a) : new b(null, null, a);
}
for (var e, g = 4;7 >= g;g += 1) {
  for (var h = Math.max(6, g), k = c(d(0, h + 1)), l = d(0, h), m = 4;m <= h;m += 2) {
    for (var p = 1 << h - m + 4, k = 0, q = 1;q <= p;q++) {
      k += c(d(q, m)), k += c(d(-q, m));
    }
    console.log(k);
  }
  e = c(l);
  console.log(e);
}
;