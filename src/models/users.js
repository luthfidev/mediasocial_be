const {db} = require('../utils')

const Schema = db.Schema;


const UserSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    username: {
        type: String,
        min: 6,
        max: 15
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
    // orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
})
// UserSchema.plugin(aggregatePaginate);
module.exports = db.model('users', UserSchema);
