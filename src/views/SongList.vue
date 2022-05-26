<template>
  <div class="h-100vh">
    <div class="h-5vh min-h-45px bg-qiyuan flex justify-center relative items-center">
      <!-- <div
        i-ion-moon
        class="w-20px h-20px absolute top-50% -translate-y-50% left-3 rounded-full"
        style="color: #ccff00"
        @click="toggleTheme"
      ></div> -->
      <div
        i-ion-swap-vertical
        class="w-20px h-20px mr-3 rounded-full"
        style="color: #ccff00"
        @click="reverseList"
      ></div>
      <div class="w-200px bg-white rounded-full h-30px flex justify-center">
        <VarStyleProvider :styleVars="{ '--input-placeholder-size': '14px' }">
          <VarInput
            class="w-190px"
            :hint="false"
            :line="false"
            v-model="searchVal"
            placeholder="编号、歌名、歌手搜索"
            clearable
            @keyup.enter="handleSearch('searchBar', searchVal)"
          ></VarInput>
        </VarStyleProvider>
      </div>
      <div
        i-ion-dice-outline
        @click="handleRandom"
        class="w-20px h-20px ml-3 rounded-full"
        style="color: #ccff00"
      ></div>
      <div
        i-ion-menu-outline
        class="w-25px h-25px absolute top-50% -translate-y-50% right-0 rounded-full"
        style="color: #ccff00"
        @click="poupshow = true"
      ></div>
    </div>
    <VarPullRefresh :onRefresh="refresh" :disabled="pullRefreshDisable" v-model="isRefresh">
      <div class="h-94vh" v-bind="containerProps" :style="{ height: vlContainerHeight }">
        <div ref="wrapper" v-bind="wrapperProps">
          <SongListItem
            v-for="item in list"
            :songInfo="item.data"
            :key="item.data.id"
            @itemClick="handleItemClick"
          ></SongListItem>
        </div>
      </div>
    </VarPullRefresh>
  </div>
  <VarPopup position="right" v-model:show="poupshow">
    <div class="w-60vw h-99vh flex justify-center items-center">
      <div>
        <VarSpace direction="column">
          <VarRadio v-model="radioSelected" checked-value="全部">全部</VarRadio>
          <VarChip type="primary">语种</VarChip>
          <VarRadioGroup direction="vertical" v-model="radioSelected">
            <VarRadio v-for="item in languageDict" :checked-value="item.language">{{
              item.language
            }}</VarRadio>
          </VarRadioGroup>
          <VarChip type="primary">曲风</VarChip>
          <VarRadioGroup direction="vertical" v-model="radioSelected">
            <VarRadio v-for="item in keywordDict" :checked-value="item.keyword">{{
              item.keyword
            }}</VarRadio>
          </VarRadioGroup>
        </VarSpace>
      </div>
    </div>
  </VarPopup>
</template>

<script lang="ts" setup>
import SongListItem from '../component/SongListItem.vue'
import type { ISongInfo, ISongLanguage, ISongkeyword } from '../types'
import { requestData } from '../composables'
import dark from '@varlet/ui/es/themes/dark'
import { Snackbar, StyleProvider } from '@varlet/ui'
import { getRandomNum } from '../utils'

let searchVal = ref('')

// computed real pixel from vw and vh , useVirtualList need this

const { width: deviceWidth, height: deviceHeight } = document.documentElement.getClientRects()[0]
const vlContainerHeight = ref(~~((94 * deviceHeight) / 100).toFixed(2))
const vlItemHeight = ref((18.66 * deviceWidth) / 100)

// console.log('container高度：', vlContainerHeight.value, '歌曲信息px：', vlItemHeight.value)

const isRefresh = ref(false)
let pullRefreshDisable = ref(true)
const refresh = () => {
  getSongList()
}

let scrollList = ref<ISongInfo[]>([])
let filterList = ref<ISongInfo[]>([])

const handleSearch = (from: 'searchBar' | 'radio', value: string) => {
  if (value.length === 0 || value == '全部') {
    filterList.value = scrollList.value
  } else {
    let resultList: ISongInfo[] = []
    const searchReg = new RegExp(value, 'i')
    if (from == 'searchBar') {
      scrollList.value.forEach(item => {
        if (searchReg.test(item.displayName!) || searchReg.test(item.singer)) {
          resultList.push(item)
        }
      })
    } else {
      scrollList.value.forEach(item => {
        if (searchReg.test(item.language) || searchReg.test(item.keyword)) {
          resultList.push(item)
        }
      })
    }

    if (resultList.length == 0) {
      filterList.value = [
        {
          original_name: '',
          singer: '',
          displayName: '',
          id: 0,
          isNull: true,
          keyword: '',
          language: '',
        },
      ]
    } else {
      filterList.value = resultList
    }
    scrollTo(0)
  }
}
const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(filterList, {
  itemHeight: vlItemHeight.value,
})
const wrapper = ref<HTMLDivElement>()

const getSongList = async () => {
  isRefresh.value = true
  const data = await requestData('/songlist')
  data.forEach((item: ISongInfo, index: number) => {
    item.displayName = `${index + 1} ${item.original_name}`
  })
  filterList.value = data
  scrollList.value = data
  isRefresh.value = false
}

getSongList()

let poupshow = ref(false)
let radioSelected = ref('全部')
let keywordDict = ref<ISongkeyword[] | []>([])
let languageDict = ref<ISongLanguage[] | []>([])

let currentTheme: any = {
  '--color-primary': '#AA99FF',
}
StyleProvider(currentTheme)
const toggleTheme = () => {
  currentTheme = dark ? currentTheme : dark
  StyleProvider(currentTheme)
}

const reverseList = () => {
  filterList.value = filterList.value.reverse()
  scrollTo(0)
}
const handleRandom = () => {
  filterList.value = [scrollList.value[getRandomNum(0, scrollList.value.length - 1)]]
}

const { isSupported, copy } = useClipboard()
const handleItemClick = (songInfo: ISongInfo) => {
  if (isSupported) {
    copy(`点歌 ${songInfo.original_name} ${songInfo.singer}`)
    Snackbar.success({
      content: '复制成功！去直播间粘贴点歌吧！',
      position: 'bottom',
      duration: 2000,
    })
  } else {
    Snackbar.warning({
      content: '好像浏览器不支持调用剪切板呢，手打一下吧（￣▽￣）',
      position: 'bottom',
      duration: 2000,
    })
  }
}

watch(radioSelected, newVal => {
  handleSearch('radio', newVal)
})
watch(searchVal, newVal => {
  if (newVal.length == 0) {
    filterList.value = scrollList.value
  }
})

onMounted(async () => {
  watchThrottled(
    wrapperProps,
    () => {
      if (wrapperProps.value.style.marginTop === '0px') {
        pullRefreshDisable.value = false
      } else {
        pullRefreshDisable.value = true
      }
    },
    { throttle: 300 }
  )
  keywordDict.value = await requestData('/keywordDict')
  keywordDict.value.sort((a: ISongkeyword, b: ISongkeyword) => a.sortNum - b.sortNum)
  languageDict.value = await requestData('/languageDict')
  languageDict.value.sort((a: ISongLanguage, b: ISongLanguage) => a.sortNum - b.sortNum)
})
</script>
