import logo from './logo.svg';
import './App.css';
import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';




const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}
  </div>
);


// class Car{
//   static log = ()=>{
//     console.log('i am a car')
//   }
//   has_wheels = true
//   constructor(color,brand){
//     this.color = color;
//     this.brand = brand;
//   }

//   log_color = ()=>{
//     console.log(this.color);
//   }
// }

// class BMW extends Car{
//   props
//   constructor(color,model){
//     super(color,'BMW')
//     this.props = {model};

//   }
//   log_model = ()=>{
//     console.log(this.model);
//   }
//   log_all = ()=>{
//     console.log(this.color,this.model,this.brand)
//   }
// }
// const m3 = new BMW('blue','m3')

class Card extends React.Component {
  render() {
    return (
      <div className="github-profile" style={{ width: '20rem', fontSize: '12px', background: '#FFFFFF', }}>
        <img src={this.props.avatar_url} style={{ width: 60, height: 60, borderRadius: 60 / 2 }} />
        <div className="info">
          <div className="name">{this.props.name}</div>
          <div className="company">{this.props.company}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  state = { userName: '' };
 
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data);
    this.setState({ userName: '' });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          // value={this.state.userName}
          onChange={
            event => {
              // this.props.onChange(event.target.value)
              this.setState({ userName: event.target.value }, () => {
                console.log(this.state.userName);
              })

            }

          }
          placeholder="Enter username"
          required
        />
        <button>Add card</button>
      </form>
    );
  }
}




class App extends React.Component {

  searchGit = () => {
    console.log("this time");
  }


  fetchUserLog = () => {
    axios.get("https://api.github.com/users")
      .then(
        (response) => {


          response.data.forEach(element => {


            axios.get(`https://api.github.com/users/${element.login}`)
              .then(
                (dataresponse) => {
                  this.state.profiles.push(dataresponse.data);

                  this.setState(prevState => ({
                    profiles: this.state.profiles,
                  }));
                  console.log(this.state.profiles.data);
                }
              )
          });




        }

      )

  }



  state = {
    profiles: [],
    keyword: ''
  };



  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles: [],
    }));
  };
  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.fetchUserLog} 
        // onChange={(value) => { this.setState({ keyword: value }) }} 
        />

        <CardList profiles={this.state.profiles.filter(profile => {console.log(profile); return this.state.keyword ? profile.name &&profile.name.toLowerCase().includes(this.state.keyword) : true})} />
      </div>
    );
  }


  componentWillMount() {
    console.log({ message: "This is an updated message" });
    this.fetchUserLog();
  }

}



export default App;
