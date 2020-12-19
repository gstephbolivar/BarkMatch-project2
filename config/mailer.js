var nodemailer = require("nodemailer");
var path = require("path");

module.exports = function(dog, volunteer){
    let template = `<h1>Hello, ${volunteer.name}!</h1></br></br>Thank you for using BarkMatch. This is your confirmation for signing up to walk ${dog.name}.<br>`;
    template += `If you have any questions of concerns please contact us.<br><br><br>`;
    template += `<img src="cid:adogpic" style="width:200px;height:200px;display:block;margin-left:auto;margin-right:auto"/>`
    template += `<br><br>981 Howell Mill Road NW, Atlanta, GA 30318 | (404) 875-5331`;

  //Create transport with service to use for email
  var transporter = nodemailer.createTransport({
    service: "yahoo",
    host: "smtp.mail.yahoo.com",
    port: 587,
    secure: false,
    auth: {
      user: "barkmatch",
      pass: "jtglkrqexcrvkeww",
    },
  });

  //Create options for the email
  var mailOptions = {
    from: "BarkMatch <barkmatch@yahoo.com>",
    to: volunteer.email,
    subject: "Confirmation",
    html: template,
    attachments: [
      {
        filename: path.basename(dog.img_path),
        path: path.join(__dirname, "../public", dog.img_path),
        cid: "adogpic",
      },
    ],
  };

  //Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(
        "Email sent: " + info.response + "\n" + "Email Recipient: " + email
      );
    }
  });
};
