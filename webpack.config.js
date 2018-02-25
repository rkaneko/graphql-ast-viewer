const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    js: "./src/index.tsx",
    css: "./src/css/index.css"
  },
  output: {
    filename: "bundle.[name]",
    path: path.join(__dirname,  "public", "static"),
    publicPath: "/static"
  },
  devtool: "source-map",
  resolve:  {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            {
              loader: "postcss-loader"
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "bundle.css",
      allChunks: true
    })
  ]
};
