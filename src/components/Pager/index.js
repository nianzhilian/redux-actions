import React, { useCallback } from "react";
//只运行一次该模块不做任何的导入
import "./index.css";

function toPage(page, props) {
  //如果处在当前页在点击啥也不做
  if (props.current == page) {
    return;
  }
  props.onPageChange && props.onPageChange(page);
}

function getPageNum(props) {
  return Math.ceil(props.total / props.pageSize);
}
//获取最小页码
function getMin(props) {
  let min = props.current - Math.floor(props.panelNumber / 2);
  if (min < 1) {
    min = 1;
  }
  return min;
}

//获取最大页码
function getMax(min, totalPage, props) {
  let max = min + props.panelNumber - 1;
  if (max > totalPage) {
    max = totalPage;
  }
  return max;
}

function Pager(props) {
  const pageNum = getPageNum(props);
  if (pageNum == 0) {
    return null;
  }
  const pages = [];
  const min = getMin(props);
  const max = getMax(min, pageNum, props);
  for (let i = min; i <= max; i++) {
    pages.push(
      <a
        key={i}
        className={props.current == i ? "item active" : "item"}
        onClick={() => {
          toPage(i, props);
        }}
      >
        {i}
      </a>
    );
  }
  return (
    <div className="pager">
      <a
        className={props.current == 1 ? "item disabled" : "item"}
        onClick={() => {
          toPage(1, props);
        }}
      >
        首页
      </a>
      <a
        className={props.current == 1 ? "item disabled" : "item"}
        onClick={() => {
          toPage(props.current - 1 < 1 ? 1 : props.current - 1, props);
        }}
      >
        上一页
      </a>
      {pages}
      <a
        className={props.current == pageNum ? "item disabled" : "item"}
        onClick={() => {
          toPage(
            props.current + 1 > pageNum ? pageNum : props.current + 1,
            props
          );
        }}
      >
        下一页
      </a>
      <a
        className={props.current == pageNum ? "item disabled" : "item"}
        onClick={() => {
          toPage(pageNum, props);
        }}
      >
        尾页
      </a>
      <span>
        当前页：{props.current} / {pageNum}
      </span>
    </div>
  );
}

export default Pager;
