var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var DEBUG = process.env.NODE_ENV !== 'production'
var ENTRY = ['./src/index.js']
var DIST = 'dist'

var plugins = [
	new webpack.DefinePlugin({
		DEBUG: DEBUG,
		'process.env': {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV)
		}
	}),
	new HtmlWebpackPlugin({
		title: 'Заявка на открытие карты',
		template: 'src/index.html',
		inject: true,
		debug: DEBUG
	}),
	new ExtractTextPlugin('styles.css')
]

var cssLoaderOptions = {
	modules: true,
	sourceMap: true,
	localIdentName: DEBUG && '[local]__[hash:base64:5]'
}

var autoprefixerLoaderOptions = {
	browsers: ['last 2 versions', 'ios >= 7']
}

var loaders = [
	{
		test: /\.js$/,
		loader: 'babel',
		query: {
			presets: [
				'babel-preset-es2015',
				'babel-preset-stage-0',
				'babel-preset-react'
			],
			plugins: [
				'babel-plugin-transform-runtime',
				'babel-plugin-transform-decorators-legacy'
			],
			cacheDirectory: true
		},
		exclude: [
			path.join(__dirname, 'node_modules')
		]
	},

	{
		test: /\.css$/,
		loader: ExtractTextPlugin.extract('style-loader',
			'css-loader?' + JSON.stringify(cssLoaderOptions) + '!' +
			'autoprefixer-loader?' + JSON.stringify(autoprefixerLoaderOptions)
		)
	},

	{
		test: /\.scss$/,
		loader: ExtractTextPlugin.extract('style-loader',
			'css-loader?' + JSON.stringify(cssLoaderOptions) + '!' +
			'autoprefixer-loader?' + JSON.stringify(autoprefixerLoaderOptions) + '!' +
			'sass-loader'
		)
	},

    {
        test: /\.(jpe?g|png|gif|svg|otf)$/i,
        loader: 'file'
	}
]

module.exports = {
    entry: ENTRY,
	output: {
		path: DIST,
		filename: 'bundle.js'
	},
	plugins: plugins,
	module: {
		loaders: loaders
	},
	devtool: DEBUG ? 'source-map' : undefined
}
