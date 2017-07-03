import babel from "rollup-plugin-babel";
import sourcemaps from "rollup-plugin-sourcemaps";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import globals from "rollup-plugin-node-globals";
import builtins from "rollup-plugin-node-builtins";
import json from "rollup-plugin-json";

const pkg = require("./package");
const external = Object.keys(pkg.dependencies);
const plugins = [
  json({ preferConst: true, indent: "  " }),
  sourcemaps(),
  resolve({ jsnext: true, preferBuiltins: true, main: true }),
  commonjs({
    include: "node_modules/**",
    namedExports: {
      "socket.io": ["listen"]
    }
  }),
  babel(),
  globals(),
  builtins()
];

export default {
  entry: "src/index.js",
  plugins: plugins,
  moduleName: pkg.name,
  exports: "named",
  external: external,
  targets: [
    {
      dest: pkg.main,
      format: "umd",
      sourceMap: true
    },
    {
      dest: pkg.module,
      format: "es",
      sourceMap: true
    }
  ]
};
