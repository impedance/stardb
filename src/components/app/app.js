import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import ItemDetails, { Record } from '../item-details';


import './app.css';
import SwapiService from '../../services/swapi-service';
import ErrorBoundry from '../error-boundry';
import {
  PersonList,
  PlanetList,
  StarshipList
} from '../sw-components/item-lists';

import { SwapiServiceProvider } from '../swapi-service-context';
import PersonDetails from '../sw-components/person-details';

import StarshipDetails from '../sw-components/starship-details';

import PlanetDetails from '../sw-components/planet-details';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  componentDidCatch() {
    this.setState({hasError: true});
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }
    const planet = this.state.showRandomPlanet ?
    <RandomPlanet /> :
    null;

    const { 
      getPerson, 
      getStarship,
      getStarshipImage,
      getPersonImage,
      getPlanetImage,
      getAllPeople,
      getAllPlanets,
      getAllStarships } = this.swapiService;

    const personDetails = (
      <ItemDetails 
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage}
        >
        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />
      </ItemDetails>
    )

    const starshipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}
      >
        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="constInCredits" label="Cost" />
      </ItemDetails>
    )

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.swapiService} >
          <div className="stardb-app">
            <Header />
            {planet}
            <PersonDetails itemId={11} />
            <PlanetDetails itemId={5} />
            <StarshipDetails itemId={9} />
            <PersonList />
            <StarshipList />
            <PlanetList />
          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }  
};