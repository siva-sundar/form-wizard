import Component from '@ember/component';

export default Component.extend({
  actions: {
    validateFormAndProceed() {
      let errors = this.model.validateEducationDetails();

      if (Object.keys(errors).length > 0) {
        return;
      }

      this.model.save();
    }
  }
});
