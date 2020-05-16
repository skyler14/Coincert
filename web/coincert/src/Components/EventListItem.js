import React from 'react';

class EventListItem extends React.Component {

    constructor(props) {
      super(props);
      this.state = {eventDetails: props.location.eventDetails};
  }

  render() {
     return(
         <h1>Test {this.state.eventDetails.name}</h1>
      );
    }
}

export default EventListItem;
