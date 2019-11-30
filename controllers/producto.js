'use strict'

const Producto = require('../models/producto')

function getProducto (req, res) {
  let Codpro = req.params.Codpro

  Producto.findById(Codpro, (err, producto) => {
    if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if(!producto) return res.status(404).send({message: `Error el producto no existe`})

    res.status(200).send({ producto })
  })
}

function getProductos (req, res) {
  Producto.find({}, (err, productos) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!productos) return res.status(404).send({message: `No existen productos`})

    res.status(200).send({ productos })
  })
}

function saveProducto (req, res) {
  console.log('POST /api/producto')
  console.log(req.body)

  let producto = new Producto()

  producto.Despro = req.body.Despro
  producto.Preunt = req.body.Preunt

  producto.save((err, productoStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({producto: productoStored})
  })
}

function updateProducto (req, res) {
  let Codpro = req.params.Codpro
  let update = req.body

  Producto.findByIdAndUpdate(Codpro, update, (err, productoUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar el producto ${err}`})

    res.status(200).send({ producto: productoUpdated})
  })
}

function deleteProducto (req, res) {
  let Codpro = req.params.Codpro

  Producto.findById(Codpro, (err, producto) => {
    if(err) res.status(500).send({message: `Error al borrar el productoo ${err}`})

    producto.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar el producto ${err}`})
      res.status(200).send({message: `El producto se ha sido eliminada`})
    })
  })
}

module.exports = {
  getProducto,
  getProductos,
  saveProducto,
  updateProducto,
  deleteProducto
}
