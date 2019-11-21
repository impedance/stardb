import React from 'react';
import {SwapiServiceConsumer} from '../swapi-service-context';
import ItemDetails, { Record } from '../item-details';

const StarshipDetails = ({itemId}) => {
  return (
    <SwapiServiceConsumer>
      {
        ({getStarship, getStarshipImage}) => {
          return (
            <ItemDetails 
              itemId={itemId}
              getData={getStarship}
              getImageUrl={getStarshipImage} >
              <Record field="population" label="Population" />
              <Record field="diameter" label="Diameter" />
            </ItemDetails>
          )
        }        
      }
    </SwapiServiceConsumer>      
  )
}

export default StarshipDetails;