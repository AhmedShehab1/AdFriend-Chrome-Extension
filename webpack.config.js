const path = require("path");

module.exports = {
    entry: "./background.js",
    output: {
        filename: "background.js",
        path: path.resolve(__dirname, "dist"),
    },
    mode: "production",
    target: 'web', // Ensure compatibility with browser environments
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
            }
        ]
    }
};
