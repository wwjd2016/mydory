import React from 'react';

export default class TableItem extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      canMock: true
    }
  }

  handleClick(id) {
    this.props.handleMock(id);
    this.setState({
      canMock: !this.state.canMock
    })
  }

  editorHandler(id) {
    this.props.handleEditor(id)
  }

  deleteHandler(id) {
    this.props.handleDelete(id)
  }

  render() {
    return (
      <div className="tableItem">
          <div className="number">{this.props.index+1}</div>
          <div className="question">
            {this.props.question}
            <a href="javascript:void(0)" onClick={this.editorHandler.bind(this, this.props.itemId)} className="editor">编辑</a>
            <a href="javascript:void(0)" onClick={this.deleteHandler.bind(this, this.props.itemId)} className="delete">删除</a>
          </div>
          <div className="mockNumber" name={this.props.authorId}>
            {this.props.mock}
            <span className="clickMock" onClick={this.handleClick.bind(this, this.props.itemId)}>{this.state.canMock?"赞":"取消赞"}</span>
          </div>
        </div>
    )
  }
}