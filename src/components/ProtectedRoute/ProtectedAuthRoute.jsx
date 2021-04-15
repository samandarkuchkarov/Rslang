import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Context } from '../../context'

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { isAuth, setAuth } = React.useContext(Context)
	// const token = document.cookie.replace(/(?:(?:^|.*;\s*)rslangToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
  // console.log(token)
	const token = localStorage.getItem('rslangToken');

	React.useEffect(() => {
    if(token !== null && token !== undefined){
      setAuth(true)
    }
  }, [])
  return (
    <Route
      {...rest}
      render={props =>
        isAuth === "false" ||  isAuth === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/learning',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute;