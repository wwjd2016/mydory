import React from 'react';
import TableItem from '../components/tableItem';
import $ from 'jquery';
export default class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      questionList:[],
    }
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions() {
    let self = this;
    $.ajax({
      url: '/questions',
      type: "GET",
      success: function(result) {
        if (result.res_code === 1) {
          self.setState({
            questionList: result.data.questions
          })
        }
      }
    })
  }

  handleMock(id) {
    alert("mock"+id);
  }

  handleEditor(id) {
    console.log(this)
    var editorQuestionArry = this.state.questionList.filter(function(item){
      return item.id == id;
    })
    var content = editorQuestionArry.length === 1 && editorQuestionArry[0].question;
    alert(content)
  }

  handleDelete(id) {
    alert(id)
  }

  render() {
    var self = this;
    let questions = this.state.questionList.map(function(item, index){
      return (
        <TableItem
          key={index}
          itemId={item.id}
          question={item.title}
          mock={item.mock}
          index={index}
          handleMock={self.handleMock.bind(self)}
          handleEditor={self.handleEditor.bind(self)}
          handleDelete={self.handleDelete.bind(self)}
          authorId={item.authorId}
        />
      )
    })
    return (
      <div>
        <div className="listTable">
          <div className="tableHead">
            <div className="number">#</div>
            <div className="question">问题</div>
            <div className="mockNumber">同问数</div>
          </div>
          {questions.length === 0 ? <div className="spaceWord">快去提问题吧，现在木有问题!</div> : questions}
        </div>
      </div>
    )
  }
}