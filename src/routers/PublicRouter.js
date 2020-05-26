import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'components/views/Home.js';
import Clans from 'components/views/Clans';
import Clan from 'components/views/Clan';
import Players from 'components/views/Players';

const PublicRouter = () => {

  return (
    <div className="PublicRouter">
      <Switch>
        <Route
          exact path={'/'}
          component={Home}
        />
        <Route
          exact path={'/clans/all'}
          component={Clans}
        />
        <Route
          exact path={'/clans/:clan_tag'}
          component={Clan}
        />
        <Route
          exact path={'/players/all'}
          component={Players}
        />
        <Route
          exact path={'players/:clan_tag'}
          component={Players}
        />
      </Switch>
    </div>
  );
};

export default PublicRouter;

