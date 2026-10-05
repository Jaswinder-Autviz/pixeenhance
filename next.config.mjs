/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '15mb',
    },
  },
  turbopack: {},
  webpack: (config, { isServer }) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }

    return config;
  },
  async redirects() {
    return [
      // Legal & Static duplicates
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/privacy-policy.html', destination: '/privacy', permanent: true },
      { source: '/terms-and-conditions', destination: '/terms', permanent: true },
      { source: '/terms-of-service', destination: '/terms', permanent: true },
      { source: '/terms.html', destination: '/terms', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },

      // Tool Synonym duplicates
      { source: '/crop-image', destination: '/image-cropper', permanent: true },
      { source: '/rotate-image', destination: '/image-rotator', permanent: true },
      { source: '/flip-image', destination: '/image-flipper', permanent: true },
      { source: '/split-image', destination: '/image-splitter', permanent: true },
      { source: '/grid-splitter', destination: '/image-splitter', permanent: true },
      { source: '/panorama-splitter', destination: '/image-splitter', permanent: true },
      { source: '/photo-splitter', destination: '/image-splitter', permanent: true },

      // Core Image & Compression Aliases (Consolidated 301 Redirects)
      { source: '/compress-jpg-to-20kb', destination: '/compress-jpg-to-50kb', permanent: true },
      { source: '/compress-image-to-20kb', destination: '/compress-jpg-to-50kb', permanent: true },
      { source: '/compress-jpeg-to-20kb', destination: '/compress-jpg-to-50kb', permanent: true },
      { source: '/compress-photo-to-20kb', destination: '/compress-jpg-to-50kb', permanent: true },
      { source: '/compress-image-to-50kb', destination: '/compress-jpg-to-50kb', permanent: true },
      { source: '/compress-photo-to-50kb', destination: '/compress-jpg-to-50kb', permanent: true },
      { source: '/compress-image-to-100kb', destination: '/compress-jpg-to-100kb', permanent: true },
      { source: '/compress-photo-to-100kb', destination: '/compress-jpg-to-100kb', permanent: true },
      { source: '/compress-image-to-200kb', destination: '/compress-jpg-to-200kb', permanent: true },
      { source: '/compress-photo-to-200kb', destination: '/compress-jpg-to-200kb', permanent: true },

      // PDF under-KB variants redirecting to main PDF tools
      { source: '/jpg-to-pdf-under-50kb', destination: '/jpg-to-pdf', permanent: true },
      { source: '/jpg-to-pdf-under-100kb', destination: '/jpg-to-pdf', permanent: true },
      { source: '/jpg-to-pdf-under-200kb', destination: '/jpg-to-pdf', permanent: true },
      { source: '/image-to-pdf-under-100kb', destination: '/image-to-pdf', permanent: true },
      { source: '/image-to-pdf-under-200kb', destination: '/image-to-pdf', permanent: true },

      // Paper series variants redirecting to A4 Resizer
      { source: '/a0-image-resizer', destination: '/a4-image-resizer', permanent: true },
      { source: '/a1-image-resizer', destination: '/a4-image-resizer', permanent: true },
      { source: '/a2-image-resizer', destination: '/a4-image-resizer', permanent: true },
      { source: '/a3-image-resizer', destination: '/a4-image-resizer', permanent: true },
      { source: '/a5-image-resizer', destination: '/a4-image-resizer', permanent: true },
      { source: '/a6-image-resizer', destination: '/a4-image-resizer', permanent: true },
      { source: '/a7-image-resizer', destination: '/a4-image-resizer', permanent: true },

      // Converter Aliases
      { source: '/webp-to-jpg-converter', destination: '/webp-to-jpg', permanent: true },
      { source: '/webp-to-png-converter', destination: '/webp-to-png', permanent: true },
      { source: '/jpg-to-png-converter', destination: '/jpg-to-png', permanent: true },
      { source: '/png-to-jpg-converter', destination: '/png-to-jpg', permanent: true },
      { source: '/heic-to-jpg-converter', destination: '/heic-to-jpg', permanent: true },
      { source: '/heic-to-jpeg', destination: '/heic-to-jpg', permanent: true },

      // Driving, Govt Exams & Visa Aliases
      { source: '/driving-license-photo-resizer', destination: '/driving-licence-photo-resizer', permanent: true },
      { source: '/sarathi-photo-resizer', destination: '/driving-licence-photo-resizer', permanent: true },
      { source: '/sarathi-signature-resizer', destination: '/driving-licence-photo-resizer', permanent: true },
      { source: '/parivahan-photo-resizer', destination: '/driving-licence-photo-resizer', permanent: true },
      { source: '/pan-card-signature-resizer', destination: '/pan-card-photo-resizer', permanent: true },
      { source: '/epfo-photo-resizer', destination: '/epfo-uan-photo-resizer', permanent: true },
      { source: '/uan-photo-resizer', destination: '/epfo-uan-photo-resizer', permanent: true },
      { source: '/dv-lottery-photo-tool', destination: '/dv-lottery-photo-checker-resizer', permanent: true },
      { source: '/dv-lottery-photo-resizer', destination: '/dv-lottery-photo-checker-resizer', permanent: true },
      { source: '/green-card-lottery-photo-resizer', destination: '/dv-lottery-photo-checker-resizer', permanent: true },
      { source: '/dv-lottery-photo-size', destination: '/dv-lottery-photo-checker-resizer', permanent: true },
      { source: '/us-passport-photo-tool', destination: '/us-passport-photo-resizer', permanent: true },
      { source: '/passport-photo-resizer-2x2', destination: '/us-passport-photo-resizer', permanent: true },
      { source: '/us-visa-photo-tool', destination: '/us-visa-photo-resizer', permanent: true },
      { source: '/ds160-photo-resizer', destination: '/us-visa-photo-resizer', permanent: true },
      { source: '/amazon-image-resizer', destination: '/amazon-product-image-resizer', permanent: true },
      { source: '/zillow-photo-resizer', destination: '/zillow-listing-photo-resizer', permanent: true },
      { source: '/ssc-cpo-photo-resizer', destination: '/ssc-photo-resizer', permanent: true },
      { source: '/rrb-ntpc-photo-resizer', destination: '/rrb-photo-resizer', permanent: true },
      { source: '/rrb-alp-photo-resizer', destination: '/rrb-photo-resizer', permanent: true },
      { source: '/rrb-group-d-photo-resizer', destination: '/rrb-photo-resizer', permanent: true },
      { source: '/rrb-technician-photo-resizer', destination: '/rrb-photo-resizer', permanent: true },
      { source: '/neet-photo-resizer', destination: '/neet-postcard-photo-resizer', permanent: true },
      { source: '/jee-photo-resizer', destination: '/jee-main-photo-resizer', permanent: true },
      { source: '/cuet-ug-photo-resizer', destination: '/cuet-photo-resizer', permanent: true },
      { source: '/cuet-pg-photo-resizer', destination: '/cuet-photo-resizer', permanent: true },
      { source: '/gate-signature-resizer', destination: '/gate-photo-resizer', permanent: true },
      { source: '/bpsc-signature-resizer', destination: '/bpsc-photo-resizer', permanent: true },
      { source: '/bpsc-tre-photo-resizer', destination: '/bpsc-photo-resizer', permanent: true },
      { source: '/bpsc-cce-photo-resizer', destination: '/bpsc-photo-resizer', permanent: true },
      { source: '/up-police-signature-resizer', destination: '/up-police-photo-resizer', permanent: true },
      { source: '/up-constable-photo-resizer', destination: '/up-police-photo-resizer', permanent: true },
      { source: '/ibps-signature-resizer', destination: '/ibps-photo-resizer', permanent: true },
      { source: '/sbi-photo-resizer', destination: '/ibps-photo-resizer', permanent: true },
    ];
  },
};

export default nextConfig;
