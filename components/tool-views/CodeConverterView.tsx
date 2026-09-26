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
  typescript: `// TypeScript Product Model & Fetch Handler
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  tags: string[];
}

export async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(\`/api/products/\${id}\`);
  if (!res.ok) throw new Error("Failed to load product");
  return res.json();
}`,
  react: `import React from 'react';

export function ProductBadge({ title, price, isFree }: { title: string; price: number; isFree?: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 text-white">
      <div>
        <h4 className="text-sm font-semibold">{title}</h4>
        <span className="text-xs text-slate-400">{isFree ? 'Free Studio' : \`$\${price}\`}</span>
      </div>
      <button className="px-3 py-1 bg-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-500">
        Get Started
      </button>
    </div>
  );
}`,
  python: `def calculate_discount(price: float, discount_percent: float) -> float:
    """Calculate final product price after discount."""
    if not (0 <= discount_percent <= 100):
        raise ValueError("Invalid discount percentage")
    return round(price * (1 - discount_percent / 100), 2)

# Sample calculation
final_price = calculate_discount(49.99, 15.0)
print(f"Discounted Price: \${final_price}")`,
  json: `{
  "id": "prod_pix_01",
  "name": "PixEnhance Pro Studio",
  "category": "Image & Utility Suite",
  "price": 0.0,
  "currency": "USD",
  "status": "active",
  "features": [
    "High-speed image compression",
    "Lossless vector conversion",
    "Browser-based local privacy",
    "Carbon code to image export"
  ],
  "rating": {
    "score": 4.9,
    "count": 1280
  }
}`,
};

