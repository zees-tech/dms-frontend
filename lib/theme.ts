// Theme configuration
export type Theme = 'light' | 'dark' | 'system';

export type ColorScheme = 'blue' | 'green' | 'purple' | 'orange' | 'red';

export type FontFamily = 'inter' | 'roboto' | 'poppins' | 'opensans';

export interface ThemeConfig {
    theme: Theme;
    colorScheme: ColorScheme;
    fontFamily: FontFamily;
}

export const defaultTheme: ThemeConfig = {
    theme: 'system',
    colorScheme: 'blue',
    fontFamily: 'inter'
};

export const colorSchemes = {
    blue: {
        primary: 'bg-blue-600 hover:bg-blue-700',
        secondary: 'bg-blue-100 text-blue-900',
        accent: 'text-blue-600'
    },
    green: {
        primary: 'bg-green-600 hover:bg-green-700',
        secondary: 'bg-green-100 text-green-900',
        accent: 'text-green-600'
    },
    purple: {
        primary: 'bg-purple-600 hover:bg-purple-700',
        secondary: 'bg-purple-100 text-purple-900',
        accent: 'text-purple-600'
    },
    orange: {
        primary: 'bg-orange-600 hover:bg-orange-700',
        secondary: 'bg-orange-100 text-orange-900',
        accent: 'text-orange-600'
    },
    red: {
        primary: 'bg-red-600 hover:bg-red-700',
        secondary: 'bg-red-100 text-red-900',
        accent: 'text-red-600'
    }
};

export const fontFamilies = {
    inter: 'font-inter',
    roboto: 'font-roboto',
    poppins: 'font-poppins',
    opensans: 'font-opensans'
};