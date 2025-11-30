/**
 * Core shared types used across client and server
 */

/** Branded type helper for nominal typing */
export type Brand<T, B> = T & { readonly __brand: B };

/** Unique identifier types */
export type UserId = Brand<string, "UserId">;
export type EntityId = Brand<string, "EntityId">;

/** Timestamp in milliseconds since epoch */
export type Timestamp = Brand<number, "Timestamp">;

/** Common entity metadata */
export interface EntityMetadata {
	readonly id: EntityId;
	readonly createdAt: Timestamp;
	readonly updatedAt: Timestamp;
}

/** Pagination params */
export interface PaginationParams {
	readonly page: number;
	readonly limit: number;
}

/** Paginated response wrapper */
export interface PaginatedResponse<T> {
	readonly data: readonly T[];
	readonly total: number;
	readonly page: number;
	readonly limit: number;
	readonly hasMore: boolean;
}
