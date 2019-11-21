const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './main.js',
	output: {
		path: path.join(__dirname, '/bundle'),
		filename: 'index_bundle.js'
	},
	devServer: {
		inline: true,
		port: 3001,
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015','react']
				}
			}
		]
	},
	plugins: [
		new HTMLWebpackPlugin({ template: './index.html'})
	]
}
