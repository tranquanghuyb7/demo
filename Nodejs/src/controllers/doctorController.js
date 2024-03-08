import doctorService from "../services/doctorService"

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    console.log(limit)
    if(!limit) limit = 10;
    try{
        let response = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json(response)
    }catch(e){
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...!'
        })
    }
}

let getAllDoctors = async (req, res) =>{
    try{
        let doctors = await doctorService.getAllDoctors();
        return res.status(200).json(doctors)
    }catch(e){
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error getAllDoctors from the server'
        })
    }
}

let postInforDoctor = async(req, res) => {
    try{
        let response = await doctorService.saveDetailInforDoctor(req.body);
        return res.status(200).json(response)
    }catch(e){
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error postInforDoctor from the server'
        })
    }
}

let getDetailDoctorById = async(req, res) =>{
    try{
        let infor = await doctorService.getDetailDoctorById(req.query.id)
        return res.status(200).json(infor)
    }catch(e){
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error getDetailDoctorById from the server'
        })
    }
}

let bulkCreateSchedule = async(req, res) => {
    try{
        let infor = await doctorService.bulkCreateSchedule(req.body)
        return res.status(200).json(infor)
    }catch(e){
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error getDetailDoctorById from the server'
        })
    }
}

let getScheduleByDate = async(req, res) =>{
    try{
        let infor = await doctorService.getScheduleByDate(req.query.doctorId, req.query.date)
        return res.status(200).json(infor)
    }catch(e){
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error getScheduleByDate from the server'
        })
    }
}

let getExtraInforDoctorById = async (req, res) => {
    try{
        let infor = await doctorService.getExtraInforDoctorById(req.query.doctorId)
        return res.status(200).json(infor)
    }catch(e){
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error getExtraInforDoctorById from the server'
        })
    }
}

let getProfileDoctorById = async (req, res) => {
    try{
        let infor = await doctorService.getProfileDoctorById(req.query.doctorId)
        return res.status(200).json(infor)
    }catch(e){
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error getProfileDoctorById from the server'
        })
    }
}

let getListPatientForDoctor = async (req, res) => {
    try{
        let infor = await doctorService.getListPatientForDoctor(req.query.doctorId, req.query.date)
        
        return res.status(200).json(infor)
    }catch(e){
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error getListPatientForDoctor from the server'
        })
    }
}

let sendRemedy = async (req, res) => {
    try{
        let infor = await doctorService.sendRemedy(req.body)
        
        return res.status(200).json(infor)
    }catch(e){
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error sendRemedy from the server'
        })
    }
}

let getAllTimeBookingDay = async (req, res) => {
    try{
        let infor = await doctorService.getAllTimeBookingDay(req.query.doctorId, req.query.date)
        
        return res.status(200).json(infor)
    }catch(e){
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error getAllTimeBookingDay from the server'
        })
    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInforDoctor: postInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforDoctorById: getExtraInforDoctorById,
    getProfileDoctorById: getProfileDoctorById,
    getListPatientForDoctor: getListPatientForDoctor,
    sendRemedy: sendRemedy,
    getAllTimeBookingDay: getAllTimeBookingDay
}