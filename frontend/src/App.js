import React, { Suspense } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { AuthContext } from './context/auth-context';
import { useAuth} from './hooks/auth-hook';

import LoadingSpinner from './components/UI/LoadingSpinner/LoadingSpinner';
import Header from './components/Header/Header';
import SideDrawer from './components/Header/SideDrawer/SideDrawer';

import 'moment/locale/pl';
import './App.css';

const Auth = React.lazy(() => import('./containers/Auth/Auth')); 
const Employees = React.lazy(() => import('./containers/Employees/Employees')); 
const Employee = React.lazy(() => import('./containers/Employees/Employee/Employee')); 
const NewEmployee = React.lazy(() => import('./containers/Employees/NewEmployee/NewEmployee')); 
const UpdateEmployee = React.lazy(() => import('./containers/Employees/UpdateEmployee/UpdateEmployee')); 

const WorkTimeRecord = React.lazy(() => import('./containers/WorkTimeRecord/WorkTimeRecord')); 

const App = () =>  {
  const {token, login, logout, userId} = useAuth();

   let routes;
   
   if(!token){
    routes = (
      <Switch>
        <Route path='/' exact render={(props) => <Auth {...props} />}/>
      </Switch>
    )
   }else{
    routes = (<Switch>
      <Route path='/' exact render={(props) => <Employees {...props} />}/>
      <Route path='/employees/new' exact render={(props) => <NewEmployee {...props} />}/>
      <Route path='/employees/:employeeId' exact render={(props) => <Employee {...props} />}/>
      <Route path='/employees/edit/:employeeId' exact render={(props) => <UpdateEmployee {...props} />}/>
      <Route path='/workTimeRecord/:employeeId/:date' exact render={(props) => <WorkTimeRecord {...props} />}/>
    </Switch>);
   }

  return (
    <AuthContext.Provider value={{isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout}}>
        <BrowserRouter>
        <div className="App">
          {token && <Header/>}
          {token && <SideDrawer/>}
          <main>
            <Suspense fallback={ 
                <div className="center">
                  <LoadingSpinner />
                </div>}>
              {routes}
            </Suspense>
          </main>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
