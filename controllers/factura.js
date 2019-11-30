'use strict'

const Factura = require('../models/factura')
const Cliente = require('../models/cliente')

function getFactura (req, res) {
  let codfac = req.params.codfac

  Factura.findById(Codfac, (err, factura) => {
    if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if(!factura) return res.status(404).send({message: `Error el factura no existe`})

    Cliente.populate(factura, {path: "Codcli"}, function(err, factura){
      res.status(200).send({ factura })
    });

  })
}

function getFacturas (req, res) {
  Factura.find({}, (err, facturas) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!facturas) return res.status(404).send({message: `No existen facturas`})

    Cliente.populate(facturas, {path: "Codcli"}, function(err, facturas){
      res.status(200).send({ facturas })
    });

  })
}

function saveFactura (req, res) {
  console.log('POST /api/factura')
  console.log(req.body)

  let factura = new Factura()

  factura.Codcli = req.body.Codcli
  factura.Fecfac = req.body.Fecfac
  factura.Totfac = req.body.Totfac

  factura.save((err, facturaStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({factura: facturaStored})
  })
}

function updateFactura (req, res) {
  let codfac = req.params.codfac
  let update = req.body

  Factura.findByIdAndUpdate(codfac, update, (err, facturaUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar el factura ${err}`})

    res.status(200).send({ factura: facturaUpdated})
  })
}

function deleteFactura (req, res) {
  let codfac = req.params.codfac

  Factura.findById(codfac, (err, factura) => {
    if(err) res.status(500).send({message: `Error al borrar el facturao ${err}`})

    factura.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar el factura ${err}`})
      res.status(200).send({message: `El factura se ha sido eliminada`})
    })
  })
}

module.exports = {
  getFactura,
  getFacturas,
  saveFactura,
  updateFactura,
  deleteFactura
}
