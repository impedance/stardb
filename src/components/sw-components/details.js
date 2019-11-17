import React from 'react';

import ItemDetails, { Record } from '../item-details';
import withData  from '../hoc-helpers';
import SwapiService from '../../services/swapi-service';

const swapiService = new SwapiService();

const {
  getPerson,
  getPlanet,
  getStarship,
  getPersonImage,
  getPlanetImage,
  getStarshipImage,
} = swapiService;

const PersonDetails = () => {

}

const PlanetDetails = () => {
  
}

const StarshipDetails = () => {
  
}

export {
  PersonDetails,
  PlanetDetails,
  StarshipDetails
}