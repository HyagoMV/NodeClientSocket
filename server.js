// Importa o  módulo NET
import net from 'net';
import { setTimeout } from 'timers';


// --------------------------------------------------------
//                        Server TCP
//                        Class: net.Server
// --------------------------------------------------------

// Cria um servido TCP
const server = new net.Server({
  allowHalfOpen: false,  // Padrão
  pauseOnConnect: false  // Padrão
});

// ----------------------------------------------------------------

// Async
// Doc: Impede o servidor de aceitar novas conexões e mantém as conexões existentes.
// Nota: O servidor só é fechado quando todas as conexões são encerradas
// Nota: Emite o evento 'close'
setTimeout(() => {
  server.close();
}, 5000);

// ----------------------------------------------------------------

// Async
// Doc: Obtem o número de conexões simultâneas no servidor
// Nota: Emite o evento 'listening'
setInterval(() => {
  server.getConnections((err, count) => {
    console.log(count)
  });
}, 5000);

// ----------------------------------------------------------------

// Async
// Doc: O servidor começará a ouvir por conexões
// Nota: Se port for omitido ou for 0, o sistema operacional atribuirá uma porta não utilizada arbitrária
server.listen({
  port: process.env.PORT || 9999,
  host: '::1', // 0:0:0:0:0:0:0:1 Local addresses
  ipv6Only: true
});

// Doc: Rejeitar novas conexões quando o valor máximo de conexões for atingida
server.maxConnections = 2

// ----------------------------------------------------------------
//                        Server TCP
//                        Class: net.Server
//                        Event: 'close'
// ----------------------------------------------------------------

// Doc: Emitido quando o servidor fecha
// Nota: Este evento não será emitido até que todas as conexões sejam encerradas.
server.on('close', (e) => {
  console.log(
    '[net.Server] [Event] [close] Todas as conexões Cliente/Servidor foram encerradas'
  );
  process.exit();
});

// ----------------------------------------------------------------
//                        Server TCP
//                        Class: net.Server
//                        Event: 'connection'
// ----------------------------------------------------------------

