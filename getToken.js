'use strict';

const jwks_Client = require('jwks-rsa');

const clients = jwks_Client({
  jwksUri: 'https://dev-6xlimb1s.us.auth0.com/.well-known/jwks.json'
});

module.exports = (header, callback) => {
    clients.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}