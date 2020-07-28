const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/scripts/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	performance: {
		hints: false
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new CopyWebpackPlugin({
			patterns: [{ from: 'src/assets', to: 'assets' }],
		}),
	], 
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		host: '192.168.1.11',
		port: 1234,
		historyApiFallback: true
	},
};
