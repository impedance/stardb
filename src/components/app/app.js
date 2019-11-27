import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import './app.css';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import ErrorBoundry from '../error-boundry';
import {
  PeoplePage, 
  PlanetPage, 
  StarshipPage,
  LoginPage,
  SecretPage,
} from '../pages'
import { SwapiServiceProvider } from '../swapi-service-context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { StarshipDetails } from '../sw-components';

export default class App extends Component {
  
  state = {
    showRandomPlanet: true,
    hasError: false,
    swapiService: new SwapiService(),
    isLoggedIn: false,
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  }

  onServiceChange = () => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ?
        DummySwapiService : SwapiService;

      return {
        swapiService: new Service()
      };
    })
  };

  componentDidCatch() {
    this.setState({hasError: true});
  }

  render() {

    const { isLoggedIn } = this.state;

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService} >
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange}/>
              <RandomPlanet/>
              <Switch>
                <Route path="/" exact render={() => <h2>Welcome to starDB</h2>} />
                <Route path="/people/:id?" component={PeoplePage} />
                <Route path="/planets" component={PlanetPage} />
                <Route path="/starships" exact component={StarshipPage} />
                <Route path="/starships/:id" 
                  render={({ match, location, history}) => {
                    const { id } = match.params;
                    return <StarshipDetails itemId={id}/>
                }} />
                <Route path="/login" render={
                  () => (
                    <LoginPage 
                      isLoggedIn={isLoggedIn}
                      onLogin={this.onLogin}/>                  
                  )}/>
                <Route path="/secret" render={
                  () => (
                    <SecretPage isLoggedIn={isLoggedIn}/>                  
                )}/>
              </Switch>
              
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }  
};