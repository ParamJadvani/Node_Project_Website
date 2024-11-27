require("dotenv").config();

const generateOTP = (length = 6) => {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  );
};

const composeVerificationEmail = (username, token, otp) => {
  const PORT = process.env.PORT || 4000;
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h2 { color: #4CAF50; }
          .button {
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <h2>Hello ${username},</h2>
        <p>We received a request to verify your email address. Please click the button below to verify your email and activate your account.</p>
        <a href="http://localhost:${PORT}/users/verify/${token}/${otp}" class="button">Verify Your Email</a>
        <p>If you did not request this, please ignore this email.</p>
      </body>
    </html>
  `;
};

module.exports = { generateOTP, composeVerificationEmail };
