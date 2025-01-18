const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',  // تحديد وضع Webpack حسب البيئة
  entry: path.resolve(__dirname, 'src/client/js/app.js'),  // تحديد المسار للملف الرئيسي
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    static: './dist',  // خدمة الملفات من المجلد dist
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',  // استخدام Babel لتحويل الأكواد
      },
      {
        test: /\.scss$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',  // تحديد طريقة تحميل CSS حسب البيئة
          'css-loader',
          'sass-loader',  // تحويل SCSS إلى CSS
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.wasm'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/views/index.html',  // تحديد قالب الـ HTML
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css',  // اسم ملف CSS النهائي
    }),
    ...(isProduction ? [new CleanWebpackPlugin()] : []),  // تنظيف المجلد dist فقط في وضع الإنتاج
  ],
};
