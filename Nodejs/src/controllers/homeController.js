import db from '../models/index'
import CRUDService from '../services/CRUDService';


let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e)
    }
    // return res.render('homepage.ejs')
}

let getAboutPage = (req, res) => {
    return res.render('test/test.ejs');
}

let getCRUD = (req, res) => {
    return res.render("crud.ejs");
}

let postCRUD = async (req, res) => {
    // console.log(req.body) //data:reg.body
    let message = await CRUDService.createNewUser(req.body); //truyen req.body sang CRUDServer
    console.log(message)
    return res.send("post crud from server");
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    // console.log(data)
    return res.render('displayCRUD.ejs', {
        dataTable: data
    });
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id
    // console.log(userId)
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId)
        // console.log(userData)
        // return res.send("Found a user")
        return res.render("editCRUD.ejs", {
            user: userData
        })
    } else {
        return res.send("Users not found")
    }

}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    });
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;

    if (id) {
        await CRUDService.deleteUserById(id);

        return res.send('delete success')
    } else {
        return res.send('user not found')
    }

}


module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}