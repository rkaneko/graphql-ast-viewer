const path = require("path");

const atImport = require("postcss-import");
const autoprefixer = require("autoprefixer");
const csswring = require("csswring");

const atImportOptions = {
  path: [
    path.join(__dirname, "src")
  ]
};

const config = {
  exec: false,
  plugins: [
    atImport(atImportOptions),  // must be set on the head of plugins
    autoprefixer(),
    csswring()
  ],
  map: process.env.NODE_ENV !== "production"
};

module.exports = config;
