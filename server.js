// Importand o módulo NET
const net = require('net');

// --------------------------------------------------------
// Classe: net.Server
// --------------------------------------------------------

// Cria um servido TCP ou IPC
//const server = net.createServer();
const server = new net.Server();

// Async
server.listen({
  port: process.env.PORT || 9999,
  backlog: 1
});

// O servidor tem 5s para aceitar conexões
setTimeout(() => {
  server.close();
}, 5000);


// Event: 'close'
server.on('close', () => {
  console.log('[net.Server] [EVENT] Serivor fechado')
});

// Event: 'connection'
server.on('connection', (client) => {
  console.log('[net.Server] [EVENT] [connection] Cliente conectado')

  client.setTimeout(5000)

  // Event: 'error'
  client.on('error', (err) => {
    switch (err.code) {
      case 'ECONNRESET': {
        console.log('\t[net.Socket] [ERROR] [Client] O cliente fechou a conexão abruptamente ');
        break;
      }
    }
  })

  // Event: 'timeout'
  client.on('timeout', () => {
    console.log('[net.Socket] [EVENT] [timeout] O socket expirou devido a inatividade')
    client.end()
  });
});

// Event: 'error'
server.on('error', (err) => {
  console.log('[net.Server] [EVENT] [error] Um erro ocorreu')
  console.log(`\t[MESSAGE] ${err.message}`);
});

// Event: 'listening'
server.on('listening', () => {
  const { address, port } = server.address();

  console.log('[net.Server] [EVENT] [listening] Servidor está ouvindo...')
  console.log(`\t IP ${address}`)
  console.log(`\t PORT ${port}`)
})


// --------------------------------------------------------
// Classe: net.Socket
// --------------------------------------------------------

// Event: 'close'
server.on('close', (hadError) => {
  const append = hadError ? 'com erro' : 'sem erro';
  console.log('[net.Socket] [close] Socket fechado', append);
});

// Event: 'connect'
server.on('connect', () => {
  console.log('[net.Socket] [connect] Conexão com socket estabelecida');
});

// Event: 'data'
server.on('data', (data) => {
  console.log('[net.Socket] [data] Dados recebidos');
});

// Event: 'drain'
server.on('drain', () => {
  console.log('[net.Socket] [drain] O buffer de gravação está vazio');
});

// Event: 'end'
server.on('end', () => {
  console.log('[net.Socket] [end] Cliente desconectado')
});

// Event: 'error'
server.on('error', (err) => {
  console.log(`[net.Socket] [error] Ocorreu um erro: ${err.message}`);

  switch (err.code) {
    case 'EADDRINUSE': {
      console.log('[net.Socket] [EADDRINUSE] Uma porta será atribuida arbitráriament');
      server.listen(0);
      break;
    }
  }
});

// Event: 'lookup'
server.on('lookup', () => {
  console.log('[net.Socket] [lookup] Nome do host resolvido')
});

// Event: 'ready'
server.on('ready', () => {
  console.log('[net.Socket] [ready] O socket está pronto para ser usado')
});

// Event: 'timeout'
server.on('timeout', () => {
  console.log('[net.Socket] [timeout] O socket expirou devido a inatividade')
});