'use strict'

const Cliente = require('../models/cliente')

function getCliente (req, res) {
  let Codcli = req.params.Codcli

  Cliente.findById(Codcli, (err, cliente) => {
    if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if(!cliente) return res.status(404).send({message: `Error el cliente no existe`})

    res.status(200).send({ cliente })
  })
}

function getClientes (req, res) {
  Cliente.find({}, (err, clientes) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!clientes) return res.status(404).send({message: `No existen clientes`})

    res.status(200).send({ clientes })

  })
}

function saveCliente (req, res) {
  console.log('POST /api/cliente')
  console.log(req.body)

  let cliente = new Cliente()

  cliente.Nomcli = req.body.Nomcli
  cliente.Discli = req.body.Discli
  cliente.Telcli = req.body.Telcli

  cliente.save((err, clienteStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({cliente: clienteStored})

  })
}

function updateCliente (req, res) {
  let Codcli = req.params.Codcli
  let update = req.body

  Cliente.findByIdAndUpdate(Codcli, update, (err, clienteUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar el cliente ${err}`})

    res.status(200).send({ cliente: clienteUpdated})
  })
}

function deleteCliente (req, res) {
  let Codcli = req.params.Codcli

  Cliente.findById(Codcli, (err, cliente) => {
    if(err) res.status(500).send({message: `Error al borrar el cliente ${err}`})

    cliente.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar el cliente ${err}`})
      res.status(200).send({message: `El cliente se ha sido eliminada`})
    })
  })
}

module.exports = {
  getCliente,
  getClientes,
  saveCliente,
  updateCliente,
  deleteCliente
}
