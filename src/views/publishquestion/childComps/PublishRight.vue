<template>
    <div id="publish-right">
      <div class="publish-right">
        <h4>问题发起指南</h4>
        <br>
        • <kbd>问题标题</kbd>: 请用精简的语言描述您发布的问题，不超过25字
        <br><br>
        • <kbd>问题补充</kbd>: 详细补充您的问题内容，并确保问题描述清晰直观, 并提供一些相关的资料
        <br><br>
        • <kbd>添加标签</kbd>: 输入一个或者多个合适的标签，不超过10个字，分别以 <code>,</code> 隔开
      </div>
    </div>
</template>

<script>
    export default {
        name: "PublishRight"
    }
</script>

<style scoped>
  .publish-right {
    padding: 30px 15px;
  }
</style>
