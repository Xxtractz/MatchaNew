const io = require('../server').io;

const users = [];

module.exports = function (socket) {
    console.log("Socket Id => " + socket.id);

    socket.on('user_connected', (username) => {
        users[username] = socket.id;

        io.emit('user_connected');
    });
}