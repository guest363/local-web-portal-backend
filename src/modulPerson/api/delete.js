const personModel = require("../schems/personModel");
const { DELETE_PERSON, DELETE_ERROR } = require('../messages');
module.exports = (req, network) => {
    const id = req.params[0];
    personModel.findOneAndDelete({ '_id': id })
        .exec((err, result) => {
            if (error) {
                network.send(`${DELETE_ERROR} - ${error}`);

            } else {
                network.send(DELETE_PERSON);
            }
        });
};