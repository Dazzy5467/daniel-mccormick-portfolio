import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../public/", import.meta.url));
const args = process.argv.slice(2);
function option(name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
}
const port = Number(option("--port", process.env.PORT || "3000"));
const host = option("--host", process.env.HOST || "127.0.0.1");
if (!Number.isInteger(port) || port < 0 || port > 65535 || !host) {
  throw new Error("Supply a valid --port and --host.");
}
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8"
};

const server = http.createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  try {
    const url = new URL(request.url, "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    const requested = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
    const target = path.resolve(root, `.${requested}`);
    const relative = path.relative(root, target);
    if (relative.startsWith("..") || path.isAbsolute(relative) || pathname.includes("\0")) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    const info = await stat(target);
    if (!info.isFile()) {
      response.writeHead(404).end("Not found");
      return;
    }
    const content = await readFile(target);
    response.writeHead(200, {
      "Content-Type": types[path.extname(target)] || "application/octet-stream",
      "Content-Length": content.length,
      "Cache-Control": "no-store"
    });
    response.end(request.method === "HEAD" ? undefined : content);
  } catch (error) {
    const status = error instanceof URIError ? 400 : error.code === "ENOENT" ? 404 : 500;
    response.writeHead(status).end(status === 404 ? "Not found" : "Unable to serve request");
  }
});
server.listen(port, host, () => {
  const actualPort = server.address().port;
  console.log(`Portfolio preview: http://${host}:${actualPort}/`);
});
