const failedResponse = (res) => {
    return res.status(403).json({ errors: "Failed" });
};

module.exports = {failedResponse};