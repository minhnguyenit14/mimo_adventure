const { override, addBabelPlugins } = require('customize-cra');
module.exports = override(
  ...addBabelPlugins(
    [
      'module-resolver', 
        {
          root: ["./src"],
          alias: {
            'app-config': "./src/appConfig",
            'app-commons': "./src/commons",
            'app-containers': "./src/containers",
            'app-constants': "./src/constants",
            'app-helpers': "./src/helpers",
            'app-redux': "./src/redux",
            'app-assets': "./src/assets",
          }
        }
    ],
  ),
);