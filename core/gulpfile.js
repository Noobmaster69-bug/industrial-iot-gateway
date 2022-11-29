// @ts-nocheck
const gulp = require("gulp");
const nodemon = require("gulp-nodemon");
const rollup = require("rollup");
const rollupTypescript = require("@rollup/plugin-typescript");
const pluginJSON = require("@rollup/plugin-json");

gulp.task("build", async function () {
  const bundle = await rollup.rollup({
    input: "./index.ts",
    plugins: [pluginJSON({ preferConst: true }), rollupTypescript()],
  });
  await bundle.write({
    file: "./build/built.cjs",
    format: "cjs",
    name: "built",
  });
});
gulp.task("watch", function () {
  gulp.watch("./**/*.ts", gulp.series("build"));
});

gulp.task("nodemon", function () {
  var stream = nodemon({
    // nodeArgs: "--experimental-specifier-resolution=node",
    script: "build/built.cjs",
    watch: "build",
    env: { DEBUG: "Application,Request,Response" },
  });
  return stream;
});

gulp.task("start", gulp.series("build", gulp.parallel("watch", "nodemon")));
