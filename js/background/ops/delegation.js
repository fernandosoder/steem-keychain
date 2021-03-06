const broadcastDelegation = data => {
  return new Promise((resolve, reject) => {
    steem.api.getDynamicGlobalPropertiesAsync().then(res => {
      let delegated_vest = null;
      if (data.unit == "SP") {
        const totalSteem = Number(res.total_vesting_fund_steem.split(" ")[0]);
        const totalVests = Number(res.total_vesting_shares.split(" ")[0]);
        delegated_vest = (parseFloat(data.amount) * totalVests) / totalSteem;
        delegated_vest = delegated_vest.toFixed(6);
        delegated_vest = delegated_vest.toString() + " VESTS";
      } else {
        delegated_vest = data.amount + " VESTS";
      }
      steem.broadcast.delegateVestingShares(
        key,
        data.username,
        data.delegatee,
        delegated_vest,
        (err, result) => {
          console.log(result, err);
          const message = createMessage(
            err,
            result,
            data,
            "The transaction has been broadcasted successfully.",
            "There was an error broadcasting this transaction, please try again."
          );
          resolve(message);
        }
      );
    });
  });
};
