// Importa o  módulo NET
import net from 'net';


// --------------------------------------------------------
// Class: net.Server
// --------------------------------------------------------

// Cria um servido TCP ou IPC
//const serSocket = net.createServer();
const serSocket = new net.Server();

// Async
// IP 0.0.0.0 ouvirá em todos os IPs
serSocket.listen({
  //host: "172.25.160.1",
  //port: process.env.PORT || 9999,
  port: 444,
  backlog: 1
});

// O servidor tem 5s para aceitar conexões
setTimeout(() => {
  // serSocket.close();
  //console.log('TIMEOUT............')
}, 5000);

// ----------------------------------------------------------------

// Class: net.Server
// Event: 'close'
// Doc: Este evento não será emitido até que todas as conexões sejam encerradas.
serSocket.on('close', () => {
  console.log(
    '[net.Server] [Event] [close] Todas as conexões dos Clientes com o Servidor foram encerradas'
  );
});

// ----------------------------------------------------------------

// Class: net.Server
// Event: 'connection'
// net.Socket: clientSocket: Conexão com um Cliente
// Doc: clientSocket é criado por Node.js
serSocket.on('connection', (clientSocket) => {
  console.log(
    '[net.Server] [Event] [connection] Conexão entre Cliente/Servidor estabelecida'
  );

  // ----------------------------------------------------------------
  //                        Client Socket
  // ----------------------------------------------------------------

  // Class: net.Socket
  // Event: 'close'
  // boolean: hadError: TRUE se foi fechado devido a um erro de transmissão.
  // Doc: Emitido quando o socket está totalmente fechado
  clientSocket.on('close', (hadError) => {
    const append = hadError ? 'com erro' : 'sem erro';
    console.log(
      '[net.Socket] [event] [close] Socket fechado', append, 'de transmissão'
    );
  });

  // ----------------------------------------------------------------

  // Class: net.Socket
  // Event: 'connect'
  // Doc: Emitido quando uma conexão de soquete é estabelecida com sucesso
  clientSocket.on('connect', () => {
    console.log(
      '[net.Server] [Event] [connection] Conexão entre Cliente/Servidor estabelecida'
    );

    console.log('\Client IP Address', clientSocket.remoteAddress)
    console.log('\tClient TCP Port', clientSocket.remotePort)
  });

  // ----------------------------------------------------------------

  // Class: net.Socket
  // Event: 'data'
  // Buffer | String: data
  // Doc: Emitido quando os dados são recebidos.
  clientSocket.on('data', (data) => {
    console.log(
      '[net.Socket] [Event] [data] O cliente enviou dados...'
    );
    console.log('\tDado Recebido:', data.toString());
  });

  // ----------------------------------------------------------------

  // Class: net.Socket
  // Event: 'drain'
  // Doc: Emitido quando o buffer de gravação fica vazio.
  // Nota: Pode ser usado para acelerar uploads.
  clientSocket.on('drain', () => {
    console.log(
      '[net.Socket] [Evet] [drain] O buffer de gravação está vazio'
    );
  });

  // ----------------------------------------------------------------

  // Class: net.Socket
  // Event: 'end'
  // Doc: Emitido quando a outra extremidade do socket envia um pacote FIN
  clientSocket.on('end', () => {
    console.log(
      '[net.Socket] [Event] [end] O socket da outra extremidade enviou um pacote FIN'
    );
  });

  // ----------------------------------------------------------------

  // Class: net.Socket
  // Event: 'error'
  // Error: err
  // Doc: Emitido quando ocorre um erro.
  // Nota: O evento 'close' será emitido após este evento.
  clientSocket.on('error', (err) => {
    console.log(
      '[net.Socket] [Event] [error] Ocorreu um erro'
    );
    switch (err.code) {
      case 'ECONNRESET': {
        //console.log('\t[net.Socket] [ERROR] [Client] O clietne fechou a conexão abruptamente');
        console.log('\t[net.Socket] [ERROR] [Client] O cliete fechou a conexão com a flag RST e não com a flag FIN');
        break;
      }
    }

    clientSocket.on('end', () => {
      console.log('\t[net.Socket] [EVENT] [end] [Client] O cliete fechou a conexão com a flag FIN');
    });
  })

  // ----------------------------------------------------------------

  // Class: net.Socket
  // Event: 'lookup'
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

  // Class: net.Socket
  // Event: 'ready'
  // Doc: Emitido quando um soquete está pronto para ser usado.
  // Nota: Emitido após o evento 'connect'
  clientSocket.on('ready', () => {
    console.log(
      '[net.Socket] [Event] [ready] O socket está pronto para ser usado'
    );
  });

  // ----------------------------------------------------------------

  // Class: net.Socket
  // Event: 'timeout'
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