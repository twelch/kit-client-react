import React from 'react'

class MapLayout extends React.Component {

  static propTypes = {
    children: React.PropTypes.element
  }

  render () {
    const style = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%',
      backgroundColor: 'lightblue'
    }

    return (
      <div className='map-layout' style={style}>
        {this.props.children}
      </div>
    )
  }
}

export default MapLayout
