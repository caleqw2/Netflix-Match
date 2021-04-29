import React, { useState, useEffect, useContext, Component } from 'react';
import { Container, Row, Col } from 'react-grid';
import '../App.css';
import NavigationBar from './NavigationBar.js';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class QuizCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    render() {
        return (
            <div className='info-block'>
                <h2>{this.props.optionText}</h2>
            </div>
        );
    }
}

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentQuestion: 1,
            questionText: 'Placeholder',
            choiceOneText: '',
            choiceTwoText: '',
            choiceThreeText: '',
            choiceOneID: -1,
            choiceTwoID: -1,
            choiceThreeID: -1,
            quizChoices: "",
            resultsString: ""
        }

        this.handleFetchQuestionChoiceInfo = this.handleFetchQuestionChoiceInfo.bind(this);
        this.optionOneClicked = this.optionOneClicked.bind(this);
        this.optionTwoClicked = this.optionTwoClicked.bind(this);
        this.optionThreeClicked = this.optionThreeClicked.bind(this);
        this.getResults = this.getResults.bind(this);
    }

    // Grab the question title and text from three answer choices
    handleFetchQuestionChoiceInfo(event) {
        const url = `/get_question_info/${this.state.currentQuestion}`
        fetch(url).then(res => res.json()).then(data => {
            this.setState({
                questionText: data.questionText,
                choiceOneText: data.choiceOneText,
                choiceTwoText: data.choiceTwoText,
                choiceThreeText: data.choiceThreeText,
                choiceOneID: data.choiceOneID,
                choiceTwoID: data.choiceTwoID,
                choiceThreeID: data.choiceThreeID
            });
        });
    }

    optionOneClicked() {
        console.log("one");

        let choicesArray = this.state.quizChoices;
        choicesArray = choicesArray.concat(this.state.choiceOneID.toString());
        this.setState({quizChoices: choicesArray});

        let questionNum = this.state.currentQuestion;
        this.setState({currentQuestion: questionNum + 1});

        this.handleFetchQuestionChoiceInfo(this.state.currentQuestion);
    }

    optionTwoClicked() {
        console.log("two");

        let choicesArray = this.state.quizChoices;
        choicesArray = choicesArray.concat(this.state.choiceTwoID.toString());
        this.setState({quizChoices: choicesArray});

        let questionNum = this.state.currentQuestion;
        this.setState({currentQuestion: questionNum + 1});

        this.handleFetchQuestionChoiceInfo(this.state.currentQuestion);
    }

    optionThreeClicked() {
        console.log("three");

        let choicesArray = this.state.quizChoices;
        choicesArray = choicesArray.concat(this.state.choiceThreeID.toString());
        this.setState({quizChoices: choicesArray});

        let questionNum = this.state.currentQuestion;
        this.setState({currentQuestion: questionNum + 1});

        this.handleFetchQuestionChoiceInfo(this.state.currentQuestion);
    }

    getResults() {
        const url = `/get_results/${this.state.quizChoices}`
        fetch(url).then(res => res.json()).then(data => {
            this.setState({
                resultsString: data.result
            });
        });
    }

    componentDidMount() {
        // Call some function to populate currentQuestion
        this.handleFetchQuestionChoiceInfo(this.state.currentQuestion);
    }

    render() {
        if (this.state.currentQuestion > 7) {
            return (

                <div>
                    <button onClick={this.getResults}>Submit</button>
                    
                    <h1>Results here:</h1>

                    <pre>{this.state.resultsString}</pre>

                </div>

                // <div style={{height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                //     <Link to="/Results" className="btn btn-primary">Submit</Link>
                // </div>
            );
        } else {
            return (
                <div>
                    <h1>Question {this.state.currentQuestion}</h1>
                    <h2>{this.state.questionText}</h2>
                    
                    <div onClick={this.optionOneClicked}>
                        <QuizCard optionText={this.state.choiceOneText}/>
                    </div>
    
                    <div onClick={this.optionTwoClicked}>
                        <QuizCard optionText={this.state.choiceTwoText}/>
                    </div>
    
                    <div onClick={this.optionThreeClicked}>
                        <QuizCard optionText={this.state.choiceThreeText}/>
                    </div>
                </div>
            );

        }
    };
}

export default Quiz;
