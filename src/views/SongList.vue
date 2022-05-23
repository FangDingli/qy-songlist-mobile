<template>
  <div class="h-100vh">
    <div class="h-5vh min-h-45px bg-qiyuan flex justify-center items-center">
      <div class="w-230px bg-white rounded-full h-30px flex justify-center">
        <VarStyleProvider :styleVars="{ '--input-placeholder-size': '14px' }">
          <VarInput
            class="w-220px"
            :hint="false"
            :line="false"
            v-model="searchVal"
            placeholder="请输入文本"
          ></VarInput>
        </VarStyleProvider>
      </div>
    </div>
    <div class="h-95vh" v-bind="containerProps" :style="{ height: vlContainerHeight }">
      <div v-bind="wrapperProps">
        <SongListItem v-for="item in list" :songInfo="item.data" :key="item.data.id"></SongListItem>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SongListItem from '../component/SongListItem.vue'
let searchVal = ref('')

// computed real pixel from vw and vh , useVirtualList need this

const { width: deviceWidth, height: deviceHeight } = document.documentElement.getClientRects()[0]
const vlContainerHeight = ref(~~((95 * deviceHeight) / 100).toFixed(2))

// 嗷自己好蠢为什么要写下面这行，vw明明是固定值
// const itemRealHeight = ~~((100 / deviceWidth) * 70).toFixed(2) // song info card real vw

const vlItemHeight = ref((18.66 * deviceWidth) / 100)

console.log(
  'header下容器高度：',
  vlContainerHeight.value,
  '歌曲信息vw:',
  18.66,
  '歌曲信息px：',
  vlItemHeight.value
)

let scrollList = ref<any[]>([])

const { list, containerProps, wrapperProps } = useVirtualList(scrollList, {
  itemHeight: vlItemHeight.value,
})
useFetch('./songlist.json')
  .json()
  .then(res => {
    scrollList.value = res.data.value
  })
</script>
