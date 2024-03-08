import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate, getAllTimeBookingDay } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';
// import Button from 'react-bootstrap';
// import Modal from 'react-bootstrap';
import { Modal, Button } from 'reactstrap';

class DoctorSchedule extends Component {

    constructor(props){
        super(props)
        this.state = {
            allDays:[],
            allAValableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {},
            nowDay: '',
            nowDayData: '',
            isOpenModal: false
        }
    }

    async componentDidMount(){
        let {language} = this.props;
        let allDays = this.getArrDays(language);
        if(this.props.doctorIdFromParent){
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAValableTime: res.data ? res.data : []
            })
        }

        let nowDay = allDays[0].value;

        if(nowDay){
            let res = await getAllTimeBookingDay(this.props.doctorIdFromParent, nowDay)
            // console.log("ressssssssssss", res)
            this.setState({
                nowDayData: res.data
            })
        }


        this.setState({
            allDays: allDays,
            nowDay: nowDay
        })
    }

    //in hoa kí tự đầu
    capitalizeFirstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = (language) =>{
        let allDays = [];
        for(let i = 0; i < 7; i++){
            let object = {};
            if(language ===LANGUAGES.VI){
                if(i===0){
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`
                    object.label = today
                }else{
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi)
                }
            }else{
                if(i===0){
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`
                    object.label = today
                }else{
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDays.push(object)
        }

        return allDays;
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.language !== prevProps.language){
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays
            })
        }

        if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent){
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAValableTime: res.data ? res.data : []
            })
        }
    }

    handleOnchangeSelect = async(event) => {
        if(this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1){
            let doctorId = this.props.doctorIdFromParent
            let date = event.target.value;
            // console.log("dateeeeeeeee", date)
            this.setState({
                nowDay: date
            })


            let res1 = await getAllTimeBookingDay(this.props.doctorIdFromParent, date)
            // console.log("ressssssssssss1111", res1)
            this.setState({
                nowDayData: res1.data
            })


            
            let res = await getScheduleDoctorByDate(doctorId, date)

            if(res && res.errCode === 0){
                this.setState({
                    allAValableTime: res.data ? res.data : []
                })
            }

            // console.log("checkkkk allAValableTime: ",this.state.allAValableTime)
        }
    }

    handleClickScheduleTime = (time) =>{
        // console.log("time",time)
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }

    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false,
            isOpenModal: false
        })
    }

    handleClickDisable = (item)=> {
        this.setState({
            isOpenModal: true
        })
    }

    

    render() {
        let {allDays, allAValableTime, isOpenModalBooking, dataScheduleTimeModal, nowDay, nowDayData} = this.state;
        let {language, closeBookingModal} = this.props;
        // console.log("nowDay",nowDay)
        // console.log("nowDayData",nowDayData)
        // console.log("allAValableTime",allAValableTime)
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event)=>this.handleOnchangeSelect(event)}>
                            {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>{item.label}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'>
                                <span><FormattedMessage id="patient.detail-doctor.schedule" /></span>
                            </i>
                        </div>
                        <div className='time-content'>
                            {allAValableTime && allAValableTime.length > 0 ?
                            <>
                                <div className='time-content-btns'>
                                    {allAValableTime.map((item, index) => {
                                        if(item.date == nowDay){
                                            // console.log("checkkkkkkkkkkday", item.date);
                                            let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                            // if(item.date == nowDay){
                                                for (let i = 0; i < nowDayData.length; i++) {
                                                    if (item.timeType == nowDayData[i].timeType) {
                                                        // console.log(item.timeType);
                                                        return(
                                                            <button key={index}
                                                                className={language === LANGUAGES.VI ? 'btn-vi btn-default' : 'btn-en -btn-default'}
                                                                onClick={() => this.handleClickDisable()}
                                                            >
                                                                    {timeDisplay}
                                                            </button>
                                                        )
                                                    }
                                                    
                                                }
                                        }else{
                                            let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                            return(

                                                <button key={index}
                                                    className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                                    onClick={() => this.handleClickScheduleTime(item)}
                                                >
                                                        {timeDisplay}
                                                </button>
                                            )
                                        }
                                        let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                        
                                        return(

                                            <button key={index}
                                                className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                                onClick={() => this.handleClickScheduleTime(item)}
                                            >
                                                    {timeDisplay}
                                            </button>
                                        )
                                    })}
                                </div>
                                
                                <div className='book-free'>
                                    <span>
                                        <FormattedMessage id="patient.detail-doctor.choose" />
                                        <i className='far fa-hand-point-up'></i> 
                                        <FormattedMessage id="patient.detail-doctor.book-free" />
                                    </span>
                                </div>
                            </>
                                : <div className='no-schedule'><FormattedMessage id="patient.detail-doctor.no-schedule" /></div>
                            }
                        </div>
                    </div>
                </div>

                <BookingModal 
                    isOpenModal = {isOpenModalBooking}
                    closeBookingModal = {this.closeBookingModal}
                    dataTime = {dataScheduleTimeModal}
                />
            
                <Modal isOpen={this.state.isOpenModal}  
                        className={'booking-modal-container'} 
                        size="md" centered
                >
                    <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>
                            <FormattedMessage id='patient.booking-modal.title' />
                        </span>
                        <span className='right' onClick={this.closeBookingModal}>
                            <i className='fas fa-times'></i>
                        </span>
                    </div>
                    <div className='booking-modal-body'>
                        <div className='set-height-modal'>
                            <label>Thời gian này đã có lịch hẹn</label>
                        </div>
                    </div>
                </div>
                </Modal>
            </>
            
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
