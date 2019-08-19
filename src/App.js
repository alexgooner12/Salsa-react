import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/navigation';
import DanceMovePage from './components/danceMovePage';
import GroupListPage from './components/groupListPage';
import RegistrationPage from './components/registrationPage';
import ProfilePage from './components/profilePage';
import Profile from './components/profile';
import PaymentPage from './components/paymentPage';
import MembersPage from './components/membersPage';
import SchedulePage from './components/schedulePage';
import AttendancePage from './components/attendancePage';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/" render={() => <SchedulePage />} />
          <Route exact path="/dance-move-page" render={() => <DanceMovePage />} />
          <Route exact path="/group-list-page" render={() => <GroupListPage />} />
          <Route exact path="/registration-page" render={() => <RegistrationPage />} />
          <Route exact path="/profile-page" render={routeProps => <ProfilePage routeProps={routeProps} />} />
          <Route exact path="/profile-page/:id" render={routeProps => <Profile routeProps={routeProps} />} />
          <Route exact path="/payment-page" render={() => <PaymentPage />} />
          <Route exact path="/members-page" render={() => <MembersPage />} />
          <Route exact path="/attendance-page" render={() => <AttendancePage />} />
          <Route render={() => <h2>Not Found</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
