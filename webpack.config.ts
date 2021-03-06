import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const devMode = process.env.NODE_ENV !== 'production'

const config: webpack.Configuration = {
  mode: 'development',
  entry: {
    vendor: './src/vendor.ts',
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
            transpileOnly: devMode
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
      test: /\.(sa|sc|c)ss$/,
      use: [
        devMode ? 'to-string-loader' : MiniCssExtractPlugin.loader,
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
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
  new MiniCssExtractPlugin({
    filename: devMode ? '[name].css' : '[name].[hash].css',
    chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '/src/index.html'),
    excludeChunks: ['app'],
    filename: 'index.html'
  })
],
node: {
  fs: 'empty',
  net: 'empty'
}
};

export default config;