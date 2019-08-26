import React from 'react';
import RatingBreakdown from './RnR_RatingBreakdown';
import Sort from './RnR_sort_list';

class RnR extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>Ratings and Reviews</h2>
        <RatingBreakdown />
        <Sort />
      </div>
    );
  }
}

export default RnR;