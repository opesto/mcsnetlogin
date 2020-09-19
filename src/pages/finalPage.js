import React from 'react';

import '../FormElements/Card.css';

const FinalPage = props => {
  return (
    <div className="card">
      <h2>{props.isValidUser ? 'Valid User!' : 'Invalid User'}</h2>
    </div>
  );
};

export default FinalPage;