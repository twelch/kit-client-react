import React, { PropTypes } from 'react'

class BasicView extends React.Component {

  static propTypes = {
    view: PropTypes.object,
    getMap: PropTypes.func.isRequired,
    loaded: PropTypes.bool.isRequired
  }

  componentDidMount () {
    if (!this.map) {
      this.map = this.props.getMap()
    }
    if (this.map && this.props.loaded && !this.started) {
      this.start(this.props.view)
    }
  }

  componentDidUpdate () {
    if (!this.map) {
      this.map = this.props.getMap()
    }
    if (this.props.loaded && !this.started) {
      this.start(this.props.view)
    }
  }

  componentWillUnmount () {
    console.log('unmounting')
  }

  start (view) {
    this.map.flyTo({
      center: view.map.start.center,
      zoom: view.map.start.zoom
    })
    this.started = true
  }

  render () {
    const view = this.props.view

    const myStyle = {
      position: 'absolute',
      height: 50,
      backgroundColor: '#666',
      color: 'white',
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      padding: '10px',
      textAlign: 'center',
      width: '350px',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      font: 'Roboto, sans-serif'
    }

    return (
      <div style={myStyle} id='basic-view' >
        {view.name}
      </div>
    )
  }
}

export default BasicView

