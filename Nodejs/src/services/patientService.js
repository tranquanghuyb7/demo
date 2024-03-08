import db from "../models/index";
require('dotenv').config();
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';

let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result;
}

let postBookAppointment = (data) =>{
    return new Promise(async(resolve, reject) =>{
        try{
            if(!data.email || !data.doctorId || !data.timeType || !data.date || !data.fullName
                || !data.selectedGender || !data.address
                ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter postBookAppointment"
                })
            }else{
                let token = uuidv4();

                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)
                })

                let user = await db.User.findOrCreate({
                    where: {email: data.email},
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        gender: data.selectedGender,
                        address: data.address,
                        firstName: data.fullName
                    }
                });

                if(user && user[0]){
                     let aa = await db.Booking.findOne({
                        where: {patientId: user[0].id, statusId: 'S2'},
                    })
                    if(aa){
                        resolve({
                            errCode: 5,
                            errMessage: "save infor patient errorr"
                        })
                    }else{
                        await db.Booking.findOrCreate({
                            where: {patientId: user[0].id},
                            defaults:{
                                statusId: 'S1',
                                doctorId: data.doctorId,
                                patientId: user[0].id,
                                date: data.date,
                                timeType: data.timeType, 
                                token: token
                            }}
                        )
                        resolve({
                            errCode: 0,
                            errMessage: "save infor patient success"
                        })
                    }
                }
                // else{
                //     resolve({
                //         errCode: 0,
                //         errMessage: "save infor patient success"
                //     })
                // }
            }
            
        }catch(e){
            reject(e)
        }
    })
}

let postVerifyBookAppointment = (data)=>{
    return new Promise(async(resolve, reject) =>{
        try{
            if(!data.token || !data.doctorId){
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter postVerifyBookAppointment"
                })
            }else{
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false,
                })

                if(appointment){
                    appointment.statusId = 'S2';
                    await appointment.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'Update the appointment success!'
                    })
                }else{
                    resolve({
                        errCode: 2,
                        errMessage: 'Appointment schedule has been activated or does not exist'
                    })
                }
            }
        }catch(e){
            reject(e)
        }
    })
}

module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment
}