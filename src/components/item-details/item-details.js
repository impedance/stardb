import React, { Component } from 'react';

import './item-details.css';
import SwapiService from '../../services/swapi-service';
import ErrorIndicator  from '../error-indicator'
import Spinner from '../spinner';

import ErrorButton from '../error-button';

export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: null,
    loading: true,
    image: null,
  };

  componentDidMount() {
    this.updateitem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateitem();
    }
  }

  // onitemLoaded = (item) => {
  //   this.setState({ 
  //     item,
  //     image: getImageUrl(item),
  //     loading: false,
  //     error: false,
  //   });
  // }

  oneError = (err) => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  updateitem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({ 
          item,
          image: getImageUrl(item)})
      })
      .catch(this.onError);
  }

  render() {
    const { item } = this.state;
    if (!item) {
      return <span>Select a item from a list</span>;
    }
    const { loading, error } = this.state
    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorIndicator /> : null;
    const content = hasData ? <ItemView item={item} /> : <Spinner />;

    return (
      <div className="item-details card">
        {errorMessage}
        {content}
      </div>
    )
    
  }
}

const ItemView = ({item}) => {

  const { name, gender, birthYear, eyeColor, image } = item

  return (
    <>
      <img className="item-image" alt=""
        src={image} />
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