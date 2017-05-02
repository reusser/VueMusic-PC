<template>
  <div class="shadow" v-if="showAbout" @click="$store.commit('setShowAbout'), false">
    <div class="aboutme" @click.stop="">
    <header>
      <div class="nick-name">
        <p>oyh</p>
        <p>Reusjs</p>
        <p class="introduction">Front-End Learner</p>
      </div>
      <div class="detail">
        <div class="edu">
          <p><span class="right">姓名：</span>&nbsp;&nbsp;欧阳浩</p>
          <p><span class="right">性别：</span>&nbsp;&nbsp;男</p>
          <p><span class="right">学历：</span>&nbsp;&nbsp;本科</p>
          <p><span class="right">专业：</span>&nbsp;&nbsp;软件工程</p>
          <p><span class="right">所在院校：</span>&nbsp;&nbsp;东华理工大学</p>
          <p><span class="right">毕业时间：</span>&nbsp;&nbsp;2018年6月</p>
        </div>
        <div class="social">
          <p><span class="right">QQ：</span>&nbsp;&nbsp;919917215</p>
          <p><span class="right">Email：</span>&nbsp;&nbsp;reusserjs@gmail.com</p>
          <p><span class="right">个人博客：</span>&nbsp;&nbsp;<a href="http://oyhfe.com" target="_blank">oyhfe.com</a></p>
        </div>
      </div>
    </header>
    <div class="content">
      <p class="title">求职意向</p>
      <ul>
        <li>前端开发</li>
      </ul>
      <p class="title">技能清单</p>
      <ul class="skill">
        <li class="fe">前端部分
          <ul>
            <li>熟悉html css JavaScript(ES6)</li>
            <li>了解scss Vue.js 前端自动化工具(gulp webpack) git</li>
            <li>具备前后端分离思想, 有过前端渲染经验</li>
          </ul>
        </li>
        <li class="be">后端部分
          <ul>
            <li>了解 node.js express mongodb</li>
            <li>了解服务端渲染 有过服务端渲染模板的经验</li>
          </ul>
        </li>
      </ul>
      <p class="title">项目经验</p>
      <ol>
        <li>Vue.js高还原PC端网易云客户端
          <ul>
            <li>前端使用了Vue全家桶 Vue.js+ Vue router + Vuex 样式部分使用了Scss 使用了axios + Promise处理前端异步请求</li>
            <li>独立制作了轮播 滑块 歌词 分页等可复用组件</li>
            <li>后端使用了express做代理 通过CORS解决跨域问题</li>
            <li>项目地址：<a href="https://github.com/Reusjs/VueMusic-PC" target="_blank">https://github.com/Reusjs/VueMusic-PC</a></li>
            <li>预览地址：<a href="http://oyhfe.com/VueMusic" target="_blank">oyhfe.com/VueMusic</a></li>
          </ul>
          
        </li>
        <li>完成了2016年百度前端学院前50个任务（共52个任务）
          <ol>
            <li>任务50：使用Vuejs制作一个简易问卷平台
              <ul>
                <li>使用了Vue + Vue router + scss完成前端部分</li>
                <li>使用了localStorage存储数据</li>
                <li>项目地址：<a href="https://github.com/Reusjs/QuestionnairePlatform" target="_blank">https://github.com/Reusjs/QuestionnairePlatform</a></li>
                <li>预览地址：<a href="https://reusjs.github.io/QuestionnairePlatform/" target="_blank">https://reusjs.github.io/QuestionnairePlatform/</a></li>
              </ul>
            </li>
            <li>任务43 ~ 45：瀑布流、木桶、拼图布局的实现
              <ul>
                <li>项目地址：<a href="https://github.com/Reusjs/layout" target="_blank">https://github.com/Reusjs/layout</a></li>
                <li>预览地址：<a href="https://reusjs.github.io/layout/puzzle/task43.html" target="_blank">拼图布局</a><a href="https://reusjs.github.io/layout/barrel/task45.html" target="_blank">木桶布局</a><a href="https://reusjs.github.io/layout/waterfall/task44.html" target="_blank">瀑布流布局</a></li>
              </ul>
            </li>
            <li>任务40 ~ 42：日历组件的实现
              <ul>
                <li>使用了Vue.js制作日历组件</li>
                <li>项目地址： <a href="https://github.com/Reusjs/calendar-plugin" target="_blank">https://github.com/Reusjs/calendar-plugin</a></li>
                <li>预览地址：<a href="https://reusjs.github.io/calendar-plugin/#/" target="_blank">https://reusjs.github.io/calendar-plugin</a></li>
              </ul>
            </li>
            <li>任务33 ~ 36：听指令的小方块
              <ul>
                <li>使用了ES6完成任务</li>
                <li>使用了简单的A*算法完成简易的自动寻路功能</li>
                <li>模块化开发，尽量进行了解耦</li>
                <li>项目地址：<a href="https://github.com/Reusjs/ife2016_task33_4" target="_blank">https://github.com/Reusjs/ife2016_task33_4</a></li>
                <li>预览地址：<a href="https://reusjs.github.io/ife2016_task33_4/task33.html" target="_blank">https://reusjs.github.io/ife2016_task33_4/task33.html</a></li>
              </ul>
            </li>
            <li>任务29 ~ 32：简易表单工厂的实现
              <ul>
                <li>使用了ES6完成任务</li>
                <li>处理了较为复杂的逻辑与交互</li>
                <li>模块化开发，尽量解耦降低耦合度</li>
                <li>项目地址：<a href="https://github.com/Reusjs/ife2016_task_32" target="_blank">https://github.com/Reusjs/ife2016_task_32</a></li>
                <li>预览地址：<a href="https://reusjs.github.io/ife2016_task_32/" target="_blank">https://reusjs.github.io/ife2016_task_32/</a></li>
              </ul>
            </li>
            <li>任务13 ~ 27
              <ul>
                <li>全部使用原生js(ES5,ES6)完成</li>
                <li>通过大量的任务练习加强了对原生JavaScript的理解与熟练程度</li>
                <li>部分项目使用了单例模式，工厂模式，观察者模式(发布/订阅模式)</li>
              </ul>
            </li>
          </ol>
        </li>
      </ol>
      <p class="title">其他属性</p>
      <ul class="other">
        <li>github活跃用户 我的github：<a href="https://github.com/Reusjs" target="_blank">https://github.com/Reusjs</a></li>
        <li>技术社区活跃用户</li>
        <li>我的掘金首页：<a href="https://juejin.im/user/5789d4972e958a00541fb277" target="_blank">https://juejin.im/user/5789d4972e958a00541fb277</a></li>
        <li>我的segmentfault个人专栏：<a href="https://segmentfault.com/blog/oyh" target="_blank">https://segmentfault.com/blog/oyh</a></li>
        <li>重度代码洁癖 注意代码规范</li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'aboutme',
  computed: {
    showAbout() {
      return this.$store.state.showAbout
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.shadow {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 6rem 0;
  background: rgba(0, 0, 0, .8);
  z-index: 9999;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #e1e1e2;
    &:hover {
      background-color: #cfcfd1;
    }
  }
}
.aboutme {
  width: 650px;
  margin: 0 auto;
  border: 1px solid #000;
  header {
    display: flex;
    padding: 20px;
    flex-flow: row nowrap;
    align-items: center;
    color: #e4e4e4;
    background-color: #243745;
    .nick-name {
      padding-right: 20px;
      margin-right: 30px;
      color: #e4e4e4;
      font-size: 30px;
      font-style: italic;
      text-align: right;
      border-right: 5px solid #7aae9b;
      .introduction {
        font-size: 16px;
        color: #dedede;
      }
    }
    .detail {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      flex-grow: 1;
      font-size: 13px;
      .right {
        display:  inline-block; 
        width:  70px;
        text-align: right;  
      }
      a {
        color: #e4e4e4;
      }
    }
  }
  .content {
    padding: 30px 20px;
    margin: 0 auto;
    background-color: #fff;
    .title {
      padding-bottom: 10px;
      font-size: 18px;
      border-bottom: 1px solid #7aae9b;
    }
    ul,
    ol {
      padding-left: 30px;
      margin-top: 20px;
      margin-bottom: 30px;
      color: #666;
      ul,
      ol {
        font-size: 13px;
      }
    }
    .skill {
      list-style: none;
      ul {
        font-size: 13px;
      }
    }
    .other {
      font-size: 13px;
    }
    li {
      margin: .5rem 0;
    }
  }
}
@media screen and (max-width: 600px) {
  .aboutme {
    width: 100%;
    header {
      padding: 20px 0;
      .nick-name {
        display: none;
      }
      .detail {
        display: flex;
        padding-left: 20px;
        margin-left: 20px;
        border-left: 5px solid #7aae9b;
        .social {
          margin-top: 20px;
        }
      }
    }
    .content {
      ol ol,
      ol ul {
        padding-left: 0;
        ul {
          padding-left: 0;
        }
      }
    }
  }
}
@media screen and (max-width: 400px) {
  .aboutme {
    width: 100%;
    header {
      padding: 20px 0;
      .nick-name {
        display: none;
      }
      .detail {
        display: block;
        padding-left: 20px;
        margin-left: 20px;
        border-left: 5px solid #7aae9b;
        .social {
          margin-top: 20px;
        }
      }
    }
    .content {
      ol ol,
      ol ul {
        padding-left: 0;
        ul {
          padding-left: 0;
        }
      }
    }
  }
}
</style>
