"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const plugin_vue_1 = __importDefault(require("@vitejs/plugin-vue"));
const rollup_plugin_esbuild_1 = __importDefault(require("rollup-plugin-esbuild"));
const path_1 = require("path");
const esbuildPlugin = () => (Object.assign({}, (0, rollup_plugin_esbuild_1.default)({
    target: 'chrome64',
    include: /\.vue$/,
    loaders: {
        '.vue': 'js',
    },
})));
// https://vitejs.dev/config/
exports.default = (0, vite_1.defineConfig)({
    root: './example/',
    base: '',
    plugins: [(0, plugin_vue_1.default)(), esbuildPlugin()],
    resolve: {
        alias: {
            '@': (0, path_1.resolve)(__dirname, '../src'),
        },
    },
});
