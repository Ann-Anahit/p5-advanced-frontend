import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from "./components/NotFound";
import HomePage from "./pages/HomePage";
import GroupManagement from './pages/groups/GroupManagement';
import GroupCreateForm from './pages/groups/GroupCreateForm';
import GroupDetailPage from './pages/groups/GroupDetailPage';

const App = () => {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <Router>
      <div className={styles.App}>
        <NavBar />
        <Container className={styles.Main}>
          <Switch>
            {/* Homepage Route */}
            <Route exact path="/" component={HomePage} />

            {/* Profile Edit Routes */}
            <Route exact path="/profiles/:id/edit/username" component={UsernameForm} />
            <Route exact path="/profiles/:id/edit/password" component={UserPasswordForm} />
            <Route exact path="/profiles/:id/edit" component={ProfileEditForm} />

            {/* Groups Routes */}
            <Route exact path="/groups" component={GroupManagement} /> {/* Group management page */}
            <Route exact path="/groups/create" component={GroupCreateForm} /> {/* Group creation form */}
            <Route exact path="/groups/:id" component={GroupDetailPage} /> {/* Group detail page */}

            {/* Posts Routes */}
            <Route
              exact
              path="/posts"
              render={() => (
                <PostsPage message="No results found. Adjust the search keyword." />
              )}
            />
            <Route
              exact
              path="/feed"
              render={() => (
                <PostsPage
                  message="No results found. Adjust the search keyword or follow a user."
                  filter={`owner__followed__owner__profile=${profile_id}&`}
                />
              )}
            />
            <Route
              exact
              path="/liked"
              render={() => (
                <PostsPage
                  message="No results found. Adjust the search keyword or like a post."
                  filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
                />
              )}
            />

            {/* Authentication Routes */}
            <Route exact path="/signin" component={SignInForm} />
            <Route exact path="/signup" component={SignUpForm} />

            {/* Post Management Routes */}
            <Route exact path="/posts/create" component={PostCreateForm} />
            <Route exact path="/posts/:id" component={PostPage} />
            <Route exact path="/posts/:id/edit" component={PostEditForm} />

            {/* Profile Routes */}
            <Route exact path="/profiles/:id" component={ProfilePage} />

            {/* Fallback Route */}
            <Route component={NotFound} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
};

export default App;
