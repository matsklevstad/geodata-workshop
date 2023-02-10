import React, { useRef, useEffect, useContext, useState } from "react";

import esriConfig from "@arcgis/core/config.js";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import Locate from "@arcgis/core/widgets/Locate";
import Graphic from "@arcgis/core/Graphic";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Search from "@arcgis/core/widgets/Search";
import Compass from "@arcgis/core/widgets/Compass";
import Fullscreen from "@arcgis/core/widgets/Fullscreen";
import { AppContext } from "../state/context";
import "../style/App.css";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle";

const MapComponent = () => {
  const context = useContext(AppContext);
  esriConfig.assetsPath = "./assets";
  const mapDiv = useRef(null);
  const [loaded, setLoaded] = useState(false);
  let baseMap = "topo-vector";

  useEffect(() => {
    if (mapDiv.current) {
      const map = new Map({
        basemap: baseMap,
      });

      const featureLayer = new FeatureLayer({
        url: "https://services-eu1.arcgis.com/zci5bUiJ8olAal7N/arcgis/rest/services/OSM_Tourism_EU/FeatureServer/0",
        popupEnabled: true,
        popupTemplate: {
          title: "{name}",
          content: [
            {
              type: "text",
              text: `<p>Type: {tourism}</p>
              <p>{description}</p>`,
            },
          ],
        },
      });

      map.add(featureLayer);

      context.featureLayer.set(featureLayer);

      new MapView({
        map: map,
        container: mapDiv.current,
        extent: {
          ymin: 63.40182257265643,
          xmin: 10.227928161621094,
          ymax: 63.453731595863324,
          xmax: 10.560264587402344,
        },
      }).when((mapView) => {
        setLoaded(true);

        var locateWidget = new Locate({
          view: mapView,
          scale: 5000,
        });

        var search = new Search({
          view: mapView,
        });

        var fullscreen = new Fullscreen({
          view: mapView,
        });

        var compass = new Compass({
          view: mapView,
        });
        let basemapToggle = new BasemapToggle({
          view: mapView,
          nextBasemap: "satellite",
        });

        mapView.ui.add(basemapToggle, "top-left");
        mapView.ui.add(fullscreen, "top-left");
        mapView.ui.add(search, "top-right");
        mapView.ui.add(locateWidget, "top-left");
        mapView.ui.add(compass, "top-left");

        context.mapView.set(mapView);
        locateWidget.on("locate", function (locateEvent) {
          if (locateEvent.position.coords) {
            context.point.set({
              type: "point",
              latitude: locateEvent.position.coords.latitude,
              longitude: locateEvent.position.coords.longitude,
            });
          }
        });
        mapView.on("click", (event) => {
          context.point.set(event.mapPoint);
        });
      });
    }
  }, []);

  useEffect(() => {
    if (context.mapView.value) {
      const mapView = context.mapView.value;

      const oldPoint = mapView.graphics.items.filter((item) => {
        return item.geometry.type === "point";
      })[0];
      mapView.graphics.remove(oldPoint);

      const simpleMarkerSymbol = {
        type: "simple-marker",
        color: "rgb(36,36,36)",
        outline: {
          color: [255, 255, 255], // White
          width: 1,
        },
      };

      const pointGraphic = new Graphic({
        geometry: context.point.value,
        symbol: simpleMarkerSymbol,
      });

      mapView.graphics.add(pointGraphic);
    }
  }, [context.point.value, context.mapView.value]);

  return (
    <>
      {loaded ? "" : <p>map not loaded</p>}
      <div className="mapDiv" ref={mapDiv} />
    </>
  );
};

export default MapComponent;
