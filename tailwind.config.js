/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "card-shadow": `0px 6px 15px 1px rgba(2,132,199,0.2);`,
      },
    },
  },
  plugins: [],
};
