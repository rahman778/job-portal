const nodemailer = require('nodemailer');
const template = require('../config/template');
const keys = require('../config/keys');

const { smtpHost, smtpPort, smtpUser, smtpPass, sender } = keys.smtp;

class NodemailerService {
  init() {
    try {
      return nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // true for 465, false for other ports
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });
    } catch (error) {
      console.warn('Missing SMTP keys');
    }
  }
}

const transporter = new NodemailerService().init();

exports.sendEmail = async (email, type, host, data) => {
  try {
    const message = prepareTemplate(type, host, data);

    const mailOptions = {
      from: `Job Portal! <${sender}>`,
      to: email,
      subject: message.subject,
      text: message.text
    };

    return await transporter.sendMail(mailOptions);
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
      case 'application-status':
        if(data.type === 'Screening') return message = template.screeningEmail(data);
        if(data.type === 'Shortlisted') return message = template.shortlistedEmail(data);
        if(data.type === 'Interview') return message = template.interviewEmail(data);
        if(data.type === 'Rejected') return message = template.rejectedEmail(data);
        break;
  
      default:
        message = '';
    }
  
    return message;
  };
  