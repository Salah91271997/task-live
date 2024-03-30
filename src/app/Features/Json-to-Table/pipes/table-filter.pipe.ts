import { Pipe, PipeTransform } from '@angular/core';
import { JsonData } from '../interfaces/json-to-table';
import { FilterCriteria } from '../components/json-table/json-table.component';

@Pipe({
  name: 'tableFilter',
})
export class TableFilterPipe implements PipeTransform {
  transform(items: any[], criteria: { key: string; value: string }[]): any[] {
    console.log('Before filtering:', items); // Log items before filtering
    console.log('Criteria:', criteria);

    if (!items || !criteria || criteria.length === 0) {
      return items;
    }
    const filteredItems = items.filter((item) => {
      return criteria.every((filter) => {
        // Ensure `item` has an index signature that accepts a string
        const itemValue: string = item[filter.key];
        const lowerCaseItemValue = itemValue
          ? itemValue.toString().toLowerCase()
          : '';
        // Access `filter.value` using ['value']
        const lowerCaseFilterValue = filter['value'].toLowerCase();
        return lowerCaseItemValue.includes(lowerCaseFilterValue);
      });
    });
    console.log('After filtering:', filteredItems); // Log filtered items
    return filteredItems;
  }
}
