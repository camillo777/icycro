"use strict";
const nodemailer = require("nodemailer");
const config = require( "./config.js" )
require('dotenv').config()

class Mail {

    _tag = 'Mail'

    // async..await is not allowed in global scope, must use a wrapper
    constructor() {

        console.log( this._tag, 'constructor' )

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        //let testAccount = await nodemailer.createTestAccount();

        console.log( `host ${ config.mail.host }` )
        console.log( `port ${ config.mail.port }` )
        console.log( `user ${ config.mail.user }` )

        // create reusable transporter object using the default SMTP transport
        this.transporter = nodemailer.createTransport({
            host: config.mail.host, //"smtp.ethereal.email",
            port: config.mail.port, //587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: config.mail.username, // generated ethereal user
                pass: process.env.MAIL_API_KEY, // generated ethereal password
            },
        });

    }

    async send( subject, text ) {
        console.log( this._tag, 'send' )

        if ( !config.mail.sendmail ) {
            console.log( 'Mail Send disabled by config' )
            return
        }

        // send mail with defined transport object
        let info = await this.transporter.sendMail({
            from: config.mail.from, //"Fred Foo 👻" <foo@example.com>', // sender address
            to: config.mail.to, //"bar@example.com, baz@example.com", // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            //html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

}

module.exports = Mail;