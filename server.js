// Importand o módulo NET
const net = require('net');

// --------------------------------------------------------
// Classe: net.Server
// --------------------------------------------------------

// Cria um servido TCP ou IPC
//const serSocket = net.createServer();
const serSocket = new net.Server();

// Async
// IP 0.0.0.0 ouvirá em todos os IPs
serSocket.listen({
  //host: "172.25.160.1",
  port: process.env.PORT || 9999,
  backlog: 1
});

// O servidor tem 5s para aceitar conexões
setTimeout(() => {
  // serSocket.close();
  //console.log('TIMEOUT............')
}, 5000);


// Event: 'close'
serSocket.on('close', () => {
  console.log('[net.Server] [EVENT] Serivor fechado')
});

// Event: 'connection'
// <net.Socket> cliSocket
serSocket.on('connection', (cliSocket) => {
  console.log('[net.Server] [EVENT] [connection] Cliente conectado')

  console.log('\tClient IP Address', cliSocket.remoteAddress)
  console.log('\tClient TCP Port', cliSocket.remotePort)

  const time = 10000;
  console.log('[net.Server] [Client] Timeout será definido para', time);
  cliSocket.setTimeout(time)

  // Event: 'error'
  cliSocket.on('error', (err) => {
    switch (err.code) {
      case 'ECONNRESET': {
        console.log('\t[net.Socket] [ERROR] [Client] O cliSockete fechou a conexão abruptamente ');
        break;
      }
    }
  })

  // Event: 'timeout'
  cliSocket.on('timeout', () => {
    console.log('[net.Socket] [EVENT] [timeout] O socket expirou devido a inatividade')
    cliSocket.end()
  });
});

// Event: 'error'
serSocket.on('error', (err) => {
  console.log('[net.Server] [EVENT] [error] Um erro ocorreu')
  console.log(`\t[MESSAGE] ${err.message}`);
});

// Event: 'listening'
serSocket.on('listening', () => {
  const { address, port } = serSocket.address();

  console.log('[net.Server] [EVENT] [listening] Servidor está ouvindo...')
  console.log(`\t IP ${address}`)
  console.log(`\t PORT ${port}`)
})


// --------------------------------------------------------
// Classe: net.Socket
// --------------------------------------------------------

// Event: 'close'
serSocket.on('close', (hadError) => {
  const append = hadError ? 'com erro' : 'sem erro';
  console.log('[net.Socket] [close] Socket fechado', append);
});

// Event: 'connect'
serSocket.on('connect', () => {
  console.log('[net.Socket] [connect] Conexão com socket estabelecida');
});

// Event: 'data'
serSocket.on('data', (data) => {
  console.log('[net.Socket] [data] Dados recebidos');
});

// Event: 'drain'
serSocket.on('drain', () => {
  console.log('[net.Socket] [drain] O buffer de gravação está vazio');
});

// Event: 'end'
serSocket.on('end', () => {
  console.log('[net.Socket] [end] Cliente desconectado')
});

// Event: 'error'
serSocket.on('error', (err) => {
  console.log(`[net.Socket] [error] Ocorreu um erro:`);

  switch (err.code) {
    case 'EADDRINUSE': {
      console.log('[net.Socket] [EADDRINUSE] Uma porta será atribuida arbitráriament');
      serSocket.listen(0);
      break;
    }
    case 'EADDRNOTAVAIL': {
      console.log('[net.Socket] [EADDRINUSE] O endereço não está disponível');
      break;
    }
  }
});

// Event: 'lookup'
serSocket.on('lookup', () => {
  console.log('[net.Socket] [lookup] Nome do host resolvido')
});

// Event: 'ready'
serSocket.on('ready', () => {
  console.log('[net.Socket] [ready] O socket está pronto para ser usado')
});

// Event: 'timeout'
serSocket.on('timeout', () => {
  console.log('[net.Socket] [timeout] O socket expirou devido a inatividade')
});