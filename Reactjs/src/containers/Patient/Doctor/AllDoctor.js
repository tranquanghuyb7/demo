import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import './AllDoctor.scss'
import { getAllDoctors } from '../../../services/userService';
import _ from 'lodash';
import ProfileDoctor from './ProfileDoctor';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';

class AllDoctor extends Component {

    constructor(props){
        super(props)
        this.state = {
            arrDoctorId: [],
        }
    }

    async componentDidMount(){
        let res = await getAllDoctors()
        console.log(res)

        if(res && res.errCode === 0){
            let data = res.data;
            let arrDoctorId = [];
            console.log("data: ", data)
            
            if(data && !_.isEmpty(res.data)){
                if(data && data.length > 0){
                    data.map(item =>{
                        arrDoctorId.push(item.id)
                    })
                }
                this.setState({
                    arrDoctorId: arrDoctorId
                })
            }
        }
        
    }

    
    async componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.language !== prevProps.language){
            
        }

    }

    returnToHome = () => {
        if(this.props.history){
            this.props.history.push(`/home`)
        }
    }

    render() {
        let {arrDoctorId} = this.state
        console.log("checkkkdoctorid", arrDoctorId)
        return (
            <div>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className='outstanding-doctor-container'>
                    <div className='outstanding-doctor-top'>
                        <div className='icon-home'>
                            <i className="fas fa-home" onClick={()=>this.returnToHome()}></i>
                            <span className='outstanding-doctor-text'>/  Danh sách các bác sĩ</span>
                        </div>
                        
                    </div>
                    <div className='outstanding-doctor-content'>
                        {arrDoctorId && arrDoctorId.length > 0 &&
                            arrDoctorId.map((item, index) => {
                                return(
                                    <div className='each-doctor' key={index}>
                                        <div className='dt-content-left'>
                                            <div className='profile-doctor'>
                                                <ProfileDoctor
                                                    doctorId = {item}
                                                    isShowDescriptionDoctor = {true}
                                                    isShowLinkDetail={true}
                                                    isShowPrice={false}
                                                />
                                            </div>
                                        </div>
                                        <div className='dt-content-right'>
                                            <div className='doctor-schedule'>
                                                <DoctorSchedule
                                                    doctorIdFromParent={item}
                                                />
                                            </div>
                                            <div className='doctor-extra-infor'>
                                                <DoctorExtraInfor
                                                    doctorIdFromParent={item}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllDoctor);
