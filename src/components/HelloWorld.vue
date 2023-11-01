<template>
	<div id="map" style="width: 100vw; height: 100vh;">
		<!-- <button @click="toggleLayer('jiankong-layer')">jiankong Layer</button>
		<button @click="toggleLayer('shhouse-layer')">shhouse Layer</button>
		<button @click="toggleLayer('subwayline-layer')">上海线路</button>
		<button @click="toggleLayer('subwaypoint-layer')">上海站点</button> -->
	   <div class="map-buttons">
			<button @click="toggleLayer('jiankong-layer')">jiankong Layer</button>
			<button @click="toggleLayer('shhouse-layer')">shhouse Layer</button>
			<button @click="toggleLayer('subwayline-layer')">上海线路</button>
			<button @click="toggleLayer('subwaypoint-layer')">上海站点</button>
		</div>
		<div class="popup" v-if="popupData">
		    <button @click="closePopup">关闭</button>
		    <div>
		      <h3>{{ popupData.name }}</h3>
		      <p>批次: {{ popupData.batch }}</p>
		      <p>产品类型: {{ popupData.productType }}</p>
		      <p>所在区域: {{ popupData.region }}</p>
		      <p>备案均价: {{ popupData.avgPrice }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import  MapboxLanguage  from '@mapbox/mapbox-gl-language';
export default {
  data() {
    return {
      map: null,
	  popupData: null,
    };
  },
  mounted() {
	
    mapboxgl.accessToken = 'pk.eyJ1IjoiaHV3ZW54aWFuZyIsImEiOiJjbGY5MWhoMHAxb2R2NDNvN3l6OG4xMTJxIn0.wIy2Fjk5xWXXXSPY-GQorg';

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/huwenxiang/clmxevjd202pp01qud0maar1y', // 根据需要选择样式
      center: [121.5, 31],
      zoom: 7
    });
	var language = new MapboxLanguage({ defaultLanguage: "zh-Hans" });
	this.map.addControl(language);

    this.map.on('load', () => {
      // 在这里加载数据源和图层
      this.loadGeoJsonData();
    });
  },
  methods: {
	 toggleLayer(layerId) {
		const layer = this.map.getLayer(layerId);
		console.log(layer);
		if (layer) {
		  const visibility = this.map.getLayoutProperty(layerId, 'visibility');
		  console.log(22222);
		  if (visibility === 'none') {
			this.map.setLayoutProperty(layerId, 'visibility', 'visible');
		  } else {
			this.map.setLayoutProperty(layerId, 'visibility', 'none');
		  }
		}
	  },
	  // 当点击地图上的点时触发该方法
	  showPopup(feature) {
		console.log('showPopup called');
	    this.popupData = {
	  	name: feature.properties.项目名称,
	  	batch: feature.properties.批次,
	  	productType: feature.properties.产品类型,
	  	region: feature.properties.所在区域,

		
	  	avgPrice: feature.properties.备案均价,
	    };
		console.log(name);
	  },
	  // 关闭弹窗
	  closePopup() {
	    this.popupData = null;
	  },
	  
    loadGeoJsonData() {
      // 添加 GeoJSON 数据源
      this.map.addSource('jiankong', {
        type: 'geojson',
        data: 'https://api.mapbox.com/datasets/v1/huwenxiang/clmw4v2u014d72lutkuv9lalo/features?access_token=pk.eyJ1IjoiaHV3ZW54aWFuZyIsImEiOiJjbGY5MWhoMHAxb2R2NDNvN3l6OG4xMTJxIn0.wIy2Fjk5xWXXXSPY-GQorg'
      });
	  
	  this.map.addSource('shhouse', {
	    type: 'geojson',
	    data: 'https://api.mapbox.com/datasets/v1/huwenxiang/cl8fzjzg70azd21mi4tdlv8fv/features?access_token=pk.eyJ1IjoiaHV3ZW54aWFuZyIsImEiOiJjbGY5MWhoMHAxb2R2NDNvN3l6OG4xMTJxIn0.wIy2Fjk5xWXXXSPY-GQorg'
	  });

	  this.map.addSource('subwayline', {
	    type: 'geojson',
	    data: 'https://api.mapbox.com/datasets/v1/huwenxiang/clnq3td3v1voq2ooq9bbdcjcb/features?access_token=pk.eyJ1IjoiaHV3ZW54aWFuZyIsImEiOiJjbGY5MWhoMHAxb2R2NDNvN3l6OG4xMTJxIn0.wIy2Fjk5xWXXXSPY-GQorg'
	  });
	  this.map.addSource('subwaypoint', {
	    type: 'geojson',
	    data: 'https://api.mapbox.com/datasets/v1/huwenxiang/clnq3s1my3lmf2co2eb5cyubt/features?access_token=pk.eyJ1IjoiaHV3ZW54aWFuZyIsImEiOiJjbGY5MWhoMHAxb2R2NDNvN3l6OG4xMTJxIn0.wIy2Fjk5xWXXXSPY-GQorg'
	  });
      // 添加图层
      this.map.addLayer({
        'id': 'jiankong-layer',
        'type': 'circle',
        'source': 'jiankong',
        'paint': {
          'circle-radius': 3,
          'circle-color': '#00f600'
        }
      });
	  // 添加图层
	  this.map.addLayer({
	    'id': 'shhouse-layer',
	    'type': 'circle',
	    'source': 'shhouse',
	    'paint': {
	      'circle-radius': 3,
	      'circle-color': '#ff0000'
	    }
	  });
	  this.map.addLayer({
	    'id': 'subwaypoint-layer',
	    'type': 'circle',
	    'source': 'subwaypoint',
	    'paint': {
	      'circle-radius': 3,
	      'circle-color': '#0000ff'
	    }
	  });
	  this.map.addLayer({
	    'id': 'subwaypoint-label-layer',
	    'type': 'symbol',
	    'source': 'subwaypoint',
	    'layout': {
	      'text-field': ['get', 'name'],
	      'text-size': 12,
	      'text-offset': [0, 0],
	      'text-anchor': 'center'
	    },
	    'paint': {
	      'text-color': '#000000'
	    },
		'minzoom': 10  // 这里设置缩放级别为10

	  });
	this.map.addLayer({
	  'id': 'subwayline-layer',
	  'type': 'line',
	  'source': 'subwayline',
	  'paint': {
		'line-width': 2,
		'line-color': [
		  'match',
		  ['get', 'LineName'],
		  '地铁1号线', '#bcf7d8',  // 当 linename 为 'line2' 时，线的颜色为绿色
		  '地铁2号线', '#00fdd8',  // 当 linename 为 'line2' 时，线的颜色为绿色
		  '地铁3号线', '#21ff06',  // 当 linename 为 'line2' 时，线的颜色为绿色
		  '地铁4号线', '#fc02ff',  // 当 linename 为 'line2' 时，线的颜色为绿色
		  '地铁5号线', '#fd8008',  // 当 linename 为 'line2' 时，线的颜色为绿色
		  '地铁6号线', '#800080',  // 当 linename 为 'line2' 时，线的颜色为绿色
		  '地铁7号线', '#fc0107',  // 当 linename 为 'line2' 时，线的颜色为绿色
		  '地铁8号线', '#ffff0a',  // 当 linename 为 'line2' 时，线的颜色为绿色
		  '地铁9号线', '#ffffff',  // 当 linename 为 'line2' 时，线的颜色为绿色
		  '地铁10号线', '#000000',  // 当 linename 为 'line2' 时，线的颜色为绿色
		  '地铁11号线', '#996633',  // 当 linename 为 'line1' 时，线的颜色为红色
		  '地铁12号线', '#00FF00',  // 当 linename 为 'line2' 时，线的颜色为绿色
		  '#0000FF'           // 默认线的颜色为蓝色
		]
	  }
	});
	
	// 添加点击事件处理函数
	this.map.on('click', 'shhouse-layer', (e) => {
	  console.log('Clicked feature:', e.features[0]);
	  const feature = e.features[0];
	  this.showPopup(feature);
	  console.log('popupData:', this.popupData);

	});
	
    }
  }
};

</script>

<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}

button {
/*  margin: 5vw;
  padding: 5vw 5vw; */
  width: 100px;
  height: 30px;
  font-size: 15px;
  background-color: #007BFF;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.map-buttons {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1; /* 使按钮位于地图上方 */
}

.map-buttons button {
    margin-right: 10px;
}


.popup {
    position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    z-index: 2;
}

.popup h3 {
    font-size: 16px;
    margin-bottom: 5px;
}

.popup p {
    font-size: 14px;
    margin: 5px 0;
}
</style>
