var nodemailer = require('nodemailer');
var path = require('path');

module.exports = function(dog, volunteer){
    const template = `<h1>Hello, ${volunteer.name}!</h1></br></br>Thank you for your interest in walking ${dog.name}.</br>
    If you have any questions of concerns please contact us.<br><br></br><img src="cid:adogpic" style="width:200px;height:300px"/>`;

    var transporter = nodemailer.createTransport({
        service: 'yahoo',
        host: 'smtp.mail.yahoo.com',
        port: 587,
        secure: false,
        auth: {
          user: 'rashawn2530',
          pass: 'ptvsjdxkrwxovmvu'
        }
      });

    //   const pp = path.join(__dirname, "../public", dog.img_path)
      var mailOptions = {
        from: 'BarkMatch <rashawn2530@yahoo.com>',
        to: volunteer.email,
        subject: 'BarkMatch Confirmation',
        html: template,
        attachments: [{
            filename: path.basename(dog.img_path),
            path: path.join(__dirname, '../public', dog.img_path),
            cid: "adogpic"
        }]
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response + "\n" + "Email Recipient: " + email);
        }
      });
}
