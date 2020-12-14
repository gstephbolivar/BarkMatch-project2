var nodemailer = require('nodemailer');
var path = require('path');

module.exports = function(dog, email){
    const template = `<h1>This is your confirmation for signing up to walk ${dog.name}
    <img src="cid:adogpic"/>`;

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
        from: 'DogMatch <rashawn2530@yahoo.com>',
        to: email,
        subject: 'Confirmation',
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
          console.log('Email sent: ' + info.response);
        }
      });
}
