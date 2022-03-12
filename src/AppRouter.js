
import React, { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Favorites } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";

const AppRouter = () => {

  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => { //save to local storage
    localStorage.setItem('favoriteList', JSON.stringify(favoriteList || []))
  }, [favoriteList])

  const toggleFavorite = (userId) => {
    const favoriteListClone = [...favoriteList]
    const idx = favoriteListClone.findIndex(favoriteItem => favoriteItem === userId)
    idx === -1 ? favoriteListClone.push(userId) : favoriteListClone.splice(idx, 1)
    setFavoriteList(favoriteListClone)
  }

  return (
    <ThemeProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} toggleFavorite={toggleFavorite} favoriteList={favoriteList} />} />
          <Route exact path="/Favorites" render={(props) => <Favorites {...props} toggleFavorite={toggleFavorite} favoriteList={favoriteList} />} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

<Route
  path="/dashboard"
  render={(props) => <Dashboard {...props} authed={true} />}
/>

export default AppRouter;
