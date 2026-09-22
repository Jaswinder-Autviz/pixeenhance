'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Code2,
  Image as ImageIcon,
  Copy,
  Check,
  Download,
  RotateCcw,
  Sparkles,
  Layers,
  Palette,
  Maximize2,
  FileCode,
  ArrowRightLeft,
  Settings2,
  Sliders,
  CheckCircle2,
  AlertCircle,
  FileText,
  Laptop,
} from 'lucide-react';
import { downloadBlob } from '@/src/lib/imageUtils';

export type CodeConverterMode = 'code-to-image' | 'code-transformer';

interface CodeConverterViewProps {
  initialMode?: CodeConverterMode;
}

// Background Gradients for Code to Image
const GRADIENT_PRESETS = [
  { id: 'sunset', name: 'Sunset Violet', class: 'from-violet-600 via-purple-600 to-pink-500' },
  { id: 'oceanic', name: 'Oceanic Blue', class: 'from-blue-600 via-indigo-600 to-cyan-500' },
  { id: 'emerald', name: 'Emerald Glow', class: 'from-emerald-500 via-teal-600 to-cyan-600' },
  { id: 'cyberpunk', name: 'Cyber Neon', class: 'from-fuchsia-600 via-rose-500 to-amber-400' },
  { id: 'dark-space', name: 'Deep Space', class: 'from-slate-900 via-indigo-950 to-slate-900' },
  { id: 'mesh-warm', name: 'Amber Sunset', class: 'from-amber-500 via-orange-600 to-rose-600' },
  { id: 'monochrome', name: 'Slate Minimal', class: 'from-slate-700 via-slate-800 to-slate-900' },
  { id: 'transparent', name: 'Transparent', class: 'bg-transparent border border-dashed border-slate-400' },
];

// Syntax themes
const THEMES = [
  { id: 'one-dark', name: 'One Dark Pro', bg: '#1E1E2E', text: '#CDD6F4', bar: '#181825' },
  { id: 'dracula', name: 'Dracula', bg: '#282A36', text: '#F8F8F2', bar: '#21222C' },
  { id: 'night-owl', name: 'Night Owl', bg: '#011627', text: '#D6DEEB', bar: '#01111E' },
  { id: 'github-dark', name: 'GitHub Dark', bg: '#0D1117', text: '#C9D1D9', bar: '#161B22' },
  { id: 'monokai', name: 'Monokai', bg: '#272822', text: '#F8F8F2', bar: '#1E1F1C' },
  { id: 'light-clean', name: 'Light Studio', bg: '#F8FAFC', text: '#0F172A', bar: '#E2E8F0' },
];

// Transformer tools
type TransformType =
  | 'json-to-ts'
  | 'json-to-yaml'
  | 'yaml-to-json'
  | 'html-to-jsx'
  | 'css-to-js'
  | 'json-prettify'
  | 'json-minify'
  | 'text-to-base64'
  | 'base64-to-text';

const TRANSFORM_OPTIONS: { id: TransformType; name: string; desc: string; inputExt: string; outputExt: string }[] = [
  { id: 'json-to-ts', name: 'JSON ➔ TypeScript Interfaces', desc: 'Generate TypeScript type definitions from JSON object', inputExt: 'json', outputExt: 'ts' },
  { id: 'json-to-yaml', name: 'JSON ➔ YAML', desc: 'Convert structured JSON to human-readable YAML', inputExt: 'json', outputExt: 'yaml' },
  { id: 'yaml-to-json', name: 'YAML ➔ JSON', desc: 'Parse YAML and output formatted JSON', inputExt: 'yaml', outputExt: 'json' },
  { id: 'html-to-jsx', name: 'HTML ➔ JSX / React', desc: 'Convert HTML attributes, styles & void tags to valid JSX', inputExt: 'html', outputExt: 'jsx' },
  { id: 'css-to-js', name: 'CSS ➔ React Style Object', desc: 'Convert kebab-case CSS rules to camelCase style object', inputExt: 'css', outputExt: 'js' },
  { id: 'json-prettify', name: 'JSON Prettify & Validate', desc: 'Format and indent unorganized JSON data', inputExt: 'json', outputExt: 'json' },
  { id: 'json-minify', name: 'JSON Minifier', desc: 'Strip whitespace and minify JSON payloads', inputExt: 'json', outputExt: 'json' },
  { id: 'text-to-base64', name: 'Code / Text ➔ Base64', desc: 'Encode code strings into Base64 format', inputExt: 'txt', outputExt: 'txt' },
  { id: 'base64-to-text', name: 'Base64 ➔ Code / Text', desc: 'Decode Base64 string back into plaintext code', inputExt: 'txt', outputExt: 'txt' },
];

