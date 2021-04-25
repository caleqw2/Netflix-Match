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
            choiceThreeID: -1
        }

        this.handleFetchQuestionChoiceInfo = this.handleFetchQuestionChoiceInfo.bind(this);
    }

    // Grab the question title and text from three answer choices
    async handleFetchQuestionChoiceInfo(event) {
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

    async componentDidMount() {
        // Call some function to populate currentQuestion
        this.handleFetchQuestionChoiceInfo(this.state.currentQuestion);
    }

    render() {
        console.log(this.state.choiceOneText);
        return (
            <div>
                <h1>Question {this.state.currentQuestion}</h1>
                <h2>{this.state.questionText}</h2>
                <QuizCard optionText={this.state.choiceOneText}/>
                <QuizCard optionText={this.state.choiceTwoText}/>
                <QuizCard optionText={this.state.choiceThreeText}/>
            </div>
        );
    };
}

export default Quiz;
