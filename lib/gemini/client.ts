import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Server-only Gemini API client initialization.
 * Guaranteed never to leak keys to the browser bundle.
 */
export function getGeminiClient(): GoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') {
    throw new Error('GEMINI_API_KEY is not configured. Please set your valid Gemini API key in .env.local.');
  }
  return new GoogleGenerativeAI(apiKey);
}

/**
 * Checks if a valid API key is set in server environment
 */
export function isGeminiConfigured(): boolean {
  const apiKey = process.env.GEMINI_API_KEY;
  return Boolean(apiKey && apiKey !== 'YOUR_GEMINI_API_KEY' && apiKey.length > 10);
}
