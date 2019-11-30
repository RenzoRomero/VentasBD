'use strict'

const FacturaDetalle = require('../models/facturaDetalle')
const Factura = require('../models/factura')
const Producto = require('../models/producto')
const Cliente = require('../models/cliente')

function getFacturaDetalle (req, res) {
  let codfac = req.params.codfac

  FacturaDetalle.find({"Codfac":codfac}, (err, facturaDetalle) => {
    if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if(!facturaDetalle) return res.status(404).send({message: `Error el detalle de la factura no existe`})

    Factura.populate(facturaDetalle, {path: "Codfac"}, function(err, facturaDetalle){
      Producto.populate(facturaDetalle, {path: "Codpro"}, function(err, facturaDetalle){
        res.status(200).send({ facturaDetalle })
      });
    });
  })
}

function getFacturaDetalles (req, res) {
  FacturaDetalle.find({}, (err, facturaDetalles) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!facturaDetalles) return res.status(404).send({message: `No existen detalles de factura`})

    Factura.populate(facturaDetalles, {path: "Codfac"}, function(err, facturaDetalles){
      Producto.populate(facturaDetalles, {path: "Codpro"}, function(err, facturaDetalles){
        Cliente.populate(facturaDetalles, {path: "Codfac.Codcli"}, function(err, facturaDetalles){
          res.status(200).send({ facturaDetalles })
        });
      });
    });
  })
}

function saveFacturaDetalle (req, res) {
  console.log('POST /api/facturaDetalle')
  console.log(req.body)

  let facturaDetalle = new FacturaDetalle()

  facturaDetalle.Codfac = req.body.Codfac
  facturaDetalle.Codpro = req.body.Codpro
  facturaDetalle.Canpro = req.body.Canpro
  facturaDetalle.Subtot = req.body.Subtot

  facturaDetalle.save((err, facturaDetalleStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({facturaDetalle: facturaDetalleStored})
  })
}

function updateFacturaDetalle (req, res) {
  let facturaDetalleId = req.params.facturaDetalleId
  let update = req.body

  FacturaDetalle.findByIdAndUpdate(facturaDetalleId, update, (err, facturaDetalleUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar el facturaDetalle ${err}`})

    res.status(200).send({ facturaDetalle: facturaDetalleUpdated})
  })
}

function deleteFacturaDetalle (req, res) {
  let facturaDetalleId = req.params.facturaDetalleId

  FacturaDetalle.findById(facturaDetalleId, (err, facturaDetalle) => {
    if(err) res.status(500).send({message: `Error al borrar el detalle de factura ${err}`})

    facturaDetalle.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar el detalle de factura ${err}`})
      res.status(200).send({message: `El detalle de factura se ha sido eliminada`})
    })
  })
}

module.exports = {
  getFacturaDetalle,
  getFacturaDetalles,
  saveFacturaDetalle,
  updateFacturaDetalle,
  deleteFacturaDetalle
}
