const socket = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');
const cli = require('nodemon/lib/cli');
const { nanoid } = require('nanoid');

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);
    readStream.pipe(res);
});


const io = socket(server);

io.on('connection', (client) => {
    let clientBox = {
        name: nanoid(4),
        info: client,
    };
    
    const clientName = clientBox.name;

    


    client.broadcast.emit('new_connection', { note: `${clientBox.name} connected` });
  
    client.on('disconnect', () => {
        client.broadcast.emit('disconnection', { note: `${ clientBox.name } disconnected` });

        

    });

    client.on('client-msg', (data) => {
        console.log(data);

        const serverData = {
            message: data.message.split('').reverse().join(''),
            name: clientName,
        };
        client.broadcast.emit('server-msg', serverData);
        client.emit('server-msg', serverData);
    });


})
server.listen(5555);



