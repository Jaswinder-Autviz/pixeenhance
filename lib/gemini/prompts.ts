export type GeminiEnhanceMode = 'general' | 'face' | 'denoise' | 'restore';

/**
 * Server-only prompt templates for Gemini multi-modal processing.
 * Preserves authentic composition, identity, and textures without artificial distortion.
 */
export const GEMINI_ENHANCE_PROMPTS: Record<GeminiEnhanceMode, string> = {
  general:
    'Improve this image while preserving the original subject, composition, identity, colors and overall visual intent. Reduce visible noise, improve clarity, restore natural detail and avoid artificial over-processing. Do not add new objects or alter the content unnecessarily. Provide deep visual quality analysis, sharpness adjustments, and color grading refinements.',

  face:
    'Improve facial clarity while strictly preserving the person\'s identity, facial proportions, skin tone, hairstyle, expression and natural appearance. Avoid beauty-filter effects or identity changes. Analyze and recommend micro-contrast adjustments for authentic skin texture and sharp eye clarity.',

  denoise:
    'Analyze this image for high ISO digital noise, sensor grain, and compression artifacts. Suggest optimal smoothing thresholds for flat areas while strictly protecting edge definitions and fine structural textures.',

  restore:
    'Analyze this degraded or faded image. Restore tonal contrast, recover dynamic range from blown-out or shadowed areas, and enhance fine details while maintaining authentic textures.'
};
