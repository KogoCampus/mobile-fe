const moduleAlias = {
    appEntry: '@kogo/AppEntry',
    rootNavigator: '@kogo/RootNavigator',
};

module.exports = function (context, moduleName, platform) {
    let module;
    if (moduleName === moduleAlias.appEntry) {
        switch (process.env.EXPO_PUBLIC_APP_ENTRY) {
            case 'production':
                module = context.resolveRequest(context, `@apps/AppEntryProduction`, platform);
                break;
            case 'development':
                module = context.resolveRequest(context, `@apps/AppEntryDevelopment`, platform);
                break;
            case 'development_msw':
                module = context.resolveRequest(context, `@apps/AppEntryDevelopmentMSW`, platform);
                break;
            case 'storybook':
                module = context.resolveRequest(context, `@apps/Storybook`, platform);
                break;
            default:
                module = context.resolveRequest(context, `@apps/AppEntryDevelopment`, platform);
                break;
        }
    }

    return module ?? context.resolveRequest(context, moduleName, platform);
};
