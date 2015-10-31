var
  browserify = require('browserify'),
  pathmodify = require("pathmodify");

var bundlers = Array.apply(0, Array(2));

var pathmodify_opts = {mods: [
]};

bundlers.forEach(function (b, i) {
  b = browserify('./entry')
    .plugin(pathmodify(), pathmodify_opts)
    .on("update", function () {
      bundle(b);
    })
  ;

  bundlers[i] = b;
  bundle(b, function () {});
});

function bundle (b, done) {
   b
    .bundle()
    .pipe(process.stdout)
  ;
}

[].concat(bundlers).reverse().forEach(function (b) {
  b.emit("update");
});
