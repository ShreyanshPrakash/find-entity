"use strict";


if (process.env.NODE_ENV === "production") {
  module.exports = require('./src/init.app.js');
} else {
  module.exports = require('./src/init.app.js');
}

// nned to use bundler to minify and compress the code and create a single bundle, later.

