<template>
  <div
    class="h-70px flex justify-between relative song_info_container px-10px"
    v-if="!props.songInfo.isNull"
    v-ripple
    @click="emit('itemClick', props.songInfo)"
  >
    <div class="w-50% flex flex-col min-w-0 justify-center">
      <div class="h-50% flex items-center text-14px">
        <div class="w-100% truncate">
          {{ props.songInfo.displayName }}
        </div>
      </div>
      <div class="h-50% flex items-center text-12px text-gray-500/80">
        {{ props.songInfo.singer }}
      </div>
    </div>
    <div class="w-50% flex flex-col justify-center">
      <div class="h-50% flex justify-end items-center text-12px text-right text-gray-500/80">
        {{ props.songInfo.language }}
      </div>
      <div class="h-50% flex justify-end items-center text-12px text-right text-gray-500/80">
        {{ props.songInfo.keyword }}
      </div>
    </div>
  </div>
  <div v-if="props.songInfo.isNull" text="center gray-800">暂无数据</div>
</template>

<script lang="ts" setup>
import type { ISongInfo } from '../types'
const props = defineProps<{ songInfo: ISongInfo }>()

const emit = defineEmits(['itemClick'])
</script>

<style>
.song_info_container {
  background-color: var(--color-body);
}
.song_info_container:after {
  content: ' ';
  position: absolute;
  box-sizing: border-box;
  pointer-events: none;
  right: 16px;
  left: 16px;
  bottom: 0;
  border-bottom: 1px solid #d6d6d6;
  transform: scaleY(0.5);
}
</style>
