import Server from 'socket.io';

export default function startServer (store) {
  const io = new Server().attach(8090);

  // emit state changes to all sockets connected to io
  // could reduce to part of state or diff of state
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  // emit to specific sockets as they connect
  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });
}
