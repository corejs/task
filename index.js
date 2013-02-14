var job = require('job'),
    done = job.done;

var batch = module.exports = function () {
    return new Batch();
};

var Batch = function () {
  this.fns = [];
};

Batch.prototype.push = function (fn) {
  this.fns.push(fn);
};

Batch.prototype.run = function (cb) {
  var total = this.fns.length;

  return job(function () {
    var dones = 0,
        results = [];

    if (!this.fns.length) {
      done(results);
    }

    this.fns.forEach(function (fn, index) {
      fn(function (err, res) {
        if (err) {
          done();
        }

        results[index] = res;
        dones++;

        if (dones === totals) {
          done(results);
        }
      });
    });
  });
};
