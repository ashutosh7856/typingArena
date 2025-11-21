import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { RoomManager } from './game/RoomManager.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());

// Database connection
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
}

const roomManager = new RoomManager();

// WebSocket handling
wss.on('connection', (ws) => {
  console.log('New client connected');
  
  let currentRoomId = null;
  let playerId = null;

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      switch (data.type) {
        case 'CREATE_ROOM': {
          const { hostId, config } = data.payload;
          playerId = hostId;
          const room = roomManager.createRoom(hostId, config);
          currentRoomId = room.id;
          room.addPlayer({ id: hostId, name: data.payload.name, socket: ws });
          break;
        }
        
        case 'JOIN_ROOM': {
          const { roomId, player } = data.payload;
          playerId = player.id;
          try {
            const room = roomManager.joinRoom(roomId, { ...player, socket: ws });
            currentRoomId = roomId;
          } catch (error) {
            ws.send(JSON.stringify({ type: 'ERROR', payload: { message: error.message } }));
          }
          break;
        }
        
        case 'START_GAME': {
          const room = roomManager.getRoom(currentRoomId);
          if (room && room.hostId === playerId) {
            room.startGame();
          }
          break;
        }
        
        case 'UPDATE_PROGRESS': {
          const room = roomManager.getRoom(currentRoomId);
          if (room) {
            room.updatePlayerProgress(playerId, data.payload);
          }
          break;
        }
      }
    } catch (error) {
      console.error('WebSocket error:', error);
    }
  });

  ws.on('close', () => {
    if (currentRoomId && playerId) {
      roomManager.removePlayer(currentRoomId, playerId);
    }
  });
});

// API Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
