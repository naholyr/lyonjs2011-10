
/**
 * Module dependencies.
 */

var connect = require('connect')
  , socketio = require('socket.io')
  , app = connect.createServer(connect.static(__dirname + '/public'))
  , sockets = socketio.listen(app).sockets

sockets.on('connection', function (client) {
  client
  .on('auth-controller', function (pass) {
    if (pass == 'coucougamin') {
      client.controller = true
      client.emit('auth-controller.success')
    } else {
      client.emit('auth-controller.error', 'invalid password')
    }
  })
  .on('deck', function () {
    if (client.controller) {
      var args = Array.prototype.slice.call(arguments)
      args.unshift('deck')
      sockets.emit.apply(sockets, args)
    }
  })
})

app.listen(1338)
