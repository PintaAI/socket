import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket: any) => {
  console.log('Client connected:', socket.id);

  socket.on('message', (data: string) => {
    console.log('Message received:', data);
    socket.broadcast.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const port = 3001;
httpServer.listen(port, () => {
  console.log(`Socket.IO server running on port ${port}`);
});
