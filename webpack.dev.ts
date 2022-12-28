import * as path from 'path';
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import { merge } from 'webpack-merge';

import common from './webpack.common';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public/'),
    },
    host: '0.0.0.0',
    port: 8000,
    historyApiFallback: true,
  },
});

export default config;
