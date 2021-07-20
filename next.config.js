const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
    target: "serverless",
    webpack: function (config, { dev, isServer }) {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.resolve.fallback.fs = false
        }
        // copy files you're interested in
        if (!dev) {
            config.plugins.push(
                new CopyPlugin({
                    patterns: [{ from: "public/emailTemplates", to: "public/emailTemplates" }],
                })
            )
        }

        return config
    },
}