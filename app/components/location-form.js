import Component from '@ember/component';
import states from 'form-wizard/utils/states';

export default Component.extend({
  states,
  actions: {
    selectState(state) {
      this.set('model.state', state);
    },

    validateFormAndProceed() {
      let errors = this.model.validateLocationDetails();

      if (Object.keys(errors).length > 0) {
        return;
      }
      this.proceedToNextStep();
    }
  }
});