const SAMPLE_CODES: Record<string, string> = {
  typescript: `// TypeScript Interface & Async Fetch
interface UserProfile {
  id: string;
  username: string;
  roles: ('admin' | 'editor' | 'viewer')[];
  stats: { views: number; followers: number };
}

export async function fetchUser(userId: string): Promise<UserProfile> {
  const res = await fetch(\`/api/users/\${userId}\`);
  if (!res.ok) throw new Error("Failed to load user");
  return res.json();
}`,
  react: `import React, { useState } from 'react';

export function CounterButton({ initialCount = 0 }: { initialCount?: number }) {
  const [count, setCount] = useState(initialCount);

  return (
    <button
      onClick={() => setCount((prev) => prev + 1)}
      className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:scale-105 transition-transform"
    >
      Clicked {count} times ✨
    </button>
  );
}`,
  python: `import math

def calculate_fibonacci(n: int) -> list[int]:
    """Generate first n Fibonacci sequence numbers."""
    if n <= 0:
        return []
    fib = [0, 1]
    while len(fib) < n:
        fib.append(fib[-1] + fib[-2])
    return fib[:n]

print(f"Fibonacci(10): {calculate_fibonacci(10)}")`,
  json: `{
  "projectName": "PixEnhance Studio",
  "version": "2.4.0",
  "private": true,
  "secureProcessing": true,
  "features": [
    "Image Compression",
    "Vectorization",
    "PDF to Word",
    "Code Converter"
  ],
  "author": {
    "name": "Dev Team",
    "verified": true
  }
}`,
};

