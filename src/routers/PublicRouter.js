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
          exact path={'/clans'}
          component={Clans}
        />
        <Route
          exact path={'/members'}
          component={Clans}
        />
        <Route
          exact path={'/analytics'}
          component={Clans}
        />
        <Route
          exact path={'/tournaments'}
          component={Clans}
        />
        <Route
          exact path={'/giveaways'}
          component={Clans}
        />
        <Route
          exact path={'/discord'}
          component={Clans}
        />
        <Route
          exact path={'/clans/:clan_tag'}
          component={Clans}
        />
      </Switch>
    </div>
  );
};

export default PublicRouter;

