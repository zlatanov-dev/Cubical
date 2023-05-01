const config = {
    production: {
        PORT: 3000,
    },
    development: {
        PORT: 5000,
    }
}
module.exports = config[process.env.node_env || 'development'];