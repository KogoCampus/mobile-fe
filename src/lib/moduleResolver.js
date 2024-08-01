const moduleAlias = {
    appEntry: '@kogo/AppEntry',
    rootNavigator: '@kogo/RootNavigator',
};

module.exports = function (context, moduleName, platform) {
    let module;
    if (moduleName === moduleAlias.appEntry) {
        switch (process.env.APP_ENTRY) {
            case 'msw':
                module = context.resolveRequest(context, `@apps/AppEntryWithMSW`, platform);
                break;
            case 'storybook':
                module = context.resolveRequest(context, `@apps/Storybook`, platform);
                break;
            default:
                module = context.resolveRequest(context, `@apps/AppEntry`, platform);
                break;
        }
    }

    return module ?? context.resolveRequest(context, moduleName, platform);
};
