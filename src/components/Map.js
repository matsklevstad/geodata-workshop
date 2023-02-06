import React, { useRef, useContext, useEffect } from "react";
import { AppContext } from "../state/context";

import esriConfig from "@arcgis/core/config.js";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import PopupTemplate from "@arcgis/core/PopupTemplate";

import "../App.css";

const MapComponent = () => {
  esriConfig.assetsPath = "./assets";
  const context = useContext(AppContext);

  useEffect(() => {
    // Det første vi trenger er et Map objekt med bakgrunnskart
    // Konstruktøren er allerede i koden, men vi må velge bakgrunnskartet
    // En liste med valg finner vi i API dokumentasjonen under "For use without an API key":
    // https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap

    const map = new Map({
      // TODO: Definer bakgrunnskart
      basemap: "",
    });

    // Vi ønsker så å hente data som vi kan legge til i kartet.
    // På følgende tjeneste finner dere punkter som viser en rekke turistatraksjoner i Europa:
    // Url: https://services-eu1.arcgis.com/zci5bUiJ8olAal7N/arcgis/rest/services/OSM_Tourism_EU/FeatureServer/0
    // Se dokumentasjonssiden for et eksempel: https://developers.arcgis.com/javascript/latest/add-a-feature-layer/

    // TODO: Legge hente data
    // TODO: Legge til dataen i kartet
    // TODO: Legg til dataen i context

    // Om man ønsker å ha en popup når man trykker på punktene i FeatureLayeret trenger man også å legge
    // inn en popup template i featurelayeret. Denne har vi ferdig definert her.
    const popUpTemplate = new PopupTemplate({
      title: "{name}",
      content: [
        {
          type: "text",
          text: `<p>Type: {tourism}</p>
                  <p>{description}</p>`,
        },
      ],
    });

    // For å kunne vise kartet må dette legges til i et MapView
    // Dokumentasjonen for MapView finnes her:
    // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
    // Koorinater for Trondheimsområdet:
    // ymin: 63.40182257265643,
    // xmin: 10.227928161621094,
    // ymax: 63.453731595863324,
    // xmax: 10.560264587402344
    new MapView({
      // map: ,
      // container: , // Referanse til DOM elementets ID
      // extent:
    }).when(() => {
      // Denne koden kjører når karter er oppe å går
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id="mapDiv" style={{ height: "100%", width: "100%" }}></div>;
};

export default MapComponent;
