<template>
  <div class="shortcut-icon flex items-center gap-4">
    <div
      title="发表文章"
      class="flex items-center trigger-btn py-10px px-4 rounded-lg cursor-pointer"
      @click="gotoReleaseArticle"
    >
      <MyIcon name="add-three" color="#fff" :size="18"></MyIcon>
      <span class="text-sm ml-2 text-[#fff] relative bottom-1px">写文章</span>
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
