/**Generate by ASGENS
*@author Charlietyn 
*@date Wed May 17 21:42:06 GMT-04:00 2023  
*@time Wed May 17 21:42:06 GMT-04:00 2023  
*/
  import BaseModel from '@/core/base/base.model';

  import * as columns from './person.columns';

  import * as validation from './person.validation';

  const url = 'services/person';

    export default class Person extends BaseModel {

       id
       first_name
       last_name
       sex
       age
       email

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id = attributes.id|| undefined
        this.first_name = attributes.first_name|| null
        this.last_name = attributes.last_name|| null
        this.sex = attributes.sex|| null
        this.age = attributes.age|| null
        this.email = attributes.email|| null
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id = attributes.id
        this.first_name = attributes.first_name
        this.last_name = attributes.last_name
        this.sex = attributes.sex
        this.age = attributes.age
        this.email = attributes.email
      }
    }

    static validations = validation.validations

    static feedbacks = validation.feedbacks

  static columns = columns.columns

    static get url() {
      return url
    };
  
    get url() {
      return url
    };
  
    get_id() {
      return this.id;
    }
    class_name() {
        return 'Person'
      }
  

   }

