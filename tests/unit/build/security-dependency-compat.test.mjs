import assert from "node:assert/strict";
import { createServer } from "node:net";
import test from "node:test";
import { ClientSecretCredential } from "@azure/identity";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { getUri } from "get-uri";

test(
  "Azure identity can acquire a token through the patched MSAL dependency without external requests",
  { timeout: 10000 },
  async () => {
    const tenant = "11111111-1111-1111-1111-111111111111";
    const base = `https://login.microsoftonline.com/${tenant}`;
    const requests = [];
    const credential = new ClientSecretCredential(
      tenant,
      "22222222-2222-2222-2222-222222222222",
      "fixture-secret",
      {
        disableInstanceDiscovery: true,
        httpClient: {
          async sendRequest(request) {
            requests.push({ url: request.url, method: request.method, body: request.body });
            let body;
            if (
              request.method === "GET" &&
              request.url.endsWith("/.well-known/openid-configuration")
            ) {
              body = {
                issuer: `${base}/v2.0`,
                authorization_endpoint: `${base}/oauth2/v2.0/authorize`,
                token_endpoint: `${base}/oauth2/v2.0/token`,
                jwks_uri: `${base}/discovery/v2.0/keys`,
              };
            } else {
              body = {
                token_type: "Bearer",
                access_token: "fixture-access-token",
                expires_in: 3600,
              };
            }
            return {
              request,
              status: 200,
              headers: createHttpHeaders({ "content-type": "application/json" }),
              bodyAsText: JSON.stringify(body),
            };
          },
        },
      }
    );
    const token = await credential.getToken("https://management.azure.com/.default");
    assert.equal(token.token, "fixture-access-token");
    assert.ok(token.expiresOnTimestamp > Date.now());
    const posts = requests.filter((request) => request.method === "POST");
    assert.equal(posts.length, 1);
    const tokenUrl = new URL(posts[0].url);
    assert.match(tokenUrl.searchParams.get("client-request-id"), /^[0-9a-f-]{36}$/i);
    tokenUrl.searchParams.delete("client-request-id");
    assert.equal(tokenUrl.href, `${base}/oauth2/v2.0/token`);
    const fields = new URLSearchParams(String(posts[0].body));
    assert.equal(fields.get("grant_type"), "client_credentials");
    assert.equal(fields.get("scope"), "https://management.azure.com/.default");
  }
);

test(
  "get-uri retrieves an FTP resource through the patched basic-ftp major",
  { timeout: 15000 },
  async (t) => {
    const commands = [];
    const sockets = new Set();
    let dataSocket;
    const dataServer = createServer((socket) => {
      dataSocket = socket;
      sockets.add(socket);
    });
    await new Promise((resolve) => dataServer.listen(0, "127.0.0.1", resolve));
    const server = createServer((socket) => {
      sockets.add(socket);
      socket.setEncoding("utf8");
      socket.write("220 Fixture FTP server\r\n");
      let pending = "";
      socket.on("data", (chunk) => {
        pending += chunk;
        while (pending.includes("\r\n")) {
          const end = pending.indexOf("\r\n");
          const line = pending.slice(0, end);
          pending = pending.slice(end + 2);
          commands.push(line);
          const command = line.split(" ", 1)[0];
          switch (command) {
            case "USER":
              socket.write("331 Password required\r\n");
              break;
            case "PASS":
              socket.write("230 Logged in\r\n");
              break;
            case "FEAT":
              socket.write("211 End\r\n");
              break;
            case "TYPE":
            case "STRU":
            case "OPTS":
              socket.write("200 OK\r\n");
              break;
            case "MDTM":
              socket.write("213 20261025000000\r\n");
              break;
            case "EPSV":
              socket.write(
                `229 Entering Extended Passive Mode (|||${dataServer.address().port}|)\r\n`
              );
              break;
            case "RETR":
              assert.equal(line, "RETR /fixture.txt");
              assert.ok(dataSocket);
              socket.write("150 Opening data connection\r\n");
              dataSocket.end("fixture download", () => socket.write("226 Transfer complete\r\n"));
              break;
            case "QUIT":
              socket.end("221 Goodbye\r\n");
              break;
            default:
              socket.write("500 Unsupported fixture command\r\n");
          }
        }
      });
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    t.after(() => {
      for (const socket of sockets) socket.destroy();
      server.close();
      dataServer.close();
    });
    const stream = await getUri(`ftp://127.0.0.1:${server.address().port}/fixture.txt`);
    const chunks = [];
    for await (const chunk of stream) chunks.push(chunk);
    assert.equal(Buffer.concat(chunks).toString(), "fixture download");
    assert.ok(commands.includes("MDTM /fixture.txt"));
    assert.ok(commands.includes("RETR /fixture.txt"));
  }
);
