'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Cliente = mongoose.model('Cliente')

const FacturaSchema = new Schema({
  Codcli: {type: Schema.ObjectId, ref: "Cliente"},
  Fecfac: Date,
  Totfac: String
})

module.exports = mongoose.model('Factura', FacturaSchema)
