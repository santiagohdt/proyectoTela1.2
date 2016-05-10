var nodemailer = require('nodemailer');


var smtpConfig = {
    host: 'mail.nash-ti.com',
    port: 587,
    secure: false, // SSL
    auth: {
        user: 'contacto@nash-ti.com',
        pass: 'nash123'
    },
    tls: {
        rejectUnauthorized:false
    }
};

exports.transporter = nodemailer.createTransport(smtpConfig)

// setup e-mail data with unicode symbols
exports.mailOptions = {
    from: '"Contacto Nash-TI 👥" <contacto@nash-ti.com>', // sender address
    to: 'andres@nash-ti.com, andres@nash-ti.com', // list of receivers
    subject: 'Test Mensaje Node ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};