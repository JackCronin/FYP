const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase)
const nodemailer = require('nodemailer')
const mailTransport = nodemailer.createTransport({

service: 'Gmail',
  auth: {
    user: 'fypemailjackcronin@gmail.com',
    pass: 'simplepassword1'
  }
});

const ref = admin.database().ref()
exports.weeklyEmail = functions.https.onRequest((req, res) => {
  const currentDate = new Date();
  var nextWeek = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  const owners = []
  const emails = []

  ref.child('Files').orderByChild('HasReminder').equalTo(true).once('value')
  .then(snap => {
    snap.forEach(childSnap => {
      const ExpiryDate = new Date(childSnap.val().ExpiryDate)
      const Owner = childSnap.val().Owner
      console.log("Dates Are = " +ExpiryDate +currentDate + Owner);
      if(ExpiryDate.setHours(0,0,0,0) === nextWeek.setHours(0,0,0,0)){
        ref.child('Users/'+Owner).once('value', (postSnapshot) => {
          console.log("this value " +postSnapshot.val().email)
              const email = postSnapshot.val().email
              const FileName = childSnap.val().FileName
              const mailOptions = {
              from : '"My app" <myapp@gmail.com',
              bcc : email,
              subject: 'Expirying File Reminder',
              text : "This is a reminder that your file " + FileName+" is a week from expiring"
            }
            return mailTransport.sendMail(mailOptions).then(() => {
              return res.send('Email Sent')
            })
           });
      }
    })
    return emails
  }).catch(err => {console.log(err)})

})
