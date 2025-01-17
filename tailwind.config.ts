import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    theme: {
        extend: {
            aspectRatio: {
                auto: 'auto',
                square: '1 / 1',
                video: '16 / 9'
            },
            fontFamily: {
                'luxurious': ['Luxurious Script', 'cursive'],
                'noto': ['Noto Serif', 'serif'],
                'antic': ['Antic Didone', 'serif'],
            },
            fontWeight: {
                light: '100',
            }
        }
    }
}
