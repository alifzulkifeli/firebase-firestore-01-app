const functions = require("firebase-functions");
const admin = require('firebase-admin')


admin.initializeApp(functions.config().firebase)

//http functions  
exports.conatacts =  functions.https.onRequest(async(req, res) => {
  const {name, phone} = req.query
  
  const addContact = await admin.firestore().collection('contacts').add({
    name,phone
  })

  res.json({result: `${addContact.id}`})
})

//triggers
exports.addDate = functions.firestore
  .document('contacts/{contactId}')
  .onCreate((snapshot, context) => {
    const timestamp = admin.firestore.FieldValue.serverTimestamp()
    return admin.firestore().doc(`contacts/${context.params.contactId}`).update({
      dataAdded : timestamp
    })
})


//calables
exports.addLog = functions.https.onCall(async(data,context) => {
  const log = {
    message: data.message,
    time: admin.firestore.FieldValue.serverTimestamp()
  }

  const addLog = await admin.firestore().collection('logs').add(log)
  return `result ${addLog.id}`
})



