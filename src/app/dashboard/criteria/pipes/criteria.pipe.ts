import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'criteriaFormatter'
})
export class CriteriaPipe implements PipeTransform {

  transform(value: string): any {
    const criteria = value.replace('_', ' ');
    return criteria;
  }

}
