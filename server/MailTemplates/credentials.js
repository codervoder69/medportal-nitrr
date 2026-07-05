const credentialsTemplate = (email, password) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Account Credentials</title>
  <style>
    body {
      background-color: #f9f9f9;
      font-family: 'Segoe UI', sans-serif;
      font-size: 16px;
      line-height: 1.5;
      color: #333;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #fff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }

    h2 {
      color: #222;
      margin-bottom: 20px;
    }

    .credentials {
      background: #f1f1f1;
      padding: 20px;
      border-radius: 5px;
      margin: 20px 0;
      font-family: monospace;
    }

    .footer {
      font-size: 14px;
      color: #888;
      margin-top: 30px;
      text-align: center;
    }

    .highlight {
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Welcome to Swasthya NITRR!</h2>
    <p>Hello,</p>
    <p>Your account has been created successfully. Below are your login credentials:</p>

    <div class="credentials">
      <p><span class="highlight">Email:</span> ${email}</p>
      <p><span class="highlight">Password:</span> ${password}</p>
    </div>

    <p>Use these credentials to log into your account. For security, please change your password after your first login.</p>
    <p>If you did not request this account, please contact our support team immediately.</p>

    <div class="footer">
      For support, contact us at <a href="mailto:info@swasthyasnitrr.com">info@swasthyamedsnitrr.com</a>
    </div>
  </div>
</body>
</html>`;
};

module.exports = credentialsTemplate;
