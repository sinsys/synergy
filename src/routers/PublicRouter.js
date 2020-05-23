import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'components/views/Home.js';
import Clan from 'components/views/Clan';

const PublicRouter = () => {

  return (
    <div className="PublicRouter">
      <Switch>
        <Route
          exact path={'/'}
          component={Home}
        />
        <Route
          exact path={'/clan/:tag'}
          render={(routeProps) => {
            return (
              <Clan
                clanTag={routeProps.match.params.tag}
              />
            );
          }}
        />
      </Switch>
    </div>
  );
};

export default PublicRouter;

