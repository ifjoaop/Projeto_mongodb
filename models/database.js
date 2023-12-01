const mongoose = require("mongoose")

try {
    const uri = "mongodb+srv://jpjoao:1234@cluster0.ef7dvph.mongodb.net/NODE"
    mongoose.connect(uri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )    
}
catch (err) {
    console.log(err)
}

mongoose.Promise = global.Promise

module.exports = mongoose