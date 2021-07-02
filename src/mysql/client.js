'use strict'
const promisify = require('pify')
const mysql = require('mysql')



module.exports = mysqlClient

function mysqlClient(opt) {
  if (!(this instanceof mysqlClient)) {
    return new mysqlClient(opt)
  }
  this.pool = mysql.createPool(opt);
  ['query', 'getConnection'].forEach((method) => {
    this.pool[method] = promisify(this.pool[method])
  })
}
const proto = mysqlClient.prototype

proto.getConnection = function () {
  return this.pool.getConnection().then(onConnection, onError)
  function onConnection(conn) {
    return new mysqlClient(conn)
  }
  function onError(err) {
    if (err.name === 'Error') {
      err.name = 'mysqlClient.GetConnectionError'
    }
    throw err
  }
}



