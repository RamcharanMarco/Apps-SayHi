const Form = require("../models/userModel");
var nodemailer = require("nodemailer");

const amqplib = require("amqplib");
let channel, connection;

connect();

// connect to rabbitmq
async function connect() {
  try {
    // rabbitmq default port is 5672
    const amqpServer =
      "amqps://srpnjecr:quwgluu1FAEaYMKwygVOnMUGnK1Mw6x5@hawk.rmq.cloudamqp.com/srpnjecr";
    connection = await amqplib.connect(amqpServer);
    channel = await connection.createChannel();

    // make sure that the order channel is created, if not this statement will create it
    await channel.assertQueue("sayhi");
  } catch (error) {
    console.log(error);
  }
}

/*const data = {code:1,email:user.email}
    channel.sendToQueue(
      'sayhi',
      Buffer.from(
        JSON.stringify({
          ...data,
          date: new Date(),
        }),
      ),
    )*/

var transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  secureConnection: false,
  port: 587,
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
  auth: {
    user: "jobfinder1956@outlook.com",
    pass: "Marco@outlook1999",
  },
});

const sendMessage = async (req, res) => {
  const { name, email, body, recipient, reply_email, reply_email_content } =
    req.body;

  try {
    const data = { code: 8, email, body, recipient,name };
    channel.sendToQueue(
      "sayhi",
      Buffer.from(
        JSON.stringify({
          ...data,
          date: new Date(),
        })
      )
    );
    if (reply_email) {
      console.log(reply_email_content);
      const data = { code: 7, email, reply_email_content};
      channel.sendToQueue(
        "sayhi",
        Buffer.from(
          JSON.stringify({
            ...data,
            date: new Date(),
          })
        )
      );
    }
    res.status(200).json("sucess");
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  sendMessage,
};
