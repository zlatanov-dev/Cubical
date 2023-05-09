const config = {
    production: {
        PORT: 3000,
        DB_URI: 'mongodb://127.0.0.1:27017/cubical',
        SECRET: "PRODUCTIONSECRET",
    },
    development: {
        PORT: 5000,
        DB_URI: 'mongodb://127.0.0.1:27017/cubical',
        SECRET: "DEVELOPMENTSECRET",
    }
}
module.exports = config[process.env.node_env || 'development'];