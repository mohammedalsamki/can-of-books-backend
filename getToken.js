'use strict';

const jwks_Client = require('jwks-rsa');

const clients = jwks_Client({
  jwksUri: `${process.env.YOKEN_ATH}`
});

module.exports = (header, callback) => {
    clients.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}