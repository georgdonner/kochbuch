import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcServings'
})
export class CalcServingsPipe implements PipeTransform {

  transform(value: string, origServings: number, newServings: number): string {
    const quantityCheck = value.match(/\d+(\.|\,|\/)?\d*/i);
    const quantity: number = getQuantity(value);

    var multUnit_n = /\d\s?((prise|zehe|stange|dose|flasche|tasse|messerspitze)\w*)/i;
    var multUnit_en = /\d\s?((packung)\w*)/i;
    var glas = /\d\s?(glas|gläser)/i;
    var name_e = /\w*e$/i;
    var name_en = /\w*en$/i;

    if (origServings==newServings) {
      if (quantityCheck != null) {
        var quantityString: string = quantityCheck[0];
        return value.replace(quantityString, beautifulNumber(quantity));
      }
      return value;
    } 
    else {
      if (quantityCheck != null) {
        // just apply a new value when there is one
        var quantityString: string = quantityCheck[0];
        var newQuantity: number = quantity * (newServings/origServings);
        value = value.replace(quantityString, beautifulNumber(newQuantity));
      } else {
        return value;
      }
    }

    function getQuantity(value: string): number {
      const fractRegex = /\d+[\/]\d+/i;
      const fraction = value.match(fractRegex);
      const commaRegex = /\d+[,]\d+/i;
      const comma = value.match(commaRegex);
      const numRegex = /\d+\.?\d*/i;
      if (fraction != null) {
        const numerator: number = +fraction[0].match(/^\d/i)[0];
        const denominator: number = +fraction[0].match(/\d+$/i)[0];
        return numerator/denominator;
      }
      if (comma != null) {
        const commaNum: number = +comma[0].replace(',','.');
        return commaNum;
      }
      return +value.match(numRegex);
    }

    function beautifulNumber(num: number): string {
      if(num % 1 === 0) {
        return num.toLocaleString();
      }
      const remainder: number = num % 1;
      const quotient: number = num - remainder;
      if(remainder === 0.25) {
        if(quotient !== 0) {
          return quotient.toLocaleString() + " \xBC"
        }
        return "\xBC";
      }
      if(remainder === 0.5) {
        if(quotient !== 0) {
          return quotient.toLocaleString() + " \xBD"
        }
        return "\xBD";
      }
      if(remainder === 0.75) {
        if(quotient !== 0) {
          return quotient.toLocaleString() + " \xBE"
        }
        return "\xBE";
      }
      return num.toString();
    }

    if (value.match(multUnit_n)!=null){
      var unit: string = value.match(multUnit_n)[1];
      if(isNowSingle()) {
        return value.replace(unit, unit.slice(0,-1));
      }
      else if(isNowMultiple()) {
        return value.replace(unit, unit+'n');
      }
      return value;
    }
    else if(value.match(multUnit_en)!=null){
      var unit: string = value.match(multUnit_en)[1];
      if(isNowSingle()) {
        return value.replace(unit, unit.slice(0,-2));
      }
      else if(isNowMultiple()) {
        return value.replace(unit, unit+'en');
      }
      return value;
    }
    else if(value.match(glas)!=null){
      var unit: string = value.match(glas)[1];
      if(isNowSingle()) {
        return value.replace(unit, 'Glas');
      }
      else if(isNowMultiple()) {
        return value.replace(unit, 'Gläser');
      }
      return value;
    }
    else if (value.match(name_e)!=null){
      var name: string = value.match(name_e)[0];
      if (isNowMultiple()) {
        return value.replace(name, name+'n');
      } else {
        return value;
      }
    }
    else if (value.match(name_en)){
      var name: string = value.match(name_en)[0];
      if (isNowSingle()) {
        return value.replace(name, name.slice(0,-1));
      } else {
        return value;
      }
    }
    else {
      return value;
    }

    function isNowSingle() {
      if (+quantity>1 && newQuantity<=1) {
        return true;
      } else {
        return false;
      }
    }

    function isNowMultiple() {
      if (+quantity<=1 && newQuantity>1) {
        return true;
      } else {
        return false;
      }
    }

  }

}
