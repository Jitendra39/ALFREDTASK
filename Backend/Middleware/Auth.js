const FlipFrenzyModule = require("../Models/FlipFrenzy");

function Authenticated(req, res, next) {
  const { id } = req.query;
  //console.log("id", { id});
  if (!id) {
    res.status(401).send("Unauthorized");
  }
  FlipFrenzyModule.findOne({ userId: id })
    .then((data) => {
      if (data) {
        req.userData = data;
        next();
      } else {
        res.status(401).send("Unauthorized");
      }
    })
    .catch((err) => {
      res.status(401).send("Unauthorized");
    });
}

module.exports = Authenticated;
