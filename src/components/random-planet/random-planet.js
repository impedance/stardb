import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import './random-planet.css';
import  ErrorIndicator  from '../error-indicator'

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
  };

  componentDidMount() {
    // this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 5000);
    //clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false
    })
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  updatePlanet = () => {
    console.log('update');
    const id = Math.floor(Math.random() * 25) + 3;
    this.swapiService
    .getPlanet(id)
    .then(this.onPlanetLoaded)
    .catch(this.onError);
  }
  
  render() {
    console.log('render()')
    const { planet, loading, error } = this.state
    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorIndicator /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : <Spinner />;
    
    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {content}
      </div>
    );
  }
}

const PlanetView = ({planet}) => {

  const { id, name, population, rotationPeriod, diameter } = planet

  return (
    <>
      <img className="planet-image" alt=""
      src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
    <div>
      <h4>{name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <span className="term">Population</span>
          <span>{population}</span>
        </li>
        <li className="list-group-item">
          <span className="term">Rotation period</span>
          <span>{rotationPeriod}</span>
        </li>
        <li className="list-group-item">
          <span className="term">Diameter</span>
          <span>{diameter}</span>
        </li>
      </ul>
    </div>

    </>
    
    
  )
}