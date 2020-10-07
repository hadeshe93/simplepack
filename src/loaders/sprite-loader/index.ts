import { runLoaders } from 'loader-runner';
import Spritesmith from 'spritesmith';

export default function(source) {
  const callback = this.async();
  const querySpriteRegx = /url\((\S*)\?__sprite=(\S*)&?\)/g;

  // 查找所有匹配的路径

  // 路径汇总到一个缓存对象中，每个对象有个 key，对应合成雪碧图的 id

  // 合成雪碧图进行输出

  // 利用合成的 result 的坐标，对 css 代码进行替换

  callback(null, source);
};