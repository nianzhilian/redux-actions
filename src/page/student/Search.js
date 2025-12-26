import React from "react";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    const obj = {
        packType:-1
    }
    this.state = Object.assign({},obj,this.props.defaultValue)
    this.radioChange = this.radioChange.bind(this)
  }
  //这种写法是实例方法
  handleSearch = ()=>{
    this.props.onSearch && this.props.onSearch(this.state);
  }
  radioChange(e){
    const value = e.target.value;
    this.setState((prevState)=>({
      ...prevState,
      packType:+value
    }))
    this.props.onChange && this.props.onChange(+value);
  }
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
