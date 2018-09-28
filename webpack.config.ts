import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: webpack.Configuration = {
  mode: 'development',
  entry: {
    vendor: './src/vendor.ts',
    app: './rest/api/v2/app.ts',
    main: './src/main.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [{
          loader: 'awesome-typescript-loader',
          options: {
            transpileOnly: process.env.NODE_ENV !== 'production'
          }
        },
        'angular2-template-loader',
        'angular2-router-loader'
        
      ],
      exclude: [/\.(spec|e2e)\.ts$/],
    },
    {
      test: /\.ts$/,
      include: [/\.(spec|e2e)\.ts$/],
      loaders: ['awesome-typescript-loader', 'angular2-template-loader']
    },
    {
      test: /\.html$/,
      loader: 'html-loader'
    },
    {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|cur)$/,
      loader: 'file-loader?name=assets/[name].[hash].[ext]'
    },
    {
      test: /\.scss$/,
      loaders: [
        'to-string-loader',
        "css-loader"
      ]
    }
  ]
},
resolve: {
  extensions: [ '.tsx', '.ts', '.js' ]
},
plugins: [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)/,
    path.resolve(__dirname, './src')
  ),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '/src/index.html'),
    excludeChunks: ['app'],
    filename: 'index.html'
  })
],
// stats: {
//   warnings: true,
//   warningsFilter: /System.import()/
//   }
};

export default config;