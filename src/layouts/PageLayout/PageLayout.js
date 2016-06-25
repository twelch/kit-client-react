import React from 'react'

class PageLayout extends React.Component {

  static propTypes = {
    children: React.PropTypes.element
  }

  render () {
    const style = {
      page: {
        paddingTop: 140,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }
    }

    return (
      <div className='page-layout' style={style.page}>
        {this.props.children}
      </div>
    )
  }
}

export default PageLayout
