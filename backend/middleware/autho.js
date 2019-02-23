const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestPerMinute: 5,
    jwksUri: `https://darkrogue.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and issuer
  audience: 'ZDkMG00xPpjgLLwLzN6vN1vGGuPFsPVp',
  issuer: `https://darkrogue.auth0.com/`,
  algorithms: ['RS256']
});

module.exports = {
  checkJwt: checkJwt
}