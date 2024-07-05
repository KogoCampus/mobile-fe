## Installation
```
yarn install
npx husky
```

## Commands
```
# storybook
yarn storybook

# start in dev mode
yarn start

# run tests
yarn run test

# linter
yarn run lint

# formatter
yarn run prettier
```

## Conventional Commit
```
git commit -m "{commit-type}: {description}"

acceptable commit types:
['feat', 'fix', 'docs', 'style', 'refactor', 'ci', 'test', 'foo']
```

## Others
VS Code eslint plugin  

eslint RNTL bug:  
https://github.com/testing-library/eslint-plugin-testing-library/issues/777

Using ```px``` for sizing raster images, ```em``` for current element font size relative padding/margins/line spacing, and ```rem``` for font size definitions and general layout is fine.    

Auto Scaling in Styling on Mobile Device  
https://github.com/nirsky/react-native-size-matters   

React-hook-form  
https://react-hook-form.com/get-started  
Zod validation in React-hook-form  
https://github.com/react-hook-form/resolvers#zod  

# EAS
After running eas update, upload the source maps to Sentry:   
```
npx sentry-expo-upload-sourcemaps dist
```