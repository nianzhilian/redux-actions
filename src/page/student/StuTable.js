import React from 'react'
//只需要运行一次该模块不做任何的导入操作
import './index.css'

class StuTable extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    console.log('student组件挂载完毕')
  }
  render() {
    console.log('stuTable渲染了---',this.props.lists)
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

export default StuTable;