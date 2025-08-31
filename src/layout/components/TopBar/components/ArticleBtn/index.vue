<template>
  <div class="shortcut-icon flex items-center gap-4">
    <div
      title="发表文章"
      class="flex items-center trigger-btn p-2 rounded-lg cursor-pointer"
      @click="gotoReleaseArticle"
    >
      <MyIcon name="pencil" color="#fff" :size="14"></MyIcon>
      <!-- <span class="text-xs ml-2 text-[#fff] relative bottom-1px">发文</span> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
const router = useRouter();
const gotoReleaseArticle = () => {
  router.push({
    name: 'ReleaseArticle',
  });
};
</script>
<style lang="scss" scoped>
.trigger-btn {
  background-color: var(--sys-main-color);
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
}
</style>
