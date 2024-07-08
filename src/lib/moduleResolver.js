const moduleAlias = {
    appEntry: '@kogo/AppEntry',
    rootNavigator: '@kogo/RootNavigator',
};

module.exports = function (context, moduleName, platform) {
    let module;
    if (moduleName === moduleAlias.appEntry) {
        switch (process.env.APP_ENTRY) {
            case 'storybook':
                module = context.resolveRequest(context, `@apps/Storybook`, platform);
                break;
            default:
                module = context.resolveRequest(context, `@apps/AppEntryBasic`, platform);
                break;
        }
    }

    if (moduleName === moduleAlias.rootNavigator) {
        switch (process.env.ROOT_NAVIGATOR) {
        }
    }

    return module ?? context.resolveRequest(context, moduleName, platform);
};
