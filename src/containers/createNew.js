import React from 'react';
import $ from 'jquery';

export default class CreateNew extends React.Component {

  constructor(props) {
    super(props);
    this.state={}
  }

  submitQuestion() {
    var question = this.refs.quetionDetails.value;
    var self = this;
    $.ajax({
      url:'/quertion/create',
      type:"POST",
      data: {
        question: question,
        userId: self.props.userId
      },
      success: function(result) {
        alert(result.msg)
      }
    })
  }
  render() {
    return (
      <div className="createNew">
        <p>问题：</p>
        <textarea ref="quetionDetails" />
        <p><button onClick={this.submitQuestion.bind(this)}>提交</button></p>
      </div>
    )
  }
}