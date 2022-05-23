<template>
  <div class="h-70px flex justify-between relative song_info_container px-10px" v-ripple>
    <div class="w-50% flex flex-col min-w-0 justify-center">
      <div class="h-50% flex items-center text-14px">
        <div class="w-100% truncate">
          {{ props.songInfo.original_name }}
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
</template>

<script lang="ts" setup>
const props = defineProps<{ songInfo: any }>()
</script>

<style>
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
