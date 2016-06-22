import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Sidebar from '../../components/Sidebar'
import { openSidebar, closeSidebar, setSidebar, toggleSidebar } from 'modules/sidebar'
import { showSites } from 'modules/sites'
import { logout } from 'modules/auth'

const mapStateToProps = (state) => ({})

const mapActionCreators = {
  openSidebar,
  closeSidebar,
  setSidebar,
  toggleSidebar,
  showSites,
  logout
}

export default connect(
  mapStateToProps,
  mapActionCreators
)(Sidebar)
