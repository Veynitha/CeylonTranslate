const translaterhistory = require("../models/translaterHistoryModel");
const translater = require("../services/translate-api");


//-------------------------------------------- create history --------------------------------------------
const setTranslaterHistory = async (req, res) => {
  
  let userenterdtextlanguage
  let translatedtext

  const {userenterdtext, translatedtextlanguage} = req.body;

  try {
    userenterdtextlanguage = await translater.detectLanguage(userenterdtext);
    console.log("\n##### User entered text language : " + userenterdtextlanguage)

    translatedtext = await translater.translateText(userenterdtext, translatedtextlanguage);
    console.log("##### Translated text : " + translatedtext + "\n")

  } catch (error) {
    console.log(error) 
  }

   // get current date
  const currentDate = new Date();

  // Get various components of the date
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is 0-indexed, so adding 1
  const day = currentDate.getDate();

  const date = (year + "-" + month + "-" + day)

  const createdHistory = new translaterhistory({
    //translationid,
    userenterdtext,
    userenterdtextlanguage,
    translatedtext,
    translatedtextlanguage,
    date,
  });

  try {
    await createdHistory.save();
    console.log("object created")
  } catch (err) {
    console.log(err);
    console.log("error in create history");
  }

  res.status(201).json({ translaterhistory: createdHistory , translatedText: translatedtext, userEnterdTextLanguage: userenterdtextlanguage});
};
    
// -------------------------------------------- read history --------------------------------------------
const getTranslaterHistory = async (req, res) => {

  let items;
  try {
    items = await translaterhistory.find({});
  } catch (err) {
    console.log(err)
  }
  res.json({
      //items: items.map((user) => user.toObject({ getters: true })),
      items: items.map((translaterhistory) => translaterhistory.toObject({getters: true}))
  });       
};

// -------------------------------------------- read one part --------------------------------------------
const getOneTranslaterHistory = async (req, res, next) => {
  const hitoryId = req.params.itemid;

  let item;
  try {
    item = await translaterhistory.findById(hitoryId);
  } catch (err) {
    console.log(err)
  }

  // if (!item) {
  //   const error = new HttpError(
  //     "Could not find a payment for the provided id.",
  //     404
  //   );
  //   return next(error);
  // }

  res.json({ item: item.toObject({ getters: true }) });
};

// -------------------------------------------- edit history --------------------------------------------

const updateTranslaterHistory = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return next(
  //     new HttpError("Invalid inputs passed, please check your data.", 422)
  //   );
  // }
  let translated_text;

  const {userenterdtext} = req.body;

  const historyId = req.params.itemid;
  let item;

  try {
    item = await translaterhistory.findById(historyId);
  } catch (err) {
    console.log(err) 
    // const error = new HttpError(
    //   "Something went wrong, couldnot update payment.",
    //   500
    // );
    // return next(error);
  }

  let translated_text_language = item.translatedtextlanguage

  try {
    translated_text = await translater.translateText(userenterdtext, translated_text_language);
    console.log("##### Translated text : " + translated_text + "\n")
  } catch (error) {
    console.log(error) 
  }

  item.userenterdtext = userenterdtext;
  item.translatedtext = translated_text;
  
  try {
    await item.save();
  } catch (err) {
    // const error = new HttpError(
    //   "Somthing went wrong, could not update payment.",
    //   500
    //  );
  }

  res.status(200).json({ item: item.toObject({ getters: true }), translatedText: translated_text});
};


// -------------------------------------------- delete one part --------------------------------------------

const deleteOneTranslationHistory = async (req, res, next) => {
  const hitoryId = req.params.itemid;

  let item;
  try {
    item = await translaterhistory.findById(hitoryId);
  } catch (err) {
    // const error = new HttpError(
    //   "something went wrong, could not delete payment.",
    //   500
    // );
    // return next(error);
  }

  // if (!item) {
  //   const error = new HttpError("Could not find payment for this id", 404);
  //   return next(error);
  // }

  try {
    await item.deleteOne();
  } catch (err) {
    // const error = new HttpError(
    //   "something went wrong, could not delete payment.",
    //   500
    // );
    // return next(error);
  }

  res.status(200).json({ message: "Deleted item." });
};

// -------------------------------------------- delete all --------------------------------------------

const deleteAllTranslationHistory = async (req, res, next) => {
  //const hitoryId = req.params.itemid;

  //let item;
  try {
    await translaterhistory.deleteMany({})
  } catch (err) {
    // const error = new HttpError(
    //   "something went wrong, could not delete payment.",
    //   500
    // );
    // return next(error);
    console.log("delete error")

  }

  // if (!item) {
  //   const error = new HttpError("Could not find payment for this id", 404);
  //   return next(error);
  // }

  // try {
  //   await translaterhistory.deleteOne
  // } catch (err) {
  //   console.log("delete error")
  //   // const error = new HttpError(
  //   //   "something went wrong, could not delete payment.",
  //   //   500
  //   // );
  //   // return next(error);
  // }

  res.status(200).json({ message: "Deleted all items." });
};

module.exports = {
  setTranslaterHistory,
  getTranslaterHistory,
  getOneTranslaterHistory,
  updateTranslaterHistory,
  deleteOneTranslationHistory,
  deleteAllTranslationHistory
}