// Import server
const server = require('./api/server.js');

const PORT = process.env.PORT || 1234;

/* ---------- Listener: ---------- */
server.listen( PORT, () => {
  console.log(`\n=== Server listening on port: ${PORT} ===\n`);
});