import type { TabItem } from '@/types/type';
import { defineStore } from 'pinia';

export const useTabListStore = defineStore(
  'tabList',
  () => {
    const router = useRouter();
    const visible = ref(true);
    const tabList = ref<TabItem[]>([]);
    const currentTabIndex = ref<number>(0);
    const currentTab = computed(() => tabList.value[currentTabIndex.value]);

    const toggleVisible = (isShow: boolean) => {
      visible.value = isShow;
    };
    const selectTabItem = (ind: number) => {
      router.push({ name: tabList.value[ind].routeName });
      currentTabIndex.value = ind;
    };
    const addTabItem = (item: TabItem) => {
      const pathList = tabList.value.map((el: TabItem) => el.routeName);
      if (!pathList.includes(item.routeName)) {
        tabList.value.push(item);
        currentTabIndex.value = tabList.value.length - 1;
      } else {
        const ind = pathList.findIndex((el: string) => el === item.routeName);
        currentTabIndex.value = ind;
      }
    };

    const setTabItem = (item: TabItem) => {
      const ind = tabList.value.findIndex((el: TabItem) => el.id === item.id);
      if (ind >= 0) {
        tabList.value[ind].name = item.name;
        tabList.value[ind].icon = item.icon;
      }
    };

    const closeTag = (item: TabItem) => {
      const ind = tabList.value.findIndex((el: TabItem) => el.id === item.id);
      tabList.value = tabList.value.filter(
        (el: TabItem) => el.routeName !== item.routeName
      );
      if (tabList.value.length === 0) {
        router.push({ name: 'Home' });
        return;
      }
      if (ind > currentTabIndex.value) return;
      if (
        currentTabIndex.value > ind ||
        currentTabIndex.value === tabList.value.length
      ) {
        currentTabIndex.value -= 1;
      }
      selectTabItem(currentTabIndex.value);
    };

    const closeOtherTag = (item: TabItem) => {
      tabList.value = tabList.value.filter((el) => {
        return el.id === 'Home' || el.id === item.id;
      });
      const ind = tabList.value.findIndex((el: TabItem) => el.id === item.id);
      currentTabIndex.value = ind;
      router.push({ name: item.routeName });
    };

    const closeAfterTag = (item: TabItem) => {
      const pathList = tabList.value.map((el: TabItem) => el.routeName);
      const ind = pathList.findIndex((el: string) => el === item.routeName);
      tabList.value = tabList.value.slice(0, ind + 1);
      currentTabIndex.value = tabList.value.length - 1;
      router.push({ name: item.routeName });
    };

    const closeBeforeTag = (item: TabItem) => {
      const pathList = tabList.value.map((el: TabItem) => el.routeName);
      const index = pathList.findIndex((el: string) => el === item.routeName);
      tabList.value = [tabList.value[0], ...tabList.value.slice(index)];
      const ind = tabList.value.findIndex((el: TabItem) => el.id === item.id);
      currentTabIndex.value = ind;
      router.push({ name: item.routeName });
    };

    const clearTagList = () => {
      currentTabIndex.value = 0;
      tabList.value = [tabList.value[0]];
    };

    return {
      visible,
      toggleVisible,
      tabList,
      currentTab,
      addTabItem,
      currentTabIndex,
      closeTag,
      closeOtherTag,
      closeBeforeTag,
      closeAfterTag,
      selectTabItem,
      clearTagList,
      setTabItem,
    };
  },
  {
    persist: {
      key: 'tabList', // 修改存储的键名，默认为当前 Store 的 id
      storage: window.sessionStorage, // 存储位置修改为 sessionStorage
    },
  }
);
