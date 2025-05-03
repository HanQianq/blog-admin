<template>
  <div class="shortcut-icon flex items-center gap-4">
    <div
      class="flex flex-col items-center hover-text"
      @click="gotoReleaseArticle"
    >
      <MyIcon
        name="file-editing"
        :size="18"
        class="mb-1"
        title="发表文章"
      ></MyIcon>
      <span class="text-xs">发表文章</span>
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
<style lang="scss" scoped></style>
