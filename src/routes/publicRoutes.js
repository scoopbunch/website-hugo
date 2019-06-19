import React from 'react';
import {Route as RouteComponent, Switch, Redirect} from 'react-router-dom'
import NotFound from "../components/NotFound";
import PublicNavBar from "../components/PublicNavBar";
import Login from "../components/Login";
import ContactUs from "../components/ContactUs";
import Home from "../components/Home";
import Advisory from "../components/Advisory";
import DirectorMessage from "../components/Message/DirectorMessage";
import DeanMessage from "../components/Message/DeanMessage";
import ChairmanMessage from "../components/Message/ChairmanMessage";
import Association from "../components/About/Association";
import SAAConstitution from "../components/About/SAAConstitution";
import PresidentMessage from "../components/Message/PresidentMessage";
import ProfileDetails from "../components/ProfileDetails";
import FormLayout from "../components/Form/FormLayout";
import Donate from "../components/Donate";
import Register from "components/Alumni Registration/Register";
import RegisterConfirmation from "components/Alumni Registration/RegisterConfirmation";

const Route = ({component: Component, ...rest}) => (
    <RouteComponent
        {...rest}
        render={props => (
            <Component {...props}/>
        )}
    />
);


const PublicRoutes = () => {
    return (
        <>
            <Donate/>
            <PublicNavBar>
                <Switch>
                    <Route exact path={'/'} component={Home}/>

                    <Route exact path={'/form'} component={FormLayout}/>

                    <Route exact path={'/about'} component={() => <Redirect to={'/about/alumni-association'}/>}/>
                    <Route exact path={'/about/alumni-association'} component={Association}/>
                    <Route exact path={'/about/saa-constitution'} component={SAAConstitution}/>

                    <Route exact path={'/advisory-committee'} component={Advisory}/>

                    <Route exact path={'/message'} component={() => <Redirect to={'/advisory-committee'}/>}/>
                    <Route exact path={'/message/director'} component={DirectorMessage}/>
                    <Route exact path={'/message/dean-sw'} component={DeanMessage}/>
                    <Route exact path={'/message/chairman'} component={ChairmanMessage}/>
                    <Route exact path={'/message/president'} component={PresidentMessage}/>

                    <Route exact path="/profile" component={ProfileDetails}/>

                    <Route exact path={'/login'} component={Login}/>
                    <Route exact path={'/register'} component={Register}/>
                    <Route exact path={'/register/confirmation'} component={RegisterConfirmation}/>
                    <Route exact path={'/contact'} component={ContactUs}/>

                    <Route exact path={'/a'} component={() => 'Compnenet a'}/>
                    <Route path={'*'} component={NotFound}/>
                </Switch>
            </PublicNavBar>
        </>
    );
};

export default PublicRoutes;