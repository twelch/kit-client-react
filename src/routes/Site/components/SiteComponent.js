import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchSites } from 'modules/sites'

/*
 * A SiteComponent is a component that works with an individual site
 * It requires current siteid to be set and its state available. If it 
 * is not then it will trigger the necessary actions to load before continuing.  
 * Authentication is required and should be ensured beforehand
 *
 * Use makeSiteComponent to turn a component into a higher-order SiteComponent
 */
import { push } from 'react-router-redux'

export function makeSiteComponent (Component) {
  class SiteComponent extends React.Component {

    static propTypes = {
      token: PropTypes.string,
      isAuthenticated: PropTypes.bool.isRequired,
      sites: PropTypes.object      
    }

    componentWillMount () {
      this.checkSite(this.props.sites)
    }

    checkSite (sites) {
      const {isAuthenticated, params, fetchSites} = this.props

      // Check authenticated and site provided
      if (!isAuthenticated) {
        return false
      }

      // Check if site state loaded
      if (!sites) {
        fetchSites(this.props.token)
      }
    }

    render () {
      const {params, sites} = this.props

      return (
        <div>
        {sites 
          ? <Component {...this.props} />
          : null
        }
        </div>
      )      
    }
  }

  const mapActionCreators = {
    fetchSites
  }

  const mapStateToProps = (state, context) => ({
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated,
    sites: state.sites.configs
  })

  return connect(mapStateToProps, mapActionCreators)(SiteComponent)
}
