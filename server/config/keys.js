module.exports = {
   app: {
      name: "Mern Job Portal",
      apiURL: `${process.env.BASE_API_URL}`,
      clientURL: process.env.CLIENT_URL,
   },
   port: process.env.PORT || 3000,
   database: {
      url: process.env.MONGO_URI,
   },
   jwt: {
      secret: process.env.JWT_SECRET,
      tokenLife: "7d",
   },
   mailgun: {
      key: process.env.MAILGUN_KEY,
      domain: process.env.MAILGUN_DOMAIN,
      sender: process.env.MAILGUN_EMAIL_SENDER,
   },
   google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
   },
   aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
      bucketName: process.env.AWS_BUCKET_NAME,
   },
};
