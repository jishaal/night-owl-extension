const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
	entry: {
		main: path.join(__dirname, 'src/index.tsx'),
		content: path.join(__dirname, 'src/content.ts'),
		background: path.join(__dirname, 'src/background.ts'),
	},
	output: { path: path.join(__dirname, 'build'), filename: '[name].js' },
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
				exclude: /\.module\.css$/,
			},
			{
				test: /\.ts(x)?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: true,
						},
					},
				],
				include: /\.module\.css$/,
			},
			{
				test: /\.svg$/,
				use: 'file-loader',
			},
			{
				test: /\.png$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							mimetype: 'image/png',
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.tsx', '.ts'],
		alias: {
			'react-dom': '@hot-loader/react-dom',
		},
	},
	devServer: {
		contentBase: './build',
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: 'node_modules/webextension-polyfill/dist/browser-polyfill.min.js',
					to: '.',
				},
				{ from: 'public', to: '.' },
			],
		}),
	],
};

module.exports = config;
