'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductoSchema = new Schema({
  Despro: String,
  Preunt: Number
})

module.exports = mongoose.model('Producto', ProductoSchema)
