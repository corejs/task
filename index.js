module.exports = function () {
  return new Task();
};

var Task = function () {
  var tasks = [];

  this.add = function (task, ttl) {
    addTask(tasks, task, ttl);
    return this;
  };

  this.run = function () {
    var running = tasks,
        results = [];

    tasks = [];

    running.forEach(function (job, index) {
      var task = job.task,
          ttl = job.ttl;

      results[index] = task();
      ttl--;

      if (ttl) {
        addTask(tasks, task, ttl);
      }
    });

    return results;
  };
};

var addTask = function (tasks, task, ttl) {
  tasks.push({ 
    task: task,
    ttl: ttl || 1
  });
};
