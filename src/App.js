import logo from './logo.svg';
import './App.css';
import React, {Component,useState ,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';




const CardList = (props) => (
	<div>
  	{props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
	</div>
);

class Card extends React.Component {
	render() {
  	const profile = this.props;
  	return (
    	<div className="github-profile"style={{ width: '20rem', fontSize: '12px',background:'#FFFFFF',}}>
    	  <img src={profile.avatar_url} style={{width: 60, height: 60, borderRadius: 60/ 2}} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
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
          value={this.state.userName}
          onChange={
            event => {
            this.setState({ userName: event.target.value }, ()=> {
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

searchGit= () =>{
  console.log("this time");
}
        
  
  fetchUserLog = () =>
  {
       axios.get("https://api.github.com/users")
          .then (
            (response) =>{
              
                    
                    response.data.forEach(element => {
                      
                      
                      axios.get(`https://api.github.com/users/${element.login}`)
                      .then (
                        (dataresponse) => {
                            this.state.profiles.push(dataresponse.data);
                            
                            this.setState(prevState => ({
                              profiles:this.state.profiles,
                            }));
                            console.log(this.state.profiles.data);
                        }
                      )
                    });
                    


                  
                  }

            )

  }



  state = {
    profiles:[]
     
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
        <Form onSubmit={this.fetchUserLog} />
        
        <CardList profiles={this.state.profiles} />
    	</div>
    );
  }	



  componentWillMount() {
    console.log({ message: "This is an updated message" });
    this.fetchUserLog();
}

}



export default App;
