import { z } from "zod";
import { client } from "./contentfulClient";

/**
 * Result type for Contentful fetch operations
 */
export type ContentfulResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; data: null };

/**
 * Fetches entries from Contentful and validates them with a Zod schema
 * 
 * @param content_type - The Contentful content type to fetch
 * @param schema - Zod schema to validate the fetched items
 * @returns A result object with success status and either data or error message
 * 
 * @example
 * ```ts
 * const result = await fetchContentfulEntries("photo", PhotoEntriesSchema);
 * if (result.success) {
 *   // Use result.data
 * } else {
 *   // Handle result.error
 * }
 * ```
 */
export async function fetchContentfulEntries<T extends z.ZodTypeAny>(
  content_type: string,
  schema: T,
): Promise<ContentfulResult<z.infer<T>>> {
  try {
    const response = await client.getEntries({ content_type });
    const items = response.items;

    const parsed = schema.safeParse(items);

    if (!parsed.success) {
      console.error(
        `Schema validation failed for content_type "${content_type}":`,
        parsed.error.format(),
      );
      return {
        success: false,
        error: `Invalid data structure for ${content_type}`,
        data: null,
      };
    }

    return {
      success: true,
      data: parsed.data,
    };
  } catch (error) {
    console.error(
      `Failed to fetch entries for content_type "${content_type}":`,
      error,
    );

    // Provide user-friendly error messages
    if (error instanceof Error) {
      return {
        success: false,
        error: `Failed to load ${content_type}: ${error.message}`,
        data: null,
      };
    }

    return {
      success: false,
      error: `Failed to load ${content_type}`,
      data: null,
    };
  }
}

