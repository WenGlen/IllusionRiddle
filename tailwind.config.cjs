/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        'primaryThickness': 'var(--primaryThickness)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
          muted: "var(--primary-muted)",
          strong: "var(--primary-strong)",
          foreground: "var(--primary-foreground)",
        },

        secondary: {
          DEFAULT: "var(--secondary)",
          hover: "var(--secondary-hover)",
          muted: "var(--secondary-muted)",
          strong: "var(--secondary-strong)",
          foreground: "var(--secondary-foreground)",
        },

        text: {
          DEFAULT: "var(--text)",
          muted: "var(--text-muted)",
          subtle: "var(--text-subtle)",
          emphasis: "var(--text-emphasis)",
        },

        border: {
          DEFAULT: "var(--border)",
          muted: "var(--border-muted)",
          subtle: "var(--border-subtle)",
          strong: "var(--border-strong)",
          foreground: "var(--border-foreground)",
        },

        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          muted: "var(--accent-muted)",
        },

        panel:{
          DEFAULT: "var(--panel)",
          foreground: "var(--panel-foreground)",
        }, 

        gray: {
          "50": "var(--gray-50)",
          "100": "var(--gray-100)",
          "200": "var(--gray-200)",
          "300": "var(--gray-300)",
          "400": "var(--gray-400)",
          "500": "var(--gray-500)",
          "600": "var(--gray-600)",
          "700": "var(--gray-700)",
          "800": "var(--gray-800)",
          "950": "var(--gray-950)",
        },
        
      },
    },
  },
  plugins: [],
}
  