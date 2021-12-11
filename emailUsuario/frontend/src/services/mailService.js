const mailer = require("nodemailer");

module.exports = (email, nome, mensagem, anexo) => {
    const smtpTransport = mailer.createTransport({
        host: '',
        port: 587,
        secure: false,
        auth: {
            user: 'Seu Email',
            pass: 'Sua senha'
        }
    })

    const mail = {
        from: "Recibo De Aluguel <>",
        to: email,
        subject: `Recibo De Aluguel, Comprovante`,
        text: mensagem,
        html: `<b>Olá, segue seu comprovante ${nome}</b>`
    }

    if (anexo) {
        console.log(anexo);
        mail.attachments = [];
        mail.attachments.push({
            filename: anexo.originalname,
            content: anexo.buffer
        })
    }

    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mail)
            .then(response => {
                smtpTransport.close();
                return resolve(response);
            })
            .catch(error => {
                smtpTransport.close();
                return reject(error);
            });
    })
}