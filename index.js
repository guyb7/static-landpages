#!/usr/bin/env node

'use strict'
require('./env.js')
const fs = require('fs')
const path = require('path')

const express = require('express')
const app = express()

const sites = new Set(fs.readdirSync(path.join(__dirname, 'sites')))
app.use((req, res, next) => {
  if (req.hostname === 'localhost' || req.hostname === '127.0.0.1') {
    req.site = req.query.site
  }
  if (sites.has(req.site)) {
    express.static(path.join(__dirname, 'sites', req.site))(req, res, next)
  } else {
    res.status(404).end()
  }
})

app.listen(process.env.PORT, function () {
  console.log('Listening on port ' + process.env.PORT)
})
