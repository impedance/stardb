import React, { Component } from 'react';

import './person-details.css';
import SwapiService from '../../services/swapi-service';
import ErrorIndicator  from '../error-indicator'
import Spinner from '../spinner';

import ErrorButton from '../error-button';

export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    person: null,
    loading: true,
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  onPersonLoaded = (person) => {
    this.setState({ 
      person,
      loading: false,
      error: false,
    });
  }

  oneError = (err) => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }

    this.swapiService
      .getPerson(personId)
      .then(this.onPersonLoaded)
      .catch(this.onError);
  }

  render() {

    if (!this.state.person) {
      return <span>Select a person from a list</span>;
    }
    const { person, loading, error } = this.state
    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorIndicator /> : null;
    const content = hasData ? <PersonView person={person} /> : <Spinner />;

    return (
      <div className="person-details card">
        {errorMessage}
        {content}
      </div>
    )
    
  }
}

const PersonView = ({person}) => {

  const { id, name, gender, birthYear, eyeColor } = person

  return (
    <>
      <img className="person-image" alt=""
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />
      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
          <li>
          <ErrorButton />
          </li>
        </ul>
      </div>
  </>
  )
}