/**
 * Tests for Result type utilities (ADR-114)
 */

import {
	ErrorCodes,
	all,
	any,
	err,
	flatMap,
	fromPromise,
	fromThrowable,
	isErr,
	isOk,
	map,
	mapErr,
	ok,
	unwrap,
	unwrapOr,
	unwrapOrElse,
} from "@client/utils/result";
import { describe, expect, it } from "vitest";

describe("Result constructors", () => {
	it("ok() creates a success result", () => {
		const result = ok(42);
		expect(result.success).toBe(true);
		expect(result.data).toBe(42);
	});

	it("err() creates an error result with code and message", () => {
		const result = err(ErrorCodes.NOT_FOUND, "User not found");
		expect(result.success).toBe(false);
		expect(result.error.code).toBe("NOT_FOUND");
		expect(result.error.message).toBe("User not found");
	});

	it("err() includes optional context", () => {
		const result = err(ErrorCodes.VALIDATION_FAILED, "Invalid email", {
			field: "email",
		});
		expect(result.error.context).toEqual({ field: "email" });
	});
});

describe("Type guards", () => {
	it("isOk() returns true for success", () => {
		expect(isOk(ok(42))).toBe(true);
		expect(isOk(err(ErrorCodes.UNKNOWN, "error"))).toBe(false);
	});

	it("isErr() returns true for error", () => {
		expect(isErr(err(ErrorCodes.UNKNOWN, "error"))).toBe(true);
		expect(isErr(ok(42))).toBe(false);
	});
});

describe("Unwrapping", () => {
	it("unwrap() returns value on success", () => {
		expect(unwrap(ok(42))).toBe(42);
	});

	it("unwrap() throws on error", () => {
		const result = err(ErrorCodes.NOT_FOUND, "Not found");
		expect(() => unwrap(result)).toThrow("Unwrap failed: Not found");
	});

	it("unwrapOr() returns value on success", () => {
		expect(unwrapOr(ok(42), 0)).toBe(42);
	});

	it("unwrapOr() returns default on error", () => {
		const result = err(ErrorCodes.NOT_FOUND, "Not found");
		expect(unwrapOr(result, 0)).toBe(0);
	});

	it("unwrapOrElse() computes default from error", () => {
		const result = err(ErrorCodes.NOT_FOUND, "Not found");
		expect(unwrapOrElse(result, (e) => e.message.length)).toBe(9);
	});
});

describe("Transformations", () => {
	it("map() transforms success value", () => {
		const result = map(ok(2), (x) => x * 3);
		expect(isOk(result) && result.data).toBe(6);
	});

	it("map() passes through error", () => {
		const error = err(ErrorCodes.UNKNOWN, "error");
		const result = map(error, (x: number) => x * 3);
		expect(isErr(result)).toBe(true);
	});

	it("mapErr() transforms error", () => {
		const result = mapErr(err(ErrorCodes.UNKNOWN, "original"), (e) => ({
			...e,
			message: "transformed",
		}));
		expect(isErr(result) && result.error.message).toBe("transformed");
	});

	it("flatMap() chains results", () => {
		const divide = (a: number, b: number) =>
			b === 0 ? err(ErrorCodes.INVALID_INPUT, "Division by zero") : ok(a / b);

		const result = flatMap(ok(10), (x) => divide(x, 2));
		expect(isOk(result) && result.data).toBe(5);

		const errorResult = flatMap(ok(10), (x) => divide(x, 0));
		expect(isErr(errorResult)).toBe(true);
	});
});

describe("Async utilities", () => {
	it("fromPromise() converts resolved promise to Ok", async () => {
		const result = await fromPromise(Promise.resolve(42));
		expect(isOk(result) && result.data).toBe(42);
	});

	it("fromPromise() converts rejected promise to Err", async () => {
		const result = await fromPromise(
			Promise.reject(new Error("Network failed")),
			ErrorCodes.NETWORK_ERROR,
		);
		expect(isErr(result) && result.error.code).toBe("NETWORK_ERROR");
	});

	it("fromThrowable() wraps throwing function", () => {
		const parse = fromThrowable(JSON.parse, ErrorCodes.INVALID_JSON);

		const success = parse('{"a": 1}');
		expect(isOk(success) && success.data).toEqual({ a: 1 });

		const failure = parse("invalid json");
		expect(isErr(failure) && failure.error.code).toBe("INVALID_JSON");
	});
});

describe("Combining results", () => {
	it("all() returns all values when all succeed", () => {
		const result = all([ok(1), ok("two"), ok(true)] as const);
		expect(isOk(result) && result.data).toEqual([1, "two", true]);
	});

	it("all() returns first error when any fails", () => {
		const result = all([
			ok(1),
			err(ErrorCodes.NOT_FOUND, "first error"),
			err(ErrorCodes.TIMEOUT, "second error"),
		] as const);
		expect(isErr(result) && result.error.message).toBe("first error");
	});

	it("any() returns first success", () => {
		const result = any([err(ErrorCodes.NOT_FOUND, "first"), ok(42), ok(100)]);
		expect(isOk(result) && result.data).toBe(42);
	});

	it("any() returns last error when all fail", () => {
		const result = any([err(ErrorCodes.NOT_FOUND, "first"), err(ErrorCodes.TIMEOUT, "last")]);
		expect(isErr(result) && result.error.message).toBe("last");
	});
});
