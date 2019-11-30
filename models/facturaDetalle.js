'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Factura = mongoose.model('Factura')
const Producto = mongoose.model('Producto')

const FacturaDetalleSchema = new Schema({
  Codfac: {type: Schema.ObjectId, ref: "Factura"},
  Codpro: {type: Schema.ObjectId, ref: "Producto"},
  Canpro: Number,
  Subtot: Number
})

module.exports = mongoose.model('FacturaDetalle', FacturaDetalleSchema)
