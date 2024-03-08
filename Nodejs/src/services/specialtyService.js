const db = require("../models");

let createSpecialty = (data) =>{
    return new Promise(async(resolve, reject) =>{
        try{
            if(!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown){
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter createSpecialty"
                })
            }else{
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })

                resolve({
                    errCode: 0,
                    errMessage: "Create success"
                })
            }
        }catch(e){
            reject(e)
        }
    })
}

let getAllSpecialty = () =>{
    return new Promise(async(resolve, reject) =>{
        try{
            let data = await db.Specialty.findAll();
            if(data && data.length > 0){
                data.map(item =>{
                    item.image = new Buffer(item.image, 'base64').toString('binary')
                    return item;
                })
            }
            resolve({
                errMessage: "ok",
                errCode: 0,
                data
            })
        }catch(e){
            reject(e)
        }
    })
}

let getDetailSpecialtyById = (inputId, location) =>{
    return new Promise (async (resolve, reject) => {
        try{
            if(!inputId || !location){
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter getDetailSpecialtyById"
                })
            }else{
                let data = await db.Specialty.findOne({
                    where:{
                        id: inputId
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkdown', 'name'],
                })

                if(data){
                    let doctorSpecialty = [];
                    if(location === 'ALL'){
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: inputId
                            },
                            attributes: ['doctorId', 'ProvinceId', 'specialtyId'],
                        })
                    }else{
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: inputId,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'ProvinceId'],
                        })
                        
                    }

                    data.doctorSpecialty = doctorSpecialty
                }else data = {}

                resolve({
                    errMessage: 'ok',
                    errCode: 0,
                    data
                })

            }
        }catch(e){
            reject(e)
        }
    })
}

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById
}