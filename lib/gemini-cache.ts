/**
 * Implementación de caché para las respuestas de Gemini
 * Esto reduce las llamadas a la API para preguntas frecuentes
 */

interface CacheEntry {
  response: string;
  timestamp: number;
}

class GeminiCache {
  private cache: Map<string, CacheEntry>;
  private maxEntries: number;
  private ttl: number; // Time to live in milliseconds

  constructor(maxEntries: number = 100, ttl: number = 3600000) {
    this.cache = new Map();
    this.maxEntries = maxEntries;
    this.ttl = ttl;
  }

  /**
   * Genera una clave única para el caché basada en los mensajes
   */
  private generateKey(messages: Array<{role: string, content: string}>): string {
    // Simplificamos el historial para la clave, considerando solo los últimos 3 mensajes
    // para mantener un contexto razonable pero evitar claves demasiado específicas
    const relevantMessages = messages.slice(-3);
    return relevantMessages.map(msg => `${msg.role}:${msg.content}`).join('|');
  }

  /**
   * Obtiene una respuesta del caché si existe y no ha expirado
   */
  get(messages: Array<{role: string, content: string}>): string | null {
    const key = this.generateKey(messages);
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    // Verificar si la entrada ha expirado
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.response;
  }

  /**
   * Guarda una respuesta en el caché
   */
  set(messages: Array<{role: string, content: string}>, response: string): void {
    // Si el caché está lleno, eliminar la entrada más antigua
    if (this.cache.size >= this.maxEntries) {
      const oldestEntry = Array.from(this.cache.keys())[0];
      if (oldestEntry) {
        this.cache.delete(oldestEntry);
      }
    }
    
    const key = this.generateKey(messages);
    this.cache.set(key, {
      response,
      timestamp: Date.now()
    });
  }

  /**
   * Limpia las entradas expiradas del caché
   */
  cleanExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.ttl) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Vacía completamente el caché
   */
  clear(): void {
    this.cache.clear();
  }
}

// Singleton instance
const geminiCache = new GeminiCache();

export default geminiCache; 