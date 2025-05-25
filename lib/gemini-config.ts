/**
 * Configuration for Gemini API
 * You should replace these values with your actual credentials
 */

export const geminiConfig = {
  // Your Gemini API key - You need to obtain this from the Google AI Studio (https://makersuite.google.com/)
  // or from your Google Cloud Project. Replace this with your actual API key.
  apiKey: 'AIzaSyBxX0wWGEjv8JhSMmT2aKYKV3JKfwBn3Xo',
  
  // Your Google Cloud project ID
  projectId: 'cogniaintellilearn-ebdb3',
  
  // El modelo de Gemini a utilizar
  // Puede ser un modelo estándar o un modelo personalizado entrenado
  // Para usar un modelo entrenado, reemplaza con el formato:
  // 'projects/cogniaintellilearn-ebdb3/locations/us-central1/models/TU_MODELO_ENTRENADO'
  model: 'gemini-1.5-flash',
  
  // Indica si se está usando un modelo personalizado entrenado
  // Cambia a true cuando tengas un modelo entrenado y hayas actualizado el campo model arriba
  isCustomModel: false,
  
  // Generation parameters - optimizados para mejor rendimiento y menor latencia
  generationConfig: {
    temperature: 0.5,         // Reducido para respuestas más consistentes
    topP: 0.75,               // Ajustado para mejor balance entre creatividad y precisión
    maxOutputTokens: 800,     // Limitado para respuestas más concisas y menor costo
  },
  
  // Safety settings (all turned off in this example)
  safetySettings: [
    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "OFF" },
    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "OFF" },
    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "OFF" },
    { category: "HARM_CATEGORY_HARASSMENT", threshold: "OFF" }
  ],
  
  // Cache configuration
  cache: {
    enabled: true,           // Habilitar caché para reducir llamadas repetidas
    maxEntries: 100,         // Número máximo de entradas en caché
    ttl: 3600000             // Tiempo de vida en milisegundos (1 hora)
  }
};

// Whether to use the API endpoint or direct integration
// Set to false if you want to bypass the server and call Gemini API directly from the client
// (Note: This requires an API key to be set and exposes it to the client, which is not recommended for production)
export const useServerEndpoint = false;

/**
 * Instructions for obtaining and configuring your Gemini API:
 * 
 * 1. Option A - Get an API key from Google AI Studio:
 *    - Visit https://makersuite.google.com/
 *    - Sign in with your Google account
 *    - Go to API Keys in the settings
 *    - Create a new API key
 *    - Copy the key and paste it above in the apiKey field
 * 
 * 2. Option B - Use Google Cloud credentials:
 *    - Make sure you've authenticated with `gcloud auth application-default login`
 *    - Set useServerEndpoint to true and keep apiKey empty
 *    - The server endpoint will use your Google Cloud credentials
 * 
 * 3. Option C - Use a custom trained model:
 *    - Train a model following the instructions in README-MODEL-TRAINING.md
 *    - Set the model field to your trained model path
 *    - Set isCustomModel to true
 * 
 * For production deployments, store your API key in environment variables
 * instead of hardcoding it in this file.
 */ 