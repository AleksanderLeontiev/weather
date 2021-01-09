module.exports = api => {
    return {
        plugins: [
            "@babel/plugin-proposal-nullish-coalescing-operator",
            "@babel/plugin-proposal-optional-chaining"
        ],
        presets: [
            [
                "@babel/preset-env",
                {
                    useBuiltIns: "entry",
                    targets: { chrome: "58", ie: "11" }
                }
            ]
        ]
    }
};