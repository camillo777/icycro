"use strict";
const config = require( "./config.js" )
require('dotenv').config()
const log = require('fancy-log');
const nodemailer = require("nodemailer");

class Mail {

    _tag = 'Mail'

    // async..await is not allowed in global scope, must use a wrapper
    constructor() {

        log( this._tag, 'constructor' )

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        //let testAccount = await nodemailer.createTestAccount();

        log( `host ${ config.mail.host }` )
        log( `port ${ config.mail.port }` )
        log( `user ${ config.mail.user }` )

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
        log( this._tag, 'send' )

        if ( !config.mail.sendmail ) {
            log.warn( 'Mail Send disabled by config' )
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

        log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

}

module.exports = Mail;