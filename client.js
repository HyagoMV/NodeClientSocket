// Importand o módulo NET
const net = require('net');

const client = net.createConnection({
  port: 8888
});

client.setTimeout(5000); // 1s

/// --------------------------------------------------------
// Classe: net.Socket
// --------------------------------------------------------

// Event: 'close'
client.on('close', (hadError) => {
  const append = hadError ? 'com erro' : 'sem erro';
  console.log('[net.Socket] [EVENT] [close] Socket fechado', append);
});

// Event: 'connect'
client.on('connect', () => {
  console.log('[net.Socket] [EVENT] [connect] Conexão com socket estabelecida');
});

// Event: 'data'
client.on('data', (data) => {
  console.log('[net.Socket] [EVENT] [data] Dados recebidos');
});

// Event: 'drain'
client.on('drain', () => {
  console.log('[net.Socket] [EVENT] [drain] O buffer de gravação está vazio');
});

// Event: 'end'
client.on('end', () => {
  console.log('[net.Socket] [EVENT] [end] Cliente desconectado')
});

// Event: 'error'
client.on('error', (err) => {
  console.log(`[net.Socket] [EVENT] [error] Ocorreu um erro:`);

  switch (err.code) {
    case 'EADDRINUSE': {
      console.log('\t[net.Socket] [ERROR] [Server] Uma porta será atribuida arbitráriamente');
      client.listen(0);
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
client.on('lookup', () => {
  console.log('[net.Socket] [EVENT] [lookup] Nome do host resolvido')
});

// Event: 'ready'
client.on('ready', () => {
  console.log('[net.Socket] [EVENT] [ready] O socket está pronto para ser usado')
});

// Event: 'timeout'
client.on('timeout', () => {
  console.log('[net.Socket] [EVENT] [timeout] O socket expirou devido a inatividade')
});