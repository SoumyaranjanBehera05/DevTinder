const adminAuth = (req, res, next) => {
    console.log("admin auth is getting checked");

    const token = "xyz";
    const adminAuthorized = token === "xyz";
    if (!adminAuthorized) {
        res.status(401).send('unAuthorized request');
    } else {
        next();
    }
};

const userAuth = (req, res, next) => {
    console.log("admin auth is getting checked");

    const token = "xyzr";
    const adminAuthorized = token === "xyz";
    if (!adminAuthorized) {
        res.status(401).send('unAuthorized request');
    } else {
        next();
    }
};

module.exports = {adminAuth,userAuth};