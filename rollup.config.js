import path from 'path';
import { defineConfig } from 'rollup';
import del from 'rollup-plugin-delete';
import externals from 'rollup-plugin-node-externals';
import ts from 'rollup-plugin-ts';

const distPath = path.join(__dirname, 'dist');
const inputPath = path.join(__dirname, 'src', 'index.ts');

// https://rollupjs.org/configuration-options
export default defineConfig({
	input: inputPath,
	output: {
		dir: distPath,
		exports: 'named',
		externalLiveBindings: false,
		format: 'cjs',
		generatedCode: {
			arrowFunctions: true,
			constBindings: true,
			objectShorthand: true
		},
		preserveModules: true,
		validate: true
	},
	plugins: [
		del({ targets: './dist' }),
		externals(),
		ts()
	]
});
