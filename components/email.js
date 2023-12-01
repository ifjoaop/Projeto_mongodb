const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "pjota.jpjoao@hotmail.com",
        pass: "teste123joao"
    }
});

var RegistrarUsuario = async (email, chave) => {
    try {
        // Message object
        let message = {
            from: 'Prof. Rodrigo',
            // Comma separated list of recipients
            to: email,
            // Subject of the message
            subject: 'Criação de usuário',
            // HTML body
            html: `
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Bem-Vindo ao Nosso Site</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                    }
                    .container {
                        background-color: #ffffff;
                        padding: 40px;
                        border-radius: 10px;
                        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
                        text-align: center;
                    }
                    .button {
                        background-color: #4caf50;
                        color: white;
                        padding: 14px 20px;
                        margin: 20px 0;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Bem-Vindo ao Nosso Site!</h2>
                    <p>Um novo usuário foi criado para você. Para configurar sua conta, clique no botão abaixo para criar sua senha:</p>
                    <a class="button" href="LINK_PARA_A_PÁGINA_DE_CRIAÇÃO_DE_SENHA">Criar Senha</a>
                    <p>Se você recebeu um código de verificação, insira o seguinte código durante o processo de criação de senha: <strong>${chave}</strong>.</p>
                    <p>Obrigado por se juntar a nós!</p>
                </div>
            </body>
            </html>
                        
            `
        };

        let info = await transporter.sendMail(message);
        console.log('Message sent successfully as %s', info.messageId);
    }
    catch (error) {
        console.log(error)
    }
}


module.exports = { RegistrarUsuario }