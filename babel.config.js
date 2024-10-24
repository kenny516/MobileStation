module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // Make sure this is correctly set
  };
};
