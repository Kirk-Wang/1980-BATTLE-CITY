const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const getDevConfig = require('./devConfig')

function processDevConfig(config) {
  const result = {}
  for (const [key, value] of Object.entries(config)) {
    result[key] = JSON.stringify(value)
  }
  return result
}

module.exports = function(env = {}) {
  const prod = Boolean(env.prod)
  const plugins = [
    new webpack.DefinePlugin({
      // 将 devConfig.js 中的配置数据加入到 DefinePlugin 中
      ...processDevConfig(getDevConfig(!prod)),
    }),
    new HtmlWebpackPlugin({
      title: "decompose-battle-city",
      filename: "index.html",
      template: path.resolve(__dirname, "game/index.tmpl.html")
    }),
    new webpack.NamedModulesPlugin()
  ].filter(Boolean)

  return {
    mode: "development",
    devtool: "source-map",
    context: __dirname,
    target: "web",
    entry: path.resolve(__dirname, "game/main.tsx"),
    output: {
      path: path.resolve(__dirname, "dist")
    },
    resolve: {
      modules: [path.resolve(__dirname, "game"), "node_modules"],
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    module: {
      rules: [
        { test: /\.json$/, type: 'javascript/auto', loader: 'json-loader' },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    plugins
  };
};
