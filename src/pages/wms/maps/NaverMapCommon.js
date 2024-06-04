import React, {useEffect} from "react";
// import MapNavigation from './MapNavigation'
// import NaverMapContainer from './NaverMapContainer'
import { NavermapsProvider, Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';


function NaverMapCommon() {
// var defaultCenter = new NaverMap.LatLng(37.3595704, 127.105399);

  return (
    <NavermapsProvider ncpClientId='of9ytjj6w6'>
        {/* <MapNavigation /> */}
        <MapDiv style={{ width: '100%', height: '100%', marginTop: '-30px' }}>
          <NaverMap
              // defaultCenter={defaultCenter}
              defaultZoom={10}
          >
              <Marker
                  // defaultPosition={defaultCenter}
              />
          </NaverMap>
        </MapDiv>
    </NavermapsProvider>
  )
}
export default NaverMapCommon;