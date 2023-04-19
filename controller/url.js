const { db } = require("../config/firebase");
const {
  collection,
  addDoc,
  doc,
  getDocs,
  query,
  where,
} = require("firebase/firestore");
const UUID = require("pure-uuid");
const shortid = require("shortid");

module.exports.createNewURL = async function (req, res) {
  try {
    const { url } = req.body;
    if (!url) {
      throw new Error("Invalid URL given");
    }

    const shortURLRef = collection(db, "shortURL");
    const q = query(shortURLRef, where("redirectURL", "==", url));
    const querySnapshot = await getDocs(q);
    let shortIdExists = "";

    querySnapshot.forEach((doc) => {
      shortIdExists = doc.data().shortId;
    });
    if (shortIdExists) {
      res.status(200).json({
        id: shortIdExists,
      });
      return;
    }

    const uniqueId = shortid.generate();
    const docRef = await addDoc(collection(db, "shortURL"), {
      shortId: uniqueId,
      redirectURL: url,
    });
    console.log("Document written with ID: ", docRef.id);
    res.status(200).json({
      id: uniqueId,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
module.exports.getNewURL = async function (req, res) {
  try {
    const { shortURLId } = req.params;


    const shortURLRef = collection(db, "shortURL");

    // Create a query against the collection.
    const q = query(shortURLRef, where("shortId", "==", shortURLId));
    const querySnapshot = await getDocs(q);
    let redirectURL = "";

    querySnapshot.forEach((doc) => {
      redirectURL = doc.data().redirectURL;
    });

    if (redirectURL) {
      console.log("redirect URL", redirectURL);
      res.redirect(redirectURL);
    } else {
      throw new Error("Invalid URL! Please try again.");
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
