import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
  entry: './src/js/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public/js/'),
    publicPath: '/js/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,

              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
  },
};

export default config;
