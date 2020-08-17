import http from 'http';
import express from 'express';
import cors from 'cors';
import { Server } from 'colyseus';
import { monitor } from '@colyseus/monitor';
// import socialRoutes from "@colyseus/social/express"

import { AdventureCapitalistRoom } from './rooms/adventure-capitalist';

const port = Number(process.env.PORT || 2567);
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const server = http.createServer(app);
const gameServer = new Server({
  server,
});

// register your room handlers
gameServer.define('adventure-capitalist', AdventureCapitalistRoom);

/**
 * Register @colyseus/social routes
 *
 * - uncomment if you want to use default authentication (https://docs.colyseus.io/authentication/)
 * - also uncomment the import statement
 */
// app.use("/", socialRoutes);

app.use('/colyseus', monitor());

gameServer.listen(port);
console.log(`Listening on http://localhost:${port}`);
