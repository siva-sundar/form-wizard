import EmberObject from '@ember/object';
import { inject as service } from '@ember/service';


export default EmberObject.extend({
  resourceProperties: [],
  store: service(),

  _resourceUrl() {
   let url = this.resourceUrl,
       id = this._resourceId();

   if (id !== undefined) {
     url += '/' + id;
   }

   return url;
 },


 deserialize(json) {
    Object.keys(json).forEach(prop => {
      this.deserializeProperty(prop, json[prop]);
    });

    return this;
  },

  deserializeProperty(property, value) {
    this.set(property, value);
  },

  serialize() {
    let prop;
    let props = this.resourceProperties;
    let hash = {};

    for (let i = 0; i < props.length; i++) {
      prop = props[i];
      hash[prop] = this.serializeProperty(prop);
    }
    return hash;
  },

  serializeProperty(prop) {
    let value = this.get(prop);
    if (value === null) {
      value = undefined;
    }
    return value;
  },


  save() {
    let json = this.serialize();
    let data = {
      JSONString: JSON.stringify(json)
    };
    this.get('store').makeNetworkRequest(this.resourceUrl, {
      type: 'POST',
      data
    })
  }


});
