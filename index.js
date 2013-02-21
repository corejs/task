module.exports = function () {
  return new Task();
};

var Task = function () {
  var tasks = [],
      befores = [],
      afters = [];

  this.before = function (fn) {
    befores.push(fn);
    return this;
  };

  this.after = function (fn) {
    befores.push(fn);
    return this;
  };

  this.add = function (task, ttl) {
    var work = function () {
      befores.forEach(function (fn) {
        fn();
      });

      var result = task();

      afters.forEach(function (fn) {
        fn();
      });

      return result;
    };
    
    addTask(tasks, work, ttl);
    return this;
  };

  this.reset = function () {
    tasks = [];
    befores = [];
    afters = [];
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
