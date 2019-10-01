import React from 'react';
import firebase from 'firebase';

// change this section, === enter your own project  apiKey, databaseURL, projectId, appId //
var firebaseConfig = {
  apiKey: "AIzaSyC2_BS8LnF16Vou0ny3uLyy00aVzcq7usw",
  databaseURL: "https://database-demo-94c6a.firebaseio.com",
  projectId: "database-demo-94c6a",
  appId: "1:417622674892:web:1d8fed13b07f7e887ba169",
};
// change this section //

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      data: []
    }
    firebase.database().ref('users').on('value', gotData => {
      gotData.val() && this.setState({ data: Object.values(gotData.val()), name: '' })
    })
  }

  changeHandle = (e) => this.setState({ name: e.target.value })

  submit = () => firebase.database().ref('users').push({ name: this.state.name })

  render() {
    console.log(this.state.data)
    return (
      <div className="App" style={{textAlign: 'center'}}>
        <input type='text' value={this.state.name} onChange={(e) => this.changeHandle(e)} />
        <button type='button' onClick={() => this.submit()} style={{ marginTop: '10px' }}>Save</button>
        {this.state.data && this.state.data.map((item, index) =>
          <div key={item.id} style={{ marginTop: '10px' }}>
            <span>Name:</span>
            <span>{" " + item.name + "  "}</span>
            <button onClick={() => this.delete(index)}>Delete</button>
            <br />
          </div>
        )}
      </div>
    );
  }
}


export default App;
