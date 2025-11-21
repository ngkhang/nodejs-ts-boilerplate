import http from "http";

import app from "./app";

const PORT = process.env.port ? Number(process.env.port) : 8017;
const HOST_NAME = process.env.hostname || "localhost";

const server = http.createServer(app);

server.listen(PORT, HOST_NAME, () => {
  console.info(`Server is running on http://${HOST_NAME}:${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.info("Server closed");
    process.exit(0);
  });
});

export default server;
