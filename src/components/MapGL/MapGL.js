import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'

class MapGL extends Component {
  static propTypes = {
    // Default map view
    view: React.PropTypes.object.isRequired,
    // Style of map container
    mapStyle: React.PropTypes.object.isRequired,
    // Current base layer
    baselayer: React.PropTypes.string,
    // Mapbox map token
    token: React.PropTypes.string.isRequired,
    // onStyleEvent fired after style loaded.  Map object is passed
    onMapLoad: React.PropTypes.func,
    receivedStyle: React.PropTypes.func,
    container: React.PropTypes.string
  }

  constructor () {
    super()
    this.shownLayers = []
    this.hiddenLayers = []

    this.onStyleLoad = this.onStyleLoad.bind(this)
  }

  onStyleLoad () {
    if (this.props.onMapLoad) {
      this.props.onMapLoad(this.map)
    }
    this.props.receivedStyle()
  }

  componentDidMount () {
    mapboxgl.accessToken = this.props.token
    if (!this.props.view.container) {
      this.props.view.container = 'map'
    }
    this.map = new mapboxgl.Map(this.props.view)

    this.map.on('style.load', this.onStyleLoad)
  }

  componentDidUpdate () {
    if (this.props.baselayer === 'satellite' && this.curBase !== this.props.baselayer) {
      this.showLayer('satellite')
      this.curBase = this.props.baselayer
    } else if (this.props.baselayer !== 'satellite' && this.curBase === 'satellite') {
      this.hideLayer('satellite')
      this.curBase = this.props.baselayer
    }
  }

  componentWillUnmount () {
    this.map.remove()
  }

  addSource (id) { // eslint-disable-line react/sort-comp
    if (this.map.getSource(id) !== undefined) {
      throw new Error('{id} source already added to map')
    } else {
      return this.map.addSource.apply(this.map, arguments)
    }
  }

  removeSource () {
    return this.map.removeSource.apply(this.map, arguments)
  }

  addLayer (options) {
    if (this.map.getLayer(options.id) !== undefined) {
      throw new Error(`${options.id} layer already added to map`)
    } else {
      return this.map.addLayer.apply(this.map, arguments)
    }
  }

  removeLayer () {
    return this.map.removeLayer.apply(this.map, arguments)
  }

  showLayer (id) {
    // Check if already visible
    const vis = this.map.getLayoutProperty(id, 'visibility')
    if (vis && vis === 'visible') return
    // Show layer
    this.map.setLayoutProperty(id, 'visibility', 'visible')
    // Update layer state
    if (this.hiddenLayers.indexOf(id) < 0) {
      // If not hidden then add to shown
      this.shownLayers.push(id)
    } else {
      // Else remove from hidden
      this.hiddenLayers = this.hiddenLayers.filter((layerID) => { return layerID !== id })
    }
  }

  hideLayer (id) {
    // Check if already hidden
    const vis = this.map.getLayoutProperty(id, 'visibility')
    if (vis && vis === 'none') return

    this.map.setLayoutProperty(id, 'visibility', 'none')
    // Update layer state
    if (this.shownLayers.indexOf(id) < 0) {
      // If not shown then add to hidden
      this.hiddenLayers.push(id)
    } else {
      // Else remove from shown
      this.shownLayers = this.shownLayers.filter((layerID) => { return layerID !== id })
    }
  }

  hideShown () {
    this.shownLayers.forEach((layerID) => {
      this.hideLayer(layerID)
    })
    this.shownLayers = []
  }

  showHidden () {
    this.hiddenLayers.forEach((layerID) => {
      this.showLayer(layerID)
    })
    this.hiddenLayers = []
  }

  easeTo () {
    return this.map.easeTo.apply(this.map, arguments)
  }

  flyTo () {
    return this.map.flyTo.apply(this.map, arguments)
  }

  panTo () {
    return this.map.panTo.apply(this.map, arguments)
  }

  getCenter () {
    return this.map.getCenter.apply(this.map, arguments)
  }

  getZoom (startZoom) {
    // const wPerc = window.innerWidth / size.width;
    // const hPerc = window.innerHeight / size.height;
    // const perc = Math.min(wPerc, hPerc);
    // console.log(perc);
    return startZoom
  }

  setZoom (zoom) {
    return this.map.setZoom(zoom)
  }

  zoomTo (zoom, options, eventData) {
    return this.map.zoomTo(zoom, options, eventData)
  }

  fitBounds () {
    return this.map.fitBounds.apply(this.map, arguments)
  }

  /*
   fitBoundsBearing - rework of fitbounds to not reset bearing.  Offset not supported
   */
  fitBoundsBearing (bounds, options) {
    Object.assign(options, {
      padding: 0,
      maxZoom: 22
    })

    const b = mapboxgl.LngLatBounds.convert(bounds)
    const tr = this.map.transform
    const nw = tr.project(b.getNorthWest())
    const se = tr.project(b.getSouthEast())
    const size = se.sub(nw)
    const scaleX = (tr.width - options.padding * 2) / size.x
    const scaleY = (tr.height - options.padding * 2) / size.y

    options.center = tr.unproject(nw.add(se).div(2))
    options.zoom = Math.min(tr.scaleZoom(tr.scale * Math.min(scaleX, scaleY)), options.maxZoom)

    return options.linear
      ? this.map.easeTo(options)
      : this.map.flyTo(options)
  }

  setFilter () {
    this.map.setFilter.apply(this.map, arguments)
  }

  setLayoutProperty () {
    this.map.setLayoutProperty.apply(this.map, arguments)
  }

  batch (work) {
    this.map.batch(work)
  }

  render () {
    return (
      <div>
        <div style={this.props.mapStyle} id={this.props.container ? this.props.container : 'map'}></div>
      </div>
    )
  }
}

export default MapGL
