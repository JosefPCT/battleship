# webpack-template
A template repository for webpack projects, lists of plugins and modules 

Private repo

- Installed base webpack `webpack webpack-cli`

# Commands:
`npm run start` / `npm start` - Opens local host server and uses webpack.dev config file
`npm run build` / - For deployment, use to bundle to dist

# Lists of packages used

`webpack webpack-cli` - base webpack
`webpack-merge` - to use for merging multiple config files
`html-webpack-plugin` - for html
`style-loader` & `css-loader` - for css and css images
`html-loader` - for html images
Uses built-in tool for javascript images
`webpack-dev-server` - for localhost dev server
`eslint` for linting, recommended to have the ESlint extension for VS code as well, to use with prettier formatter
    - Command: `npx eslint yourFile.js`
`prettier` for code formatting
    - Commands: 
    `npx prettier --write src/test.js`
    `npx prettier --check src/test.js`


