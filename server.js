// Importand o módulo NET
const net = require('net');


// Cria um servido TCP ou IPC
const server = net.createServer();

// Async
// Emite -> Event: 'listening'
server.listen({
  port: process.env.PORT || 9999,
  backlog: 1
});



// --------------------------------------------------------
// Classe: net.Server
// --------------------------------------------------------

// Event: 'close'
server.on('close', () => {
  console.log('[net.Server] Serivor fechado')
});

// Event: 'connection'
server.on('connection', (clientSocket) => {
  console.log('[net.Server] Cliente conectado')

  console.log(clientSocket.bytesWritten)
});

// Event: 'error'
server.on('error', (err) => {
  console.log('[net.Server] Um erro ocorreu')
  console.log(`\t[MESSAGE] ${err.message}`);
});

// Event: 'listening'
server.on('listening', () => {
  const { address, port } = server.address();

  console.log('[net.Server] Servidor está ouvindo...')
  console.log(`\t IP ${address}`)
  console.log(`\t PORT ${port}`)
})






// --------------------------------------------------------
// Classe: net.Socket
// --------------------------------------------------------

// Event: 'close'
server.on('close', (hadError) => {
  if (hadError)
    console.log('[net.Socket] Socket fechado com erro');
  else
    console.log('[net.Socket] Socket fechado sem erro');
});

// Event: 'connect'
server.on('connect', () => {
  console.log('[net.Socket] Conexão com socket estabelecida');
});

// Event: 'data'
server.on('data', (data) => {
  console.log('[net.Socket] Dados recebidos');
});

// Event: 'drain'
server.on('drain', () => {
  console.log('[net.Socket] O buffer de gravação está vazio');
});

// Event: 'end'
server.on('end', () => {
  console.log('[net.Socket] Cliente desconectado')
});

// Event: 'error'
server.on('error', (err) => {
  console.log('[net.Socket] Ocorreu um erro:')
  console.log(`\t[MESSAGE] ${err.message}`);

  switch (err.code) {
    case 'EADDRINUSE': {
      console.log('[net.Socket] O sistema operacional atribuirá uma porta não utilizada arbitrária');
      server.listen(0);
      break;
    }
  }
});

// Event: 'lookup'
server.on('lookup', () => {
  console.log('[net.Socket] Nome do host resolvido')
});

// Event: 'ready'
server.on('ready', () => {
  console.log('[net.Socket] O socket está pronto para ser usado')
});

// Event: 'timeout'
server.on('timeout', () => {
  console.log('[net.Socket] O socket expirou devido a inatividade')
});