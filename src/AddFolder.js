import React from 'react'
import config from './config'
import ApiContext from './ApiContext'
import PropTypes from 'prop-types'
import './add.css'

class AddFolder extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name:''
    }
  }

  static contextType = ApiContext
  
  handleClickAddFolder = (name) => {
    let newItem = JSON.stringify({
      name: name,
    })
    let error;

    if(name.length >= 3 && typeof name === typeof ''){
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: newItem
    }).then(res => {
      if (!res.ok){
        error = { code: res.status };
      }
      return res.json();
    })
    .then(folder => {
      if (error) {
        error.message = folder.message;
        return Promise.reject(error);
      }
      this.context.addFolder(folder)
      this.props.history.push(`/`)
    })
    .catch(error => {
      console.error({error});
    });
  } else {
    alert('Data Error: \n Please use more than 3 characters for the folder name')
  }
    
  }
  getValue = (val) => {
    this.setState({
      name:val
    })
  }



  render() {
    return (
      <div>
        <form>
          <label htmlFor='new-folder'>New Folder Name:</label>
          <input
            id='new-Folder'
            defaultValue='Hello'
            onChange={(e) => this.getValue(e.target.value)}
          />
          <button
            className='Add Folder'
            type='button'
            onClick={(e) => this.handleClickAddFolder(`${this.state.name}`)}
          >
            Add New Folder!
          </button>
        </form>
      </div>
    )
  }


}

AddFolder.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
}

export default AddFolder