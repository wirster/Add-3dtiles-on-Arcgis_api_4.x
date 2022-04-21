### Add-3dtiles-on-Arcgis_api_4.x ##
实现在Arcgis_js_api 4.23中加载3dTiles服务的简单封装

### 相关文档

[deck.gl(tile-3d-layer)](https://deck.gl/docs/api-reference/geo-layers/tile-3d-layer). deck.gl叠加3dtiles。

[Arcgis_js_api(externalRenderers)](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-3d-externalRenderers.html).Arcgis_js_api 使用externalRenderers实现自定义webgl可视化

[loaders.gl(tiles-3d-loader)](https://loaders.gl/modules/3d-tiles/docs/api-reference/tiles-3d-loader). deckgl中调用的3dtiles解析器

### Usage ###

```javascript
import DeckLoader from './deckglLoader'

// init
const deckglLoader = new DeckLoader(view)

// 叠加服务
deckglLoader.add3DtilesLayer([{ id: '1', url: 'http://地址/tileset.json' }])
//调整灯光
deckglLoader.changeLayerLight({color: [255, 255, 255],intensity: 3})
//移除全部图层
deckglLoader.removeAll()
//销毁释放
deckglLoader.destroy();

```

##### 备注
初始化arcgis SceneView 需要使用 local模式
即 SceneView.viewingMode='local';
