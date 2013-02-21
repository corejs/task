module.exports = function () {
  return new Batch();
};

var Batch = function (fns) {
  this.fns = fns || [];
};

Batch.prototype.add = function (fn) {
  this.fns.push(fn);
};

Batch.prototype.run = function (cb) {
  var pending = this.fns.length,
      results = [];

  this.fns.forEach(function (fn, index) {
    results[index] = fn();
    pending--;

    if (!pending) {
      cb(results);
    }
  });
};