export function CodeConverterView({ initialMode = 'code-to-image' }: CodeConverterViewProps) {
  const [activeTab, setActiveTab] = useState<CodeConverterMode>(initialMode);

  // ==========================================
  // TAB 1: CODE TO IMAGE STATE
  // ==========================================
  const [snippetCode, setSnippetCode] = useState<string>(SAMPLE_CODES.typescript);
  const [windowTitle, setWindowTitle] = useState<string>('snippet.tsx');
  const [selectedGradient, setSelectedGradient] = useState<string>('sunset');
  const [selectedTheme, setSelectedTheme] = useState<string>('one-dark');
  const [paddingSize, setPaddingSize] = useState<number>(32);
  const [showLineNumbers, setShowLineNumbers] = useState<boolean>(true);
  const [showWindowControls, setShowWindowControls] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<number>(14);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  const previewBoxRef = useRef<HTMLDivElement>(null);

  // ==========================================
  // TAB 2: CODE TRANSFORMER STATE
  // ==========================================
  const [transformType, setTransformType] = useState<TransformType>('json-to-ts');
  const [inputCode, setInputCode] = useState<string>(SAMPLE_CODES.json);
  const [outputCode, setOutputCode] = useState<string>('');
  const [transformError, setTransformError] = useState<string | null>(null);
  const [copiedTransformer, setCopiedTransformer] = useState<boolean>(false);

  // Auto-run transformation when input or type changes
  useEffect(() => {
    executeTransformation(inputCode, transformType);
  }, [inputCode, transformType]);

  const executeTransformation = (input: string, type: TransformType) => {
    setTransformError(null);
    if (!input.trim()) {
      setOutputCode('');
      return;
    }

    try {
      switch (type) {
        case 'json-to-ts': {
          const parsed = JSON.parse(input);
          setOutputCode(generateTypeScriptInterfaces(parsed, 'RootObject'));
          break;
        }
        case 'json-to-yaml': {
          const parsed = JSON.parse(input);
          setOutputCode(jsonToYaml(parsed));
          break;
        }
        case 'yaml-to-json': {
          const jsonResult = yamlToJson(input);
          setOutputCode(JSON.stringify(jsonResult, null, 2));
          break;
        }
        case 'html-to-jsx': {
          setOutputCode(htmlToJsx(input));
          break;
        }
        case 'css-to-js': {
          setOutputCode(cssToJsObject(input));
          break;
        }
        case 'json-prettify': {
          const parsed = JSON.parse(input);
          setOutputCode(JSON.stringify(parsed, null, 2));
          break;
        }
        case 'json-minify': {
          const parsed = JSON.parse(input);
          setOutputCode(JSON.stringify(parsed));
          break;
        }
        case 'text-to-base64': {
          setOutputCode(btoa(unescape(encodeURIComponent(input))));
          break;
        }
        case 'base64-to-text': {
          setOutputCode(decodeURIComponent(escape(atob(input.trim()))));
          break;
        }
        default:
          setOutputCode('');
      }
    } catch (err: any) {
      setTransformError(err.message || 'Syntax parsing error in input code.');
      setOutputCode('');
    }
  };

  // -------------------------------------------------------------
  // TRANSFORMATION HELPERS
  // -------------------------------------------------------------
  function generateTypeScriptInterfaces(obj: any, rootName = 'RootObject'): string {
    const interfaces: string[] = [];

    function parseType(val: any, keyName: string): string {
      if (val === null) return 'null | any';
      if (Array.isArray(val)) {
        if (val.length === 0) return 'any[]';
        const innerType = parseType(val[0], `${keyName}Item`);
        return `${innerType}[]`;
      }
      if (typeof val === 'object') {
        const interfaceName = capitalize(keyName);
        buildInterface(val, interfaceName);
        return interfaceName;
      }
      return typeof val;
    }

    function buildInterface(data: Record<string, any>, name: string) {
      const lines = [`export interface ${name} {`];
      for (const [key, value] of Object.entries(data)) {
        const typeStr = parseType(value, key);
        lines.push(`  ${key}: ${typeStr};`);
      }
      lines.push('}');
      interfaces.unshift(lines.join('\n'));
    }

    function capitalize(s: string) {
      return s.charAt(0).toUpperCase() + s.slice(1).replace(/[^a-zA-Z0-9]/g, '');
    }

    if (Array.isArray(obj)) {
      if (obj.length > 0 && typeof obj[0] === 'object') {
        buildInterface(obj[0], 'RootItem');
        interfaces.push(`export type ${rootName} = RootItem[];`);
      } else {
        interfaces.push(`export type ${rootName} = any[];`);
      }
    } else if (typeof obj === 'object' && obj !== null) {
      buildInterface(obj, rootName);
    } else {
      interfaces.push(`export type ${rootName} = ${typeof obj};`);
    }

    return interfaces.join('\n\n');
  }

  function jsonToYaml(obj: any, indent = 0): string {
    const spaces = '  '.repeat(indent);
    if (obj === null) return 'null\n';
    if (typeof obj !== 'object') return `${JSON.stringify(obj)}\n`;

    let yaml = '';
    if (Array.isArray(obj)) {
      for (const item of obj) {
        if (typeof item === 'object' && item !== null) {
          yaml += `${spaces}- \n${jsonToYaml(item, indent + 1)}`;
        } else {
          yaml += `${spaces}- ${JSON.stringify(item)}\n`;
        }
      }
    } else {
      for (const [key, val] of Object.entries(obj)) {
        if (typeof val === 'object' && val !== null) {
          yaml += `${spaces}${key}:\n${jsonToYaml(val, indent + 1)}`;
        } else {
          yaml += `${spaces}${key}: ${JSON.stringify(val)}\n`;
        }
      }
    }
    return yaml;
  }

  function yamlToJson(yamlStr: string): any {
    const lines = yamlStr.split('\n').filter((l) => l.trim() && !l.trim().startsWith('#'));
    const root: Record<string, any> = {};

    for (const line of lines) {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim().replace(/^-\s*/, '');
        const valRaw = parts.slice(1).join(':').trim();
        let val: any = valRaw;
        if (valRaw === 'true') val = true;
        else if (valRaw === 'false') val = false;
        else if (valRaw === 'null') val = null;
        else if (!isNaN(Number(valRaw)) && valRaw !== '') val = Number(valRaw);
        else if (valRaw.startsWith('"') && valRaw.endsWith('"')) val = valRaw.slice(1, -1);
        root[key] = val;
      }
    }
    return root;
  }

  function htmlToJsx(html: string): string {
    let jsx = html
      .replace(/\bclass="/g, 'className="')
      .replace(/\bfor="/g, 'htmlFor="')
      .replace(/\btabindex="/g, 'tabIndex="')
      .replace(/\breadonly\b/g, 'readOnly')
      .replace(/\bautocomplete="/g, 'autoComplete="')
      .replace(/\bautofocus\b/g, 'autoFocus');

    jsx = jsx.replace(/<(img|input|br|hr|meta|link)([^>]*?)(?<!\/)>/gi, '<$1$2 />');

    jsx = jsx.replace(/style="([^"]*)"/g, (_, styleStr) => {
      const styleRules = styleStr.split(';').filter((s: string) => s.trim());
      const objProps = styleRules.map((rule: string) => {
        const [k, v] = rule.split(':');
        if (!k || !v) return '';
        const camelKey = k.trim().replace(/-([a-z])/g, (g: string) => g[1].toUpperCase());
        return `${camelKey}: '${v.trim().replace(/'/g, "\\'")}'`;
      }).filter(Boolean);
      return `style={{ ${objProps.join(', ')} }}`;
    });

    return jsx;
  }

  function cssToJsObject(css: string): string {
    const rules = css.split(';').filter((r) => r.trim());
    const obj: Record<string, string> = {};

    for (const rule of rules) {
      const [key, val] = rule.split(':');
      if (key && val) {
        const camelKey = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        obj[camelKey] = val.trim().replace(/^['"]|['"]$/g, '');
      }
    }

    return 'const styles = ' + JSON.stringify(obj, null, 2) + ';';
  }

  // -------------------------------------------------------------
  // CODE TO IMAGE EXPORTER
  // -------------------------------------------------------------
  const currentTheme = THEMES.find((t) => t.id === selectedTheme) || THEMES[0];
  const currentGradient = GRADIENT_PRESETS.find((g) => g.id === selectedGradient) || GRADIENT_PRESETS[0];

  const handleDownloadPng = async () => {
    if (!previewBoxRef.current) return;
    setIsExporting(true);

    try {
      const node = previewBoxRef.current;
      const rect = node.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      const scale = 2;

      const clonedNode = node.cloneNode(true) as HTMLElement;
      const xmlSerializer = new XMLSerializer();
      const nodeHtml = xmlSerializer.serializeToString(clonedNode);

      const svgData = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width * scale}" height="${height * scale}" viewBox="0 0 ${width} ${height}">
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml">
              <style>
                * { box-sizing: border-box; font-family: monospace, sans-serif; }
              </style>
              ${nodeHtml}
            </div>
          </foreignObject>
        </svg>
      `;

      const img = new Image();
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width * scale;
        canvas.height = height * scale;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              const filename = windowTitle.replace(/\.[^/.]+$/, '') || 'code-snippet';
              downloadBlob(blob, `${filename}-pixenhance.png`);
            }
            URL.revokeObjectURL(svgUrl);
            setIsExporting(false);
          }, 'image/png');
        }
      };
      img.onerror = () => {
        setIsExporting(false);
        URL.revokeObjectURL(svgUrl);
      };
      img.src = svgUrl;
    } catch (e) {
      console.error(e);
      setIsExporting(false);
    }
  };

  const handleDownloadSvg = () => {
    if (!previewBoxRef.current) return;
    const node = previewBoxRef.current;
    const rect = node.getBoundingClientRect();
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);

    const cloned = node.cloneNode(true) as HTMLElement;
    const serializer = new XMLSerializer();
    const serialized = serializer.serializeToString(cloned);

    const svgData = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml">
      <style>
        * { box-sizing: border-box; font-family: monospace; }
      </style>
      ${serialized}
    </div>
  </foreignObject>
</svg>`;

    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const filename = windowTitle.replace(/\.[^/.]+$/, '') || 'code-snippet';
    downloadBlob(blob, `${filename}-pixenhance.svg`);
  };

  const handleCopyImage = async () => {
    if (!previewBoxRef.current) return;
    try {
      const node = previewBoxRef.current;
      const rect = node.getBoundingClientRect();
      const scale = 2;
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);

      const cloned = node.cloneNode(true) as HTMLElement;
      const serializer = new XMLSerializer();
      const serialized = serializer.serializeToString(cloned);

      const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="${width * scale}" height="${height * scale}" viewBox="0 0 ${width} ${height}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">${serialized}</div>
        </foreignObject>
      </svg>`;

      const img = new Image();
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = width * scale;
        canvas.height = height * scale;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(async (blob) => {
            if (blob && navigator.clipboard && (window as any).ClipboardItem) {
              await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
              setCopiedNotification(true);
              setTimeout(() => setCopiedNotification(false), 2000);
            }
            URL.revokeObjectURL(url);
          });
        }
      };
      img.src = url;
    } catch (err) {
      console.error('Failed to copy image to clipboard', err);
    }
  };

  const handleCopyTransformed = () => {
    if (!outputCode) return;
    navigator.clipboard.writeText(outputCode);
    setCopiedTransformer(true);
    setTimeout(() => setCopiedTransformer(false), 1800);
  };

  const handleDownloadTransformed = () => {
    if (!outputCode) return;
    const opt = TRANSFORM_OPTIONS.find((t) => t.id === transformType);
    const ext = opt ? opt.outputExt : 'txt';
    const blob = new Blob([outputCode], { type: 'text/plain;charset=utf-8' });
    downloadBlob(blob, `converted-code.${ext}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-8">
      {/* Mode Selector Header Pill */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-2 bg-slate-200/80 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('code-to-image')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'code-to-image'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Code to Image Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('code-transformer')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'code-transformer'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>Code &amp; Data Converter</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 pr-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Fast &bull; Free &bull; Private</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODE 1: CODE TO IMAGE STUDIO                             */}
      {/* ========================================================= */}
      {activeTab === 'code-to-image' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shadow-md">
            {/* Window Title */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono mb-1.5">
                File / Title
              </label>
              <input
                type="text"
                value={windowTitle}
                onChange={(e) => setWindowTitle(e.target.value)}
                placeholder="snippet.ts"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Theme Selector */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono mb-1.5">
                Editor Theme
              </label>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                {THEMES.map((th) => (
                  <option key={th.id} value={th.id}>
                    {th.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Padding Controls */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono mb-1.5">
                Canvas Padding ({paddingSize}px)
              </label>
              <div className="flex items-center gap-1.5 pt-0.5">
                {[16, 32, 48, 64].map((size) => (
                  <button
                    key={size}
                    onClick={() => setPaddingSize(size)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                      paddingSize === size
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="flex items-center justify-between sm:justify-start gap-4 pt-4 sm:pt-6">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showLineNumbers}
                  onChange={(e) => setShowLineNumbers(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span>Line Numbers</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showWindowControls}
                  onChange={(e) => setShowWindowControls(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span>macOS Dots</span>
              </label>
            </div>
          </div>

          {/* Gradient Selector Pill Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono shrink-0 mr-1">
              Background:
            </span>
            {GRADIENT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setSelectedGradient(preset.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                  selectedGradient === preset.id
                    ? 'ring-2 ring-indigo-500 bg-white dark:bg-slate-800 shadow-sm'
                    : 'bg-slate-200/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-white'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-r ${preset.class}`} />
                <span>{preset.name}</span>
              </button>
            ))}
          </div>

          {/* Quick Code Sample Preset Chips */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-bold font-mono">Load Sample:</span>
            {Object.keys(SAMPLE_CODES).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setSnippetCode(SAMPLE_CODES[key]);
                  setWindowTitle(`sample.${key === 'typescript' ? 'ts' : key === 'react' ? 'tsx' : key === 'python' ? 'py' : 'json'}`);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-100 hover:text-indigo-700 dark:hover:bg-slate-700 font-semibold uppercase text-[10px] font-mono transition-colors"
              >
                {key}
              </button>
            ))}
          </div>

          {/* LIVE PREVIEW CANVAS */}
          <div className="rounded-3xl border border-slate-300 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950 p-4 sm:p-8 flex items-center justify-center overflow-x-auto shadow-inner">
            <div
              ref={previewBoxRef}
              style={{ padding: `${paddingSize}px` }}
              className={`rounded-3xl transition-all duration-300 shadow-2xl flex items-center justify-center max-w-full bg-gradient-to-br ${currentGradient.class}`}
            >
              {/* Mockup Window Box */}
              <div
                style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
                className="rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden w-full min-w-[320px] max-w-2xl"
              >
                {/* Window Header / Traffic lights */}
                <div
                  style={{ backgroundColor: currentTheme.bar }}
                  className="px-4 py-3 flex items-center justify-between border-b border-white/5"
                >
                  <div className="flex items-center gap-2">
                    {showWindowControls && (
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-xs" />
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-xs" />
                        <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-xs" />
                      </div>
                    )}
                  </div>
                  <span className="text-[11px] font-mono opacity-60 font-semibold truncate px-2">
                    {windowTitle || 'snippet'}
                  </span>
                  <div className="w-8" />
                </div>

                {/* Code Body */}
                <div className="p-4 font-mono text-left flex gap-3 overflow-x-auto" style={{ fontSize: `${fontSize}px` }}>
                  {showLineNumbers && (
                    <div className="select-none opacity-30 text-right font-mono pr-2 border-r border-white/10 space-y-1">
                      {snippetCode.split('\n').map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                  )}

                  <div className="flex-1 whitespace-pre leading-relaxed font-mono">
                    {snippetCode}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Editable Code Input Area */}
          <div className="rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                Edit Code Snippet
              </label>
              <button
                onClick={() => setSnippetCode('')}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-semibold"
              >
                Clear
              </button>
            </div>
            <textarea
              rows={6}
              value={snippetCode}
              onChange={(e) => setSnippetCode(e.target.value)}
              placeholder="Paste or write any code here to render live above..."
              className="w-full p-3 font-mono text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          {/* Export Action Buttons */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            {copiedNotification && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-in fade-in">
                <Check className="w-4 h-4" />
                <span>Copied Image to Clipboard!</span>
              </span>
            )}

            <button
              onClick={handleCopyImage}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Image</span>
            </button>

            <button
              onClick={handleDownloadSvg}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <FileCode className="w-4 h-4" />
              <span>Save SVG</span>
            </button>

            <button
              onClick={handleDownloadPng}
              disabled={isExporting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-500/20 transition-all hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Generating...' : 'Download PNG (High-Res)'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 2: CODE & DATA TRANSFORMER                           */}
      {/* ========================================================= */}
      {activeTab === 'code-to-image' ? null : (
        <div className="space-y-6">
          {/* Format Selector Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {TRANSFORM_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setTransformType(opt.id)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  transformType === opt.id
                    ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/40 shadow-sm ring-1 ring-indigo-500'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                }`}
              >
                <span className="block text-xs font-bold text-slate-900 dark:text-white">
                  {opt.name}
                </span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                  {opt.desc}
                </span>
              </button>
            ))}
          </div>

          {/* Error Banner */}
          {transformError && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 flex items-center gap-2.5 text-xs text-rose-700 dark:text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{transformError}</span>
            </div>
          )}

          {/* Dual Code Panels: Input & Output */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Input Panel */}
            <div className="flex flex-col rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 font-mono">
                  Input Code
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setInputCode(SAMPLE_CODES.json)}
                    className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Sample JSON
                  </button>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <button
                    onClick={() => setInputCode('')}
                    className="text-[11px] font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <textarea
                rows={14}
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Paste code to convert here..."
                className="w-full p-4 font-mono text-xs sm:text-sm bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none resize-none leading-relaxed"
              />
            </div>

            {/* Output Panel */}
            <div className="flex flex-col rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 font-mono">
                    Converted Result
                  </span>
                  {outputCode && !transformError && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      Success
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyTransformed}
                    disabled={!outputCode}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-indigo-600 hover:text-white transition-colors"
                  >
                    {copiedTransformer ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTransformer ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={handleDownloadTransformed}
                    disabled={!outputCode}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <textarea
                rows={14}
                readOnly
                value={outputCode}
                placeholder="Converted output will appear here in real-time..."
                className="w-full p-4 font-mono text-xs sm:text-sm bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-100 focus:outline-none resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
