## 01 Login Component

In this sample we are going to create an app with `Login` component that navigate to other page. We are going to use [`lc-form-validation`](https://github.com/Lemoncode/lcFormValidation) to add login form validations.

Summary steps:

- Add dummy `Login` component.
- Define `general` routes.
- Update `app.tsx`.
- Add `app` routes.
- Add `router` config.
- Update `index.tsx`.
- Add dummy `Member` page in `admin` module.
- Define `admin` routes.
- Update `app` routes.
- Add link to navigate.
- Implement `common` components.
- Implement `Login` page.
- Extract business from `pageContainer`.
- Create mock `login API`.

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

- Define `general` routes.

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

- Add `app` routes:

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

- Add dummy `Member` page in `admin` module:

### ./src/pages/admin/member/list/page.tsx

```javascript
import * as React from 'react';
import { Link } from 'react-router-dom';
import { generalRoutes } from '../../../../common/constants/routes/general';

export const MemberListPage: React.StatelessComponent = (props) => (
  <div>
    <h1>Member list Page</h1>
    <Link
      to={generalRoutes.login}
    >
      Go back
    </Link>
  </div>
);

```

### ./src/pages/admin/member/list/pageContainer.tsx

```javascript
import * as React from 'react';
import { MemberListPage } from './page';

export const MemberListPageContainer: React.StatelessComponent = (props) => (
  <MemberListPage />
);

```

### ./src/pages/admin/member/list/index.ts

```javascript
export * from './pageContainer';

```

### ./src/pages/admin/member/index.ts

```javascript
export * from './list';

```

- Define `admin` routes:

### ./src/common/constants/routes/admin/index.ts

```javascript
const baseUrl = '/admin';

export const adminRoutes = {
  default: baseUrl,
  memberList: `${baseUrl}/member/list`,
};

```

### ./src/pages/admin/routes.tsx

```javascript
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { adminRoutes } from '../../common/constants/routes/admin';
import { MemberListPageContainer } from './member';

export const AdminRoutes: React.StatelessComponent = (props) => (
  <Switch>
    <Route exact={true} path={adminRoutes.default} component={MemberListPageContainer} />
    <Route path={adminRoutes.memberList} component={MemberListPageContainer} />
  </Switch>
);

```

### ./src/pages/admin/index.ts

```javascript
export * from './routes';

```

- Update `app` routes:

### ./src/appRoutes.tsx

```diff
import * as React from 'react';
import { App } from './app';
import { GeneralRoutes } from './pages/general';
+ import { AdminRoutes } from './pages/admin';

export const AppRoutes: React.StatelessComponent = (props) => (
  <App>
    <GeneralRoutes />
+   <AdminRoutes />
  </App>
);

```

- Add link to navigate:

### ./src/pages/general/login/page.tsx

```diff
import * as React from 'react';
+ import { Link } from 'react-router-dom';
+ import { adminRoutes } from '../../../common/constants/routes/admin';

export const LoginPage: React.StatelessComponent = (props) => (
- <h1>Login Page</h1>
+ <div>
+   <h1>Login Page</h1>
+   <Link to={adminRoutes.memberList}>
+     Navigate to Member List
+   </Link>
+ </div>
);

```

- We are going to use `material-ui` for `common` components like `inputs`, `buttons`, `validation` etc:

### ./src/common/components/form/validation.tsx

```javascript
import * as React from 'react';

interface Props {
  error?: string;
}

export const ValidationComponent: React.StatelessComponent<Props> = (props) => {
  let wrapperClass: string = 'form-group clearfix';
  if (Boolean(props.error) && props.error.length > 0) {
    wrapperClass = `${wrapperClass} has-error`;
  }

  return (
    <div className={wrapperClass}>
      {props.children}
      <div className="help-block">
        {props.error}
      </div>
    </div>
  );
};

```

### ./src/common/components/form/input.tsx

```javascript
import * as React from 'react';
import { ValidationComponent } from './validation';
import TextField from 'material-ui/TextField';

interface Props {
  type: string;
  name: string;
  value: string | number;
  onChange: any;
  wrapperClassName?: string;
  label?: string;
  labelClassName?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

interface State {
  currentValue: string | number;
}

export class Input extends React.Component<Props, State> {
  state = {
    currentValue: this.props.value,
  };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.value !== this.state.currentValue) {
      this.setState({ currentValue: nextProps.value });
    }
  }

  onChange = (event) => {
    const currentValue = event.target.value;
    this.setState({ currentValue });
    this.props.onChange(event.target.name, currentValue);
  }

  render() {
    return (
      <div className={this.props.wrapperClassName}>
        <ValidationComponent error={this.props.error}>
          <label htmlFor={this.props.name} className={this.props.labelClassName}>
            {this.props.label}
          </label>
          <TextField
            type={this.props.type}
            name={this.props.name}
            hintText={this.props.placeholder}
            value={this.state.currentValue}
            onChange={this.onChange}
            fullWidth={true}
            disabled={this.props.disabled}
          />
        </ValidationComponent>
      </div>
    );
  }
}

```

### ./src/common/components/form/button.tsx

```javascript
import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

interface Props {
  type: string;
  onClick: any;
  wrapperClassName?: string;
  buttonClassName?: string;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const Button: React.StatelessComponent<Props> = (props) => (
  <div className={props.wrapperClassName}>
    <RaisedButton
      type={props.type}
      className={props.buttonClassName}
      label={props.label}
      icon={props.icon}
      fullWidth={true}
      primary={true}
      onClick={onClick(props)}
    />
  </div>
);

const onClick = (props: Props) => (e) => {
  e.preventDefault();
  props.onClick();
};

```

### ./src/common/components/form/index.ts

```javascript
export * from './input';
export * from './button';

```

- Now that it's working the navigation between pages and `common` components, we could focus on implement `Login` page:

### ./src/pages/general/login/viewModel.ts

```javascript
import { FieldValidationResult } from 'lc-form-validation';

export interface LoginCredential {
  login: string;
  password: string;
}

export const createEmptyLoginCredential = (): LoginCredential => ({
  login: '',
  password: '',
});

export interface LoginCredentialError {
  login: FieldValidationResult;
  password: FieldValidationResult;
}

export const createEmptyLoginCredentialError = (): LoginCredentialError => ({
  login: new FieldValidationResult(),
  password: new FieldValidationResult(),
});

```

### ./src/pages/general/login/components/header.tsx

```javascript
import * as React from 'react';

export const HeaderComponent: React.StatelessComponent = (props) => (
  <div className="panel-heading">
    <h3 className="panel-title">
      <p>Please sign in</p>
      <p>(login: admin / pwd: test)</p>
    </h3>
  </div>
);

```

### ./src/pages/general/login/components/form.tsx

```javascript
import * as React from 'react';
import { Input, Button } from '../../../../common/components/form';
import { LoginCredential, LoginCredentialError } from '../viewModel';

interface Props {
  loginCredential: LoginCredential;
  loginCredentialError: LoginCredentialError;
  onUpdateField(field: string, value: string): void;
  onLogin(): void;
}

export const FormComponent: React.StatelessComponent<Props> = (props) => (
  <div className="panel-body">
    <form role="form">
      <Input
        type="text"
        label="Login"
        placeholder="Login"
        name="login"
        value={props.loginCredential.login}
        onChange={props.onUpdateField}
        error={
          props.loginCredentialError.login.succeeded ?
            '' :
            props.loginCredentialError.login.errorMessage
        }
      />
      <Input
        type="password"
        label="Password"
        placeholder="Password"
        name="password"
        value={props.loginCredential.password}
        onChange={props.onUpdateField}
        error={
          props.loginCredentialError.password.succeeded ?
            '' :
            props.loginCredentialError.password.errorMessage
        }
      />
      <Button
        type="submit"
        label="Login"
        onClick={props.onLogin}
      />
    </form>
  </div>
);

```

### ./src/pages/general/login/components/index.ts

```javascript
export * from './header';
export * from './form';

```

- Update login `page`:


### ./src/pages/general/login/page.scss

```scss
.page {
  margin-top: 40px;
}

```

### ./src/pages/general/login/page.tsx

```diff
import * as React from 'react';
import { Link } from 'react-router-dom';
import { adminRoutes } from '../../../common/constants/routes/admin';
+ import { LoginCredential, LoginCredentialError } from './viewModel';
+ import { HeaderComponent, FormComponent } from './components';
+ const styles = require('./page.scss');

+ interface Props {
+  loginCredential: LoginCredential;
+  loginCredentialError: LoginCredentialError;
+  onUpdateField(field: string, value: string): void;
+  onLogin(): void;
+ }

- export const LoginPage: React.StatelessComponent = (props) => (
+ export const LoginPage: React.StatelessComponent<Props> = (props) => (
- <div>
-   <h1>Login Page</h1>
-   <Link to={adminRoutes.memberList}>
-     Navigate to Member List
-   </Link>
- </div>
+ <div className={`${styles.page} row`}>
+   <div className="col-md-4 col-md-offset-4">
+     <div className="panel panel-default">
+       <HeaderComponent />
+       <FormComponent
+         loginCredential={props.loginCredential}
+         loginCredentialError={props.loginCredentialError}
+         onUpdateField={props.onUpdateField}
+         onLogin={props.onLogin}
+       />
+     </div>
+   </div>
+ </div>
);

```

- Update login `pageContainer`:

### ./src/pages/general/login/pageContainer.tsx

```diff
import * as React from 'react';
+ import {
+   LoginCredential, createEmptyLoginCredential,
+   LoginCredentialError, createEmptyLoginCredentialError,
+ } from './viewModel';
+ import { history } from '../../../history';
+ import { adminRoutes } from '../../../common/constants/routes/admin';
import { LoginPage } from './page';

- export const LoginPageContainer: React.StatelessComponent = (props) => (
-   <LoginPage
-   />
- );

+ interface State {
+   loginCredential: LoginCredential;
+   loginCredentialError: LoginCredentialError;
+ }

+ export class LoginPageContainer extends React.Component<{}, State> {
+   state = {
+     loginCredential: createEmptyLoginCredential(),
+     loginCredentialError: createEmptyLoginCredentialError(),
+   };

+   onUpdateField = (field: string, value: string) => {
+     this.setState({
+       ...this.state,
+       loginCredential: {
+         ...this.state.loginCredential,
+         [field]: value,
+       },
+     });
+   }

+   onLogin = () => {
+     if (this.state.loginCredential.login === 'admin' &&
+       this.state.loginCredential.password === 'test') {
+       history.push(adminRoutes.memberList);
+     }
+   }

+   render() {
+     return (
+       <LoginPage
+         loginCredential={this.state.loginCredential}
+         loginCredentialError={this.state.loginCredentialError}
+         onUpdateField={this.onUpdateField}
+         onLogin={this.onLogin}
+       />
+     );
+   }
+ }

```

- Finally, to work with `material-ui`:

### ./src/app.tsx

```diff
import * as React from 'react';
+ import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export const App: React.StatelessComponent = (props) => (
+ <MuiThemeProvider>
    <div className="container-fluid">
      {props.children}
    </div>
+ </MuiThemeProvider>
);

```

- Now, it's time to add validations and extract business from `pageContainer`:

### ./src/pages/general/login/validations.ts

```javascript
import { ValidationConstraints, Validators, createFormValidation } from 'lc-form-validation';

const validationConstraints: ValidationConstraints = {
  fields: {
    login: [
      { validator: Validators.required },
    ],
    password: [
      { validator: Validators.required },
    ],
  },
};

export const validations =  createFormValidation(validationConstraints);

```

### ./src/pages/general/login/pageContainer.state.ts

```javascript
import { LoginCredential, LoginCredentialError } from './viewModel';

export interface State {
  loginCredential: LoginCredential;
  loginCredentialError: LoginCredentialError;
}

```

### ./src/pages/general/login/pageContainer.business.ts

```javascript
import { FieldValidationResult, FormValidationResult } from 'lc-form-validation';
import * as toastr from 'toastr';
import { LoginCredential, LoginCredentialError, createEmptyLoginCredential } from './viewModel';
import { State } from './pageContainer.state';
import { history } from '../../../history';
import { adminRoutes } from '../../../common/constants/routes/admin';

export const onUpdateField = (field: string, value: string, fieldValidationResult: FieldValidationResult) =>
  (state: State): State => ({
    ...state,
    loginCredential: {
      ...state.loginCredential,
      [field]: value,
    },
    loginCredentialError: {
      ...state.loginCredentialError,
      [field]: fieldValidationResult,
    },
  });

export const onLogin = (loginCredential: LoginCredential) => {
  toastr.remove();
  if (isValidLogin(loginCredential)) {
    toastr.success('Login success');
    history.push(adminRoutes.memberList);
  } else {
    toastr.error('Login fail');
  }
};

// TODO: Move to api
const isValidLogin = (loginCredential: LoginCredential) => (
  loginCredential.login === 'admin' &&
  loginCredential.password === 'test'
);

export const updateFormErrors = (formValidationResult: FormValidationResult) => (state: State): State => ({
  ...state,
  loginCredentialError: getFieldValidationResult(state, formValidationResult),
});

const getFieldValidationResult = (state: State, formValidationResult: FormValidationResult) => (
  formValidationResult.fieldErrors.reduce((errors, fieldValidationResult) => ({
    ...errors,
    [fieldValidationResult.key]: fieldValidationResult,
  }), state.loginCredentialError)
);

```

- Update `pageContainer`:

### ./src/pages/general/login/pageContainer.tsx

```diff
import * as React from 'react';
import {
  LoginCredential, createEmptyLoginCredential,
  LoginCredentialError, createEmptyLoginCredentialError,
} from './viewModel';
+ import { State } from './pageContainer.state';
+ import * as business from './pageContainer.business';
+ import { validations } from './validations';
- import { history } from '../../../history';
- import { adminRoutes } from '../../../common/constants/routes/admin';
import { LoginPage } from './page';

- interface State {
-   loginCredential: LoginCredential;
-   loginCredentialError: LoginCredentialError;
- }

export class LoginPageContainer extends React.Component<{}, State> {
  state = {
    loginCredential: createEmptyLoginCredential(),
    loginCredentialError: createEmptyLoginCredentialError(),
  };

  onUpdateField = (field: string, value: string) => {
-   this.setState({
-     ...this.state,
-     loginCredential: {
-       ...this.state.loginCredential,
-       [field]: value,
-     },
-   });
+   validations
+     .validateField(this.state.loginCredential, field, value)
+     .then((fieldValidationResult) => {
+       this.setState(business.onUpdateField(field, value, fieldValidationResult));
+     });
  }

  onLogin = () => {
-   if (this.state.loginCredential.login === 'admin' &&
-     this.state.loginCredential.password === 'test') {
-     history.push(adminRoutes.memberList);
-   }
+   validations
+     .validateForm(this.state.loginCredential)
+     .then((formValidationResult) => {
+       business.onLogin(this.state.loginCredential);
+       this.setState(business.updateFormErrors(formValidationResult));
+     });
  }

  render() {
    return (
      <LoginPage
        loginCredential={this.state.loginCredential}
        loginCredentialError={this.state.loginCredentialError}
        onUpdateField={this.onUpdateField}
        onLogin={this.onLogin}
      />
    );
  }
}

```

- Finally, we could create a mock `login API`:

### ./src/rest-api/model/general/loginCredential.ts

```javascript
export interface LoginCredential {
  login: string;
  password: string;
}

```

### ./src/rest-api/model/general/index.ts

```javascript
export * from './loginCredential';

```

### ./src/rest-api/api/config.ts

```javascript
export const config = {
  useRealAPI: (process.env.REST_ENV === 'real'),
};

```

### ./src/rest-api/api/general/login/contract.ts

```javascript
import { LoginCredential } from '../../../model/general';

export type Login = (loginCredential: LoginCredential) => Promise<boolean>;

```

### ./src/rest-api/api/general/login/double.ts

```javascript
import { LoginCredential } from '../../../model/general';
import { Login } from './contract';

export const login: Login = (loginCredential: LoginCredential): Promise<boolean> => (
  isValidLogin(loginCredential) ?
    Promise.resolve(true) :
    Promise.reject('Login Fail')
);

const isValidLogin = (loginCredential: LoginCredential) => (
  loginCredential.login === 'admin' &&
  loginCredential.password === 'test'
);

```

### ./src/rest-api/api/general/login/real.ts

```javascript
import { LoginCredential } from '../../../model/general';
import { Login } from './contract';

// TODO: Implement real
export const login: Login = (loginCredential: LoginCredential): Promise<boolean> => (
  Promise.resolve(true)
);

```

### ./src/rest-api/api/general/login/index.ts

```javascript
import { Login } from './contract';
import * as double from './double';
import * as real from './real';
import { config } from '../config';

export const login: Login = config.useRealAPI ?
  real.login :
  double.login;

```

### ./src/rest-api/api/general/index.ts

```javascript
export * from './login';

```

- Create `mappers` to map from `viewModel` to `model`:

### ./src/pages/general/login/mappers.ts

```javascript
import * as model from '../../../rest-api/model/general';
import * as vm from './viewModel';

export const mapLoginCredentialVmToModel = (loginCredential: vm.LoginCredential): model.LoginCredential => ({
  ...loginCredential,
});

```

- And use it:

### ./src/pages/general/login/pageContainer.business.ts

```diff
import { FieldValidationResult, FormValidationResult } from 'lc-form-validation';
import * as toastr from 'toastr';
import { LoginCredential, LoginCredentialError, createEmptyLoginCredential } from './viewModel';
import { State } from './pageContainer.state';
import { history } from '../../../history';
import { adminRoutes } from '../../../common/constants/routes/admin';
+ import { login } from '../../../rest-api/api/general';
+ import { mapLoginCredentialVmToModel } from './mappers';

...

export const onLogin = (loginCredential: LoginCredential) => {
  toastr.remove();
-   if (isValidLogin(loginCredential)) {
-     toastr.success('Login success');
-     history.push(adminRoutes.memberList);
-   } else {
-     toastr.error('Login fail');
-   }

+   const loginCredentialModel = mapLoginCredentialVmToModel(loginCredential);
+   login(loginCredentialModel)
+     .then(() => {
+       toastr.success('Login success');
+       history.push(adminRoutes.memberList);
+     })
+     .catch((error) => {
+       toastr.error(error);
+     });
  };

- // TODO: Move to api
- const isValidLogin = (loginCredential: LoginCredential) => (
-   loginCredential.login === 'admin' &&
-   loginCredential.password === 'test'
- );

...

```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us. 
