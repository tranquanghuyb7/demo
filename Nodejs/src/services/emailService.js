require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async(dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"Quang Huy 👻" <tranquanghuyb7@gmail.com>',
        to: dataSend.receiverEmail,
        subject: "Thông tin đặt lịch khám bệnh ✔",
        html: getBodyHTMLEmail(dataSend),
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if(dataSend.language === 'vi'){
        result =
        `
        <div style="border: 5px dotted #bbb; width: 80%; margin: 0 auto; background-color: #f5f5f5; padding: 20px">
            <h3 style="text-align: center">Xin chào ${dataSend.patientName}!</h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên trang web Bookingcare.</p>
            <p>Thông tin đặt lịch khám bệnh: </p>
            <div><b>Thời gian: ${dataSend.time}</b></div>
            <div><b>Bác Sĩ: ${dataSend.doctorName}</b></div>

            <p>Nếu các thông tin trên đúng sự thật, vui lòng click vào đường link bên dưới 
                để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.
            </p>
            <div>
                <a href=${dataSend.redirectLink} target="_blank" style="font-weight: 600">Click here</a>
            </div>

            <div>Cảm ơn bạn đã đặt lịch khám bệnh tại trang web Bookingcare</div>
        </div>
        `
    }
    if(dataSend.language === 'en'){
        result =
        `
            <h3>Dear ${dataSend.patientName}!</h3>
            <p>You are receiving this email because you have booked your medical appointment online on the Bookingcare website.</p>
            <p>Information for scheduling medical examination: </p>
            <div><b>Time: ${dataSend.time}</b></div>
            <div><b>Doctor: ${dataSend.doctorName}</b></div>

            <p>If the above information is correct, 
                click on the link below to confirm and complete the medical appointment booking procedure.
            </p>
            <div>
                <a href=${dataSend.redirectLink} target="_blank">Click here</a>
            </div>

            <div>Thank you for booking an appointment at the Bookingcare website</div>
        `
    }
    return result
}

let sendAttachment = async (dataSend) => {
    return new Promise(async(resolve, reject) => {
        try{
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                },
            });

            let info = await transporter.sendMail({
                from: '"Quang Huy 👻" <tranquanghuyb7@gmail.com>',
                to: dataSend.email,
                subject: "Kết quả đặt lịch khám bệnh ✔",
                html: getBodyHTMLEmailRemedy(dataSend),
                attachments: [
                    {
                        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split("base64,")[1],
                        encoding: 'base64'
                    },
                ],
            });

            resolve(true)
        }catch(e){
            reject(e)
        }
    })
}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = ''
    if(dataSend.language === 'vi'){
        result =
        `
        <div style="border: 5px dotted #bbb; width: 80%; margin: 0 auto; background-color: #f5f5f5; padding: 20px">
            <h3 style="text-align: center">Xin chào ${dataSend.patientName}!</h3>
            <p>Bạn nhận được email này vì đã hoàn thành khám bệnh.</p>
            <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm: </p>

            <div>Cảm ơn bạn đã đặt lịch khám bệnh tại trang web Bookingcare</div>
        </div>
        `
    }
    if(dataSend.language === 'en'){
        result =
        `
            <h3>Dear ${dataSend.patientName}!</h3>
            <p>You are receiving this email because you have booked your medical appointment online on the Bookingcare website.</p>
            <p>Information for scheduling medical examination: </p>

            <p>If the above information is correct, 
                click on the link below to confirm and complete the medical appointment booking procedure.
            </p>

            <div>Thank you for booking an appointment at the Bookingcare website</div>
        `
    }
    return result
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment
}