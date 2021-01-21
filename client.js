// Importand o módulo NET
const net = require('net');


// createConnection
const cliSocket = net.createConnection({
  port: 8888
});


const time = 10000;
console.log('[net.Socket] [Client] Timeout será definido para', time);
cliSocket.setTimeout(time)


/// --------------------------------------------------------
// Classe: net.Socket
// --------------------------------------------------------

// Event: 'close'
cliSocket.on('close', (hadError) => {
  const append = hadError ? 'com erro' : 'sem erro';
  console.log('[net.Socket] [EVENT] [close] Socket fechado', append);
});

// Class: net.Socket
// Event: 'connect'
cliSocket.on('connect', () => {
  console.log('[net.Socket] [EVENT] [connect] Conexão com socket estabelecida');

  console.log('\tServer IP Address', cliSocket.remoteAddress)
  console.log('\tServer TCP Port', cliSocket.remotePort)
});

// Event: 'data'
cliSocket.on('data', (data) => {
  console.log('[net.Socket] [EVENT] [data] Dados recebidos');

});

// Event: 'drain'
cliSocket.on('drain', () => {
  console.log('[net.Socket] [EVENT] [drain] O buffer de gravação está vazio');
});

// Event: 'end'
cliSocket.on('end', () => {
  console.log('[net.Socket] [EVENT] [end] Cliente desconectado')
});

// Event: 'error'
// Error: 'err'
cliSocket.on('error', (err) => {
  console.log(`[net.Socket] [EVENT] [error] Ocorreu um erro:`);

  switch (err.code) {
    case 'EADDRINUSE': {
      console.log('\t[net.Socket] [ERROR] [Server] Uma porta será atribuida arbitráriamente');
      cliSocket.listen(0);
      break;
    }
    case 'ECONNREFUSED': {
      console.log('\t[net.Socket] [ERROR] [Server] Conexão recusada pelo servidor')
      break;
    }
    case 'ECONNRESET': {
      console.log('\t[net.Socket] [ERROR] [Server] O servidor fechou a conexão abruptamente ');
      break;
    }
  }
});

// Event: 'lookup'
cliSocket.on('lookup', () => {
  console.log('[net.Socket] [EVENT] [lookup] Nome do host resolvido')
});

// Event: 'ready'
cliSocket.on('ready', () => {
  console.log('[net.Socket] [EVENT] [ready] O socket está pronto para ser usado')
});

// Event: 'timeout'
cliSocket.on('timeout', () => {
  console.log('[net.Socket] [EVENT] [timeout] O socket expirou devido a inatividade')
});