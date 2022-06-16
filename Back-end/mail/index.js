// const nodeMailer = require('nodemailer');
// const { google } = require('googleapis');
// const OAuth2 = google.auth.OAuth2;
// require('dotenv').config();

// //via auth2.0
// const oauth2Client = new OAuth2(
//   process.env.CLIENT_ID, // ClientID
//   process.env.CLIENT_SECRET, // Client Secret
//   process.env.REDIRECT_URL // Redirect URL
// );
// oauth2Client.setCredentials({
//   refresh_token: process.env.REFRESH_URL
// });
// const accessToken = oauth2Client.getAccessToken();
// const smtpTransport = nodeMailer.createTransport({
//   service: process.env.ORIGIN,
//   auth: {
//     type: process.env.CLIENT_TYPE,
//     user: 'interverse12@gmail.com',
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     refreshToken: process.env.REFRESH_URL,
//     accessToken: accessToken
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });

// const mailOptions = (req, user) => {
//   return {
//     from: 'interverse12@gmail.com',
//     to: req.body.email,
//     subject: 'Account Confirmation',
//     generateTextFromHTML: true,
//     html: `
//     <h3> Hello ${req.body.name} </h3>
//     <p>Thank you for registering into our Interverse. Much Appreciated! Just one last step is laying ahead of you...</p>
//     <p>To activate your account please follow this link: <a target="_" href="${process.env.DOMAIN}/user/activate/${user._id}">${process.env.DOMAIN}/activate </a></p>
//     <p>Cheers</p>
//     <p>Interverse Team</p>
//   `
//   };
// };
// module.exports = { smtpTransport, mailOptions };
