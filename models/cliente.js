'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClienteSchema = new Schema({
  Nomcli: String,
  Discli: String,
  Telcli: String
})

module.exports = mongoose.model('Cliente', ClienteSchema)
