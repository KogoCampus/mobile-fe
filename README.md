## Installation
Add `.npmrc` in the project root to install depedencies from our private npm registry:  
```
@KogoCampus:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=your-github-token
```
Please refer [this](https://docs.catalyst.zoho.com/en/tutorials/githubbot/java/generate-personal-access-token/) to find how to obtain the personal github token.  

```
pnpm install
npx husky
```

## App Entry

You may change the app's entry point depending on the environment you want to examine. Available options are: `storybook`, `development_msw`, `development`, and `production`.  
Optionally you can enter into the storybook mode by `pnpm storybook`.  

## Commands
```
# storybook
pnpm storybook

# start in dev mode
pnpm start

# run tests
pnpm run test

# linter
pnpm run lint

# formatter
pnpm run prettier
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