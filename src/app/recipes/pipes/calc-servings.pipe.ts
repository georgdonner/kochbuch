import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcServings'
})
export class CalcServingsPipe implements PipeTransform {

  transform(value: string, origServings: number, newServings: number): string {
    // regex for german specific quantity units
    const multUnit_n = /\d\s?((prise|zehe|stange|dose|flasche|tasse|messerspitze)\w*)/i;
    const multUnit_en = /\d\s?((packung)\w*)/i;
    const glas = /\d\s?(glas|gläser)/i;
    // regex for pluralization of -e ending words (to -en)
    const name_e = /\w*e$/i;
    const name_en = /\w*en$/i;

    // get the quantity as a number (is -1 when there is none)
    let quantity: number = getQuantity();

    if (origServings === newServings) {
      if (quantity !== -1) {
        // check if String needs metric conversion
        value = convertMetrics(value);
        // there is a quantity to beautify
        return value.replace(getQuantityString(), beautifulNumber(quantity));
      }
      return value;
    }
    else {
      if (quantity !== -1) {
        // check if String needs metric conversion
        value = convertMetrics(value);
        // only calculate a new value if ingredient has a quantity
        var newQuantity: number = quantity * (newServings / origServings);
        value = value.replace(getQuantityString(), beautifulNumber(newQuantity));
        return adjustEnding(value);
      }
      else {
        return value;
      }
    }

    function getQuantity(): number {
      // check if there is a quantity
      const quantityCheck = value.match(/\d+(\.|\,|\/|\-)?\d*/i);
      if (quantityCheck == null) {
        return -1;
      }
      // check if the number is a fraction, such as 1/2
      const fractRegex = /\d+[\/]\d+/i;
      const fraction = value.match(fractRegex);
      // check if the number has a comma to be a decimal, such as 1,2
      const commaRegex = /\d+[,]\d+/i;
      const comma = value.match(commaRegex);
      // check if it's a number range, such as 1-2
      const rangeRegex = /\d+[-]\d+/i;
      const range = value.match(rangeRegex);
      // check if it's a regular int or float, such as 1 or 1.2
      const numRegex = /\d+\.?\d*/i;

      if (fraction != null) {
        const numerator: number = +fraction[0].match(/^\d/i)[0];
        const denominator: number = +fraction[0].match(/\d+$/i)[0];
        return numerator / denominator;
      }
      else if (comma != null) {
        const commaNum: number = +comma[0].replace(',','.');
        return commaNum;
      }
      else if (range != null) {
        const from: number = +range[0].match(/^\d/i)[0];
        const to: number = +range[0].match(/\d+$/i)[0];
        return (from + to) / 2;
      }
      else {
        // regular and valid number
        return +value.match(numRegex);
      }
    }

    function getQuantityString(): string {
      return value.match(/\d+(\.|\,|\/|\-)?\d*/i)[0];
    }

    function convertMetrics(ingr: string): string {
      // check if the unit is metric
      const validMetric = /\d+\s?(g|kg|ml|l)\s+/i;

      if (ingr.match(validMetric) == null) {
        return ingr;
      }
      else {
        const metricString = ingr.match(validMetric)[0];
        // calculate new quantity, because var quantity is not re-calculated yet
        const calculatedQuantity = quantity * (newServings / origServings);
        // check which unit and if new quantity reaches breakpoint
        if (metricString.match(/[^k][g]/i) && calculatedQuantity >= 1000) {
          quantity = quantity / 1000;
          return value.replace(/[g]/i, 'kg');
        }
        else if (metricString.match(/[k][g]/i) && calculatedQuantity < 1) {
          quantity = quantity * 1000;
          return value.replace(/[k][g]/i, 'g');
        }
        else if (metricString.match(/[m][l]/i) && calculatedQuantity >= 1000) {
          quantity = quantity / 1000;
          return value.replace(/[m][l]/i, 'l');
        }
        else if (metricString.match(/[^m][l]/i) && calculatedQuantity < 1) {
          quantity = quantity * 1000;
          return value.replace(/[l]/i, 'ml');
        }
        else {
          // quantity reaches no breakpoint
          return ingr;
        }
      }
    }

    function beautifulNumber(num: number): string {
      // convert number to a string that uses fraction symbols
      if (num % 1 === 0) {
        return num.toString();
      }
      const remainder: number = num % 1;
      const quotient: number = num - remainder;
      if (remainder === 0.25) {
        if (quotient !== 0) {
          return quotient.toString() + ' \xBC';
        }
        return '\xBC';
      }
      if (remainder === 0.5) {
        if (quotient !== 0) {
          return quotient.toString() + ' \xBD';
        }
        return ' \xBD';
      }
      if (remainder === 0.75) {
        if (quotient !== 0) {
          return quotient.toString() + ' \xBE';
        }
        return ' \xBE';
      }
      return num.toPrecision(3);
    }

    function adjustEnding(str: string) {
      if (str.match(multUnit_n) != null) {
        // quantity unit that pluralizes to -n
        let unit: string = str.match(multUnit_n)[1];
        if (isNowSingle()) {
          return str.replace(unit, unit.slice(0, -1));
        }
        else if (isNowMultiple()) {
          return str.replace(unit, unit + 'n');
        }
        return str;
      }
      else if (str.match(multUnit_en) != null) {
        // quantity unit that pluralizes to -en
        let unit: string = str.match(multUnit_en)[1];
        if (isNowSingle()) {
          return str.replace(unit, unit.slice(0, -2));
        }
        else if (isNowMultiple()) {
          return str.replace(unit, unit + 'en');
        }
        return str;
      }
      else if (str.match(glas) != null) {
        // special quantity unit: Glas
        let unit: string = str.match(glas)[1];
        if (isNowSingle()) {
          return str.replace(unit, 'Glas');
        }
        else if (isNowMultiple()) {
          return str.replace(unit, 'Gläser');
        }
        return str;
      }
      else if (str.match(name_e) != null) {
        // ingredient ending with -e (pluralize to -en)
        let name: string = str.match(name_e)[0];
        if (isNowMultiple()) {
          return str.replace(name, name + 'n');
        } else {
          return str;
        }
      }
      else if (str.match(name_en)){
        // ingredient ending with -en (singularize to -e)
        let name: string = str.match(name_en)[0];
        if (isNowSingle()) {
          return str.replace(name, name.slice(0, -1));
        } else {
          return str;
        }
      }
      else {
        // no word adjustment needed
        return str;
      }
    }

    function isNowSingle() {
      if (+quantity > 1 && newQuantity <= 1) {
        return true;
      } else {
        return false;
      }
    }

    function isNowMultiple() {
      if (+quantity <= 1 && newQuantity > 1) {
        return true;
      } else {
        return false;
      }
    }

  }

}
