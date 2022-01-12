import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs'
import serve from 'rollup-plugin-serve'
import scss from 'rollup-plugin-scss'
import resolve from '@rollup/plugin-node-resolve'

export default [
    {
        input: 'src/index.js',
        output: [
            {
                file: 'dist/bundle.js',
                format: 'iife',
                name: 'GisTemplate',
                sourcemap: true
            }
        ],
        plugins: [
            svelte({
                emitCss: false,
            }),
            scss({
                output: true,
                sourceMap: true
            }),
            commonjs(),
            resolve({
                browser: true
            }),
            serve({
                openPage: '/docs/',
                open: true
            }),
        ]
    }
];