// net.Socket: clientSocket
// Doc: Emitido quando uma nova conexão é feita
// Nota: clientSocket é criado por Node.js
server.on('connection', (clientSocket) => {
  console.log(
    '[net.Server] [Event] [connection] Conexão entre Cliente/Servidor estabelecida'
  );

  // ----------------------------------------------------------------
  //                        Client Socket
  //                        Class: net.Socket
  //                        Event: 'close'
  // ----------------------------------------------------------------

  // boolean: hadError: TRUE se foi fechado devido a um erro de transmissão.
  // Doc: Emitido quando o socket está totalmente fechado
  clientSocket.on('close', (hadError) => {
    const append = hadError ? 'com erro' : 'sem erro';
    console.log(
      '[net.Socket] [Event] [close] O soquete do cliente foi fechado', append, 'de transmissão'
    );
  });


  // ----------------------------------------------------------------
  //                        Client Socket
  //                        Class: net.Socket
  //                        Event: 'connect'
  // ----------------------------------------------------------------

  // Doc: Emitido quando uma conexão de soquete é estabelecida com sucesso
  clientSocket.on('connect', () => {
    console.log(
      '[net.Socket] [Event] [connect] Conexão entre Cliente/Servidor estabelecida'
    );

    console.log('\tClient IP Address', clientSocket.remoteAddress)
    console.log('\tClient TCP Port', clientSocket.remotePort)
  });

  // ----------------------------------------------------------------
  //                        Client Socket
  //                        Class: net.Socket
  //                        Event: 'data'
  // ----------------------------------------------------------------

  // Buffer | String: data
  // Doc: Emitido quando os dados são recebidos.
  clientSocket.on('data', (data) => {
    console.log(
      '[net.Socket] [Event] [data] O cliente enviou dados...'
    );
    // A quantidade de bytes recebidos.
    console.log('\tQuantidade de bytes:', clientSocket.bytesRead);
    console.log('\tDado Recebido:', data.toString());
  });

  // ----------------------------------------------------------------
  //                        Client Socket
  //                        Class: net.Socket
  //                        Event: 'drain'
  // ----------------------------------------------------------------

  // Doc: Emitido quando o buffer de gravação fica vazio.
  // Nota: Pode ser usado para acelerar uploads.
  clientSocket.on('drain', () => {
    console.log(
      '[net.Socket] [Event] [drain] O buffer de gravação está vazio'
    );
  });

  /// ----------------------------------------------------------------
  //                        Client Socket
  //                        Class: net.Socket
  //                        Event: 'end'
  // ----------------------------------------------------------------

  // Doc: Emitido quando a outra extremidade do socket envia um pacote FIN
  clientSocket.on('end', () => {
    console.log(
      '[net.Socket] [Event] [end] O socket da outra extremidade enviou um pacote FIN'
    );
  });

  // ----------------------------------------------------------------
  //                        Client Socket
  //                        Class: net.Socket
  //                        Event: 'error'
  // ----------------------------------------------------------------

  // Error: err
  // Doc: Emitido quando ocorre um erro.
  // Nota: O evento 'close' será emitido após este evento.
  clientSocket.on('error', (err) => {
    console.log(
      '[net.Socket] [Event] [error] Ocorreu um erro'
    );
  })

  // ----------------------------------------------------------------
  //                        Client Socket
  //                        Class: net.Socket
  //                        Event: 'lookup'
  // ----------------------------------------------------------------

  // Error | nulll: err
  // string: address
  // string | null: family
  // string: host
  // Doc: Emitido após resolver o nome do host, mas antes de conectar.
  // Nota: Não aplicável a soquetes Unix.
  clientSocket.on('lookup', (err, address, family, host) => {
    console.log(
      '[net.Socket] [Event] [lookup] Nome do host resolvido'
    );
  });

  // ----------------------------------------------------------------
  //                        Client Socket
  //                        Class: net.Socket
  //                        Event: 'ready'
  // ----------------------------------------------------------------

  // Doc: Emitido quando um soquete está pronto para ser usado.
  // Nota: Emitido após o evento 'connect'
  clientSocket.on('ready', () => {
    console.log(
      '[net.Socket] [Event] [ready] O socket está pronto para ser usado'
    );
  });

  // ----------------------------------------------------------------
  //                        Client Socket
  //                        Class: net.Socket
  //                        Event: 'timeout'
  // ----------------------------------------------------------------

  // Doc: Emitido se o soquete expirar devido à inatividade
  // Nota: Deve-se fechar manualmente a conexão.
  clientSocket.on('timeout', () => {
    console.log(
      '[net.Socket] [Event] [timeout] O socket expirou devido a inatividade'
    );
    clientSocket.end(); // ?
  });
});

// ----------------------------------------------------------------
//                        Server TCP
//                        Class: net.Server
//                        Event: 'error'
// ----------------------------------------------------------------

// Doc: Emitido quando ocorre um erro
// Nota: O evento'close'  não será emitido automaticamente
server.on('error', (err) => {
  let append;
  switch (err.code) {
    case 'EADDRNOTAVAIL': {
      append = `Endereço não disponível: ${err.address}`;
      break;
    }
    case 'EADDRINUSE': {
      append = `Endereço já em uso ${err.address}`;
      break;
    }
    default: {
      append = err.code;
      break;
    }
  }
  console.log(
    '[net.Socket] [Event] [error]', append
  );
})

// ----------------------------------------------------------------
//                        Server TCP
//                        Class: net.Server
//                        Event: 'listening'
// ----------------------------------------------------------------

// Doc: Emitido quando o servidor está vinculada a uma porta
server.on('listening', () => {
  console.log(
    '[net.Server] [Event] [listening] '
  );

  console.log('\t', server.address());
})

// ----------------------------------------------------------------
//                        Server Socket
//                        Class: net.Socket
//                        Event: 'close'
// ----------------------------------------------------------------

// boolean: hadError: TRUE se foi fechado devido a um erro de transmissão.
// Doc: Emitido quando o socket está totalmente fechado
server.on('close', (hadError) => {
  const append = hadError ? 'com erro' : 'sem erro';
  console.log(
    '[net.Socket] [close] O soquete do servidor foi fechado', append, 'de transmissão'
  );
});

