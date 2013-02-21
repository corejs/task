module.exports = function () {
  return new Task();
};

var Task = function () {
  var self = this,
      tasks = [];

  this.add = function (task, ttl) {
    addTask(tasks, task, ttl);
    return self;
  };

  this.run = function () {
    var next = [],
        results = [];

    tasks.forEach(function (job, index) {
      var task = job.task,
          ttl = job.ttl;

      results[index] = task();
      ttl--;

      if (ttl) {
        addTask(next, task, ttl);
      }
    });

    tasks = next;
    return results;
  };
};

var addTask = function (tasks, task, ttl) {
  tasks.push({ 
    task: task,
    ttl: ttl || Infinity
  });
};
