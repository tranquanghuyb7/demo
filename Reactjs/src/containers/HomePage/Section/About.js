import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import vtv1 from '../../../assets/vtv/vtv1.png'
import ictnews from '../../../assets/vtv/ictnews.png'
import vnexpress from '../../../assets/vtv/vnexpress.png'
import vtcnews from '../../../assets/vtv/vtcnewslogosvg.png'
import boyte from '../../../assets/vtv/thong-tin-bo-y-te-2.png'
import infonet from '../../../assets/vtv/infonet.png'
import dantri from '../../../assets/vtv/dantrilogo.png'


class About extends Component {

    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói về BookingCare
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="335px" src="https://www.youtube.com/embed/FyDQljKtWnI" 
                                title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <div className='content-right-left'>
                            <div className='content-child'>
                                <a target='_blank' href='https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm'>
                                    <img src={vtv1} />
                                </a>
                                
                            </div>
                            <div className='content-child'>
                                <img src={ictnews} />
                            </div>
                            <div className='content-child'>
                                <img src={vnexpress} />
                            </div>
                            <div className='content-child'>
                                <img src={vtcnews} />
                            </div>
                        </div>
                        <div className='content-right-right'>
                            <div className='content-child'>
                                <img src={boyte} />
                            </div>
                            <div className='content-child'>
                                <img src={infonet} />
                            </div>
                            <div className='content-child'>
                                <img src={vtv1} />
                            </div>
                            <div className='content-child'>
                                <img src={dantri} />
                            </div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
