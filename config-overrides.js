const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewireLessModule = require("react-app-rewire-less-modules");
const rewireStyledComponents = require('react-app-rewire-styled-components');
// const rewireCssModules = require('react-app-rewire-css-modules');
module.exports = function override(config, env) {
     config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
     config = rewireLess.withLoaderOptions({
         modifyVars: { "@primary-color": "#1DA57A" },
     })(config, env);
     config = rewireStyledComponents(config, env,{
        ssr: true,
        displayName:true
     });
     config = rewireLessModule(config, env);
     //config = rewireCssModules(config, env);
     return config;