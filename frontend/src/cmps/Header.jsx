import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { loadUser } from '../store/actions/userAction'

class _Header extends Component {

    state = {
        isScroll: false
    }

    componentDidMount() {
        this.props.loadUser();
        window.addEventListener("scroll", this.onScroll)
    }

    
    onScroll = () => {
        if (window.scrollY > 0) {
            this.setState({ isScroll: true })
        }
        else this.setState({ isScroll: false })
    }
    
    render() {
        const { user } = this.props;        
        return (
            <header onScroll={this.onScroll} className={`${this.state.isScroll || this.props.location.pathname !== '/' ? 'sticky' : ''} flex space-around  align-center`}>

                {(this.props.location.pathname === '/') ?
                    <a href="/#top" className="logo">BeatBox</a> :
                    <Link to="/" className="logo">BeatBox</Link>
                }

                <ul className="main-nav flex clean-list space-between align-center">
                    <li><Link to="/box">Boxes</Link></li>
                    <Link to="/box/add">Create Box</Link>
                    {/* <li className="link flex align-center">Link3</li> */}
                    {!user && <Link to='/login'>Login</Link>}
                    <Link to='/login'>Login</Link>
                    {/* <Link to='/signup'>Signup</Link> */}

                    {/* {loggedinUser && <button onClick={() => onLogout()}>Logout</button>} */}

                    {user && <div className="avatar-img flex column align-center">
                        <img src={user.imgUrl}  alt="avatar" />
                        <label className="avatar-name">Hi {user.username}</label>

                    </div>}
                </ul>
            </header>
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.userReducer.loggedinUser
    }
}
const mapDispatchToProps = {
    loadUser
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(withRouter(_Header))