import { isEmpty } from '@ember/utils';
import BaseModel from './base';

const emailIdRegex = /^\S+@\S+\.\S+$/;
const zipcodeRegex = /\d{6}/

export default BaseModel.extend({
  resourceUrl: '/contacts',
  resourceProperties: [
    'email_id',
    'alternate_email_id',
    'city',
    'state',
    'zip_code',
    'address',
    'country_code',
    'institution_name',
    'qualification'
  ],

  validatePersonalDetails() {
    let { email_id, alternate_email_id } = this;
    let errors = {};

    if (!emailIdRegex.test(email_id)) {
      errors.is_invalid_email_id = true;
    }
    if (!emailIdRegex.test(alternate_email_id)) {
      errors.is_invalid_alternate_email_id = true;
    }

    this.set('errors', errors);

    return errors;
  },

  validateLocationDetails() {
    let { city, state = { }, zip_code, address } = this;
    let errors = {};

    if (isEmpty(address)) {
      errors.is_invalid_address = true;
    }
    if (isEmpty(city)) {
      errors.is_invalid_city = true;
    }
    if (isEmpty(state.state_code)) {
      errors.is_invalid_state = true;
    }
    if (!zipcodeRegex.test(zip_code)) {
      errors.is_invalid_zip_code = true;
    }

    this.set('errors', errors);

    return errors;
  },

  validateEducationDetails() {
    let { qualification, institution_name } = this;
    let errors = {};

    if (isEmpty(qualification)) {
      errors.is_invalid_qualification = true;
    }
    if (isEmpty(institution_name)) {
      errors.is_invalid_institution_name = true;
    }

    this.set('errors', errors);

    return errors;
  }


});
