import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        }
    }
    handleOnchangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handleOnchangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        // console.log("username: ", this.state.username, "password: ", this.state.password)
        // console.log("all state: ", this.state)
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            console.log('daataaa', data)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log("login success")
            }

        } catch (e) {
            // console.log(e)
            console.log('error >>>>: ', e.response)
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
            // this.setState({
            //     errMessage: e.message
            // })
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) =>{
        if(event.key === 'Enter'){
            this.handleLogin();
        }
    }

    render() {

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input type='text'
                                className='form-control'
                                placeholder='Enter your username'
                                value={this.state.username}
                                onChange={(event) => { this.handleOnchangeUsername(event) }} />
                        </div>

                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder='Enter your password'
                                    onChange={(event) => { this.handleOnchangePassword(event) }} 
                                    onKeyDown={(event)=> this.handleKeyDown(event)}    
                                />
                                <span
                                    onClick={() => { this.handleShowHidePassword() }} >
                                    <i className={this.state.isShowPassword ? "far fa-eye-slash" : "far fa-eye"}></i>
                                    {/* <i className="far fa-eye-slash"></i> */}
                                </span>

                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => { this.handleLogin() }}>Login</button>
                        </div>

                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>

                        <div className='col-12 text-center mt-2'>
                            <span className='text-other-login'>Or Login with:</span>
                        </div>

                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g goolge"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
