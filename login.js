Page({
  data: {
    currentTab: 0
  },
  switchTab(e) {
    const index = Number(e.currentTarget.dataset.index); 
    console.log('点击切换事件触发，目标索引:', index, typeof index);
    this.setData({
      currentTab: index
    }, () => {
      console.log('setData回调：视图应已更新，currentTab:', this.data.currentTab);
    });
  }  
});