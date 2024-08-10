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
      `${host}/verify/${data.accountConfirmToken}\n\n` +
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
  

  exports.screeningEmail =  (data) => {
    const message = {
      subject: 'Application Update: Screening Process',
      text: `Dear ${data.firstName} ${data.lastName}! \n\n ` +
      `Thank you for applying for the ${data.jobTitle} position at ${data.company}. We are currently reviewing your application and will keep you informed as we progress through the screening process.\n\n` +
      `We appreciate your interest in joining our team.\n\n` +
      `Best regards,\n` + 
      `${data.company}\n`
    };
  
    return message;
  };

  exports.shortlistedEmail =  (data) => {
    const message = {
      subject: `Application Update: Shortlisted for ${data.jobTitle}`,
      text: `Dear ${data.firstName} ${data.lastName}! \n\n ` +
      `Congratulations! We are excited to inform you that you have been shortlisted for the ${data.jobTitle} position at ${data.company}. Our team is thoroughly impressed with your qualifications.\n\n` +
      'We will be in touch shortly with the next steps.\n\n' +
      `Thank you for your patience.\n\n` +
      `Best regards,\n` + 
      `${data.company}\n`
    };
  
    return message;
  };

  exports.interviewEmail =  (data) => {
    const message = {
      subject: 'Application Update: Interview Invitation',
      text: `Dear ${data.firstName} ${data.lastName}! \n\n ` +
      `We are pleased to inform you that your application for the ${data.jobTitle} position has progressed to the interview stage.\n\n` +
      'We will be in touch shortly with the next steps.\n\n' +
      `Looking forward to our conversation.\n\n` +
      `Best regards,\n` + 
      `${data.company}\n`
    };
  
    return message;
  };

  exports.rejectedEmail =  (data) => {
    const message = {
      subject: 'Application Update: Interview Invitation',
      text: `Dear ${data.firstName} ${data.lastName}! \n\n ` +
      `Thank you for your interest in the ${data.jobTitle} position at ${data.company}. After careful consideration, we regret to inform you that we will not be moving forward with your application at this time.\n\n` +
      'We encourage you to apply for future openings that match your skills and experience.\n\n' +
      `Thank you for the time and effort you invested in your application.\n\n` +
      `Best regards,\n` + 
      `${data.company}\n`
    };
  
    return message;
  };
  
  
  