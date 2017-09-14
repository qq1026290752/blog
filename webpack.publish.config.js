const webpack=require("webpack");
const path = require('path');
const node_modules = path.resolve(__dirname, 'node_modules');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlwebpackPlugin=require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: {
    		app:path.resolve(__dirname,'src/main.js'),
			vendors:['vue']		
		},
    output: {
        path: path.resolve(__dirname, 'dist/app'),
		filename: 'static/js/[name].js',
    },
    module: {
        loaders: [ 
           {
				test:/\.vue$/,
				loader:'vue-loader'
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: 'css-loader',
					fallback: 'style-loader'
				})
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
				 test: /\.(png|jpg|gif)$/,
         	 	 loader:'url-loader?limit=8192&name=./static/img/[name].[ext]'		
			},
			{
				 test: /\.(ttf|woff|svg|eot|woff2)$/,
         	 	 loader:'url-loader?limit=8192&name=./static/font/[name].[ext]'		
			} 

        ]
    },
    plugins:[
    	new webpack.optimize.CommonsChunkPlugin({ 
		    name: 'vendor', 
		    filename: 'vendor.bundle.js', 
		    minChunks: Infinity 
		}),
		new UglifyJsPlugin({
			compress:{
				warnings:false
			}
		}),
		new ExtractTextPlugin("static/css/styles.css"),
 		new HtmlwebpackPlugin({
			title: 'index',  //生成的页面标题
			filename: 'index.html', //生成的文件名称
			template: 'index.html' //根据index1.html这个模板来生成
			
		}),
        new CleanWebpackPlugin(
            ['dist/app/'],　 //匹配删除的文件
            {
                root: __dirname,       　　　　　　　　　　//根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false        　　　　　　　　　　//启用删除文件
        })
    ]
}