// ----------------------------------------------------------------
//                        Server Socket
//                        Class: net.Socket
//                        Event: 'connect'
// ----------------------------------------------------------------

// Class: net.Socket
// Event: 'connect'
// Doc: Emitido quando uma conexão de soquete é estabelecida com sucesso
server.on('connect', () => {
  console.log(
    '[net.Socket] [Event] [connect] Conexão entre Cliente/Servidor estabelecida'
  );

  console.log(
    '\tServer IP Address', server.remoteAddress
  );
  console.log(
    '\ttServer TCP Port', server.remotePort
  );
});

// ----------------------------------------------------------------
//                        Server Socket
//                        Class: net.Socket
//                        Event: 'data'
// ----------------------------------------------------------------

// Class: net.Socket
// Event: 'data'
// Buffer | String: data
// Doc: Emitido quando os dados são recebidos.
server.on('data', (data) => {
  console.log(
    '[net.Socket] [Event] [data] O cliente enviou dados...'
  );
  console.log('\tDado Recebido:', data.toString());
});

// ----------------------------------------------------------------
//                        Server Socket
//                        Class: net.Socket
//                        Event: 'drain'
// ----------------------------------------------------------------

// Class: net.Socket
// Event: 'drain'
// Doc: Emitido quando o buffer de gravação fica vazio.
// Nota: Pode ser usado para acelerar uploads.
server.on('drain', () => {
  console.log(
    '[net.Socket] [Event] [drain] O buffer de gravação está vazio'
  );
});

// ----------------------------------------------------------------
//                        Server Socket
//                        Class: net.Socket
//                        Event: 'end'
// ----------------------------------------------------------------

// Class: net.Socket
// Event: 'end'
// Doc: Emitido quando a outra extremidade do socket envia um pacote FIN
server.on('end', () => {
  console.log(
    '[net.Socket] [Event] [end] O socket da outra extremidade enviou um pacote FIN'
  );
});

// ----------------------------------------------------------------
//                        Server Socket
//                        Class: net.Socket
//                        Event: 'error'
// ----------------------------------------------------------------

// Class: net.Socket
// Event: 'error'
// Error: err
// Doc: Emitido quando ocorre um erro.
// Nota: O evento 'close' será emitido após este evento.
server.on('error', (err) => {
  let append;
  switch (err.code) {
    case 'EADDRINUSE': {
      append = 'Endereço já em uso';
      break;
    }
  }

  console.log(
    '[net.Socket] [Event] [error]', append
  );
})

// ----------------------------------------------------------------
//                        Server Socket
//                        Class: net.Socket
//                        Event: 'lookup'
// ----------------------------------------------------------------

// Class: net.Socket
// Event: 'lookup'
// Error | nulll: err
// string: address
// string | null: family
// string: host
// Doc: Emitido após resolver o nome do host, mas antes de conectar.
// Nota: Não aplicável a soquetes Unix.
server.on('lookup', (err, address, family, host) => {
  console.log(
    '[net.Socket] [Event] [lookup] Nome do host resolvido'
  );
});

// ----------------------------------------------------------------
//                        Server Socket
//                        Class: net.Socket
//                        Event: 'ready'
// ----------------------------------------------------------------

// Class: net.Socket
// Event: 'ready'
// Doc: Emitido quando um soquete está pronto para ser usado.
// Nota: Emitido após o evento 'connect'
server.on('ready', () => {
  console.log(
    '[net.Socket] [Event] [ready] O socket está pronto para ser usado'
  );
});

// ----------------------------------------------------------------
//                        Server Socket
//                        Class: net.Socket
//                        Event: 'timeout'
// ----------------------------------------------------------------

// Class: net.Socket
// Event: 'timeout'
// Doc: Emitido se o soquete expirar devido à inatividade
// Nota: Deve-se fechar manualmente a conexão.
server.on('timeout', () => {
  console.log(
    '[net.Socket] [Event] [timeout] O socket expirou devido a inatividade'
  );
  clientSocket.end(); // ?
});