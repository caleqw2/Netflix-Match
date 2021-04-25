import React,{useState, useEffect,useContext, Component} from 'react';
import { Container, Row, Col } from 'react-grid';
import '../App.css';
import NavigationBar from './components/NavigationBar.js';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class QuizCard extends Component {
    render() {
        const TITLE = 'My Page Title';
    
        return (
      
<div className='info-block'> 
    <div className='info-header'>
        
    </div>
    
    <div className='post1text'>
      <Link to="/Home">
        <strong>Mike Jones:</strong>
        Just received my SAP iXp swag! Can't wait to wear this 
        when I go back to school. Thank you SAP!!
      </Link>
    </div>
</div>
    );
}}

class Quiz extends Component {
    render() {
        <div>
            <h1>Question 1</h1>
            <h2>What is your favorite genre?</h2>
            <NavigationBar />
            <QuizCard />
            <QuizCard />
        </div>
    };
}

export default {QuizCard, Quiz};
