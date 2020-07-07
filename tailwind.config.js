module.exports = {
  theme: {
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      default: '0.25rem',
      md: '0.375rem',
      lg: '20px',
      full: '9999px',
      large: '12px',
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      blueberry: '#435DED',
      moula: '#60CBBA',
      milk: '#f1f1f1',
      greyish: '#f4f4f4',
      dark: '#20242a',
      eggshell: '#F6F9FA',
      pinkie: '#F04873',
    }),
    textColor: (theme) => ({
      ...theme('colors'),
      'light-blueberry': '#8297F8',
    }),
    borderColor: (theme) => ({
      lightGrey: '#E4E4E4',
    }),
  },
};