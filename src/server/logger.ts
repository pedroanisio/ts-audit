/**
 * Logging configuration using tslog (ADR-014)
 * @module @server/logger
 */

import { Logger } from "tslog";

export const logger = new Logger({
	name: "ts-audit",
	type: "pretty",
	prettyLogTemplate: "{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}} {{logLevelName}} [{{name}}] ",
	prettyLogTimeZone: "local",
	minLevel: process.env.NODE_ENV === "production" ? 3 : 0, // info in prod, trace in dev
});

/** Create a child logger with a specific name */
export function createLogger(name: string): Logger<unknown> {
	return logger.getSubLogger({ name });
}
