var webpack = require("webpack");
var path = require("path")
var HtmlwebpackPlugin=require("html-webpack-plugin");
module.exports = {
	entry:"./src/main.js",
	output:{
 		path: path.resolve(__dirname, './dist'),
		filename:"build.js"
	},
	module:{
		loaders:[
			{
				test:/\.vue$/,
				loader:'vue-loader'
			},
			{
				test:/\.css$/,
				loader:'style-loader!css-loader!autoprefixer-loader'
			},
			{
				test:/\.js$/,
				loader:'babel-loader',
				exclude:/node_modules/,
				query: {
         			presets: ['es2015']
       			 } 	
			},
			{
				test:/\.less$/,
				loader:'style-loader!css-loader!autoprefixer-loader!less-loader'
			},
			{
				test:/\.scss$/,
				loader:'style-loader!css-loader!autoprefixer-loader!sass-loader'
			},
			{
				 test: /\.(png|jpg|gif|ttf|woff|svg|eot|woff2)$/,
         	 	 loader:'url-loader?limit=40000'		
			}
		]

	},
	plugins: [

	    new HtmlwebpackPlugin({

	    title: 'index',  //生成的页面标题

	    filename: 'index.html', //生成的文件名称

	    template: 'index.html' //根据index1.html这个模板来生成

		}),
		new webpack.ProvidePlugin({  
			$:"jquery",  
			jQuery:"jquery",  
			"windows.jQuery":"jquery"  
		}) 
 	]		
 }