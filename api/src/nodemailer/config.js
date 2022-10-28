const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const accountTransport = require("./accounts_transport.json");


    const oauth2Client = new OAuth2(
        accountTransport.auth.clientId,
        accountTransport.auth.clientSecret,
        "https://developers.google.com/oauthplayground",
    );
    oauth2Client.setCredentials({
        refresh_token: accountTransport.auth.refreshToken,
        tls: {
            rejectUnauthorized: false
        }
    });
const mail_rover = async (callback) => {
    const accessToken = await oauth2Client.getAccessToken();
    accountTransport.auth.accessToken = accessToken;
    return callback(nodemailer.createTransport(accountTransport));
};

module.exports = mail_rover