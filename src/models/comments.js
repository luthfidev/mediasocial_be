const {db} = require('../utils')

const Schema = db.Schema;


const CommentSchema = new Schema({
    feedId: {
        type: Schema.Types.ObjectId,
        lowercase: true,
        required: true
    },
    text: {
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
module.exports = db.model('comments', CommentSchema);
