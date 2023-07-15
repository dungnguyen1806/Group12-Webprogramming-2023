const nodemailer = require("nodemailer");
const configuration = require("../configs/configuration");
const { OAuth2Client } = require("google-auth-library");

const sendMail = async (options) => {
  const myOAuth2Client = new OAuth2Client(
    configuration.gmail.CLIENT_ID,
    configuration.gmail.CLIENT_SECRET
  )

  myOAuth2Client.setCredentials({
    refresh_token: configuration.gmail.REFRESH_TOKEN
  })

  const myAccessTokenObject = await myOAuth2Client.getAccessToken();
  const myAccessToken = myAccessTokenObject?.token;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: configuration.gmail.EMAIL,
      clientId: configuration.gmail.CLIENT_ID,
      clientSecret: configuration.gmail.CLIENT_SECRET,
      refreshToken: configuration.gmail.REFRESH_TOKEN,
      accessToken: myAccessToken
    },
  });

  const message = {
    from: `Admin ${configuration.gmail.USER} from Homestay`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  const info = await transporter.sendMail(message);
  return info;
};

module.exports = sendMail;