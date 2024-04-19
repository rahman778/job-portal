exports.resetEmail = (host, resetToken) => {
    const message = {
      subject: 'Reset Password',
      text:
        `${
          'You are receiving this because you have requested to reset your password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://'
        }${host}/reset-password/${resetToken}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };
  
    return message;
  };

  exports.confirmEmail = () => {
    const message = {
      subject: 'Email Confirmed',
      text:
        `You account has been verified!. \n\n` 
    };
  
    return message;
  };
  
  exports.confirmResetPasswordEmail = () => {
    const message = {
      subject: 'Password Changed',
      text:
        `You are receiving this email because you changed your password. \n\n` +
        `If you did not request this change, please contact us immediately.`
    };
  
    return message;
  };
  
  exports.recruiterWelcome = name => {
    const message = {
      subject: 'Merchant Registration',
      text:
        `Hi ${name}! Congratulations! Your application for merchant account has been accepted. \n\n` +
        `It looks like you already have a member account with us. Please sign in with your member credentials and you will be able to see your merchant account.`
    };
  
    return message;
  };
  
  exports.signupEmail =  (host, data) => {
    const message = {
      subject: 'Account Registration',
      text: `Hi ${data.firstName} ${data.lastName}! Thank you for creating an account with us!.\n\n` +
      'Please click on the following link, or paste this into your browser to confirm your email:\n\n' +
      `http://${host}/confirm-email/${data.accountConfirmToken}\n\n` +
      `If you did not register, please ignore this email.\n`
    };
  
    return message;
  };
  
  exports.contactEmail = () => {
    const message = {
      subject: 'Contact Us',
      text: `We received your message! Our team will contact you soon. \n\n`
    };
  
    return message;
  };
  
  