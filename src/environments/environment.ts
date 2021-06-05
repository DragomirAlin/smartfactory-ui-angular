// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  clientId: 'jwtClient',
  organization: 'none',
  redirectUri: 'http://localhost:4200/home',
  loginUrl: 'http://localhost:8083/auth/realms/smartfactory/protocol/openid-connect/auth?response_type=code&&scope=write%20read&client_id=jwtClient&redirect_uri=',
  grantType: 'authorization_code',
  clientSecret: 'jwtClientSecret',
  openIdUrl: 'http://localhost:8083/auth/realms/smartfactory/protocol/openid-connect/token',
  logoutUrl: 'http://localhost:8083/auth/realms/smartfactory/protocol/openid-connect/logout?id_token_hint=',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
