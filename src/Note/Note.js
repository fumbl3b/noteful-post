import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import PropTypes from 'prop-types'
import './Note.css'

export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
    name: 'missing',
    id: 'missing',
    modified: 'missing',
  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        console.log(res);
        if (!res.ok) {
          console.log('res was not ok')
          return res.json().then(e => Promise.reject(e))
        }
        console.log('res was ok')
        return res.json(noteId)
      })
      .then(resJson => {
        console.log('you got to the next part')
        this.context.deleteNote(noteId)
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(noteId)
        this.props.history.push(`/`)
        return resJson;
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { name, id, modified } = this.props
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

Note.propTypes = {
  name: PropTypes.string.isRequired,
  history: PropTypes.object,
  id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
  modified: PropTypes.string.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
}