import dayjs from 'dayjs';
import { ElMessage, ElMessageBox } from 'element-plus';

export const getImg = (baseUrl: string, detailUrl: string) => {
  return new URL(`../../assets/image/${baseUrl}/${detailUrl}`, import.meta.url)
    .href;
};

export const getSvg = (baseUrl: string, detailUrl: string) => {
  return new URL(`../../assets/svg/${baseUrl}/${detailUrl}`, import.meta.url)
    .href;
};

export const fmtTime = (
  time?: Date | number | string,
  fmtStr = 'YYYY-MM-DD HH:mm:ss'
) => {
  return dayjs(time).format(fmtStr);
};

export const dateDiff = (
  hisTime: Date | string | number,
  nowTime = new Date().getTime()
) => {
  const diffValue = nowTime - new Date(hisTime).getTime();
  let result;
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = month * 12;

  const _year = diffValue / year;
  const _month = diffValue / month;
  const _week = diffValue / (7 * day);
  const _day = diffValue / day;
  const _hour = diffValue / hour;
  const _min = diffValue / minute;
  if (_year >= 1) result = fmtTime(hisTime, 'YYYY年MM月DD日');
  else if (_month >= 1) result = Math.floor(_month) + '个月前';
  else if (_week >= 1) result = Math.floor(_week) + '周前';
  else if (_day >= 1) result = Math.floor(_day) + '天前';
  else if (_hour >= 1) result = Math.floor(_hour) + '个小时前';
  else if (_min >= 1) result = Math.floor(_min) + '分钟前';
  else result = '刚刚';
  return result;
};

export const copyClick = (content: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(content);
    ElMessage.success('复制成功');
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = content;
    // 使text area不在viewport，同时设置不可见
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    ElMessage.success('复制成功');
    return new Promise((res: any, rej: any) => {
      // 执行复制命令并移除文本框
      document.execCommand('copy') ? res() : rej();
      textArea.remove();
    });
  }
};

export const confirmHandler = (content: string, cb: () => void) => {
  ElMessageBox.confirm(`${content}，是否继续?`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      cb();
    })
    .catch(() => {
      ElMessage.info('已取消');
    });
};

export const getCookie = (name: string) => {
  let matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\/+^])/g, '\\$&') + '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (key: string, value: string, days = 7) => {
  // 构造过期时间
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }

  // 设置Cookie
  document.cookie = key + '=' + (value || '') + expires + '; path=/';
};

export default {
  getImg,
  dateDiff,
  copyClick,
  getCookie,
  setCookie,
};
