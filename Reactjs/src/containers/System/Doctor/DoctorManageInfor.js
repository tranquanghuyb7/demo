import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorManageInfor.scss';
import { FormattedMessage } from 'react-intl';
import { getDetailInforDoctor } from '../../../services/userService';
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import MdEditor from 'react-markdown-editor-lite';
import * as actions from '../../../store/actions';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
const mdParser = new MarkdownIt();


class DoctorManageInfor extends Component {

    constructor(props){
        super(props);
        this.state = {
            //save table mardown
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //save table doctor-infor
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getAllRequiredDoctorInfor();
        this.handle()
    }

    handle=async() => {
        let res = await getDetailInforDoctor(this.props.userInfo.id);
        console.log("check ress", res);
    }

    // handleEditorChange = ({ html, text }) => {
    //     this.setState({
    //         contentMarkdown: text,
    //         contentHTML: html
    //     })
    //     console.log('handleEditorChange', html, text);
    // }

    // handleSaveContentMarkdown = () =>{
    //     let {hasOldData} = this.state
    //     this.props.saveDetailDoctor({
    //         contentHTML: this.state.contentHTML,
    //         contentMarkdown: this.state.contentMarkdown,
    //         description: this.state.description,
    //         doctorId: this.state.selectedOption.value,
    //         action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

    //         selectedPrice: this.state.selectedPrice.value,
    //         selectedPayment: this.state.selectedPayment.value,
    //         selectedProvince: this.state.selectedProvince.value,
    //         nameClinic: this.state.nameClinic,
    //         addressClinic: this.state.addressClinic,
    //         note: this.state.note,
    //         clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
    //         specialtyId: this.state.selectedSpecialty.value
    //     })
    // }

    // buildDataInputSelect = (inputData, type) => {
    //     let result = []
    //     let { language } = this.props
    //     if(inputData && inputData.length > 0){
    //         if (type === 'USERS') {
    //             inputData.map((item, index) => {
    //                 let object = {}
    //                 let labelVi = `${item.firstName} ${item.lastName}`;
    //                 let labelEn = `${item.lastName} ${item.firstName}`;
    //                 object.label = language === LANGUAGES.VI ? labelVi : labelEn
    //                 object.value = item.id
    //                 result.push(object)
    //             })
    //         }

    //         if(type === 'PRICE') {
    //             inputData.map((item, index) => {
    //                 let object = {}
    //                 let labelVi = `${item.valueVi}đ`;
    //                 let labelEn = `${item.valueEn} USD`;
    //                 object.label = language === LANGUAGES.VI ? labelVi : labelEn
    //                 object.value = item.keyMap
    //                 result.push(object)
    //             })
    //         }

    //         if(type === 'PAYMENT' || type === 'PROVINCE'){
    //             inputData.map((item, index) => {
    //                 let object = {}
    //                 let labelVi = `${item.valueVi}`;
    //                 let labelEn = `${item.valueEn}`;
    //                 object.label = language === LANGUAGES.VI ? labelVi : labelEn
    //                 object.value = item.keyMap
    //                 result.push(object)
    //             })
    //         }

    //         if(type === 'SPECIALTY') {
    //             inputData.map((item, index) => {
    //                 let object = {}
    //                 object.label = item.name;
    //                 object.value = item.id;
    //                 result.push(object)
    //             })
    //         }

    //         if(type === 'CLINIC') {
    //             inputData.map((item, index) => {
    //                 let object = {}
    //                 object.label = item.name;
    //                 object.value = item.id;
    //                 result.push(object)
    //             })
    //         }
            
    //     }
    //     return result
    // }

    
    async componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.language !== prevProps.language){
            
        }

    }

    // handleChangeSelectDoctorInfor = async(selectedOption, name) => {
    //     let stateName = name.name;
    //     let stateCopy = {...this.state};
    //     stateCopy[stateName] = selectedOption;
    //     this.setState({
    //         ...stateCopy
    //     })
    //     console.log("checkkkkkkkkkk: ", name, stateName)
    // }

    // handleOnchangeText = (event, id) => {
    //     let stateCopy = {...this.state}
    //     stateCopy[id] = event.target.value
    //     this.setState({
    //         ...stateCopy
    //     })
    // }

    render() {
        let {hasOldData} = this.state
        console.log("userInfor",this.props.userInfo.id);
        return (
            <div>imformation</div>
            // <div className='manage-doctor-container'>
            //     <div className='manage-doctor-title'>
            //         <FormattedMessage id="admin.manage-doctor.title" />
            //     </div>
            //     <div className='more-infor'>
            //         <div className='content-right'>
            //             <label><FormattedMessage id="admin.manage-doctor.intro" /></label>
            //                 <textarea className='form-control'
            //                     onChange={(event)=>this.handleOnchangeText(event, 'description')}
            //                     value = {this.state.description}
            //                 >
            //                 </textarea>
            //         </div>
            //     </div>

            //     <div className='more-infor-extra row'>
            //         <div className='col-4 form-group'>
            //             <label><FormattedMessage id="admin.manage-doctor.price" /></label>
            //             <Select
            //                 value={this.state.selectedPrice}
            //                 onChange={this.handleChangeSelectDoctorInfor}
            //                 options={this.state.listPrice}
            //                 placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
            //                 name="selectedPrice"
            //             />
            //         </div>
            //         <div className='col-4 form-group'>
            //             <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
            //             <Select
            //                 value={this.state.selectedPayment}
            //                 onChange={this.handleChangeSelectDoctorInfor}
            //                 options={this.state.listPayment}
            //                 placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
            //                 name="selectedPayment"
            //             />
            //         </div>
            //         <div className='col-4 form-group'>
            //             <label><FormattedMessage id="admin.manage-doctor.province" /></label>
            //             <Select
            //                 value={this.state.selectedProvince}
            //                 onChange={this.handleChangeSelectDoctorInfor}
            //                 options={this.state.listProvince}
            //                 placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
            //                 name="selectedProvince"
            //             />
            //         </div>
            //         <div className='col-4 form-group'>
            //             <label><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
            //             <input className='form-control' 
            //                 onChange={(event)=>this.handleOnchangeText(event, 'nameClinic')}
            //                 value = {this.state.nameClinic}
            //             />
            //         </div>
            //         <div className='col-4 form-group'>
            //             <label><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
            //             <input className='form-control' 
            //                 onChange={(event)=>this.handleOnchangeText(event, 'addressClinic')}
            //                 value = {this.state.addressClinic}
            //             />
            //         </div>
            //         <div className='col-4 form-group'>
            //             <label><FormattedMessage id="admin.manage-doctor.note" /></label>
            //             <input className='form-control' 
            //                 onChange={(event)=>this.handleOnchangeText(event, 'note')}
            //                 value = {this.state.note}
            //             />
            //         </div>
            //     </div>

            //     <div className='row'>
            //         <div className='col-4 form-group'>
            //             <label>Chọn chuyên khoa</label>
            //             <Select
            //                 value={this.state.selectedSpecialty}
            //                 onChange={this.handleChangeSelectDoctorInfor}
            //                 options={this.state.listSpecialty}
            //                 name="selectedSpecialty"
            //                 placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
            //             />
            //         </div>
            //         <div className='col-4 form-group'>
            //             <label>Chọn phòng khám</label>
            //             <Select
            //                 value={this.state.selectedClinic}
            //                 onChange={this.handleChangeSelectDoctorInfor}
            //                 options={this.state.listClinic}
            //                 name="selectedClinic"
            //                 placeholder={<FormattedMessage id="admin.manage-doctor.select-clinic" />}
            //             />
            //         </div>
            //     </div>

            //     <div className='manage-doctor-editor'>
            //         <MdEditor 
            //             style={{ height: '350px' }} 
            //             renderHTML={text => mdParser.render(text)} 
            //             onChange={this.handleEditorChange} 
            //             value={this.state.contentMarkdown}
            //         />
            //     </div>

            //     <button 
            //         onClick={()=>this.handleSaveContentMarkdown()}
            //         className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}>
            //         {hasOldData === true ?
            //             <span>
            //                 <FormattedMessage id="admin.manage-doctor.save" />
            //             </span> 
            //             : 
            //             <span>
            //                 <FormattedMessage id="admin.manage-doctor.add" />
            //             </span>
            //         }
            //     </button>
            // </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManageInfor);
