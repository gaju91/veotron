import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './routes/Home';
import Meeting from './routes/Meeting';
import Room from './routes/Room';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/meeting" component={Meeting} />
          <Route exact path="/room" component={Room} />
        </Switch>
      </Router>
    )
  }
}

export default App;
