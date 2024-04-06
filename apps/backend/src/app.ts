import createError, { HttpError } from "http-errors";
import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import nodeRoute from "./routes/nodeRoute";
import pathRoute from "./routes/pathRoute";
import edgeRoute from "./routes/edgeRoute";
import flowerRoute from "./routes/flowerRoute";
import flowerUploadRoute from "./routes/flowerUploadRoute";
import edgeUploadRoute from "./routes/edgeUploadRoute.ts";
import nodeUploadRoute from "./routes/nodeUploadRoute.ts";

const app: Express = express(); // Setup the backend

// Setup generic middlewear
app.use(
    logger("dev", {
        stream: {
            // This is a "hack" that gets the output to appear in the remote debugger :)
            write: (msg) => console.info(msg),
        },
    }),
); // This records all HTTP requests
app.use(express.json()); // This processes requests as JSON
app.use(express.urlencoded({ extended: false })); // URL parser
app.use(cookieParser()); // Cookie parser

// Setup routers. ALL ROUTERS MUST use /api as a start point, or they
// won't be reached by the default proxy and prod setup
app.use("/healthcheck", (req, res) => {
    res.status(200).send();
});
// Don't delete above: MIDDLEWARE
app.use("/api/path", pathRoute);
app.use("/api/nodes", nodeRoute);
app.use("/api/edges", edgeRoute);
app.use("/api/flower", flowerRoute);

app.use("/api/flower", flowerUploadRoute);
app.use("/api/edge", edgeUploadRoute);
app.use("/api/node", nodeUploadRoute);

/**
 * Catch all 404 errors, and forward them to the error handler
 */
app.use(function (req: Request, res: Response, next: NextFunction): void {
    // Have the next (generic error handler) process a 404 error
    next(createError(404));
});

/**
 * Generic error handler
 */
app.use((err: HttpError, req: Request, res: Response): void => {
    res.statusMessage = err.message; // Provide the error message

    res.locals.error = req.app.get("env") === "development" ? err : {};

    // Reply with the error
    res.status(err.status || 500);
});

export default app; // Export the backend, so that www.ts can start it
