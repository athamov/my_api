const  PORT = 8080;
const environment = {
    development: {
        serverURL: `http://localhost:${PORT}/`,
        dbString: 'mongodb+srv://Goodboyz7:nurullox00@mycluster1.mqtqv.mongodb.net/myFirstDatabase'
    },
    production: {
        serverURL: `http://localhost:${PORT}/`,
        dbString: 'mongodb+srv://Goodboyz7:nurullox00@mycluster1.mqtqv.mongodb.net/myFirstDatabase'
    }
}

module.exports = { PORT, environment };
// module.exports = environment;