
/**
 * Module dependencies.
 */

var connect = require('connect')
  , socketio = require('socket.io')
  , app = connect.createServer(connect.static(__dirname + '/public'))
  , sockets = socketio.listen(app).sockets
  , password = ['sha256', 'a901d03d36717cdb3a75e9a0b85cecca480482ba46de44a3eaa2798b68420981']
  , curr_slide = 0

sockets.on('connection', function (client) {
  client
  .on('auth-controller', function (pass) {
    if (require('crypto').createHash(password[0]).update(pass).digest('hex') == password[1]) {
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
      if (args[1] == 'go') {
        curr_slide = parseInt(args[2])
      }
    }
  })
  .emit('deck', 'go', curr_slide)
})

app.listen(1338)
