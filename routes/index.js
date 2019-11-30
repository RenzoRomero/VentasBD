'use strict'

const express = require('express')
const clienteCtrl = require('../controllers/cliente')
const productoCtrl = require('../controllers/producto')
const facturaCtrl = require('../controllers/factura')
const facturaDetalleCtrl = require('../controllers/facturaDetalle')

const api = express.Router()

api.get('/cliente', clienteCtrl.getClientes)
api.get('/cliente/:Codcli', clienteCtrl.getCliente)
api.post('/cliente', clienteCtrl.saveCliente)
api.put('/cliente/:Codcli', clienteCtrl.updateCliente)
api.delete('/cliente/:Codcli', clienteCtrl.deleteCliente)

api.get('/producto', productoCtrl.getProductos)
api.get('/producto/:Codpro', productoCtrl.getProducto)
api.post('/producto', productoCtrl.saveProducto)
api.delete('/producto/:Codpro', productoCtrl.deleteProducto)
api.put('/producto/:Codpro', productoCtrl.updateProducto)

api.get('/factura', facturaCtrl.getFacturas)
api.get('/factura/:Codfac', facturaCtrl.getFactura)
api.post('/factura', facturaCtrl.saveFactura)
api.delete('/factura/:Codfac', facturaCtrl.deleteFactura)
api.put('/factura/:Codfac', facturaCtrl.updateFactura)

api.get('/facturaDetalle', facturaDetalleCtrl.getFacturaDetalles)
api.get('/facturaDetalle/:Codfac', facturaDetalleCtrl.getFacturaDetalle)
api.post('/facturaDetalle', facturaDetalleCtrl.saveFacturaDetalle)
api.delete('/facturaDetalle/:facturaDetalleId', facturaDetalleCtrl.deleteFacturaDetalle)
api.put('/facturaDetalle/:facturaDetalleId', facturaDetalleCtrl.updateFacturaDetalle)

module.exports = api
