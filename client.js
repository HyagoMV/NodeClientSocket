// Importand o módulo NET
const net = require('net');

const socket = net.createConnection({
  port: 8888
});


// --------------------------------------------------------
// Classe: net.Socket
// --------------------------------------------------------

// Event: 'close'
socket.on('close', (hadError) => {
  if (hadError)
    console.log('[net.Socket] Socket fechado com erro');
  else
    console.log('[net.Socket] Socket fechado sem erro');
});

// Event: 'connect'
socket.on('connect', () => {
  console.log('[net.Socket] Conexão com socket estabelecida');
});

// Event: 'data'
socket.on('data', (data) => {
  console.log('[net.Socket] Dados recebidos');
});

// Event: 'drain'
socket.on('drain', () => {
  console.log('[net.Socket] O buffer de gravação está vazio');
});

// Event: 'end'
socket.on('end', () => {
  console.log('[net.Socket] Cliente desconectado')
});

// Event: 'error'
socket.on('error', (err) => {
  console.log('[net.Socket] Ocorreu um erro:')
  console.log(`\t[MESSAGE] ${err.message}`);

  switch (err.code) {
    case 'EADDRINUSE': {
      console.log('[net.Socket] O sistema operacional atribuirá uma porta não utilizada arbitrária');
      socket.listen(0);
      break;
    }
  }
});

// Event: 'lookup'
socket.on('lookup', () => {
  console.log('[net.Socket] Nome do host resolvido')
});

// Event: 'ready'
socket.on('ready', () => {
  console.log('[net.Socket] O socket está pronto para ser usado')
});

// Event: 'timeout'
socket.on('timeout', () => {
  console.log('[net.Socket] O socket expirou devido a inatividade')
});