/**
 * class deck_loader
 * 使用Deck.gl加载3dTiles
 */
import { AmbientLight, LightingEffect } from '@deck.gl/core'
import { DeckRenderer } from '@deck.gl/arcgis'
import { Tile3DLayer } from '@deck.gl/geo-layers'
import { Tiles3DLoader } from '@loaders.gl/3d-tiles'
import * as externalRenderers from '@arcgis/core/views/3d/externalRenderers'

export default class DeckLoader {
  constructor (sceneView) {
    this.view = sceneView// esri map sceneview
    this.renderer = new DeckRenderer(sceneView, {}) // Deckgl Renderer
    this.renderer.deck.layers = []// 初始化layers
    // 渲染到sceneView
    externalRenderers.add(this.view, this.renderer)
  }

  /**
   * @description: 加载3dtiles图层
   * @param {参数} array layerOptions 图层选项 id:服务id,url:服务地址
   */
  add3DtilesLayer (layerOptions) {
    const layers = this.renderer.deck.layers
    // 新增3dtiles图层到layer
    layerOptions.forEach(layerOption => {
      layers.push(
        new Tile3DLayer({
          id: layerOption.id,
          data: layerOption.url,
          loader: Tiles3DLoader,
          loadOptions: {
            '3d-tiles': {
              isTileset: true
            }
          }
          // pickable:true, // 允许发生拾取事件
          // onClick:({object, x, y}) => {
          //   console.log(object,x,y)
          // },
          // onHover:({object, x, y}) => {
          //   console.log(object,x,y)
          // }
        })
      )
    })
    this.renderer.deck.set({
      layers: layers
      // pickingRadius: 5
    })
  }

  /**
   * @description: 调整场景光照颜色亮度
   * @param {参数}  Object options  {color: [255, 255, 255],intensity: 1}
   */
  changeLayerLight (options) {
    // 调整图层亮度
    const ambientLight = new AmbientLight({
      color: options.color,
      intensity: options.intensity
    })
    this.renderer.deck.effects = [new LightingEffect([ambientLight])]
  }

  /**
   * @description: 移除所有图层
   */
  removeAll () {
    this.renderer.deck.set({
      layers: []
    })
  }
  /**
   * @description: 销毁释放
   */
   destroy(){
    externalRenderers.remove(this.view, this.renderer)
    this.renderer.dispose();
  }
}
