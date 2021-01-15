import React from "react";
import { Switch, Route } from "react-router-dom";
import ArticleList from "./containers/ArticleList";
import ArticleDetail from "./containers/ArticleDetail";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import MyArticles from "./containers/MyArticles";

const BaseRouter = () => (
  <Switch>
    <Route exact path="/" component={ArticleList} />
    <Route path="/articles/:articleID/" component={ArticleDetail} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/signup/" component={Signup} />
    <Route exact path="/my_articles/" component={MyArticles} />
  </Switch>
);

export default BaseRouter;
