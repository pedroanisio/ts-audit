/**
 * Result Type Utilities (ADR-114)
 * Standardized error handling with Result types
 * @module @client/utils/result
 */

// ============================================================================
// TYPES
// ============================================================================

/** Standard error codes for consistent error handling */
export const ErrorCodes = {
	NOT_FOUND: "NOT_FOUND",
	VALIDATION_FAILED: "VALIDATION_FAILED",
	INVALID_JSON: "INVALID_JSON",
	INVALID_INPUT: "INVALID_INPUT",
	INVALID_OPERATION: "INVALID_OPERATION",
	DUPLICATE_ID: "DUPLICATE_ID",
	CIRCULAR_REFERENCE: "CIRCULAR_REFERENCE",
	NETWORK_ERROR: "NETWORK_ERROR",
	TIMEOUT: "TIMEOUT",
	UNKNOWN: "UNKNOWN",
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

/** Structured error with code, message, and optional context */
export interface ResultError {
	readonly code: ErrorCode;
	readonly message: string;
	readonly context?: Record<string, unknown>;
}

/** Success result */
export interface Ok<T> {
	readonly success: true;
	readonly data: T;
}

/** Error result */
export interface Err<E = ResultError> {
	readonly success: false;
	readonly error: E;
}

/** Result type - either success with data or failure with error */
export type Result<T, E = ResultError> = Ok<T> | Err<E>;

// ============================================================================
// CONSTRUCTORS
// ============================================================================

/** Create a success result */
export function ok<T>(data: T): Ok<T> {
	return { success: true, data };
}

/** Create an error result with code and message */
export function err(
	code: ErrorCode,
	message: string,
	context?: Record<string, unknown>,
): Err<ResultError> {
	return {
		success: false,
		error: { code, message, context },
	};
}

/** Create an error result from an existing ResultError */
export function errFrom<E>(error: E): Err<E> {
	return { success: false, error };
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

/** Check if result is success */
export function isOk<T, E>(result: Result<T, E>): result is Ok<T> {
	return result.success === true;
}

/** Check if result is error */
export function isErr<T, E>(result: Result<T, E>): result is Err<E> {
	return result.success === false;
}

// ============================================================================
// UNWRAPPING
// ============================================================================

/** Unwrap success value or throw error */
export function unwrap<T>(result: Result<T>): T {
	if (isOk(result)) {
		return result.data;
	}
	throw new Error(`Unwrap failed: ${result.error.message}`);
}

/** Unwrap success value or return default */
export function unwrapOr<T>(result: Result<T>, defaultValue: T): T {
	return isOk(result) ? result.data : defaultValue;
}

/** Unwrap success value or compute default from error */
export function unwrapOrElse<T, E>(result: Result<T, E>, fn: (error: E) => T): T {
	return isOk(result) ? result.data : fn(result.error);
}

// ============================================================================
// TRANSFORMATIONS
// ============================================================================

/** Map success value */
export function map<T, U, E>(result: Result<T, E>, fn: (value: T) => U): Result<U, E> {
	return isOk(result) ? ok(fn(result.data)) : result;
}

/** Map error value */
export function mapErr<T, E, F>(result: Result<T, E>, fn: (error: E) => F): Result<T, F> {
	return isErr(result) ? errFrom(fn(result.error)) : result;
}

/** Chain results (flatMap) */
export function flatMap<T, U, E>(
	result: Result<T, E>,
	fn: (value: T) => Result<U, E>,
): Result<U, E> {
	return isOk(result) ? fn(result.data) : result;
}

// ============================================================================
// ASYNC UTILITIES
// ============================================================================

/** Convert a Promise to a Result */
export async function fromPromise<T>(
	promise: Promise<T>,
	errorCode: ErrorCode = ErrorCodes.UNKNOWN,
): Promise<Result<T>> {
	try {
		const data = await promise;
		return ok(data);
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		return err(errorCode, message);
	}
}

/** Convert a throwing function to a Result-returning function */
export function fromThrowable<T, Args extends unknown[]>(
	fn: (...args: Args) => T,
	errorCode: ErrorCode = ErrorCodes.UNKNOWN,
): (...args: Args) => Result<T> {
	return (...args: Args): Result<T> => {
		try {
			return ok(fn(...args));
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			return err(errorCode, message);
		}
	};
}

// ============================================================================
// COMBINING RESULTS
// ============================================================================

/** Combine multiple results into one */
export function all<T extends readonly Result<unknown, unknown>[]>(
	results: T,
): Result<
	{ [K in keyof T]: T[K] extends Result<infer U, unknown> ? U : never },
	T[number] extends Result<unknown, infer E> ? E : never
> {
	const values: unknown[] = [];

	for (const result of results) {
		if (isErr(result)) {
			return result as Err<T[number] extends Result<unknown, infer E> ? E : never>;
		}
		values.push(result.data);
	}

	return ok(values) as Ok<{
		[K in keyof T]: T[K] extends Result<infer U, unknown> ? U : never;
	}>;
}

/** Return first success or last error */
export function any<T, E>(results: readonly Result<T, E>[]): Result<T, E> {
	let lastError: Err<E> | undefined;

	for (const result of results) {
		if (isOk(result)) {
			return result;
		}
		lastError = result;
	}

	return lastError ?? (err(ErrorCodes.NOT_FOUND, "No results provided") as Err<E>);
}
