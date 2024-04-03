sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'test02.Redemptions',
            componentId: 'RedemptionsList',
            contextPath: '/Redemptions'
        },
        CustomPageDefinitions
    );
});