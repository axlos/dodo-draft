export const environment = {
  production: false,
  api: {
    url: 'http://localhost:3000/api'
  },
  stripe: 'pk_test_51JdzlBJgfrHXf7bK6mQSDi0vDko8GNXwqGotRCVbJNEXXPkoDCpYeBvhEswJW7Fm4Kb3K1RTxGfhmQAgmNBFpVlD00GOCO4uhq',
  auth0: {
    clientId: 'kMlOX1EqQCVne4DTb6m2MWQFMaJQ4Jff',
    domain: 'cherf.us.auth0.com',
    callbackURL: 'http://localhost:4200/login',
    audience: 'https://cherf.us.auth0.com/api/v2/'
  }
};
