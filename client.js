// Importand o módulo NET
const net = require('net');

const clientSocket = net.createConnection({
  port: 8888
});


// Eventos
clientSocket.on('connect', () => {
  console.log('Conectado ao Servidor');

  clientSocket.write('\tOlá Java!\n');
  clientSocket.write('\tMeu nome é Hyago!');

  clientSocket.end();
});

clientSocket.on('end', () => {
  console.log('Desconectado do Servidor')
})