#!/usr/bin/env node

const app = require('../index.js');
app.push(process.argv.splice(2));