'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.samplebanking.network.transferAmount} accountTransfer
 * @transaction
 */
async function transferAmount(accountTransfer) {
    if (accountTransfer.from.balance < accountTransfer.amount) {
        throw new Error ("Insufficient funds");
    }
    
    accountTransfer.from.balance -= accountTransfer.amount;
    accountTransfer.to.balance += accountTransfer.amount;
    
    return getAssetRegistry('org.samplebanking.network.bankAccount')
    .then (function (assetRegistry) {
        return assetRegistry.update(accountTransfer.from);
    })
    .then (function () {
        return getAssetRegistry('org.samplebanking.network.bankAccount');
    })
    .then(function (assetRegistry) {
        return assetRegistry.update(accountTransfer.to);
    });
}
