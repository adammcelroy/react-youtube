import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import logo from '../img/logo.svg';

class Header extends Component {
	render() {
		return (
			<div className="header-wrapper">
				<div className="header">
					<div className="container">
						<div className="row">
							<div className="col-md-1 col-2">
								<div className="header__logo-wrapper">
									<Link to="/">
										<img src={logo} alt="" className="header__logo" />
									</Link>
								</div>
							</div>

							<div className="col-lg-7 col-md-8 col-10">
								<div className="header__search-wrapper">
									<div className="header__search">
										<SearchBar
											autofocus={true}
										/>
									</div>
								</div>
							</div>

							<div className="col-lg-4 col-md-3 d-none d-md-block">
								<div className="header__cta-wrapper">
									<a
										href="https://github.com/adammcelroy/react-youtube"
										className="btn btn-outline-secondary header__cta"
									>
										<i className="fa fa-github"></i>
										View on GitHub
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;
