import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'components/views/Home.js';
import Clans from 'components/views/Clans';
import Members from 'components/views/Members';
import Analytics from 'components/views/Analytics';
import Tournaments from 'components/views/Tournaments';
import GiveAways from 'components/views/GiveAways';
import Discord from 'components/views/Discord';
import Clan from 'components/views/Clan';
import War from 'components/views/War';

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
          component={Members}
        />
        <Route
          exact path={'/analytics'}
          component={Analytics}
        />
        <Route
          exact path={'/tournaments'}
          component={Tournaments}
        />
        <Route
          exact path={'/giveaways'}
          component={GiveAways}
        />
        <Route
          exact path={'/discord'}
          component={Discord}
        />
        <Route
          exact path={'/clans/:clan_tag'}
          component={Clan}
        />
        <Route
          exact path={'/war/:clan_tag'}
          component={War}
        />
      </Switch>
    </div>
  );
};

export default PublicRouter;

