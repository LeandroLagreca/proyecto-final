const mail_rover = require('../nodemailer/config')
const sendEmail = async (req, res) => {
  const {
    from = 'GameScript <aplicacionsteam@gmail.com>',
    to = 'aplicacionsteam@gmail.com',
    subject,
    text = '',
    html = ''
  } = req.body;
  mail_rover(async function (emailTransporter) {
    mailConfig = {
      from,
      to,
      subject,
      text,
      html
    };
    await emailTransporter.sendMail(mailConfig);
    res.send("Mail enviado");
  });
};

module.exports = {
    sendEmail
}