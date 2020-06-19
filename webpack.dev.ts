import * as path from 'path';
import * as webpack from 'webpack';
import merge from 'webpack-merge';

import common from './webpack.common';

const config: webpack.Configuration = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    host: '0.0.0.0',
    port: 8000,
    historyApiFallback: true,
  },
});

export default config;