export function CodeConverterView({ initialMode = 'code-to-image' }: CodeConverterViewProps) {
  const [activeTab, setActiveTab] = useState<CodeConverterMode>(initialMode);

  // ==========================================
  // TAB 1: CODE TO IMAGE STATE
  // ==========================================
  const [snippetCode, setSnippetCode] = useState<string>(SAMPLE_CODES.typescript);
  const [windowTitle, setWindowTitle] = useState<string>('Product.ts');
  const [selectedGradient, setSelectedGradient] = useState<string>('sunset');
  const [selectedTheme, setSelectedTheme] = useState<string>('one-dark');
  const [paddingSize, setPaddingSize] = useState<number>(24);
  const [showLineNumbers, setShowLineNumbers] = useState<boolean>(true);
  const [showWindowControls, setShowWindowControls] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<number>(13);
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
                * { box-sizing: border-box; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
                code, pre, .font-mono { font-family: 'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, 'Courier New', monospace; }
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
        * { box-sizing: border-box; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        code, pre, .font-mono { font-family: 'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, 'Courier New', monospace; }
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
          <div xmlns="http://www.w3.org/1999/xhtml">
            <style>
              * { box-sizing: border-box; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
              code, pre, .font-mono { font-family: 'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, 'Courier New', monospace; }
            </style>
            ${serialized}
          </div>
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
    <div
      className="w-full max-w-5xl mx-auto px-4 py-4 space-y-5"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      {/* Mode Selector Header Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 bg-slate-200/80 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 rounded-xl shadow-xs">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('code-to-image')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'code-to-image'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Code to Image Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('code-transformer')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'code-transformer'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Code &amp; Data Converter</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 pr-2.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          <Sparkles className="w-3 h-3 text-indigo-500" />
          <span>Fast &bull; Free &bull; Private</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODE 1: CODE TO IMAGE STUDIO                             */}
      {/* ========================================================= */}
      {activeTab === 'code-to-image' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            {/* Window Title */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                File / Title
              </label>
              <input
                type="text"
                value={windowTitle}
                onChange={(e) => setWindowTitle(e.target.value)}
                placeholder="Product.ts"
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Theme Selector */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Editor Theme
              </label>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                {THEMES.map((th) => (
                  <option key={th.id} value={th.id}>
                    {th.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Font Size Selector */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Font Size ({fontSize}px)
              </label>
              <div className="flex items-center gap-1">
                {[12, 13, 14, 16].map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`flex-1 py-1 rounded-md text-[11px] font-bold font-mono transition-all ${
                      fontSize === size
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Padding Controls */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Canvas Padding ({paddingSize}px)
              </label>
              <div className="flex items-center gap-1">
                {[16, 24, 32, 48].map((size) => (
                  <button
                    key={size}
                    onClick={() => setPaddingSize(size)}
                    className={`flex-1 py-1 rounded-md text-[11px] font-bold font-mono transition-all ${
                      paddingSize === size
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="flex items-center justify-between sm:justify-start gap-3 pt-3 sm:pt-4">
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showLineNumbers}
                  onChange={(e) => setShowLineNumbers(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                />
                <span>Lines</span>
              </label>

              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showWindowControls}
                  onChange={(e) => setShowWindowControls(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                />
                <span>macOS Dots</span>
              </label>
            </div>
          </div>

          {/* Gradient Selector Pill Row */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono shrink-0 mr-1">
              Background:
            </span>
            {GRADIENT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setSelectedGradient(preset.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1.5 shrink-0 ${
                  selectedGradient === preset.id
                    ? 'ring-2 ring-indigo-500 bg-white dark:bg-slate-800 shadow-2xs font-semibold'
                    : 'bg-slate-200/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-white'
                }`}
              >
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${preset.class}`} />
                <span>{preset.name}</span>
              </button>
            ))}
          </div>

          {/* Quick Code Sample Preset Chips */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-bold font-mono text-[10px] uppercase">Product Samples:</span>
            {Object.keys(SAMPLE_CODES).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setSnippetCode(SAMPLE_CODES[key]);
                  setWindowTitle(`Product.${key === 'typescript' ? 'ts' : key === 'react' ? 'tsx' : key === 'python' ? 'py' : 'json'}`);
                }}
                className="px-2 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-100 hover:text-indigo-700 dark:hover:bg-slate-700 font-semibold uppercase text-[10px] font-mono transition-colors"
              >
                {key}
              </button>
            ))}
          </div>

          {/* LIVE PREVIEW CANVAS */}
          <div className="rounded-2xl border border-slate-300 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-950 p-3 sm:p-6 flex items-center justify-center overflow-x-auto shadow-inner">
            <div
              ref={previewBoxRef}
              style={{ padding: `${paddingSize}px` }}
              className={`rounded-2xl transition-all duration-300 shadow-xl flex items-center justify-center max-w-full bg-gradient-to-br ${currentGradient.class}`}
            >
              {/* Mockup Window Box */}
              <div
                style={{
                  backgroundColor: currentTheme.bg,
                  color: currentTheme.text,
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                }}
                className="rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden w-full min-w-[280px] max-w-xl"
              >
                {/* Window Header / Traffic lights */}
                <div
                  style={{ backgroundColor: currentTheme.bar }}
                  className="px-3.5 py-2 flex items-center justify-between border-b border-white/5"
                >
                  <div className="flex items-center gap-1.5">
                    {showWindowControls && (
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                      </div>
                    )}
                  </div>
                  <span
                    className="text-[11px] font-medium opacity-65 truncate px-2"
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
                  >
                    {windowTitle || 'Product.ts'}
                  </span>
                  <div className="w-6" />
                </div>

                {/* Code Body */}
                <div
                  className="p-3.5 sm:p-4 text-left flex gap-3 overflow-x-auto"
                  style={{
                    fontSize: `${fontSize}px`,
                    fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, monospace",
                  }}
                >
                  {showLineNumbers && (
                    <div className="select-none opacity-30 text-right pr-2 border-r border-white/10 space-y-0.5 text-[11px] font-mono">
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
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-sans">
                Edit Code Snippet
              </label>
              <button
                onClick={() => setSnippetCode('')}
                className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium"
              >
                Clear
              </button>
            </div>
            <textarea
              rows={5}
              value={snippetCode}
              onChange={(e) => setSnippetCode(e.target.value)}
              placeholder="Paste or write any code here to render live above..."
              className="w-full p-2.5 font-mono text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 leading-relaxed resize-y"
            />
          </div>

          {/* Export Action Buttons */}
          <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
            {copiedNotification && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-in fade-in">
                <Check className="w-3.5 h-3.5" />
                <span>Copied Image!</span>
              </span>
            )}

            <button
              onClick={handleCopyImage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Image</span>
            </button>

            <button
              onClick={handleDownloadSvg}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Save SVG</span>
            </button>

            <button
              onClick={handleDownloadPng}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-all hover:scale-102"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? 'Generating...' : 'Download PNG'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 2: CODE & DATA TRANSFORMER                           */}
      {/* ========================================================= */}
      {activeTab === 'code-to-image' ? null : (
        <div className="space-y-4">
          {/* Format Selector Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {TRANSFORM_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setTransformType(opt.id)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  transformType === opt.id
                    ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/40 shadow-xs ring-1 ring-indigo-500'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                }`}
              >
                <span className="block text-xs font-bold text-slate-900 dark:text-white">
                  {opt.name}
                </span>
                <span className="block text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                  {opt.desc}
                </span>
              </button>
            ))}
          </div>

          {/* Error Banner */}
          {transformError && (
            <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{transformError}</span>
            </div>
          )}

          {/* Dual Code Panels: Input & Output */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Input Panel */}
            <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
              <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 font-sans">
                  Input Code
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setInputCode(SAMPLE_CODES.json)}
                    className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Product JSON
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
                rows={10}
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Paste code or JSON to convert here..."
                className="w-full p-3 font-mono text-xs bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none resize-none leading-relaxed"
              />
            </div>

            {/* Output Panel */}
            <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
              <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 font-sans">
                    Converted Result
                  </span>
                  {outputCode && !transformError && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      Success
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopyTransformed}
                    disabled={!outputCode}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-indigo-600 hover:text-white transition-colors"
                  >
                    {copiedTransformer ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedTransformer ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={handleDownloadTransformed}
                    disabled={!outputCode}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <textarea
                rows={10}
                readOnly
                value={outputCode}
                placeholder="Converted output will appear here in real-time..."
                className="w-full p-3 font-mono text-xs bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-100 focus:outline-none resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
