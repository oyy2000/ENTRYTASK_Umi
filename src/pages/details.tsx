import { useEffect, useState } from 'react';
import styles from './index.less';
import { BASE_URL, _fetch } from '../utils/consts.js';
import { history } from 'umi';

// history 栈里的实体个数
console.log(history.length);

// 当前 history 跳转的 action，有 PUSH、REPLACE 和 POP 三种类型
console.log(history.action);

// location 对象，包含 pathname、search 和 hash
console.log(history.location.pathname);
console.log(history.location.search);
console.log(history.location.hash);

export default function Details() {
  const [event, setEvent] = useState([]);
  function handleClick() {
    _fetch(BASE_URL + '/events/1')
      .then((data) => {
        console.log(data);
        setEvent(data.event);
      })
      .catch((e) => console.log('错误:', e));
  }
  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Login index</h1>
      <input
        type="button"
        value="点击 http-get 方式获取数据"
        onClickCapture={handleClick}
      />
      <ul>{event.name}</ul>
    </div>
  );
}
