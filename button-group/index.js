
import { buttonGroup, loadStyle } from './button-group.js'
loadStyle()

/**
 * 使用:
 *  js:new buttonGroup(config)
 *  html:<button-group data-name=name>
 *      <button-group-item></button-group-item>
 *  </button-group>
 * 可配置参数如下：
 *  interface config:object{
 *      name:string
 *      size?:string='normal'||'small'||'big'||'large'
 *      title?:string[]=[]
 *      isMultiple?:boolean=true||false
 *      handleClick?:function = ()=>{}
 *  }
 */
export default buttonGroup