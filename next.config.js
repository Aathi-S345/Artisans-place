/** @type {import('next').NextConfig} */
const nextConfig = {
  // This tells Next.js where to find your class names
  // It effectively replaces the content array from tailwind.config.js
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('tailwindcss')({
                  content: [
                    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
                    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
                    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
                  ],
                  theme: {
                    extend: {
                      colors: {
                        primary: {
                          50: '#f0f9ff',
                          100: '#e0f2fe',
                          200: '#bae6fd',
                          300: '#7dd3fc',
                          400: '#38bdf8',
                          500: '#0ea5e9',
                          600: '#0284c7',
                          700: '#0369a1',
                          800: '#075985',
                          900: '#0c4a6e',
                        },
                      },
                    },
                  },
                  plugins: [],
                }),
                require('autoprefixer'),
              ],
            },
          },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;