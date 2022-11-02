module.exports = {
    ...require('../../packages/ui/tailwind.config.cjs'),
    content: [
     './pages/**/*.{js,ts,jsx,tsx}',
     './components/**/*.{js,ts,jsx,tsx}',
     '../../packages/ui/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
     extend: {},
    },
    plugins: [require('@deepfence-theme/ui-tailwind-plugin')],
   };