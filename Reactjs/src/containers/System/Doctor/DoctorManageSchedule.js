import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';


class DoctorManageSchedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.fetchAllScheduleTime()
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if(prevProps.allScheduleTime !== this.props.allScheduleTime){
            let data = this.props.allScheduleTime;
            if(data && data.length > 0){
                data = data.map(item=>({
                    ...item,
                    isSelected: false
                }))
            }
            // console.log("dataaaaaaaa: ", data)

            this.setState({
                rangeTime: data
            })
        }
        // if(prevProps.language !== this.props.language){
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
        //     this.setState({
        //         listDoctors: dataSelect
        //     })
        // }
    }

    buildDataInputSelect = (inputData) => {
        let result = []
        let { language } = this.props
        if(inputData && inputData.length > 0){
            inputData.map((item, index) => {
                let object = {}
                let labelVi = `${item.firstName} ${item.lastName}`
                let labelEn = `${item.lastName} ${item.firstName}`
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }

    handleChangeSelect = async(selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });
    };

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        // console.log("check timeeeeee: ", time)
        let {rangeTime} = this.state
        if(rangeTime && rangeTime.length > 0){
            rangeTime = rangeTime.map(item => {
                if(item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async() => {
        let { rangeTime, currentDate } = this.state;
        let selectedDoctor = this.props.userInfo.id;
        // console.log("check iddd: ", selectedDoctor)
        let result = []
        // console.log("check rangtime: ",rangeTime)
        // console.log("check selecteddoctor: ",selectedDoctor)
        // console.log("check currentdate: ",currentDate)

        // if(selectedDoctor && _.isEmpty(selectedDoctor)){
        //     toast.error("Invalid selected doctor!")
        //     return
        // }
        if(!currentDate){
            toast.error("Invalid date!")
            return
        }

        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        let formatedDate = new Date(currentDate).getTime();

        if(rangeTime && rangeTime.length > 0){
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if(selectedTime && selectedTime.length > 0){
                selectedTime.map(schedule => {
                    let object = {};
                    object.doctorId = selectedDoctor;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object)
                })
            }else{
                toast.error("Invalid selected time!")
                return
            }
        }

        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor,
            formatedDate: formatedDate
        })

        if(res && res.errCode === 0){
            toast.success("Save infor success")
        }else{
            toast.error("Error saving information failed!")
        }
        
    }

    render() {
        let {rangeTime} = this.state
        let {language} = this.props
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
        

        console.log("this.props.allScheduleTime: ",this.props.allScheduleTime)
        console.log("userInfor",this.props.userInfo.id);
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container'>
                    <div className='row'>
                        {/* <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.Choose-doctor" /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div> */}
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.Choose-date" /></label>
                            <DatePicker
                                onChange={this.handleOnchangeDatePicker}
                                className='form-control'
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) =>{
                                    return(
                                        <button className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'} 
                                            key={index}
                                            onClick={()=>this.handleClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule' onClick={()=>this.handleSaveSchedule()}>
                                <FormattedMessage id="manage-schedule.save" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManageSchedule);
