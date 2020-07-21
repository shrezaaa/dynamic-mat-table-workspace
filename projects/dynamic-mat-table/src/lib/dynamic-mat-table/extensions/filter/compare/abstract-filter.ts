export abstract class AbstractFilter<T = any> {
  public parameters?: [{value: T, text: string}]; // type variable is array because in future may be control have two or more parameters such as ranger[from, to]
  public type: 'and' | 'or';
  abstract selectedIndex: number;
  abstract readonly selectedValue: FilterOperation;
  abstract toString(dynamicVariable: any): string;
  abstract toPrint(): string;
  abstract toSql(): string;
  abstract getOperations(): FilterOperation[];
  public hasValue() {
    if (this.parameters !== null) {
      return this.parameters.filter( p => p.value != null && p.value !== undefined && p.value.toString() !== '').length > 0;
    }
  }
}

export  interface FilterOperation {
  predicate: string;
  text: string;
}
