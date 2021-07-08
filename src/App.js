import logo from './logo.svg';
import './App.css';
import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { modalContext } from './Modal'



const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id} {...profile} >

    </Card>)}
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

const Card = (props) => {
  return (
    <div className="github-profile" style={{ width: '20rem', fontSize: '12px', background: '#FFFFFF', }}>

      {props.children}
      <img src={props.avatar_url} style={{ width: 60, height: 60, borderRadius: 60 / 2 }} />
      <div className="info">
        <div className="name">{props.name}</div>
        <div className="company">{props.company}</div>
      </div>
    </div>
  );
}

const Form = (props) => {

  const [username, setUsername] = React.useState('')
  const handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    props.onSubmit(resp.data);
    setUsername('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={
          event => {
            props.onChange(event.target.value)
            setUsername(event.target.value)
          }

        }
        placeholder="Enter username"
        required
      />

    </form>
  );
}





const App = (props) => {

  const [profiles, setProfiles] = React.useState([])

  const [keyword, setKeyword] = React.useState('')

  React.useEffect(() => {
    fetchUserLog()

  }, [])

  React.useEffect(() => {
    console.log(keyword, 'effect')

  }, [keyword])

  const fetchUserLog = async () => {
    const resp = await axios.get("https://api.github.com/users")

    const users = []

    for (let i = 0; i < resp.data.length; i++) {

      const element = resp.data[i];
      const dataResponse = await axios.get(`https://api.github.com/users/${element.login}`)



      users.push(dataResponse.data);
    }






    setProfiles(users);

  }


  return (
    <div>
      <div className="header">{props.title}</div>
      <Form onSubmit={fetchUserLog}
        onChange={(value) => {setKeyword(value) }}
      />

      <CardList profiles={profiles.filter(profile => { console.log(profile); return keyword ? profile.name && profile.name.toLowerCase().includes(keyword) : true })} />
    </div>
  );

}



export default App;
