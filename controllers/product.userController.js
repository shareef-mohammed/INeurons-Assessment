const userData = require('../models/product.userModel');

module.exports.getUsers = async (req, res) => {
    try {
        const users = await userData.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send('Internal server error.');
    }
}

module.exports.addUser = async(req, res) => {
    try {
        const { name, email, phone } = req.body;
        const regx =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!name || !email || !phone) {
            return res.status(401).send('Invalid input');
        }
        if(!email.match(regx)) {
            return res.status(401).send('Invalid email');
        }
        
        if(phone.toString().length !== 10 || isNaN(phone)) {
            return res.status(401).send('Invalid phone number');
        }
        const exist = await userData.find({$or:[{email}, {phone}]});
        console.log(exist)  
        if(exist.length > 0) {
            return res.status(409).send('User already exist.')
        }
        const user = new userData ({
            name, email, phone
        });
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send('Internal server error.');
    }
}

module.exports.updateUser = async(req, res) => {
    try {
        const { id } = req.params
        const { name, email, phone } = req.body;
        const regx =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!name || !email || !phone) {
            return res.status(409).send('Invalid input');
        }
        if(!email.match(regx)) {
            return res.status(409).send('Invalid email');
        }
        if(phone.toString().length !== 10 || isNaN(phone)) {
            return res.status(409).send('Invalid phone number');
        }
        const user = await userData.findByIdAndUpdate(id, {
            name, email, phone
        })
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send('Internal server error.');
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userData.findByIdAndDelete(id);
        res.status(200).send('User data deleted successfully.')
    } catch (err) {
        res.status(500).send('Internal server error.');
    }
}