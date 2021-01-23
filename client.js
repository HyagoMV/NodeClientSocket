// Importa o  módulo NET
import net from 'net';

// ----------------------------------------------------------------
//                        Client Socket
//                        Class: net.Socket
// --------------------------------------------------------

const socket = new net.Socket({
  allowHalfOpen: false,  // Padrão
});

// Async
// Doc: Inicie uma conexão em um determinado soquete.
// Nota: O evento 'connect' é emitido quando um conexão é estabelecida
// Nota: O evento 'error' é emitido quando ocorrer um error
// Nota: Só deve ser usada para reconectar um socket depois do evento 'close' ter sido emitido
socket.connect({
  port: 8888,
  host: '::1',
  localAddress: '::1',
  localPort: 7777
});

// ----------------------------------------------------------------

// Doc: Pausa a leitura dos dados. 
// Nota: O evento 'data' não será emitido
setTimeout(() => {
  socket.pause();
}, 1000);

// ----------------------------------------------------------------

// Doc: Retoma a leitura dos dados. 
// Nota: Usado após a chamda de socket.pause()
setTimeout(() => {
  socket.resume();
}, 2000);

// ----------------------------------------------------------------

socket.setNoDelay(true);

// ----------------------------------------------------------------

// Nota: Emite o evento 'timeout'
// Nota: Deve-se chamar manualmente socket.end()ou socket.destroy() encerrar a conexão.
socket.setTimeout(10000);

// ----------------------------------------------------------------
//                        Client Socket
//                        Class: net.Socket
//                        Event: 'close'
// ----------------------------------------------------------------

// boolean: hadError: TRUE se foi fechado devido a um erro de transmissão.
// Doc: Emitido quando o socket está totalmente fechado
socket.on('close', (hadError) => {
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
socket.on('connect', () => {
  console.log(
    '[net.Socket] [Event] [connect] Conexão entre Cliente/Servidor estabelecida'
  );

  console.log('\t', socket.address());
  console.log('\tEndereço IP remoto', socket.remoteAddress);
  console.log('\tFamília de IPs remotos', socket.remoteFamily);
  console.log('\tNúmero da porta remota', socket.remotePort);
});


// ----------------------------------------------------------------
//                        Client Socket
//                        Class: net.Socket
//                        Event: 'data'
// ----------------------------------------------------------------

// Buffer | String: data
// Doc: Emitido quando os dados são recebidos.
socket.on('data', (data) => {
  console.log(
    '[net.Socket] [Event] [data] O cliente enviou dados...'
  );
  // A quantidade de bytes recebidos.
  console.log('\tQuantidade de bytes:', socket.bytesRead);
  console.log('\tDado Recebido:', data.toString());
});

// ----------------------------------------------------------------
//                        Client Socket
//                        Class: net.Socket
//                        Event: 'drain'
// ----------------------------------------------------------------

// Doc: Emitido quando o buffer de gravação fica vazio.
// Nota: Pode ser usado para acelerar uploads.
socket.on('drain', () => {
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
socket.on('end', () => {
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
socket.on('error', (err) => {
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
socket.on('lookup', (err, address, family, host) => {
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
socket.on('ready', () => {
  console.log(
    '[net.Socket] [Event] [ready] O socket está pronto para ser usado'
  );

  switch (socket.readyState) {
    case 'open':
    case 'writeOnly': {
      // Doc: Envia dados pelo soquete.
      const sucess = socket.write('Testando 123... testando...', 'utf8', () => {
        console.log(
          '\t[Info] Todos os dados foram gravados'
        );
      });
      if (sucess)
        console.log(
          '\t[Info] Todos os dados foram liberados com sucesso para o buffer do kernel'
        );
      else
        // O evento drain' será emitido quando o buffer estiver novamente livre.
        console.log(
          '\t[Info] Todos ou parte dos dados foram enfileirados na memória do usuário'
        );
      break;
    }
  }
});

// ----------------------------------------------------------------
//                        Client Socket
//                        Class: net.Socket
//                        Event: 'timeout'
// ----------------------------------------------------------------

// Doc: Emitido se o soquete expirar devido à inatividade
// Nota: Deve-se fechar manualmente a conexão.
socket.on('timeout', () => {
  console.log(
    '[net.Socket] [Event] [timeout] O socket expirou devido a inatividade'
  );
  // Eencerrar a conexão.
  socket.end();
  // socket.destroy()
});
