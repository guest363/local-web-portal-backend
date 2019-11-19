module.exports = (error, result, network) => {
    if (error) {
        network.send(error);

    } else {
        network.send(result);
    }
};