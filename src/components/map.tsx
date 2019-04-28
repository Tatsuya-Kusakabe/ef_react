import { default as React, Component } from 'react';
import { default as styled } from 'styled-components';
import { Url } from '../../utilities/constants';
import { RawRoute, FormattedNode } from '../../utilities/types';
import { Header } from './header';
import { default as MapAction } from '../../flux/actions/map';
import { default as MapStore } from '../../flux/stores/map';

interface Props {}

interface State {
  map: any;
  allRoutes: RawRoute[];
  allNodes: FormattedNode[][];
}

// window.document などした時に怒られないように、window: Window を定義
interface Window {
  document: any;
  google: any;
  googleMapsCallback: any;
}

// window.document などした時に怒られないように、window: Window を定義
declare const window: Window;

export class Map extends Component<Props, State> {
  // 右記参照 (https://stackoverflow.com/questions/48493960/)

  onChangeHandler: () => void;

  constructor(props: Props) {
    super(props);
    this.state = { map: null, allNodes: [], allRoutes: [] };
    this.onChangeHandler = this.onChange.bind(this);
  }

  getStateFromStore() {
    return {
      allRoutes: MapStore.getAllRoutes(),
      allNodes: MapStore.getAllNodes(),
    };
  }

  fetchGoogleMaps() {
    return new Promise((resolve) => {
      // maps javascript api を使用するのに必要な script タグを埋め込む
      // (https://developers.google.com/maps/documentation/javascript/tutorial)
      const script = document.createElement('script');
      script.async = true;
      script.src = Url.googleMaps;
      document.body.appendChild(script);

      // maps javascript api の準備が完了したら、src で定義した関数 googleMapsCallback() を実行可能
      // ** maps javascript api が認識できるように、グローバルスコープに定義
      window.googleMapsCallback = () => {
        // 実行されたら、window.google オブジェクトを返し、再び使用しないように削除
        resolve(window.google);
        delete window.googleMapsCallback;
      };
    });
  }

  initializeGoogleMaps() {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: { lat: 38.4, lng: 138.1 },
    });
    this.setState({ map });
  }

  addPolylinesToGoogleMaps() {
    const { allNodes } = this.state;

    allNodes.forEach((routeChunk: FormattedNode[]) => {
      // 各々の routeChunk に対して node を配置する
      const rawNodes = routeChunk.map((coord: FormattedNode) => {
        return { lat: Number(coord.latitude), lng: Number(coord.longitude) };
      });

      // 各々の routeChunk に対して polyline を引く
      const rawPolylines = new window.google.maps.Polyline({
        path: rawNodes,
        geodesic: true,
        strokeColor: '#404040',
        strokeOpacity: 1.0,
        strokeWeight: 1.5,
      });

      // map に polyline を配置する
      rawPolylines.setMap(this.state.map);
    });
  }

  componentDidMount() {
    MapAction.fetchAllNodes();
    MapAction.fetchAllRoutes();

    this.fetchGoogleMaps().then(google => this.initializeGoogleMaps());

    MapStore.onChange(this.onChangeHandler);
  }

  componentDidUpdate(prevState: State) {
    if (this.state.allNodes.length && this.state.allNodes !== prevState.allNodes) {
      this.addPolylinesToGoogleMaps();
    }

    MapStore.onChange(this.onChangeHandler);
  }

  componentWillUnmount() {
    MapStore.offChange(this.onChangeHandler);
  }

  onChange() {
    this.setState(this.getStateFromStore());
  }

  render() {
    return (
      <Wrapper>
        <Header />
        <GoogleMap id="map" />
      </Wrapper>
    );
  }
}

const Wrapper = styled('div')`
  height: 100vh;
  width: 100vw;
  background-color: rgb(230, 236, 240);
`;

const GoogleMap = styled('div')`
  height: 450px;
  width: 450px;
  top: 20px;
  left: 20px;
`;
