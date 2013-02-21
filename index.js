module.exports = function () {
  return new Task();
};

var Task = function () {
  var self = this,
      tasks = [];

  this.before = [];
  this.after = [];

  this.add = function (task, ttl) {
    var work = function () {
      self.before.forEach(function (fn) {
        fn();
      });

      var result = task();

      self.after.forEach(function (fn) {
        fn();
      });

      return result;
    };
    
    addTask(tasks, work, ttl);
    return self;
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
    ttl: ttl || Infinity
  });
};
