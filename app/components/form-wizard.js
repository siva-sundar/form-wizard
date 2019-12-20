import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  init() {
    this._super(...arguments);
    this.step = 'personal-details';
    this.model = this.get('store').createRecord('contact');
  },

  currentStep: computed('step', function() {
    let { step } = this;
    return {
      isPersonalDetailsForm: step === 'personal-details',
      isLocationDetailsForm: step === 'location-details',
      isEducationDetailsForm: step === 'education-details'
    };
  }),

  actions: {
    proceedToNextStep(step) {
      this.set('step', step);
    }
  }
});
