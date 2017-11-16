## 01 Login Component

In this sample we are going to create an app with `Login` component that navigate to other page. We are going to use [`lc-form-validation`](https://github.com/Lemoncode/lcFormValidation) to add login form validations.

Summary steps:

- Add dummy `Login` component.
- Define general `routes`.
- Update `app.tsx`.
- Add app `routes`.
- Add `router` config.
- Update `index.tsx`.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _00 Boilerplate_ as starting point.

# Steps

- We could start creating a dummy `Login` component:

### ./src/pages/general/login/page.tsx

```javascript
import * as React from 'react';

export const LoginPage: React.StatelessComponent = (props) => (
  <h1>Login Page</h1>
);

```

### ./src/pages/general/login/pageContainer.tsx

```javascript
import * as React from 'react';
import { LoginPage } from './page';

export const LoginPageContainer: React.StatelessComponent = (props) => (
  <LoginPage
  />
);

```

### ./src/pages/general/login/index.ts

```javascript
export * from './pageContainer';

```

- Define general `routes`.

### ./src/common/constants/routes/general/index.ts

```javascript
export const generalRoutes = {
  default: '/',
  login: '/login',
};

```

### ./src/pages/general/routes.tsx

```javascript
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { generalRoutes } from '../../common/constants/routes/general';
import { LoginPageContainer } from './login';

export const GeneralRoutes: React.StatelessComponent = (props) => (
  <Switch>
    <Route exact={true} path={generalRoutes.default} component={LoginPageContainer} />
    <Route path={generalRoutes.login} component={LoginPageContainer} />
  </Switch>
);

```

### ./src/pages/general/index.ts

```javascript
export * from './routes';

```

- Update `app.tsx`:

### ./src/app.tsx

```diff
import * as React from 'react';

export const App: React.StatelessComponent = (props) => (
- <h1>Hello React</h1>
+ <div className="container-fluid">
+   {props.children}
+ </div>
);

```

- Add app `routes`:

### ./src/appRoutes.tsx

```javascript
import * as React from 'react';
import { App } from './app';
import { GeneralRoutes } from './pages/general';

export const AppRoutes: React.StatelessComponent = (props) => (
  <App>
    <GeneralRoutes />
  </App>
);

```

- Add `router` config:

### ./src/history.ts

```javascript
import createHistory from 'history/createHashHistory';

export const history = createHistory();

```

### ./src/appRouter.tsx

```javascript
import * as React from 'react';
import { Router } from 'react-router-dom';
import { history } from './history';
import { AppRoutes } from './appRoutes';

export const AppRouter: React.StatelessComponent = (props) => (
  <Router
    history={history}
  >
    <AppRoutes />
  </Router>
);

```

- Update `index.tsx`.

### ./src/index.tsx

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
- import { App } from './app';
+ import { AppRouter } from './appRouter';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

- render(App);
+ render(AppRouter);

if (module.hot) {
- module.hot.accept('./app', () => {
+ module.hot.accept('./appRouter', () => {
-   render(App);
+   render(AppRouter);
  });
}

```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us. 
