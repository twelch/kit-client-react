import React from 'react'
import PageLayout from 'layouts/PageLayout'
import SitesMenu from '../containers/SitesMenuContainer'

const SitesView = (props, context) => {
  return (
    <PageLayout>
      <SitesMenu />
    </PageLayout>
  )
}

export default SitesView
