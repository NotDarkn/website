const colors = require('tailwindcss/colors')

module.exports = {
    /**
     * Color Palette - Default/Duplicate of Purple Heart (Never remove this)
     */
    default: {
        colors: {
            primary: colors.purple[700],
            secondary: colors.purple[800],
            dark: {
                primary: colors.purple[300],
                secondary: colors.purple[500]
            },
            accent: {
                gray: {
                    light: colors.gray[300],
                    dark: colors.gray[500]
                },
                default: colors.blue[700]
            }
        }
    }
}
