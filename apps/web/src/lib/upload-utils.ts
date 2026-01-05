export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ["image/png"];
  const maxSize = 5 * 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Hanya file PNG yang diizinkan. Format sama dengan foto asli.",
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: "Ukuran file maksimal 5MB.",
    };
  }

  return { valid: true };
}

export function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const extension = "png";
  return `${timestamp}-${random}.${extension}`;
}

export function extractYouTubeId(url: string): string | null {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}
