import React, { useState, useEffect, useMemo, useRef } from "react";
import qs from "query-string";
import useRequest from "../../hook/useRequest";
import Pager from "../../components/Pager";
//只运行一次该模块不做任何的导入
import './index.css'
class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    //自己的状态
    const obj = {
      packType: -1,
    };
    //合并默认的状态形成一个最新状态

    this.state = Object.assign({}, obj, props.defaultValue);
    this.radioChange = this.radioChange.bind(this);
  }
  //这种写法挂载到对象的实例属性上面
  handleSearch = () => {
    this.props.onSearch && this.props.onSearch(this.state);
  };
  //这种写法是挂载到对象的原型链上的
  radioChange(e) {
    console.log(e.target.value);
    this.setState({
      packType: +e.target.value,
    });
  }
  //这种写法是挂载到对象的原型链上的
  render() {
    return (
      <div className="search">
        <label>
          <input
            checked={this.state.packType == -1}
            type="radio"
            name="packType"
            onChange={this.radioChange}
            value={-1}
          />
          全部
        </label>
        <label>
          <input
            checked={this.state.packType == 1}
            type="radio"
            name="packType"
            onChange={this.radioChange}
            value={1}
          />
          线下
        </label>
        <label>
          <input
            checked={this.state.packType == 2}
            type="radio"
            name="packType"
            onChange={this.radioChange}
            value={2}
          />
          线上
        </label>
        <button onClick={this.handleSearch}>搜索</button>
      </div>
    );
  }
}

function getQuery(conf) {
  const def = {
    packType: -1,
    current: 1,
    pageSize: 15,
    type: 4,
  };
  const config = { ...def, ...conf };
  if(config.packType == -1){
    delete config.packType;
  }
  return config;
}

class StuTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const trs = this.props.lists.map((item) => (
      <tr key={item.logId}>
        <td>{item.fileName}</td>
        <td>{item.packType == 1?'线下':'线上'}</td>
        <td>{item.customizeTypeName}</td>
        <td>{item.filePath}</td>
        <td>{item.handleName}</td>
        <td>{item.handleTime}</td>
        <td>
          <a href={`/students/${item.packType}`}>详情</a>
        </td>
      </tr>
    ));
    return (
      <table className="table">
        <thead>
          <tr>
            <th>名称</th>
            <th>包模式</th>
            <th>项目名称</th>
            <th>路径</th>
            <th>操作人</th>
            <th>操作时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>{trs}</tbody>
      </table>
    );
  }
}

export default function (props) {
  // const query = useMemo(() => {
  //   const res = getQuery(props.location.search);
  //   return res;
  // }, [props.location.search]);
  //只在首次渲染的时候初始化状态一次  后续渲染不会执行
  const [params,setParams] = useState(()=>getQuery({packType:-1}))

  const queryConfig = useMemo(
    () => {
      console.log('有变化会重新计算值')
      return {
        url: "/api/log/findLogList",
        method: "POST",
        data: {},
        config: {},
        immediate: false, // 首次渲染自动请求
      }
    },
    []
  );
  const { fetchData, loading, rdata, error } = useRequest(queryConfig);
  console.log(rdata)
  useEffect(() => {
    fetchData({data:params})
  }, [fetchData]);
  return (
    <div>
      <SearchForm
        defaultValue={{
          packType: params?.packType ?? -1,
        }}
        onSearch={(conf) => {
          const newConfig = {
            ...params,
            ...conf,
            current:1
          }
          if(newConfig.packType == -1){
            delete newConfig.packType
          }
          setParams(newConfig);
          fetchData({data:newConfig})
          // const locationPath = qs.stringify(conf);
          // //改变地址
          // props.history.push('?'+locationPath)
        }}
      />
      {loading && <div>正在加载</div>}
      {error && <div>加载错误请重试</div>}
      <StuTable lists={rdata?.dataMain?.list ?? []} />
      <Pager 
      current={params.current}
      pageSize={params.pageSize}
      panelNumber={15}
      total={rdata?.dataMain?.pagination?.total ?? 0}
      onPageChange={(page)=>{
        const newConf = {
          ...params,
          current:page
        }
        setParams(newConf);
        fetchData({data:newConf})
      }}
      />
    </div>
  );
}
