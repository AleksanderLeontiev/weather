/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
	entry: {
		main: path.resolve(__dirname, "./src/index.ts"),
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "[name].bundle.js",
	},
	resolve: {
		extensions: [".js", ".ts"],
	},
	module: {
		rules: [
			{
				test: /\.(j|t)s$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
						plugins: ["@babel/plugin-transform-runtime"],
					},
				test: /\.(scss|css)$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
				},
			},
		],
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		hot: true,
		port: 9000,
	},
	plugins: [
		new HtmlWebpackPlugin({ template: "index.html" }),
		new MiniCssExtractPlugin({
			filename: "./style.css",
		}),
		new CleanWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new BrowserSyncPlugin(
			{
				host: "localhost",
				port: 3000,
				proxy: "http://localhost:9000/",
			},
			{
				reload: false,
			}
		),
	],
};
