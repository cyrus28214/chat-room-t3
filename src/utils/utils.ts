import type { ZodSchema } from "zod";

export function assignReducer<T>(state: T, action: Partial<T>) {
    return Object.assign({}, state, action) as T;
}

export function getFirstZodMessage<T>(schema: ZodSchema<T>, value: T): string {
    const { error } = schema.safeParse(value);
    return error?.errors?.[0]?.message ?? "";
}