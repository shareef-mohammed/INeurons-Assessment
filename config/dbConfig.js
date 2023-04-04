const mongoose = require('mongoose');

const connect = async(req, res) => {
    try{
        await mongoose.connect(process.env.MONG_URI)
        .then(() => {
            console.log('Database Connected.')
        })
    }catch(err){
        console.log(err)
    }
}

module.exports = connect;