/**
 * 
 * @On(event = { "CREATE" }, entity = "loyaltyProgramSrv.Redemptions")
 * @param {Object} request - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function(request) {
    const { data } = request;
    const { redeemedAmount, customer } = data;

    if (redeemedAmount && customer) {
        const customerRecord = await SELECT.one().from('loyaltyProgramSrv.Customers').where({ ID: customer });

        if (customerRecord) {
            if (customerRecord.totalRewardPoints < redeemedAmount) {
                request.reject(400, 'Insufficient reward points');
                return;
            }

            const updatedTotalRewardPoints = customerRecord.totalRewardPoints - redeemedAmount;
            const updatedTotalRedeemedRewardPoints = customerRecord.totalRedeemedRewardPoints + redeemedAmount;

            await UPDATE('loyaltyProgramSrv.Customers')
                .set({
                    totalRewardPoints: updatedTotalRewardPoints,
                    totalRedeemedRewardPoints: updatedTotalRedeemedRewardPoints
                })
                .where({ ID: customer });
        } else {
            request.reject(404, 'Customer not found');
        }
    } else {
        request.reject(400, 'Redeemed amount and customer are required');
    }
};