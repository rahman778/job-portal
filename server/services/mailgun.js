const Mailgun = require('mailgun-js');

const template = require('../config/template');
const keys = require('../config/keys');

const { key, domain, sender } = keys.mailgun;

class MailgunService {
  init() {
    try {
      return new Mailgun({
        apiKey: key,
        domain: domain
      });
    } catch (error) {
      console.warn('Missing mailgun keys');
    }
  }
}

const mailgun = new MailgunService().init();

exports.sendEmail = async (email, type, host, data) => {
  try {
    const message = prepareTemplate(type, host, data);

    const config = {
      from: `Job Portal! <${sender}>`,
      to: email,
      subject: message.subject,
      text: message.text
    };

    return await mailgun.messages().send(config);
  } catch (error) {
    return error;
  }
};

const prepareTemplate = (type, host, data) => {
  let message;

  switch (type) {
    case 'reset':
      message = template.resetEmail(host, data);
      break;

    case 'reset-confirmation':
      message = template.confirmResetPasswordEmail();
      break;

    case 'email-confirmation':
      message = template.confirmEmail();
      break;

    case 'signup':
      message = template.signupEmail(host, data);
      break;

    case 'recruiter-welcome':
      message = template.recruiterWelcome(data);
      break;

    case 'contact':
      message = template.contactEmail();
      break;

    default:
      message = '';
  }

  return message;
};
