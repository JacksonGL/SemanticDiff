/*
Compilation was a success!
Original Size:	550 bytes gzipped (1.28KB uncompressed)
Compiled Size:	352 bytes gzipped (773 bytes uncompressed)
Saved 36.00% off the gzipped size (41.04% without gzip)
The code may also be accessed at default.js.
*/

function TreeNode(a, b, c) {
  this.left = a;
  this.right = b;
  this.item = c;
}
TreeNode.prototype.itemCheck = function() {
  return null == this.left ? this.item : this.item + this.left.itemCheck() - this.right.itemCheck();
};
function bottomUpTree(a, b) {
  return 0 < b ? new TreeNode(bottomUpTree(2 * a - 1, b - 1), bottomUpTree(2 * a, b - 1), a) : new TreeNode(null, null, a);
}
for (var ret, n = 4;7 >= n;n += 1) {
  for (var minDepth = 4, maxDepth = Math.max(minDepth + 2, n), stretchDepth = maxDepth + 1, check = bottomUpTree(0, stretchDepth).itemCheck(), longLivedTree = bottomUpTree(0, maxDepth), depth = minDepth;depth <= maxDepth;depth += 2) {
    for (var iterations = 1 << maxDepth - depth + minDepth, check = 0, i = 1;i <= iterations;i++) {
      check += bottomUpTree(i, depth).itemCheck(), check += bottomUpTree(-i, depth).itemCheck();
    }
    console.log(check);
  }
  ret = longLivedTree.itemCheck();
  console.log(ret);
}
;