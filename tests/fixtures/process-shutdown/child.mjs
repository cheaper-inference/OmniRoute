const mode = process.argv[2];
if (!["ignore", "graceful"].includes(mode)) process.exit(2);
process.on("SIGTERM", () => {
  if (mode === "graceful") process.exit(0);
});
setInterval(() => {}, 1000);
if (process.connected) process.send({ type: "READY" });
