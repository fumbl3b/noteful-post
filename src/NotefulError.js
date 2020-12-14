import React from 'react'
import PropTypes from 'prop-types'


class NotefulError extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render(){
    if (this.state.hasError) {      
      return (
        <h2>Could not display this Data, Please try and refresh your page!.</h2>
      );
    }
    return this.props.children;
  }

}

NotefulError.propTypes = {
  children: PropTypes.object,
}

export default NotefulError