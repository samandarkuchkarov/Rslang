/* eslint-disable */
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import MainLayout from './components/MainLayout';
import SignUp from './pages/AuthPage/SignUp/SignUp';
import SignIn from './pages/AuthPage/SignIn/SignIn';
import MainContext from './context';
import Learning from './pages/Learning';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProtectedAuthRoute from './components/ProtectedRoute/ProtectedAuthRoute';
import TextBook from './pages/TextBook/Textbook'
import Vocabulary from './pages/Vocabulary/Vocabulary'

function App() {
  return (
    <Router>
      <div className="App">
        <MainContext>
          <MainLayout>
            <Switch>
              <Route path="/" component={Main} exact />
              {/* <ProtectedRoute exact path="/" component={Main} /> */}
              {/* <Route path="/sign-up" component={SignUp} /> */}
              <ProtectedAuthRoute path="/sign-up" component={SignUp} />
              {/* <Route path="/sign-in" component={SignIn} /> */}
              <ProtectedAuthRoute path="/sign-in" component={SignIn} />
              <ProtectedRoute path="/learning" component={Learning} />
              <ProtectedRoute path="/textbook/:id" component={TextBook} />
              <ProtectedRoute path="/vocabulary" component={Vocabulary} />
              {/* <Route path="/learning" component={Learning} /> */}
            </Switch>
          </MainLayout>
        </MainContext>
      </div>
    </Router>
  );
}

export default App;
