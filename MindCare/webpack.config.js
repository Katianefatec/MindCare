const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.resolve.fallback = {
    ...config.resolve.fallback,    
    "fs": false,
    "path": false,
    "os": false,
    "crypto": false,
    "stream": false,
    "buffer": require.resolve("buffer/"),
  };

  // Desabilitar o lightningcss
  config.optimization = {
    ...config.optimization,
    minimize: false
  };

  // Adicionar variáveis de ambiente
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.CSS_TRANSFORMER_WASM': JSON.stringify(false)
    })
  );

  return config;
};