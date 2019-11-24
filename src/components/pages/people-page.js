import React from 'react';
import {withRouter} from 'react-router-dom';
import { PersonDetails, PersonList } from '../sw-components';
import Row from '../row';

const PeoplePlage = ({history, match}) => {
  const { id } = match.params;
  return (
    <Row 
      left={<PersonList onItemSelected={(id) => history.push(id)} />}
      right={<PersonDetails itemId={id} />}
    />
  )
}

export default withRouter(PeoplePlage);