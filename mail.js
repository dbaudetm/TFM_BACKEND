import nodemailer from 'nodemailer'

const emailRegister = async (usuario,email,token) => {

  //   const pass = "TFM2022David88."

        // const pass2 = "EvaluateFilm888"


  //   const transporter = nodemailer.createTransport({


  //       service: 'gmail',
  //       host: 'smtp.gmail.com ',
  // port: 465, 
  //       auth: {
  //         user: 'tfm2022david@gmail.com',
  //         pass: 'TFM2022David88.' 
  //       }



  //   })



  //   const envio = await transporter.sendMail({

  //       from: 'Servicio de registro de Evaluate Films <tfm2022david@gmail.com>',
  //       to: email,
  //       subject: 'Confirma tu cuenta',
  //       text: `Se ruega al `,
  //       html: `
        
  //       <h1>Bienvenido a la plataforma Evaluate Film</h1>
  //       <p>Clicka en el enlace para confirmar tu cuenta</p>
  //       <a href="${process.env.FRONT_URL}/public/confirmCount/${token}">Enlace:</a>

  //       `

  //   })

  const transporter = nodemailer.createTransport({
    service : "hotmail",
    auth : {
        user : "tfm2022david@outlook.com",
        pass : "EvaluateFilm888"
    }
})

const options = {
    from: 'Servicio de registro de Evaluate Films <tfm2022david@outlook.com>',
    to : email, 
    subject:'Confirma tu cuenta', 
    html: `
        
        <h1>Bienvenido a la plataforma Evaluate Film</h1>
        <p>Clicka en el enlace para confirmar tu cuenta</p>
        <a href="${process.env.FRONT_URL}/public/confirmCount/${token}">Enlace:</a>

        `
}

transporter.sendMail(options, (error, info) =>{
    if(error) console.log(error)
    else console.log(info)
})

















}

const emailRecovery = async (usuario,email,token) => {



  // console.log(usuario,email,token)


  // const transporter = nodemailer.createTransport({


  //     service: 'gmail',
  //     host: 'smtp.gmail.com ',
  // port: 465, 
  //     auth: {
  //       user: 'tfm2022david@gmail.com',
  //       pass: 'TFM2022David88.' 
  //     }



  // })



  // const envio = await transporter.sendMail({

  //     from: 'Servicio para la recuperación del password de Evaluate Films <tfm2022david@gmail.com>',
  //     to: email,
  //     subject: 'Recupera tu cuenta',
  //     text: `Se ruega al `,
  //     html: `
      
  //     <h1>Este es un mensaje para recuperar su cuenta</h1>
  //     <p>Clicka en el enlace para recuperar tu cuenta</p>
  //     <a href="${process.env.FRONT_URL}/public/recuperatePassword/${token}">Enlace:</a>

  //     `

  // })


  const transporter = nodemailer.createTransport({
    service : "hotmail",
    auth : {
        user : "tfm2022david@outlook.com",
        pass : "EvaluateFilm888"
    }
})

const options = {
    from : "tfm2022david@outlook.com", 
    to : email, 
    subject:'Recupera tu cuenta', 
          html: `
      
      <h1>Este es un mensaje para recuperar su cuenta</h1>
      <p>Clicka en el enlace para recuperar tu cuenta</p>
      <a href="${process.env.FRONT_URL}/public/recuperatePassword/${token}">Enlace:</a>

      `
}

transporter.sendMail(options, (error, info) =>{
    if(error) console.log(error)
    else console.log(info)
})



}





// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com ',
//   port: 465, 
//     auth: {
//       user: 'tfm2022david@gmail.com',
//       pass: 'TFM2022David88.' 
//     }
//   });
  
//   const mailOptions = {
//     from: 'tfm2022david@gmail.com',
//     to: 'nedveros@gmail.com',
//     subject: 'Confirma tu cuenta',
//     text: ''
//   };
  
//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   })







export {
    emailRegister,
    emailRecovery
}