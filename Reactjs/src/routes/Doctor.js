import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header'
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
import DoctorManageSchedule from '../containers/System/Doctor/DoctorManageSchedule';
import ManagePatient from '../containers/System/Clinic/ManagePatient';
import DoctorManageInfor from '../containers/System/Doctor/DoctorManageInfor';

class Doctor extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/doctor/manage-schedule" component={ManageSchedule} />
                            <Route path="/doctor/doctor-manage-schedule" component={DoctorManageSchedule} />
                            <Route path="/doctor/manage-patient" component={ManagePatient} />
                            {/* <Route path="/doctor/doctor-manage-infor" component={DoctorManageInfor} /> */}
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
