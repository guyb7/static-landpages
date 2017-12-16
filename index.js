#!/usr/bin/env node

'use strict'
require('./env.js')
const fs = require('fs')
const path = require('path')

const express = require('express')
const app = express()

app.set('trust proxy', 1)
app.use(express.static('shared'))

const sites = new Set(fs.readdirSync(path.join(__dirname, 'sites')))
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    req.site = req.query.site
  } else {
    req.site = req.headers.host
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
