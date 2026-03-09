/**
 * Sanitizes text fields by trimming whitespace and optionally converting to uppercase
 * @param text - The text to sanitize
 * @param required - If true, throws error when text is empty after trimming
 * @param uppercase - If true, converts text to uppercase
 * @returns Sanitized text
 */
export function sanitizeText(
  text: string,
  required: boolean = false,
  uppercase: boolean = false,
): string {
  if (!text) {
    if (required) {
      throw new Error("El campo de texto no puede estar vacío");
    }
    return "";
  }

  let sanitized = text.trim();

  // Remove multiple consecutive spaces
  sanitized = sanitized.replace(/\s+/g, " ");

  if (uppercase) {
    sanitized = sanitized.toUpperCase();
  }

  if (required && sanitized.length === 0) {
    throw new Error("El campo de texto no puede estar vacío");
  }

  return sanitized;
}

/**
 * Sanitizes image URLs by filtering out placeholder URLs
 * @param imageUrl - The image URL to sanitize
 * @returns Sanitized image URL or undefined if it's a placeholder
 */
export function sanitizeImageUrl(imageUrl?: string): string | undefined {
  if (!imageUrl) return undefined;

  // Filter out legacy placeholder URLs to allow UI fallbacks to local no_image.png
  if (imageUrl.includes("placehold.co")) {
    return undefined;
  }

  return imageUrl.trim();
}
