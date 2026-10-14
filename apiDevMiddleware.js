export default function apiDevMiddleware() {
  return {
    name: "api-backend-proxy-middleware",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/")) {
          return next();
        }

        const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
        const apiRoute = url.pathname.replace(/^\/api\//, "").split("/")[0];

        // Attach parsed query parameters
        req.query = Object.fromEntries(url.searchParams.entries());

        // Parse JSON body for POST/PUT/PATCH requests
        if (["POST", "PUT", "PATCH"].includes(req.method)) {
          try {
            const chunks = [];
            for await (const chunk of req) {
              chunks.push(chunk);
            }
            const rawBody = Buffer.concat(chunks).toString("utf-8");
            req.body = rawBody ? JSON.parse(rawBody) : {};
          } catch {
            req.body = {};
          }
        } else {
          req.body = {};
        }

        // Add Express/Vercel serverless helper methods
        res.status = function (statusCode) {
          res.statusCode = statusCode;
          return res;
        };

        res.json = function (data) {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(data));
          return res;
        };

        res.send = function (data) {
          res.end(data);
          return res;
        };

        try {
          let mod;
          try {
            mod = await server.ssrLoadModule(`/api/${apiRoute}.js`);
          } catch {
            return next();
          }

          if (typeof mod?.default === "function") {
            return await mod.default(req, res);
          }
          return next();
        } catch (error) {
          console.error(`[API Dev Middleware Error in /api/${apiRoute}]:`, error);
          if (!res.headersSent) {
            res.status(500).json({ error: error.message || "Internal server error" });
          }
        }
      });
    },
  };
}
