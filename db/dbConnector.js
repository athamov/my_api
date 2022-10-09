const mongoose = require('mongoose');
const { environment } = require('../config/config');
const { UserSchema } = require('./schema/userSchema');
const { CarSchema } = require('./schema/carSchema');
const env = process.env.NODE_ENV || "development";

/**
 * Mongoose Connection
**/

mongoose.connect(environment[env].dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', () => {
    console.error("Error while connecting to DB");
});

const User = mongoose.model('User', UserSchema);
const Car = mongoose.model('Car', CarSchema);

// export { User,Car };
module.exports = {User,Car};
