import Service from '@ember/service';
import {  run } from '@ember/runloop';
import { Promise as EmberPromise } from 'rsvp';
import { getOwner } from '@ember/application';

export default Service.extend({

  _getModelProxy(modelName) {
      return getOwner(this).factoryFor(`model:${modelName}`);
  },

  createRecord(modelName, inputProperties = {}) {
    let modelProxy = this._getModelProxy(modelName);
    return modelProxy.create(inputProperties);
  },

  makeNetworkRequest(url, params = {}) {
    params.data = params.data || {};
    params.headers = params.headers || {};

    return new EmberPromise((resolve, reject) => {
      $.ajax(url, params).then((data) => {
        run(null, resolve, data);
      }, (jqXHR) => {

        let resObj = jqXHR;
        run(null, reject, resObj);

      });
    });
  },

});
