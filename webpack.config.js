const path = require('node:path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main/index.tsx',
  output: {
    path: path.join(__dirname, 'public/js'),
    publicPath: '/public/js',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.sass'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  devServer: {
    static: { // contentBase: './public'
      directory: path.join(__dirname, './public')
    },
    devMiddleware: { // writeToDisk: true,
      writeToDisk: true
    },
    historyApiFallback: true,
    port: 3000
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}
