/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// import { useIsMutating } from 'react-query';

import myRouteInfo from 'routes.js';

import { userState } from 'recoils/user.js';
import SimpleFooter from 'components/Footers/SimpleFooter';

function Admin() {
	// const isMutating = useIsMutating();
	const { isLogin } = useRecoilValue(userState);

	const getRoutes = routes => {
		return routes.map((prop, key) => {
			if (prop.isLoginRequired && !isLogin) {
				return <Redirect from={prop.path} to="/login" key={key}></Redirect>;
			}
			if (prop.isLogoutRequired && isLogin) {
				return <Redirect from={prop.path} to="/" key={key}></Redirect>;
			}
			return (
				<Route
					path={prop.path}
					exact
					render={props => <prop.component {...props} />}
					key={key}
				/>
			);
		});
	};
	return (
		<>
			<Switch>{getRoutes(Object.values(myRouteInfo))}</Switch>
			<SimpleFooter />
		</>
	);
}

export default Admin;
