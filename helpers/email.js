import sgMail from '@sendgrid/mail'


const sendEmail = async (to) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: to,
    from: process.env.SENDGRID_FROM, // Use the email address or domain you verified above
    subject: 'Welcome to disney-api',
    text: 'Welcome to disney-api',
    html: '<strong>Welcome to disney-api</strong>',
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }
}

export default sendEmail