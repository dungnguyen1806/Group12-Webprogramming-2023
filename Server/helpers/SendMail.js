const nodemailer = require("nodemailer");
const configuration = require("../configs/configuration");

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: configuration.gmail.USER,
      pass: configuration.gmail.PASS,
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