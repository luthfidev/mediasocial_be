const {db} = require('../utils')

const Schema = db.Schema;


const FeedSchema = new Schema({
    image: {
        type: String,
        lowercase: true,
        required: true
    },
    caption: {
        type: String,
        min: 6,
        max: 100
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
module.exports = db.model('feeds', FeedSchema);
