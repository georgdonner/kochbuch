webpackJsonp([1,5],{

/***/ 158:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 158;


/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(173);



__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_not_found_not_found_component__ = __webpack_require__(88);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var appRoutes = [
    {
        path: '',
        redirectTo: 'recipes',
        pathMatch: 'full'
    },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_2__components_not_found_not_found_component__["a" /* PageNotFoundComponent */] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(appRoutes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]
        ]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(345),
        styles: [__webpack_require__(246)]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_materialize__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_markdown__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_routing_module__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__recipes_recipes_module__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__svgicons_svg_icon_svg_icon_component__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_not_found_not_found_component__ = __webpack_require__(88);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_9__svgicons_svg_icon_svg_icon_component__["a" /* SvgIconComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_not_found_not_found_component__["a" /* PageNotFoundComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
            __WEBPACK_IMPORTED_MODULE_8__recipes_recipes_module__["a" /* RecipesModule */],
            __WEBPACK_IMPORTED_MODULE_7__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_4_ng2_materialize__["a" /* MaterializeModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_5_angular2_markdown__["a" /* MarkdownModule */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalcServingsPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CalcServingsPipe = (function () {
    function CalcServingsPipe() {
    }
    CalcServingsPipe.prototype.transform = function (value, origServings, newServings) {
        // regex for german specific quantity units
        var multUnit_n = /\d\s?((prise|zehe|stange|dose|flasche|tasse|messerspitze)\w*)/i;
        var multUnit_en = /\d\s?((packung)\w*)/i;
        var glas = /\d\s?(glas|gläser)/i;
        // regex for pluralization of -e ending words (to -en)
        var name_e = /\w*e$/i;
        var name_en = /\w*en$/i;
        // get the quantity as a number (is -1 when there is none)
        var quantity = getQuantity();
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
                var newQuantity = quantity * (newServings / origServings);
                value = value.replace(getQuantityString(), beautifulNumber(newQuantity));
                return adjustEnding(value);
            }
            else {
                return value;
            }
        }
        function getQuantity() {
            // check if there is a quantity
            var quantityCheck = value.match(/\d+(\.|\,|\/|\-)?\d*/i);
            if (quantityCheck == null) {
                return -1;
            }
            // check if the number is a fraction, such as 1/2
            var fractRegex = /\d+[\/]\d+/i;
            var fraction = value.match(fractRegex);
            // check if the number has a comma to be a decimal, such as 1,2
            var commaRegex = /\d+[,]\d+/i;
            var comma = value.match(commaRegex);
            // check if it's a number range, such as 1-2
            var rangeRegex = /\d+[-]\d+/i;
            var range = value.match(rangeRegex);
            // check if it's a regular int or float, such as 1 or 1.2
            var numRegex = /\d+\.?\d*/i;
            if (fraction != null) {
                var numerator = +fraction[0].match(/^\d/i)[0];
                var denominator = +fraction[0].match(/\d+$/i)[0];
                return numerator / denominator;
            }
            else if (comma != null) {
                var commaNum = +comma[0].replace(',', '.');
                return commaNum;
            }
            else if (range != null) {
                var from = +range[0].match(/^\d/i)[0];
                var to = +range[0].match(/\d+$/i)[0];
                return (from + to) / 2;
            }
            else {
                // regular and valid number
                return +value.match(numRegex);
            }
        }
        function getQuantityString() {
            return value.match(/\d+(\.|\,|\/|\-)?\d*/i)[0];
        }
        function convertMetrics(ingr) {
            // check if the unit is metric
            var validMetric = /\d+\s?(g|kg|ml|l)\s+/i;
            if (ingr.match(validMetric) == null) {
                return ingr;
            }
            else {
                var metricString = ingr.match(validMetric)[0];
                // calculate new quantity, because var quantity is not re-calculated yet
                var calculatedQuantity = quantity * (newServings / origServings);
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
        function beautifulNumber(num) {
            // convert number to a string that uses fraction symbols
            if (num % 1 === 0) {
                return num.toString();
            }
            var remainder = num % 1;
            var quotient = num - remainder;
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
        function adjustEnding(str) {
            if (str.match(multUnit_n) != null) {
                // quantity unit that pluralizes to -n
                var unit = str.match(multUnit_n)[1];
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
                var unit = str.match(multUnit_en)[1];
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
                var unit = str.match(glas)[1];
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
                var name = str.match(name_e)[0];
                if (isNowMultiple()) {
                    return str.replace(name, name + 'n');
                }
                else {
                    return str;
                }
            }
            else if (str.match(name_en)) {
                // ingredient ending with -en (singularize to -e)
                var name = str.match(name_en)[0];
                if (isNowSingle()) {
                    return str.replace(name, name.slice(0, -1));
                }
                else {
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
            }
            else {
                return false;
            }
        }
        function isNowMultiple() {
            if (+quantity <= 1 && newQuantity > 1) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    return CalcServingsPipe;
}());
CalcServingsPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'calcServings'
    })
], CalcServingsPipe);

//# sourceMappingURL=calc-servings.pipe.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DifficultyStringPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DifficultyStringPipe = (function () {
    function DifficultyStringPipe() {
    }
    DifficultyStringPipe.prototype.transform = function (difficulty) {
        switch (difficulty) {
            case 1:
                return 'Einfach';
            case 2:
                return 'Mittel';
            case 3:
                return 'Schwer';
            default:
                return 'Keine Info';
        }
    };
    return DifficultyStringPipe;
}());
DifficultyStringPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'difficultyString'
    })
], DifficultyStringPipe);

//# sourceMappingURL=difficulty-string.pipe.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterRecipesPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FilterRecipesPipe = (function () {
    function FilterRecipesPipe() {
    }
    FilterRecipesPipe.prototype.transform = function (recipes, query) {
        var filteredRecipes = filter(recipes, query);
        return filteredRecipes;
        function filter(toFilter, queryIn) {
            var queryArray = new Array();
            if (queryIn === '') {
                return toFilter;
            }
            else {
                queryArray = queryIn.split(',');
            }
            var filtered = new Array();
            toFilter.forEach(function (recipe) {
                var queryArrayTmp = queryArray.slice(0);
                queryArray.forEach(function (query) {
                    var hasIngredient = false;
                    recipe.ingredients.forEach(function (ingredient) {
                        if (ingredient.name.trim().toLowerCase().includes(query.trim().toLowerCase())) {
                            hasIngredient = true;
                        }
                    });
                    var hasCategory = false;
                    recipe.categories.forEach(function (category) {
                        if (category.trim().toLowerCase().includes(query.trim().toLowerCase())) {
                            hasCategory = true;
                        }
                    });
                    if (recipe.title.trim().toLowerCase().includes(query.trim().toLowerCase()) || hasIngredient || hasCategory) {
                        queryArrayTmp.splice(queryArrayTmp.indexOf(query), 1);
                    }
                    else if (query === '') {
                        queryArrayTmp.splice(queryArrayTmp.indexOf(''), 1);
                    }
                    else if (query === ' ') {
                        queryArrayTmp.splice(queryArrayTmp.indexOf(' '), 1);
                    }
                });
                if (queryArrayTmp.length === 0) {
                    filtered.push(recipe);
                }
            });
            return filtered;
        }
    };
    return FilterRecipesPipe;
}());
FilterRecipesPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'filterRecipes'
    })
], FilterRecipesPipe);

//# sourceMappingURL=filter-recipes.pipe.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoVeggiesPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var NoVeggiesPipe = (function () {
    function NoVeggiesPipe() {
    }
    NoVeggiesPipe.prototype.transform = function (categories) {
        var ctgCopy = categories.slice();
        var vgtIndex = ctgCopy.indexOf('Vegetarisch');
        if (vgtIndex !== -1) {
            ctgCopy.splice(vgtIndex, 1);
        }
        var vgnIndex = ctgCopy.indexOf('Vegan');
        if (vgnIndex !== -1) {
            ctgCopy.splice(vgnIndex, 1);
        }
        return ctgCopy;
    };
    return NoVeggiesPipe;
}());
NoVeggiesPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'noVeggies'
    })
], NoVeggiesPipe);

//# sourceMappingURL=no-veggies.pipe.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoundPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var RoundPipe = (function () {
    function RoundPipe() {
    }
    RoundPipe.prototype.transform = function (value, precision) {
        if (value % 1 === 0) {
            return value.toString();
        }
        else {
            return value.toPrecision(precision);
        }
    };
    return RoundPipe;
}());
RoundPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'round'
    })
], RoundPipe);

//# sourceMappingURL=round.pipe.js.map

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SortRecipesPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SortRecipesPipe = (function () {
    function SortRecipesPipe() {
    }
    SortRecipesPipe.prototype.transform = function (recipes, sortby, desc) {
        switch (sortby) {
            case 'cook-counter':
                recipes.sort(function (a, b) {
                    return a.cookCount - b.cookCount;
                });
                break;
            case 'duration':
                recipes.sort(function (a, b) {
                    return a.duration - b.duration;
                });
                break;
            case 'difficulty':
                recipes.sort(function (a, b) {
                    return a.difficulty - b.difficulty;
                });
                break;
            case 'ingredient-count':
                recipes.sort(function (a, b) {
                    return a.ingredients.length - b.ingredients.length;
                });
                break;
            case 'date':
                recipes.sort(function (a, b) {
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                });
                break;
            default:
                break;
        }
        if (desc) {
            recipes.reverse();
        }
        return recipes;
    };
    return SortRecipesPipe;
}());
SortRecipesPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'sortRecipes'
    })
], SortRecipesPipe);

//# sourceMappingURL=sort-recipes.pipe.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThumbnailPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ThumbnailPipe = (function () {
    function ThumbnailPipe() {
    }
    ThumbnailPipe.prototype.transform = function (url, width, height) {
        var newUrl;
        if (width === 0) {
            var h = 'h:' + height;
            newUrl = url.replace(url.match(/(w:\d+)/g)[0], h);
        }
        else if (height === 0) {
            newUrl = url.replace(/(w:\d+)/g, 'w:' + width);
        }
        else {
            newUrl = url.replace(/(w:\d+)/g, 'w:' + width + 'h:' + height);
        }
        return newUrl;
    };
    return ThumbnailPipe;
}());
ThumbnailPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'thumbnail'
    })
], ThumbnailPipe);

//# sourceMappingURL=thumbnail.pipe.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_recipe_details_recipe_details_component__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_recipe_form_recipe_form_component__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_recipe_list_recipe_list_component__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_recipe_edit_recipe_edit_component__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_recipe_print_recipe_print_component__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__guards_modify_recipes_guard__ = __webpack_require__(95);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipeRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var recipeRoutes = [
    { path: 'recipes', component: __WEBPACK_IMPORTED_MODULE_4__components_recipe_list_recipe_list_component__["a" /* RecipeListComponent */] },
    { path: 'recipes/new', component: __WEBPACK_IMPORTED_MODULE_3__components_recipe_form_recipe_form_component__["a" /* RecipeFormComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_7__guards_modify_recipes_guard__["a" /* ModifyRecipesGuard */]] },
    { path: 'recipe/:id', component: __WEBPACK_IMPORTED_MODULE_2__components_recipe_details_recipe_details_component__["a" /* RecipeDetailsComponent */] },
    { path: 'recipe/:id/edit', component: __WEBPACK_IMPORTED_MODULE_5__components_recipe_edit_recipe_edit_component__["a" /* RecipeEditComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_7__guards_modify_recipes_guard__["a" /* ModifyRecipesGuard */]] },
    { path: 'recipe/:id/print', component: __WEBPACK_IMPORTED_MODULE_6__components_recipe_print_recipe_print_component__["a" /* RecipePrintComponent */] }
];
var RecipeRoutingModule = (function () {
    function RecipeRoutingModule() {
    }
    return RecipeRoutingModule;
}());
RecipeRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(recipeRoutes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]
        ]
    })
], RecipeRoutingModule);

//# sourceMappingURL=recipes-routing.module.js.map

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_markdown__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngui_auto_complete__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngui_auto_complete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__ngui_auto_complete__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_dnd__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_page_scroll__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_materialize__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angular2_focus__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angular2_focus___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_angular2_focus__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng_inline_href__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng_inline_href___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_ng_inline_href__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_recipe_list_recipe_list_component__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_recipe_details_recipe_details_component__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_recipe_form_recipe_form_component__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_recipe_edit_recipe_edit_component__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_recipe_print_recipe_print_component__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_converter_converter_component__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_recipe_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_current_query_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_scroll_service__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__services_zauberwort_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__guards_modify_recipes_guard__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__recipes_routing_module__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pipes_calc_servings_pipe__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pipes_filter_recipes_pipe__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pipes_difficulty_string_pipe__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pipes_round_pipe__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pipes_sort_recipes_pipe__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pipes_thumbnail_pipe__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pipes_no_veggies_pipe__ = __webpack_require__(177);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipesModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























var RecipesModule = (function () {
    function RecipesModule() {
    }
    return RecipesModule;
}());
RecipesModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_21__recipes_routing_module__["a" /* RecipeRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_3_angular2_markdown__["a" /* MarkdownModule */],
            __WEBPACK_IMPORTED_MODULE_4__ngui_auto_complete__["NguiAutoCompleteModule"],
            __WEBPACK_IMPORTED_MODULE_7_ng2_materialize__["a" /* MaterializeModule */],
            __WEBPACK_IMPORTED_MODULE_5_ng2_dnd__["a" /* DndModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_6_ng2_page_scroll__["a" /* Ng2PageScrollModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_8_angular2_focus__["FocusModule"].forRoot()
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_9_ng_inline_href__["InlineHrefDirective"]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_11__components_recipe_details_recipe_details_component__["a" /* RecipeDetailsComponent */],
            __WEBPACK_IMPORTED_MODULE_12__components_recipe_form_recipe_form_component__["a" /* RecipeFormComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_recipe_list_recipe_list_component__["a" /* RecipeListComponent */],
            __WEBPACK_IMPORTED_MODULE_13__components_recipe_edit_recipe_edit_component__["a" /* RecipeEditComponent */],
            __WEBPACK_IMPORTED_MODULE_22__pipes_calc_servings_pipe__["a" /* CalcServingsPipe */],
            __WEBPACK_IMPORTED_MODULE_23__pipes_filter_recipes_pipe__["a" /* FilterRecipesPipe */],
            __WEBPACK_IMPORTED_MODULE_24__pipes_difficulty_string_pipe__["a" /* DifficultyStringPipe */],
            __WEBPACK_IMPORTED_MODULE_14__components_recipe_print_recipe_print_component__["a" /* RecipePrintComponent */],
            __WEBPACK_IMPORTED_MODULE_15__components_converter_converter_component__["a" /* ConverterComponent */],
            __WEBPACK_IMPORTED_MODULE_25__pipes_round_pipe__["a" /* RoundPipe */],
            __WEBPACK_IMPORTED_MODULE_26__pipes_sort_recipes_pipe__["a" /* SortRecipesPipe */],
            __WEBPACK_IMPORTED_MODULE_27__pipes_thumbnail_pipe__["a" /* ThumbnailPipe */],
            __WEBPACK_IMPORTED_MODULE_9_ng_inline_href__["InlineHrefDirective"],
            __WEBPACK_IMPORTED_MODULE_28__pipes_no_veggies_pipe__["a" /* NoVeggiesPipe */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_15__components_converter_converter_component__["a" /* ConverterComponent */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_16__services_recipe_service__["a" /* RecipeService */],
            __WEBPACK_IMPORTED_MODULE_17__services_current_query_service__["a" /* CurrentQueryService */],
            __WEBPACK_IMPORTED_MODULE_18__services_scroll_service__["a" /* ScrollService */],
            __WEBPACK_IMPORTED_MODULE_19__services_zauberwort_service__["a" /* ZauberwortService */],
            __WEBPACK_IMPORTED_MODULE_20__guards_modify_recipes_guard__["a" /* ModifyRecipesGuard */]
        ]
    })
], RecipesModule);

//# sourceMappingURL=recipes.module.js.map

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SvgIconComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SvgIconComponent = (function () {
    function SvgIconComponent() {
    }
    SvgIconComponent.prototype.ngOnInit = function () {
    };
    return SvgIconComponent;
}());
SvgIconComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'svg-icons',
        template: __webpack_require__(353),
        styles: [__webpack_require__(253)]
    }),
    __metadata("design:paramtypes", [])
], SvgIconComponent);

//# sourceMappingURL=svg-icon.component.js.map

/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipeService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RecipeService = (function () {
    function RecipeService(http) {
        this.http = http;
    }
    // Get all recipes from the API
    RecipeService.prototype.getAllRecipes = function () {
        return this.http.get('api/recipes')
            .map(function (res) { return res.json(); });
    };
    RecipeService.prototype.getRecipe = function (recipeId) {
        return this.http.get('api/recipe/' + recipeId)
            .map(function (res) { return res.json(); });
    };
    RecipeService.prototype.addRecipe = function (newRecipe) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('api/recipe', JSON.stringify(newRecipe), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    RecipeService.prototype.deleteRecipe = function (recipeId) {
        return this.http.delete('api/recipe/' + recipeId)
            .map(function (res) { return res.json(); });
    };
    RecipeService.prototype.updateRecipe = function (updRecipe) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.put('api/recipe/' + updRecipe._id, JSON.stringify(updRecipe), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    return RecipeService;
}());
RecipeService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], RecipeService);

var _a;
//# sourceMappingURL=recipe.service.js.map

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, ".fullwidth {\r\n    width: 100%;\r\n}\r\n\r\n.top-section {\r\n    padding: 2.5rem .5rem;\r\n}\r\n\r\n.back {\r\n    z-index: 10000;\r\n    position: absolute;\r\n    right: 5px;\r\n    top: 5px;\r\n    padding: 0.5rem;\r\n    font-size: 2.5rem;\r\n    transition: all 200ms ease;\r\n    border-radius: 50%;\r\n    background: rgba(255, 255, 255, 0.2);\r\n}\r\n\r\n.difficulty-rating {\r\n    z-index: 10000;\r\n    position: absolute;\r\n    left: 5px;\r\n    top: 5px;\r\n    padding: 0.5rem;\r\n}\r\n\r\n.difficulty-rating i {\r\n    font-size: 2.5rem;\r\n    display: block;\r\n    margin-bottom: .5rem;\r\n}\r\n\r\n.quickinfo-wrapper {\r\n    width: 100%;\r\n}\r\n\r\n.quickinfo-wrapper .row {\r\n    margin-bottom: 0;\r\n}\r\n\r\n.quickinfo {\r\n    padding: 50px 20px;\r\n    max-width: 1600px;\r\n}\r\n\r\n.recipe-title {\r\n    font-weight: 300;\r\n    text-align: center;\r\n    margin: 0;\r\n    margin-top: 2rem;\r\n}\r\n\r\n.ingredient-count, .minutes {\r\n    line-height: 32px;\r\n    font-size: 22px;\r\n    font-weight: 300;\r\n    display: inline;\r\n    width: 50%;\r\n}\r\n\r\n.ingredient-count {\r\n    border-right: 1px #777 solid;\r\n    padding-right: 19px;\r\n}\r\n\r\n.minutes {\r\n    padding-left: 20px;\r\n}\r\n\r\n.minutes .number, .ingredient-count .number {\r\n    padding-right: 12px;\r\n}\r\n\r\n.number {\r\n    font-size: 32px;\r\n    vertical-align: top;\r\n}\r\n\r\n.categories {\r\n    font-size: 22px;\r\n    text-align: center;\r\n    color: #333;\r\n}\r\n\r\n.main-content {\r\n    padding-top: 50px;\r\n    padding-bottom: 50px;\r\n}\r\n\r\n.big-border {\r\n    width: 66.66%;\r\n    border-bottom: 1px #ddd solid;\r\n}\r\n\r\n.small-border {\r\n    width: 33.33%;\r\n    margin-top: .75rem;\r\n    border-bottom: 1px #f2f2f2 solid;\r\n}\r\n\r\n.ingredient {\r\n    font-size: 18px;\r\n    margin-top: .75rem;\r\n}\r\n\r\n.ingredient > span {\r\n    padding-left: .5rem;\r\n}\r\n\r\n.servings-input {\r\n    float: right;\r\n    margin-right: 33.33%;\r\n}\r\n\r\n\r\n.servings-input i {\r\n    transition: all 0.2s ease;\r\n    padding: .5rem;\r\n}\r\n\r\n.servings-input i:hover {\r\n    background: rgba(200,200,200,0.3);\r\n    border-radius: 50%;\r\n}\r\n\r\n.servings {\r\n    padding: 0 .75rem;\r\n    font-weight: 300;\r\n    font-size: 3rem;\r\n}\r\n\r\n.description {\r\n    font-size: 18px;\r\n}\r\n\r\n@media only screen and (max-width: 1200px) {\r\n    .big-border {\r\n        width: 100%\r\n    }\r\n    .servings-input {\r\n        margin-right: 0;\r\n    }\r\n    .title-wrapper.center {\r\n        display: none;\r\n    }\r\n    .title-wrapper.top {\r\n        display: block;\r\n        padding-bottom: 30px;\r\n    }\r\n}\r\n\r\n\r\n@media only screen and (max-width: 992px) {\r\n    .quickinfo .col, .categories {\r\n        text-align: center !important;\r\n    }\r\n\r\n    .categories {\r\n        padding-top: 30px;\r\n    }\r\n}\r\n\r\n@media only screen and (max-width: 767px) {\r\n    .top-section {\r\n        padding-top: 3.33rem;\r\n    }\r\n    .back, .difficulty-rating i {\r\n        font-size: 1.5rem;\r\n        display: inline-block;\r\n    }\r\n    .recipe-title {\r\n        font-size: 1.75rem;\r\n    }\r\n    .row.quickinfo {\r\n        padding-top: 2rem;\r\n        padding-bottom: 2rem;\r\n    }\r\n    .number {\r\n        font-size: 24px;\r\n    }\r\n    .number-caption {\r\n        font-size: 18px;\r\n    }\r\n    .categories {\r\n        padding-top: 1rem;\r\n    }\r\n    .main-content {\r\n        padding-top: 25px;\r\n    }\r\n    .ingredients .ingredient {\r\n        font-size: 16px;\r\n    }\r\n    .description {\r\n        font-size: 16px;\r\n    }\r\n}\r\n\r\n@media only screen and (min-width: 1201px) {\r\n    .quickinfo {\r\n        display: -ms-flexbox;\r\n        display: -webkit-box;\r\n        display: flex;\r\n        -ms-flex-align: center;\r\n        -webkit-box-align: center;\r\n        align-items: center;\r\n    }\r\n    .title-wrapper.center {\r\n        display: block;\r\n    }\r\n    .title-wrapper.top {\r\n        display: none;\r\n    }\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, ".icon-trash {\r\n  width: 0.7857142857142857em;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "#search {\r\n    height: 100%;\r\n    margin-bottom: 0;\r\n}\r\n\r\n.controls {\r\n    padding: 2rem 0;\r\n    padding-bottom: 0;\r\n}\r\n\r\n.veggie-options {\r\n    margin-bottom: 2rem;\r\n}\r\n\r\n.sort, .veggie-options {\r\n    padding-top: 1.5rem;\r\n}\r\n\r\n@media only screen and (max-width: 387px) {\r\n    .sort {\r\n        padding-top: 0;\r\n    }\r\n}\r\n\r\n.switch {display: inline-block;}\r\n.switch label {font-size: 18px;color: #333;}\r\n.switch .lever {margin-top: -4px;}\r\n.switch label input[type=checkbox]:checked + .lever:after {background-color: #5c6bc0;}\r\n.switch label input[type=checkbox]:checked + .lever {background-color: #3f51b5;}\r\n\r\n.sort-icon {\r\n    font-size: 32px;\r\n}\r\n\r\n.sort-active {\r\n    color: #3f51b5;\r\n}\r\n\r\n.categories {\r\n    font-size: 12px;\r\n    text-transform: uppercase;\r\n    min-height: 17.6px;\r\n}\r\n\r\n.categories > div {\r\n    display: inline-block;\r\n    padding-right: .5rem;\r\n}\r\n\r\n.recipe-title {\r\n    font-weight: 300;\r\n    color: black;\r\n    padding-bottom: 1rem;\r\n    padding-top: .5rem;\r\n}\r\n\r\n.img-container {\r\n    position: relative;\r\n}\r\n\r\n.card-title.recipe-quickinfo {\r\n    width: 100% !important; \r\n    padding-left: 12px !important; \r\n    padding-bottom: 8px !important; \r\n    height: 68px !important;\r\n    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75));\r\n}\r\n\r\n.card-image > img {\r\n    height: 250px;\r\n    -o-object-fit: cover;\r\n       object-fit: cover;\r\n}\r\n\r\n.veggie {\r\n    display: inline-block !important;\r\n    width: 24px !important;\r\n}\r\n\r\n.minutes {\r\n    font-size: 14px;\r\n    position: absolute;\r\n    bottom: 14px;\r\n    right: 12px;\r\n}\r\n\r\n.timer-icon {\r\n    font-size: 20px;\r\n    margin-right: .5rem;\r\n}\r\n\r\n.new-recipe {\r\n    position: fixed;\r\n    right: 50px;\r\n    bottom: 50px;\r\n    z-index: 1000;\r\n}\r\n\r\n.filter {\r\n    position: fixed;\r\n    right: 50px;\r\n    bottom: 50px;\r\n    z-index: 1000;\r\n}\r\n\r\n@media only screen and (max-width: 767px) {\r\n    .new-recipe {\r\n        right: 20px;\r\n        bottom: 20px;\r\n    }\r\n\r\n    .filter {\r\n        right: 20px;\r\n        bottom: 20px;\r\n    }\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, ".icon {\r\n  display: inline-block;\r\n  width: 1em;\r\n  height: 1em;\r\n  stroke-width: 0;\r\n  stroke: currentColor;\r\n  fill: currentColor;\r\n}\r\n.icon-clock-o {\r\n  width: 0.8571428571428571em;\r\n}\r\n.icon-user {\r\n  width: 0.7142857142857142em;\r\n}\r\n.icon-trash {\r\n  width: 0.7857142857142857em;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 345:
/***/ (function(module, exports) {

module.exports = "<svg-icons></svg-icons>\r\n<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ 346:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <h1 class=\"display-4 mt-5 text-center\">Diese Seite wurde wohl herausgerissen :(</h1>\r\n</div>\r\n"

/***/ }),

/***/ 347:
/***/ (function(module, exports) {

module.exports = "<mz-modal [fixedFooter]=\"true\">\r\n  <mz-modal-header>\r\n    Umrechner\r\n  </mz-modal-header>\r\n  <mz-modal-content>\r\n    <div class=\"row\">\r\n      <mz-input-container class=\"col s6\">\r\n        <input mz-input label=\"ml (Milliliter)\" type=\"number\" [ngModel]=\"quantity | round:3\" (ngModelChange)=\"quantity=$event\">\r\n      </mz-input-container>\r\n      <mz-input-container class=\"col s6\">\r\n        <input mz-input label=\"l (Liter)\" type=\"number\" name=\"l\" [ngModel]=\"quantity/1000 | round:3\" (ngModelChange)=\"quantity=$event*1000\">\r\n      </mz-input-container>\r\n      <mz-input-container class=\"col s6\">\r\n        <input mz-input label=\"TL (Teelöffel)\" type=\"number\" name=\"tl\" [ngModel]=\"quantity/5 | round:3\" (ngModelChange)=\"quantity=$event*5\">\r\n      </mz-input-container>\r\n      <mz-input-container class=\"col s6\">\r\n        <input mz-input label=\"EL (Esslöffel)\" type=\"number\" name=\"el\" [ngModel]=\"quantity/15 | round:3\" (ngModelChange)=\"quantity=$event*15\">\r\n      </mz-input-container>\r\n      <mz-input-container class=\"col s6\">\r\n        <input mz-input label=\"kleine Tasse\" type=\"number\" name=\"kleine-tasse\" [ngModel]=\"quantity/125 | round:3\" (ngModelChange)=\"quantity=$event*125\">\r\n      </mz-input-container>\r\n      <mz-input-container class=\"col s6\">\r\n        <input mz-input label=\"große Tasse\" type=\"number\" name=\"grosse-tasse\" [ngModel]=\"quantity/200 | round:3\" (ngModelChange)=\"quantity=$event*200\">\r\n      </mz-input-container>\r\n      <mz-input-container class=\"col s6\">\r\n        <input mz-input label=\"Cup (amerik.)\" type=\"number\" name=\"cup\" [ngModel]=\"quantity/250 | round:3\" (ngModelChange)=\"quantity=$event*250\">\r\n      </mz-input-container>\r\n    </div>\r\n  </mz-modal-content>\r\n  <mz-modal-footer>\r\n    <button mz-button [flat]=\"true\" mz-modal-close>Schließen</button>\r\n  </mz-modal-footer>\r\n</mz-modal>\r\n"

/***/ }),

/***/ 348:
/***/ (function(module, exports) {

module.exports = "<div class=\"container top-section\" *ngIf=\"recipe && recipe.heroImage\">\r\n  <div class=\"center-align\">\r\n    <img class=\"responsive-img\" src=\"{{recipe.heroImage}}\" alt=\"{{recipe.title}}\" style=\"border-radius: 2.5%; max-height: 400px;\">\r\n    <h3 class=\"recipe-title\">{{ recipe.title }}</h3>\r\n  </div>\r\n</div>\r\n\r\n<i class=\"material-icons back grey-text text-darken-4 click\" (click)=\"gotoRecipes()\">close</i>\r\n\r\n<div *ngIf=\"recipe\" class=\"difficulty-rating\">\r\n  <i class=\"material-icons grey-text text-darken-4\" *ngFor=\"let i of Arr(recipe.difficulty).fill(1)\">star_border</i>\r\n</div>\r\n\r\n<div class=\"animated fadeIn\" *ngIf=\"recipe\">\r\n  <div class=\"quickinfo-wrapper grey lighten-4\">\r\n    <div class=\"container\">\r\n      <div class=\"row quickinfo\">\r\n        <div class=\"col s12 l6 center-align\">\r\n          <div class=\"center-align ingredient-count\">\r\n              <span class=\"number indigo-text\">{{ recipe.ingredients.length }}</span><span class=\"number-caption\">Zutaten</span>\r\n          </div>\r\n          <div class=\"center-align minutes\">\r\n            <span class=\"number indigo-text\">{{ recipe.duration }}</span><span class=\"number-caption\">Minuten</span>\r\n          </div>\r\n        </div>\r\n        <div class=\"col s12 l6\">\r\n          <div class=\"categories\">\r\n            <div class=\"chip\" *ngFor=\"let ctg of recipe.categories\">{{ ctg }}</div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\">\r\n    <div class=\"row main-content\">\r\n      <div class=\"ingredients-wrapper col s12 m6\">\r\n        <h4>\r\n          <span>Zutaten</span>\r\n          <span class=\"servings-input grey-text text-darken-4\">\r\n            <i class=\"material-icons click\" (click)=\"removeServing()\">remove</i>\r\n            <span class=\"servings\">{{ desiredServings }}</span>\r\n            <i class=\"material-icons click\" (click)=\"addServing()\">add</i>\r\n          </span>\r\n        </h4>\r\n        <div class=\"big-border\"></div>\r\n        <ul class=\"ingredients\">\r\n          <li class=\"ingredient\" *ngFor=\"let ingredient of recipe.ingredients\">\r\n            <span>\r\n              {{ ingredient.name | calcServings:recipe.servings:desiredServings }}\r\n              <span *ngIf=\"ingredient.hint\">({{ ingredient.hint }})</span>\r\n            </span>\r\n            <div class=\"small-border\"></div>\r\n          </li>\r\n        </ul>\r\n        <div class=\"center-align\" style=\"margin: 3rem;\">\r\n          <button mz-button class=\"indigo\" (click)=\"converter()\">Umrechner</button>\r\n        </div>\r\n      </div>\r\n      <div class=\"col s12 m6\">\r\n        <h4>Zubereitung</h4>\r\n        <div class=\"big-border\"></div>\r\n        <markdown *ngIf=\"recipe.description\" class=\"description\">{{ recipe.description }}</markdown>\r\n        <img #descrImage *ngIf=\"recipe.descrImage\" src=\"{{recipe.descrImage}}\"\r\n            alt=\"Recipe description\" class=\"responsive-img\">\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col s12\" *ngIf=\"isLoggedIn()\">\r\n        <div class=\"center-align\" style=\"margin-top: 3rem;\">\r\n          <button mz-button class=\"indigo\" (click)=\"edit()\">Bearbeiten</button>\r\n        </div>\r\n      </div>\r\n      <div class=\"col s12\">\r\n        <div class=\"center-align\" style=\"margin: 1rem 0;\">\r\n          <button mz-button class=\"indigo\" (click)=\"printView()\">Druckansicht</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 349:
/***/ (function(module, exports) {

module.exports = "<div class=\"container animated fadeIn\">\r\n  <form #recipeForm=\"ngForm\">\r\n    <div *ngIf=\"recipe\">\r\n    <h1 class=\"center-align\">{{ recipe.title }}</h1>\r\n    <hr>\r\n    <img *ngIf=\"recipe.heroImage\" class=\"responsive-img\" src=\"{{recipe.heroImage}}\" alt=\"{{recipe.title}}\">\r\n    <div class=\"row\">\r\n      <mz-input-container class=\"col s12 l9\">\r\n        <input mz-input\r\n          required \r\n          #title=\"ngModel\"\r\n          [(ngModel)]=\"recipe.title\"\r\n          [validate]=\"true\"\r\n          id=\"title\"\r\n          name=\"title\"\r\n          placeholder=\"Titel\"\r\n          type=\"text\">\r\n      </mz-input-container>\r\n      <div class=\"col s12 l3 center-align\">\r\n        <button class=\"waves-effect waves-light btn click indigo hero-image\" type=\"button\" (click)=\"showHeroPicker()\">Titelbild</button>\r\n      </div>\r\n      <div [hidden]=\"title.valid || title.pristine\" class=\"red-text col s6\">Das Rezept muss einen Titel haben</div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col s6\">\r\n        <mz-input-container>\r\n          <i mz-icon mz-input-prefix [icon]=\"'person'\"></i>\r\n          <input mz-input [(ngModel)]=\"recipe.servings\" [label]=\"'Portionen'\" \r\n            id=\"servings\" name=\"servings\"  type=\"number\">\r\n        </mz-input-container>\r\n      </div>\r\n      <div class=\"col s6\">\r\n        <mz-input-container>\r\n          <i mz-icon mz-input-prefix [icon]=\"'timer'\"></i>\r\n          <input mz-input [(ngModel)]=\"recipe.duration\" [label]=\"'Minuten'\" \r\n            id=\"duration\" name=\"duration\"  type=\"number\">\r\n        </mz-input-container>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"row toggles\">\r\n      <div class=\"col s12 m6 center-align\" style=\"margin-top: 1.rem;\">\r\n        <div role=\"group\" aria-label=\"...\">\r\n          <button type=\"button\" class=\"waves-effect waves-light btn indigo lighten-3 click\" \r\n            [ngClass]=\"{'difficulty-active':recipe.difficulty==1}\" (click)=\"recipe.difficulty=1\">Einfach</button>\r\n          <button type=\"button\" class=\"waves-effect waves-light btn indigo lighten-3 click\" \r\n            [ngClass]=\"{'difficulty-active':recipe.difficulty==2}\" (click)=\"recipe.difficulty=2\">Mittel</button>\r\n          <button type=\"button\" class=\"waves-effect waves-light btn indigo lighten-3 click\" \r\n            [ngClass]=\"{'difficulty-active':recipe.difficulty==3}\" (click)=\"recipe.difficulty=3\">Schwer</button>\r\n        </div>\r\n      </div>\r\n      <div class=\"col s12 m6 veggies center-align\">\r\n        <mz-checkbox-container class=\"veggie-option\">\r\n          <input mz-checkbox\r\n            [label]=\"'Vegetarisch'\"\r\n            name=\"vegetarian\"\r\n            id=\"vegetarian\"\r\n            [(ngModel)]=\"vegetarian\"\r\n            type=\"checkbox\">\r\n        </mz-checkbox-container>\r\n        <mz-checkbox-container class=\"veggie-option\">\r\n          <input mz-checkbox\r\n            [label]=\"'Vegan'\"\r\n            name=\"vegan\"\r\n            id=\"vegan\"\r\n            [(ngModel)]=\"vegan\"\r\n            type=\"checkbox\">\r\n        </mz-checkbox-container>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n      <h4 class=\"section-title\">Zutaten</h4>\r\n      <div class=\"ingredients col s12\" dnd-sortable-container [sortableData]=\"ingredients\">\r\n        <div class=\"ingredient\" *ngFor=\"let ingr of recipe.ingredients; let i = index\" dnd-sortable [sortableIndex]=\"i\">\r\n          <div *ngIf=\"ingr.name != ''\">\r\n            {{ ingr.name }} <span *ngIf=\"ingr.hint!=''\"> ({{ ingr.hint }})</span>\r\n            <i class=\"material-icons click edit\" (click)=\"editIngredient(i); editModal.open()\">edit</i>\r\n            <i class=\"material-icons click\" (click)=\"removeIngredient(ingr)\">close</i>\r\n            <div class=\"small-border\"></div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col s12 m6\">\r\n        <mz-input-container class=\"col s12\">\r\n          <input mz-input [(ngModel)]=\"newIngredient.name\" [label]=\"'Name'\" (keyup.enter)=\"addIngredient()\"\r\n            id=\"ingrName\" name=\"ingrName\" type=\"text\" placeholder=\"Enter drücken zum Hinzufügen\" #ingredient>\r\n        </mz-input-container>\r\n      </div>\r\n      <div class=\"col s12 m6\">\r\n        <mz-input-container class=\"col s12\">\r\n          <input mz-input [(ngModel)]=\"newIngredient.hint\" [label]=\"'Hinweis'\" (keyup.enter)=\"addIngredient(); ingredient.focus()\"\r\n            id=\"ingrHint\" name=\"ingrHint\" type=\"text\" placeholder=\"Klammern werden automatisch gesetzt\">\r\n        </mz-input-container>\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <h4 class=\"section-title info\">\r\n        <span>Info</span>\r\n        <i class=\"material-icons click\" (click)=\"markdownModal.open()\">help</i>\r\n      </h4>\r\n      <ul class=\"preview-toggle\">\r\n        <li class=\"toggle-control click grey-text text-darken-4\" (click)=\"setPreview(false)\" [ngClass]=\"{'active':!mdPreview}\">Text</li>\r\n        <li class=\"toggle-control click grey-text text-darken-4\" (click)=\"setPreview(true)\" [ngClass]=\"{'active':mdPreview}\">Vorschau</li>\r\n      </ul>\r\n      <div class=\"col s12\" id=\"description\" *ngIf=\"!mdPreview\">\r\n        <mz-textarea-container>\r\n          <textarea mz-textarea\r\n            [label]=\"'Beschreibung'\" \r\n            [(ngModel)]=\"recipe.description\"\r\n            id=\"description\" name=\"description\"\r\n            placeholder=\"Markdown für Styling verfügbar, mehr Info auf dem Hilfe-Button\"\r\n            data-original-height=\"0\">\r\n          </textarea>\r\n        </mz-textarea-container>\r\n      </div>\r\n      <div class=\"col s12\" id=\"preview\" style=\"min-height: 124px;\" *ngIf=\"mdPreview\">\r\n        <markdown [data]=\"recipe.description\"></markdown>\r\n      </div>\r\n      <div class=\"col s12 center-align\">\r\n        <button type=\"button\" class=\"waves-effect waves-light btn indigo click\" (click)=\"showDescPicker()\">Anleitung Hochladen</button>\r\n      </div>\r\n      <img *ngIf=\"recipe && recipe.descrImage\" class=\"responsive-img\" src=\"{{recipe.descrImage}}\" alt=\"Recipe description\">\r\n    </div>\r\n    <div class=\"row\">\r\n      <h4 class=\"section-title categories\">Kategorien</h4>\r\n      <div class=\"chip\" style=\"display: inline-block;\" *ngIf=\"vegetarian\">\r\n        Vegetarisch\r\n        <i class=\"close material-icons\" (click)=\"vegetarian=false;\">close</i>\r\n      </div>\r\n      <div class=\"chip\" style=\"display: inline-block;\" *ngIf=\"vegan\">\r\n        Vegan\r\n        <i class=\"close material-icons\" (click)=\"vegan=false;\">close</i>\r\n      </div>\r\n      <div class=\"chip\" *ngFor=\"let ctg of categories\" style=\"display: inline-block;\">\r\n        {{ ctg }}\r\n        <i class=\"close material-icons\" (click)=\"removeCategory(ctg)\">close</i>\r\n      </div>\r\n      <mz-input-container class=\"col s12\" *ngIf=\"recipes\">\r\n        <input mz-input #category\r\n          [label]=\"'Neue Kategorie'\"\r\n          placeholder=\"Enter drücken zum Hinzufügen\"\r\n          [autocomplete]=\"autocomplete\"\r\n          autocomplete=\"off\"\r\n          id=\"category\"\r\n          type=\"text\"\r\n          (keyup.enter)=\"addCategory(category.value); category.value=''\">\r\n      </mz-input-container>\r\n      <div class=\"col s12 center-align\" style=\"margin-top: 2rem;\">\r\n        <button type=\"button\" (click)=\"save();\" class=\"waves-effect waves-light btn-large indigo\" [disabled]=\"!recipeForm.form.valid\">Rezept speichern</button>\r\n      </div>\r\n    </div>\r\n    </div>\r\n  </form>\r\n</div>\r\n\r\n\r\n<mz-modal #editModal [options]=\"editModalOptions\">\r\n  <mz-modal-header>\r\n    Bearbeiten\r\n  </mz-modal-header>\r\n  <mz-modal-content>\r\n    <br>\r\n    <mz-input-container class=\"col s12\" *ngIf=\"editIngr.name\">\r\n      <input mz-input [(ngModel)]=\"editIngr.name\" [label]=\"'Name'\" \r\n        id=\"editName\" name=\"editName\" type=\"text\">\r\n    </mz-input-container>\r\n    <mz-input-container class=\"col s12\" *ngIf=\"editIngr.hint\">\r\n      <input mz-input [(ngModel)]=\"editIngr.hint\" [label]=\"'Hinweis'\" \r\n        id=\"editHint\" name=\"editHint\" type=\"text\">\r\n    </mz-input-container>\r\n  </mz-modal-content>\r\n  <mz-modal-footer>\r\n    <button mz-button [flat]=\"true\" mz-modal-close>Speichern</button>\r\n  </mz-modal-footer>\r\n</mz-modal>\r\n\r\n<mz-modal #markdownModal>\r\n  <mz-modal-header>\r\n    Was ist Markdown?\r\n  </mz-modal-header>\r\n  <mz-modal-content>\r\n    <p class=\"flow-text\">\r\n      Mit Markdown kann man sehr einfach und schnell Text formatieren, hier einige Beispiele:\r\n      <br>\r\n      <br>\r\n      **Zwei Sterne** für <strong>fette</strong> Schrift\r\n      <br>\r\n      <br>\r\n      *Einen Stern* für <em>kursive</em> Schrift\r\n      <br>\r\n      <br>\r\n      Eine leere Zeile Platz\r\n      <br>\r\n      <br>\r\n      lassen für einen Absatz\r\n      <br>\r\n      <br>\r\n      [Ich bin ein Link Titel](http://www.google.com) wird zu <a href=\"http://www.google.com\">Ich bin ein Link Titel</a>\r\n      <br>\r\n      <br>\r\n      Links werden jedoch auch automatisch erkannt: <a href=\"http://www.google.com\">http://www.google.com</a>\r\n      <br>\r\n      <br>\r\n      Eine vollständige Übersicht über die Markdown-Syntax gibt es <a href=\"https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet\">hier</a>.\r\n    </p>\r\n  </mz-modal-content>\r\n  <mz-modal-footer>\r\n    <button mz-button [flat]=\"true\" mz-modal-close>Schließen</button>\r\n  </mz-modal-footer>\r\n</mz-modal>"

/***/ }),

/***/ 350:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"model\" class=\"container animated fadeIn\">\r\n  <form #recipeForm=\"ngForm\">\r\n    <h1 class=\"center-align\">{{ model.title }}</h1>\r\n    <hr>\r\n    <div class=\"row\">\r\n      <mz-input-container class=\"col s12 l9\">\r\n        <input mz-input\r\n          required \r\n          #title=\"ngModel\"\r\n          [(ngModel)]=\"model.title\"\r\n          [validate]=\"true\"\r\n          id=\"title\"\r\n          name=\"title\"\r\n          placeholder=\"Titel\"\r\n          type=\"text\">\r\n      </mz-input-container>\r\n      <div class=\"col s12 l3 center-align\">\r\n        <button class=\"waves-effect waves-light btn click indigo hero-image\" type=\"button\" (click)=\"showHeroPicker()\">Titelbild</button>\r\n      </div>\r\n      <div [hidden]=\"title.valid || title.pristine\" class=\"red-text col s6\">Das Rezept muss einen Titel haben</div>\r\n      <div class=\"col s6 right-align red-text\" *ngIf=\"model.heroImage\"> \"{{ heroFilename }}\" wurde erfolgreich hochgeladen!</div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col s6\">\r\n        <mz-input-container>\r\n          <i mz-icon mz-input-prefix [icon]=\"'person'\"></i>\r\n          <input mz-input [(ngModel)]=\"model.servings\" [label]=\"'Portionen'\" \r\n            id=\"servings\" name=\"servings\"  type=\"number\">\r\n        </mz-input-container>\r\n      </div>\r\n      <div class=\"col s6\">\r\n        <mz-input-container>\r\n          <i mz-icon mz-input-prefix [icon]=\"'timer'\"></i>\r\n          <input mz-input [(ngModel)]=\"model.duration\" [label]=\"'Minuten'\" \r\n            id=\"duration\" name=\"duration\"  type=\"number\">\r\n        </mz-input-container>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"row toggles\">\r\n      <div class=\"col s12 m6 center-align\" style=\"margin-top: 1.rem;\">\r\n        <div role=\"group\" aria-label=\"...\">\r\n          <button type=\"button\" class=\"waves-effect waves-light btn indigo lighten-3 click\" \r\n            [ngClass]=\"{'difficulty-active':model.difficulty==1}\" (click)=\"model.difficulty=1\">Einfach</button>\r\n          <button type=\"button\" class=\"waves-effect waves-light btn indigo lighten-3 click\" \r\n            [ngClass]=\"{'difficulty-active':model.difficulty==2}\" (click)=\"model.difficulty=2\">Mittel</button>\r\n          <button type=\"button\" class=\"waves-effect waves-light btn indigo lighten-3 click\" \r\n            [ngClass]=\"{'difficulty-active':model.difficulty==3}\" (click)=\"model.difficulty=3\">Schwer</button>\r\n        </div>\r\n      </div>\r\n      <div class=\"col s12 m6 veggies center-align\">\r\n        <mz-checkbox-container class=\"veggie-option vegetarian\">\r\n          <input mz-checkbox\r\n            [label]=\"'Vegetarisch'\"\r\n            name=\"vegetarian\"\r\n            id=\"vegetarian\"\r\n            [(ngModel)]=\"vegetarian\"\r\n            type=\"checkbox\">\r\n        </mz-checkbox-container>\r\n        <mz-checkbox-container class=\"veggie-option vegan\">\r\n          <input mz-checkbox\r\n            [label]=\"'Vegan'\"\r\n            name=\"vegan\"\r\n            id=\"vegan\"\r\n            [(ngModel)]=\"vegan\"\r\n            type=\"checkbox\">\r\n        </mz-checkbox-container>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n      <h4 class=\"section-title\">Zutaten</h4>\r\n      <div class=\"ingredients col s12\" dnd-sortable-container [sortableData]=\"ingredients\">\r\n        <div class=\"ingredient\" *ngFor=\"let ingr of ingredients; let i = index\" dnd-sortable [sortableIndex]=\"i\">\r\n          <div *ngIf=\"ingr.name != ''\">\r\n            {{ ingr.name }} <span *ngIf=\"ingr.hint!=''\"> ({{ ingr.hint }})</span>\r\n            <i class=\"material-icons click edit\" (click)=\"editIngredient(i); editModal.open()\">edit</i>\r\n            <i class=\"material-icons click\" (click)=\"removeIngredient(ingr)\">close</i>\r\n            <div class=\"small-border\"></div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col s12 m6\">\r\n        <mz-input-container class=\"col s12\">\r\n          <input mz-input [(ngModel)]=\"newIngredient.name\" [label]=\"'Name'\" (keyup.enter)=\"addIngredient()\"\r\n            id=\"ingrName\" name=\"ingrName\" type=\"text\" placeholder=\"Enter drücken zum Hinzufügen\" #ingredient>\r\n        </mz-input-container>\r\n      </div>\r\n      <div class=\"col s12 m6\">\r\n        <mz-input-container class=\"col s12\">\r\n          <input mz-input [(ngModel)]=\"newIngredient.hint\" [label]=\"'Hinweis'\" (keyup.enter)=\"addIngredient(); ingredient.focus()\"\r\n            id=\"ingrHint\" name=\"ingrHint\" type=\"text\" placeholder=\"Klammern werden automatisch gesetzt\">\r\n        </mz-input-container>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"row\">  \r\n      <h4 class=\"section-title info\">\r\n        <span>Info</span>\r\n        <i class=\"material-icons click\" (click)=\"markdownModal.open()\">help</i>\r\n      </h4>\r\n      <ul class=\"preview-toggle\">\r\n        <li class=\"toggle-control click grey-text text-darken-4\" (click)=\"setPreview(false)\" [ngClass]=\"{'active':!mdPreview}\">Text</li>\r\n        <li class=\"toggle-control click grey-text text-darken-4\" (click)=\"setPreview(true)\" [ngClass]=\"{'active':mdPreview}\">Vorschau</li>\r\n      </ul>\r\n      <div class=\"col s12\" id=\"description\" *ngIf=\"!mdPreview\">\r\n        <mz-textarea-container>\r\n          <textarea mz-textarea\r\n            [label]=\"'Beschreibung'\" \r\n            [(ngModel)]=\"model.description\"\r\n            id=\"description\" name=\"description\"\r\n            placeholder=\"Markdown für Styling verfügbar, mehr Info auf dem Hilfe-Button\">\r\n          </textarea>\r\n        </mz-textarea-container>\r\n      </div>\r\n      <div class=\"col s12\" id=\"preview\" style=\"min-height: 124px;\" *ngIf=\"mdPreview\">\r\n        <markdown *ngIf=\"model.description\" [data]=\"model.description\"></markdown>\r\n      </div>\r\n      <div class=\"col s12 center-align\">\r\n        <button type=\"button\" class=\"waves-effect waves-light btn indigo click\" (click)=\"showDescPicker()\">Anleitung Hochladen</button>\r\n      </div>\r\n      <div class=\"center-align\" *ngIf=\"model.descrImage\" style=\"margin: .5rem;\"> \"{{ descrFilename }}\" wurde erfolgreich hochgeladen!</div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <h4 class=\"section-title categories\">Kategorien</h4>\r\n      <div class=\"chip\" style=\"display: inline-block;\" *ngIf=\"vegetarian\">\r\n        Vegetarisch\r\n        <i class=\"close material-icons\" (click)=\"vegetarian=false;\">close</i>\r\n      </div>\r\n      <div class=\"chip\" style=\"display: inline-block;\" *ngIf=\"vegan\">\r\n        Vegan\r\n        <i class=\"close material-icons\" (click)=\"vegan=false;\">close</i>\r\n      </div>\r\n      <div class=\"chip\" *ngFor=\"let ctg of categories\" style=\"display: inline-block;\">\r\n        {{ ctg }}\r\n        <i class=\"close material-icons\" (click)=\"removeCategory(ctg)\">close</i>\r\n      </div>\r\n      <mz-input-container class=\"col s12\" *ngIf=\"recipes\">\r\n        <input mz-input #category\r\n          [label]=\"'Neue Kategorie'\"\r\n          placeholder=\"Enter drücken zum Hinzufügen\"\r\n          [autocomplete]=\"autocomplete\"\r\n          autocomplete=\"off\"\r\n          id=\"category\"\r\n          type=\"text\"\r\n          (keyup.enter)=\"addCategory(category.value); category.value=''\">\r\n      </mz-input-container>\r\n      <div class=\"col s12 center-align\" style=\"margin-top: 2rem;\">\r\n        <button type=\"button\" (click)=\"addRecipe(); gotoRecipes()\" class=\"waves-effect waves-light btn-large indigo\" [disabled]=\"!recipeForm.form.valid\">Rezept speichern</button>\r\n      </div>\r\n    </div>\r\n  </form>\r\n</div>\r\n\r\n<mz-modal #editModal [options]=\"editModalOptions\">\r\n  <mz-modal-header>\r\n    Bearbeiten\r\n  </mz-modal-header>\r\n  <mz-modal-content>\r\n    <br>\r\n    <mz-input-container class=\"col s12\" *ngIf=\"editIngr.name\">\r\n      <input mz-input [(ngModel)]=\"editIngr.name\" [label]=\"'Name'\" \r\n        id=\"editName\" name=\"editName\" type=\"text\">\r\n    </mz-input-container>\r\n    <mz-input-container class=\"col s12\" *ngIf=\"editIngr.hint\">\r\n      <input mz-input [(ngModel)]=\"editIngr.hint\" [label]=\"'Hinweis'\" \r\n        id=\"editHint\" name=\"editHint\" type=\"text\">\r\n    </mz-input-container>\r\n  </mz-modal-content>\r\n  <mz-modal-footer>\r\n    <button mz-button [flat]=\"true\" mz-modal-close>Speichern</button>\r\n  </mz-modal-footer>\r\n</mz-modal>\r\n\r\n<mz-modal #markdownModal>\r\n  <mz-modal-header>\r\n    Was ist Markdown?\r\n  </mz-modal-header>\r\n  <mz-modal-content>\r\n    <p class=\"flow-text\">\r\n      Mit Markdown kann man sehr einfach und schnell Text formatieren, hier einige Beispiele:\r\n      <br>\r\n      <br>\r\n      **Zwei Sterne** für <strong>fette</strong> Schrift\r\n      <br>\r\n      <br>\r\n      *Einen Stern* für <em>kursive</em> Schrift\r\n      <br>\r\n      <br>\r\n      Eine leere Zeile Platz\r\n      <br>\r\n      <br>\r\n      lassen für einen Absatz\r\n      <br>\r\n      <br>\r\n      [Ich bin ein Link Titel](http://www.google.com) wird zu <a href=\"http://www.google.com\">Ich bin ein Link Titel</a>\r\n      <br>\r\n      <br>\r\n      Links werden jedoch auch automatisch erkannt: <a href=\"http://www.google.com\">http://www.google.com</a>\r\n      <br>\r\n      <br>\r\n      Eine vollständige Übersicht über die Markdown-Syntax gibt es <a href=\"https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet\">hier</a>.\r\n    </p>\r\n  </mz-modal-content>\r\n  <mz-modal-footer>\r\n    <button mz-button [flat]=\"true\" mz-modal-close>Schließen</button>\r\n  </mz-modal-footer>\r\n</mz-modal>"

/***/ }),

/***/ 351:
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar-fixed\">\r\n  <nav class=\"white\">\r\n    <div class=\"nav-wrapper\">\r\n      <form>\r\n        <div class=\"input-field container\" style=\"margin: 0 auto;\">\r\n          <input [(ngModel)]=\"query\" class=\"grey-text text-darken-4\" id=\"search\" type=\"search\" name=\"search\" \r\n            placeholder=\"Suche nach Zutaten, Kategorien oder Titel...\" (keyup.enter)=\"login(query)\">\r\n          <label class=\"label-icon\" for=\"search\"><i class=\"material-icons grey-text\">search</i></label>\r\n          <i class=\"material-icons\" (click)=\"query=''\">close</i>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </nav>\r\n</div>\r\n\r\n<div class=\"new-recipe animated fadeIn\" *ngIf=\"isLoggedIn()\">\r\n  <a class=\"btn-floating btn-large waves-effect waves-light indigo\" (click)=\"newRecipe()\">\r\n    <i class=\"material-icons\">add</i>\r\n  </a>\r\n</div>\r\n\r\n<div class=\"container animated fadeIn\">\r\n  <div class=\"row controls\">\r\n    <div class=\"col s12 m5 veggie-options\">\r\n      <div class=\"switch\">\r\n        <label>\r\n          <input type=\"checkbox\" [(ngModel)]=\"vegetarian\" (click)=\"toggleCategory('Vegetarisch')\">\r\n          <span class=\"lever\"></span>\r\n          Vegetarisch\r\n        </label>\r\n      </div>\r\n      <div class=\"switch\">\r\n        <label>\r\n          <input type=\"checkbox\" [(ngModel)]=\"vegan\" (click)=\"toggleCategory('Vegan')\">\r\n          <span class=\"lever\"></span>\r\n          Vegan\r\n        </label>\r\n      </div>\r\n    </div>\r\n    <div class=\"col s3 m2 sort\">\r\n      <i class=\"material-icons sort-icon click\" [ngClass]=\"{'sort-active': !sortDesc}\" (click)=\"sort('asc')\">keyboard_arrow_up</i>\r\n      <i class=\"material-icons sort-icon click\" [ngClass]=\"{'sort-active': sortDesc}\" (click)=\"sort('desc')\">keyboard_arrow_down</i>\r\n    </div>\r\n    <div class=\"col s9 m5\">\r\n      <mz-select-container>\r\n        <select mz-select [label]=\"'Sortieren nach'\" (change)=\"sortBy($event.target.value)\">\r\n          <option class=\"left\" value=\"date\" [selected]=\"sortQuery === 'date'\">Datum</option>\r\n          <option class=\"left\" value=\"duration\" [selected]=\"sortQuery === 'duration'\">Dauer</option>\r\n          <option class=\"left\" value=\"difficulty\" [selected]=\"sortQuery === 'difficulty'\">Schwierigkeit</option>\r\n          <option class=\"left\" value=\"ingredient-count\" [selected]=\"sortQuery === 'ingredient-count'\">Anzahl der Zutaten</option>\r\n        </select>\r\n      </mz-select-container>\r\n    </div>\r\n  </div>\r\n  <div *ngIf=\"recipes\" class=\"row\">\r\n    <div *ngFor=\"let recipe of recipes | filterRecipes:query | sortRecipes:sortQuery:sortDesc\"\r\n      (click)=\"onSelect(recipe)\" class=\"col s12 l6 xl4 click\">\r\n      <div class=\"card medium hoverable\">\r\n        <div class=\"card-image\">\r\n          <img *ngIf=\"recipe.heroImage\" src=\"{{ recipe.heroImage | thumbnail:600:0 }}\" alt=\"{{ recipe.title }}\">\r\n          <img *ngIf=\"!recipe.heroImage\" src=\"../../../assets/images/comingsoon.jpg\" alt=\"Coming soon\">\r\n          <span class=\"card-title recipe-quickinfo\">\r\n            <img class=\"veggie\" *ngIf=\"recipe.categories.includes('Vegetarisch')\" src=\"../../../assets/images/vegetarian.svg\">\r\n            <img class=\"veggie\" *ngIf=\"recipe.categories.includes('Vegan')\" src=\"../../../assets/images/vegan.svg\">\r\n            <span class=\"minutes right valign-wrapper\">\r\n              <i class=\"material-icons timer-icon\">timer</i>\r\n              {{ recipe.duration }} min.\r\n            </span>\r\n          </span>\r\n        </div>\r\n        <div class=\"card-content valign-wrapper\" style=\"padding-top: 0;\">\r\n          <h5 class=\"recipe-title\">\r\n            {{ recipe.title }}\r\n          </h5>\r\n        </div>\r\n        <div class=\"card-action\" *ngIf=\"recipe.categories\">\r\n          <div class=\"categories\"><div *ngFor=\"let ctg of recipe.categories | noVeggies\"># <strong>{{ ctg }}</strong> </div></div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 352:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" *ngIf=\"recipe\">\r\n  <h3 class=\"center-align\" style=\"margin-bottom: 2rem;\">{{ recipe.title }}</h3>\r\n  <div class=\"row\">\r\n    <div class=\"col s4 center-align\">\r\n      <span>{{ recipe.servings }} Portionen</span>\r\n    </div>\r\n    <div class=\"col s4 center-align\">\r\n      <span>{{ recipe.duration }} Minuten</span>\r\n    </div>\r\n    <div class=\"col s4 center-align\">\r\n      <span>{{ recipe.difficulty | difficultyString }}</span>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col s6\">\r\n      <h5 style=\"border-bottom: 1px #333 solid; display: inline-block; padding-bottom: .5rem;\">Zutaten</h5>\r\n      <ul>\r\n        <li *ngFor=\"let ingredient of recipe.ingredients\">\r\n          - {{ ingredient.name }}\r\n          <span *ngIf=\"ingredient.hint\"> ({{ ingredient.hint }})</span>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n    <div class=\"col s6\">\r\n      <h5 style=\"border-bottom: 1px #333 solid; display: inline-block; padding-bottom: .5rem;\">Zubereitung</h5>\r\n      <markdown *ngIf=\"recipe.description\">{{ recipe.description }}</markdown>\r\n      <img #descrImage *ngIf=\"recipe.descrImage\" src=\"{{recipe.descrImage}}\"\r\n          alt=\"Recipe description\" class=\"responsive-img\">\r\n    </div>\r\n  </div>\r\n"

/***/ }),

/***/ 353:
/***/ (function(module, exports) {

module.exports = "<svg style=\"position: absolute; width: 0; height: 0; overflow: hidden;\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\r\n<defs>\r\n<symbol id=\"icon-spoon-knife\" viewBox=\"0 0 32 32\">\r\n<path d=\"M7 0c-3.314 0-6 3.134-6 7 0 3.31 1.969 6.083 4.616 6.812l-0.993 16.191c-0.067 1.098 0.778 1.996 1.878 1.996h1c1.1 0 1.945-0.898 1.878-1.996l-0.993-16.191c2.646-0.729 4.616-3.502 4.616-6.812 0-3.866-2.686-7-6-7zM27.167 0l-1.667 10h-1.25l-0.833-10h-0.833l-0.833 10h-1.25l-1.667-10h-0.833v13c0 0.552 0.448 1 1 1h2.604l-0.982 16.004c-0.067 1.098 0.778 1.996 1.878 1.996h1c1.1 0 1.945-0.898 1.878-1.996l-0.982-16.004h2.604c0.552 0 1-0.448 1-1v-13h-0.833z\"></path>\r\n</symbol>\r\n<symbol id=\"icon-chevron-left\" viewBox=\"0 0 21 28\">\r\n<path d=\"M18.297 4.703l-8.297 8.297 8.297 8.297c0.391 0.391 0.391 1.016 0 1.406l-2.594 2.594c-0.391 0.391-1.016 0.391-1.406 0l-11.594-11.594c-0.391-0.391-0.391-1.016 0-1.406l11.594-11.594c0.391-0.391 1.016-0.391 1.406 0l2.594 2.594c0.391 0.391 0.391 1.016 0 1.406z\"></path>\r\n</symbol>\r\n<symbol id=\"icon-user\" viewBox=\"0 0 20 28\">\r\n<title>user</title>\r\n<path d=\"M20 21.859c0 2.281-1.5 4.141-3.328 4.141h-13.344c-1.828 0-3.328-1.859-3.328-4.141 0-4.109 1.016-8.859 5.109-8.859 1.266 1.234 2.984 2 4.891 2s3.625-0.766 4.891-2c4.094 0 5.109 4.75 5.109 8.859zM16 8c0 3.313-2.688 6-6 6s-6-2.688-6-6 2.688-6 6-6 6 2.688 6 6z\"></path>\r\n</symbol>\r\n<symbol id=\"icon-clock-o\" viewBox=\"0 0 24 28\">\r\n<title>clock-o</title>\r\n<path d=\"M14 8.5v7c0 0.281-0.219 0.5-0.5 0.5h-5c-0.281 0-0.5-0.219-0.5-0.5v-1c0-0.281 0.219-0.5 0.5-0.5h3.5v-5.5c0-0.281 0.219-0.5 0.5-0.5h1c0.281 0 0.5 0.219 0.5 0.5zM20.5 14c0-4.688-3.813-8.5-8.5-8.5s-8.5 3.813-8.5 8.5 3.813 8.5 8.5 8.5 8.5-3.813 8.5-8.5zM24 14c0 6.625-5.375 12-12 12s-12-5.375-12-12 5.375-12 12-12 12 5.375 12 12z\"></path>\r\n</symbol>\r\n<symbol id=\"icon-edit\" viewBox=\"0 0 28 28\">\r\n<title>edit</title>\r\n<path d=\"M13.875 18.5l1.813-1.813-2.375-2.375-1.813 1.813v0.875h1.5v1.5h0.875zM20.75 7.25c-0.141-0.141-0.375-0.125-0.516 0.016l-5.469 5.469c-0.141 0.141-0.156 0.375-0.016 0.516s0.375 0.125 0.516-0.016l5.469-5.469c0.141-0.141 0.156-0.375 0.016-0.516zM22 16.531v2.969c0 2.484-2.016 4.5-4.5 4.5h-13c-2.484 0-4.5-2.016-4.5-4.5v-13c0-2.484 2.016-4.5 4.5-4.5h13c0.625 0 1.25 0.125 1.828 0.391 0.141 0.063 0.25 0.203 0.281 0.359 0.031 0.172-0.016 0.328-0.141 0.453l-0.766 0.766c-0.141 0.141-0.328 0.187-0.5 0.125-0.234-0.063-0.469-0.094-0.703-0.094h-13c-1.375 0-2.5 1.125-2.5 2.5v13c0 1.375 1.125 2.5 2.5 2.5h13c1.375 0 2.5-1.125 2.5-2.5v-1.969c0-0.125 0.047-0.25 0.141-0.344l1-1c0.156-0.156 0.359-0.187 0.547-0.109s0.313 0.25 0.313 0.453zM20.5 5l4.5 4.5-10.5 10.5h-4.5v-4.5zM27.438 7.063l-1.437 1.437-4.5-4.5 1.437-1.437c0.578-0.578 1.547-0.578 2.125 0l2.375 2.375c0.578 0.578 0.578 1.547 0 2.125z\"></path>\r\n</symbol>\r\n<symbol id=\"icon-trash\" viewBox=\"0 0 22 28\">\r\n<title>trash</title>\r\n<path d=\"M8 21.5v-11c0-0.281-0.219-0.5-0.5-0.5h-1c-0.281 0-0.5 0.219-0.5 0.5v11c0 0.281 0.219 0.5 0.5 0.5h1c0.281 0 0.5-0.219 0.5-0.5zM12 21.5v-11c0-0.281-0.219-0.5-0.5-0.5h-1c-0.281 0-0.5 0.219-0.5 0.5v11c0 0.281 0.219 0.5 0.5 0.5h1c0.281 0 0.5-0.219 0.5-0.5zM16 21.5v-11c0-0.281-0.219-0.5-0.5-0.5h-1c-0.281 0-0.5 0.219-0.5 0.5v11c0 0.281 0.219 0.5 0.5 0.5h1c0.281 0 0.5-0.219 0.5-0.5zM7.5 6h7l-0.75-1.828c-0.047-0.063-0.187-0.156-0.266-0.172h-4.953c-0.094 0.016-0.219 0.109-0.266 0.172zM22 6.5v1c0 0.281-0.219 0.5-0.5 0.5h-1.5v14.812c0 1.719-1.125 3.187-2.5 3.187h-13c-1.375 0-2.5-1.406-2.5-3.125v-14.875h-1.5c-0.281 0-0.5-0.219-0.5-0.5v-1c0-0.281 0.219-0.5 0.5-0.5h4.828l1.094-2.609c0.313-0.766 1.25-1.391 2.078-1.391h5c0.828 0 1.766 0.625 2.078 1.391l1.094 2.609h4.828c0.281 0 0.5 0.219 0.5 0.5z\"></path>\r\n</symbol>\r\n<symbol id=\"icon-star-o\" viewBox=\"0 0 26 28\">\r\n<title>star-o</title>\r\n<path d=\"M17.766 15.687l4.781-4.641-6.594-0.969-2.953-5.969-2.953 5.969-6.594 0.969 4.781 4.641-1.141 6.578 5.906-3.109 5.891 3.109zM26 10.109c0 0.281-0.203 0.547-0.406 0.75l-5.672 5.531 1.344 7.812c0.016 0.109 0.016 0.203 0.016 0.313 0 0.422-0.187 0.781-0.641 0.781-0.219 0-0.438-0.078-0.625-0.187l-7.016-3.687-7.016 3.687c-0.203 0.109-0.406 0.187-0.625 0.187-0.453 0-0.656-0.375-0.656-0.781 0-0.109 0.016-0.203 0.031-0.313l1.344-7.812-5.688-5.531c-0.187-0.203-0.391-0.469-0.391-0.75 0-0.469 0.484-0.656 0.875-0.719l7.844-1.141 3.516-7.109c0.141-0.297 0.406-0.641 0.766-0.641s0.625 0.344 0.766 0.641l3.516 7.109 7.844 1.141c0.375 0.063 0.875 0.25 0.875 0.719z\"></path>\r\n</symbol>\r\n<symbol id=\"icon-refresh\" viewBox=\"0 0 24 28\">\r\n<title>refresh</title>\r\n<path d=\"M23.609 16.5c0 0.031 0 0.078-0.016 0.109-1.328 5.531-5.891 9.391-11.656 9.391-3.047 0-6-1.203-8.219-3.313l-2.016 2.016c-0.187 0.187-0.438 0.297-0.703 0.297-0.547 0-1-0.453-1-1v-7c0-0.547 0.453-1 1-1h7c0.547 0 1 0.453 1 1 0 0.266-0.109 0.516-0.297 0.703l-2.141 2.141c1.469 1.375 3.422 2.156 5.437 2.156 2.781 0 5.359-1.437 6.813-3.813 0.375-0.609 0.562-1.203 0.828-1.828 0.078-0.219 0.234-0.359 0.469-0.359h3c0.281 0 0.5 0.234 0.5 0.5zM24 4v7c0 0.547-0.453 1-1 1h-7c-0.547 0-1-0.453-1-1 0-0.266 0.109-0.516 0.297-0.703l2.156-2.156c-1.484-1.375-3.437-2.141-5.453-2.141-2.781 0-5.359 1.437-6.813 3.813-0.375 0.609-0.562 1.203-0.828 1.828-0.078 0.219-0.234 0.359-0.469 0.359h-3.109c-0.281 0-0.5-0.234-0.5-0.5v-0.109c1.344-5.547 5.953-9.391 11.719-9.391 3.063 0 6.047 1.219 8.266 3.313l2.031-2.016c0.187-0.187 0.438-0.297 0.703-0.297 0.547 0 1 0.453 1 1z\"></path>\r\n</symbol>\r\n<symbol id=\"icon-pencil\" viewBox=\"0 0 24 28\">\r\n<title>pencil</title>\r\n<path d=\"M5.672 24l1.422-1.422-3.672-3.672-1.422 1.422v1.672h2v2h1.672zM13.844 9.5c0-0.203-0.141-0.344-0.344-0.344-0.094 0-0.187 0.031-0.266 0.109l-8.469 8.469c-0.078 0.078-0.109 0.172-0.109 0.266 0 0.203 0.141 0.344 0.344 0.344 0.094 0 0.187-0.031 0.266-0.109l8.469-8.469c0.078-0.078 0.109-0.172 0.109-0.266zM13 6.5l6.5 6.5-13 13h-6.5v-6.5zM23.672 8c0 0.531-0.219 1.047-0.578 1.406l-2.594 2.594-6.5-6.5 2.594-2.578c0.359-0.375 0.875-0.594 1.406-0.594s1.047 0.219 1.422 0.594l3.672 3.656c0.359 0.375 0.578 0.891 0.578 1.422z\"></path>\r\n</symbol>\r\n<symbol id=\"icon-sort-desc\" viewBox=\"0 0 28 28\">\r\n<title>sort-desc</title>\r\n<path d=\"M25.555 9.503c0 0.384-0.158 0.745-0.429 1.015l-10.11 10.11c-0.271 0.271-0.632 0.429-1.015 0.429s-0.745-0.158-1.015-0.429l-10.11-10.11c-0.271-0.271-0.429-0.632-0.429-1.015 0-0.79 0.654-1.444 1.444-1.444h20.221c0.79 0 1.444 0.654 1.444 1.444z\"></path>\r\n</symbol>\r\n<symbol id=\"icon-sort-asc\" viewBox=\"0 0 28 28\">\r\n<title>sort-asc</title>\r\n<path d=\"M25.412 18.667c0 0.79-0.654 1.444-1.444 1.444h-20.221c-0.79 0-1.444-0.654-1.444-1.444 0-0.384 0.158-0.745 0.429-1.016l10.11-10.11c0.271-0.271 0.632-0.429 1.016-0.429s0.745 0.158 1.016 0.429l10.11 10.11c0.271 0.271 0.429 0.632 0.429 1.016z\"></path>\r\n</symbol>\r\n</defs>\r\n</svg>"

/***/ }),

/***/ 414:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(159);


/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurrentQueryService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CurrentQueryService = (function () {
    function CurrentQueryService() {
        this.query = {
            filterQuery: '',
            sortDesc: true,
            sortQuery: 'date'
        };
    }
    CurrentQueryService.prototype.setQuery = function (filter, desc, sortby) {
        this.query = {
            filterQuery: filter,
            sortDesc: desc,
            sortQuery: sortby
        };
    };
    CurrentQueryService.prototype.getQuery = function () {
        return this.query;
    };
    return CurrentQueryService;
}());
CurrentQueryService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], CurrentQueryService);

//# sourceMappingURL=current-query.service.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ZauberwortService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var ZauberwortService = (function () {
    function ZauberwortService(http) {
        this.http = http;
        this.hasPermission = false;
    }
    ZauberwortService.prototype.requestPermissions = function (zauberwort) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
                        headers.append('Content-Type', 'application/json');
                        return [4 /*yield*/, this.http.post('zauberwort', JSON.stringify({ zauberwort: zauberwort }), { headers: headers }).toPromise()
                                .then(function (res) {
                                if (res.status === 200) {
                                    _this.hasPermission = true;
                                }
                                else {
                                    _this.hasPermission = false;
                                }
                            })
                                .catch(function (err) {
                                _this.hasPermission = false;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.hasPermission];
                }
            });
        });
    };
    ZauberwortService.prototype.canModify = function () {
        return this.hasPermission;
    };
    return ZauberwortService;
}());
ZauberwortService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], ZauberwortService);

var _a;
//# sourceMappingURL=zauberwort.service.js.map

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, ".difficulty-active {\r\n  background-color: #3f51b5 !important;\r\n}\r\n\r\n.hero-image {\r\n  margin-top: 1rem;\r\n}\r\n\r\n.toggles {\r\n  margin-top: 1.5rem;\r\n  margin-bottom: 1.5rem;\r\n}\r\n\r\n.toggles button {\r\n  margin: .5rem;\r\n}\r\n\r\n.veggie-option {\r\n  display: inline-block;\r\n  margin-right: 1.5rem;\r\n}\r\n\r\n@media only screen and (max-width: 600px) {\r\n  .veggies {\r\n    margin-top: 1.5rem;\r\n  }\r\n}\r\n\r\n.section-title {\r\n  padding-left: 0.75rem;\r\n  margin-bottom: 2rem;\r\n  margin-top: 2rem;\r\n}\r\n\r\n@media only screen and (max-width: 767px) {\r\n  .section-title {\r\n    text-align: center;\r\n  }\r\n\r\n  .tab {\r\n    width: 50%;\r\n    margin-left: auto;\r\n    left: auto;\r\n    right: auto;\r\n    float: left;\r\n    box-sizing: border-box;\r\n    padding: 0 0.75rem;\r\n    min-height: 1px;\r\n  }\r\n}\r\n\r\n.section-title.info {\r\n  position: relative;\r\n}\r\n\r\n.section-title.info i {\r\n  position: absolute;\r\n  right: 2rem;\r\n  top: 7px;\r\n}\r\n\r\n.small-border {\r\n    width: 33.33%;\r\n    margin-top: .75rem;\r\n    border-bottom: 1px #f2f2f2 solid;\r\n}\r\n\r\n.ingredient {\r\n    font-size: 18px;\r\n    padding-top: 0.5rem;\r\n}\r\n\r\n.ingredient > span, .ingredient i {\r\n    padding-left: .5rem;\r\n}\r\n\r\n.ingredient i.edit {\r\n  padding-left: 1.5rem;\r\n}\r\n\r\n.preview-toggle {\r\n  width: 100%;\r\n  height: 40px;\r\n  margin-top: 0;\r\n  margin-bottom: 2rem;\r\n  margin-left: .75rem;\r\n}\r\n\r\n.toggle-control {\r\n  display: inline-block;\r\n  font-size: 16px;\r\n  font-weight: 300;\r\n  text-transform: uppercase;\r\n  padding: 0.5rem 1rem 0.5rem 1rem;\r\n}\r\n\r\n.toggle-control.active {\r\n  border-bottom: 1px #212121 solid;\r\n}\r\n\r\nmz-modal-header {\r\n  border-bottom: 1px #f2f2f2 solid;\r\n  padding-bottom: .5rem;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageNotFoundComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageNotFoundComponent = (function () {
    function PageNotFoundComponent() {
    }
    PageNotFoundComponent.prototype.ngOnInit = function () {
    };
    return PageNotFoundComponent;
}());
PageNotFoundComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-not-found',
        template: __webpack_require__(346),
        styles: [__webpack_require__(247)]
    }),
    __metadata("design:paramtypes", [])
], PageNotFoundComponent);

//# sourceMappingURL=not-found.component.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_materialize__ = __webpack_require__(43);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConverterComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ConverterComponent = (function (_super) {
    __extends(ConverterComponent, _super);
    function ConverterComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.quantity = 0;
        return _this;
    }
    return ConverterComponent;
}(__WEBPACK_IMPORTED_MODULE_1_ng2_materialize__["b" /* MzBaseModal */]));
ConverterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'converter',
        template: __webpack_require__(347),
        styles: [__webpack_require__(248)]
    })
], ConverterComponent);

//# sourceMappingURL=converter.component.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_materialize__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__converter_converter_component__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_recipe_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_current_query_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_zauberwort_service__ = __webpack_require__(52);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipeDetailsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var RecipeDetailsComponent = (function () {
    function RecipeDetailsComponent(recipeService, queryService, zauberwortService, route, router, modalService) {
        this.recipeService = recipeService;
        this.queryService = queryService;
        this.zauberwortService = zauberwortService;
        this.route = route;
        this.router = router;
        this.modalService = modalService;
        this.Arr = Array;
    }
    RecipeDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.state = this.randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        this.route.params
            .switchMap(function (params) { return _this.recipeService.getRecipe(params['id']); })
            .subscribe(function (recipe) {
            _this.recipe = recipe;
            _this.desiredServings = recipe.servings;
        });
    };
    RecipeDetailsComponent.prototype.gotoRecipes = function () {
        this.router.navigate(['/recipes']);
    };
    RecipeDetailsComponent.prototype.searchCtg = function (ctg) {
        this.queryService.setQuery(ctg, true, 'date');
        this.gotoRecipes();
    };
    RecipeDetailsComponent.prototype.cooked = function () {
        ++this.recipe.cookCount;
        this.recipeService.updateRecipe(this.recipe)
            .subscribe();
    };
    RecipeDetailsComponent.prototype.edit = function () {
        this.router.navigate(['/recipe', this.recipe._id, 'edit']);
    };
    RecipeDetailsComponent.prototype.deleteRecipe = function () {
        this.recipeService.deleteRecipe(this.recipe._id)
            .subscribe();
    };
    RecipeDetailsComponent.prototype.addServing = function () {
        this.desiredServings++;
    };
    RecipeDetailsComponent.prototype.removeServing = function () {
        if (this.desiredServings > 1) {
            this.desiredServings--;
        }
    };
    RecipeDetailsComponent.prototype.converter = function () {
        this.modalService.open(__WEBPACK_IMPORTED_MODULE_4__converter_converter_component__["a" /* ConverterComponent */]);
    };
    RecipeDetailsComponent.prototype.printView = function () {
        this.router.navigate(['/recipe', this.recipe._id, 'print']);
    };
    RecipeDetailsComponent.prototype.randomString = function (length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    };
    RecipeDetailsComponent.prototype.isLoggedIn = function () {
        return this.zauberwortService.canModify();
    };
    return RecipeDetailsComponent;
}());
RecipeDetailsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__(348),
        styles: [__webpack_require__(249), __webpack_require__(72)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__services_recipe_service__["a" /* RecipeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_recipe_service__["a" /* RecipeService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__services_current_query_service__["a" /* CurrentQueryService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_current_query_service__["a" /* CurrentQueryService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_7__services_zauberwort_service__["a" /* ZauberwortService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__services_zauberwort_service__["a" /* ZauberwortService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_materialize__["d" /* MzModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng2_materialize__["d" /* MzModalService */]) === "function" && _f || Object])
], RecipeDetailsComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=recipe-details.component.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__recipe__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_recipe_service__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipeEditComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var RecipeEditComponent = (function () {
    function RecipeEditComponent(recipeService, route, router) {
        var _this = this;
        this.recipeService = recipeService;
        this.route = route;
        this.router = router;
        this.filestackKey = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].filestackKey;
        this.categories = [];
        this.newIngredient = new __WEBPACK_IMPORTED_MODULE_4__recipe__["a" /* Ingredient */]('', '');
        this.mdPreview = false;
        this.vegetarian = false;
        this.vegan = false;
        this.editIngr = new __WEBPACK_IMPORTED_MODULE_4__recipe__["a" /* Ingredient */]('', '');
        this.editModalOptions = {
            dismissible: false,
            complete: function () {
                _this.recipe.ingredients[_this.editIngrIndex] = _this.editIngr;
            }
        };
    }
    RecipeEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.recipeService.getRecipe(params['id']); })
            .subscribe(function (recipe) {
            _this.recipe = recipe;
            _this.categories = JSON.parse(JSON.stringify(_this.recipe.categories));
            if (recipe.categories.includes('Vegetarisch')) {
                _this.vegetarian = true;
                _this.categories.splice(_this.categories.indexOf('Vegetarisch'), 1);
            }
            if (recipe.categories.includes('Vegan')) {
                _this.vegan = true;
                _this.categories.splice(_this.categories.indexOf('Vegan'), 1);
            }
        });
        this.recipeService.getAllRecipes().subscribe(function (recipes) {
            _this.recipes = recipes;
            var categories = new Set();
            _this.recipes.forEach(function (recipe) {
                recipe.categories.forEach(function (ctg) {
                    categories.add(ctg);
                });
            });
            var suggestions = Array.from(categories);
            var data = {};
            suggestions.forEach(function (ctg) {
                data[ctg] = null;
            });
            _this.autocomplete = {
                data: data,
            };
            window.scrollTo(0, 0);
        });
    };
    RecipeEditComponent.prototype.save = function () {
        var _this = this;
        if (this.vegetarian) {
            this.categories.push('Vegetarisch');
        }
        if (this.vegan) {
            this.categories.push('Vegan');
        }
        if (this.categories.length > 0) {
            this.recipe.categories = this.categories;
        }
        this.recipeService.updateRecipe(this.recipe)
            .subscribe(function () {
            _this.gotoRecipe();
        });
    };
    RecipeEditComponent.prototype.addIngredient = function () {
        if (this.newIngredient && this.newIngredient.name !== '') {
            var ingr = this.newIngredient;
            this.recipe.ingredients.push(ingr);
            this.newIngredient = new __WEBPACK_IMPORTED_MODULE_4__recipe__["a" /* Ingredient */]('', '');
        }
    };
    RecipeEditComponent.prototype.editIngredient = function (index) {
        this.editIngr = this.recipe.ingredients[index];
        this.editIngrIndex = index;
    };
    RecipeEditComponent.prototype.removeIngredient = function (ingredient) {
        this.recipe.ingredients.splice(this.recipe.ingredients.indexOf(ingredient), 1);
    };
    RecipeEditComponent.prototype.setPreview = function (preview) {
        this.mdPreview = preview;
    };
    RecipeEditComponent.prototype.addCategory = function (category) {
        if (category === 'Vegetarisch') {
            this.vegetarian = true;
        }
        else if (category === 'Vegan') {
            this.vegan = true;
        }
        else if (!this.categories) {
            this.categories = [category];
        }
        else if (this.categories.includes(category)) {
            // leave the categories as is
        }
        else {
            this.categories.push(category);
        }
    };
    RecipeEditComponent.prototype.removeCategory = function (category) {
        if (category === 'Vegetarisch') {
            this.vegetarian = false;
        }
        else if (category === 'Vegan') {
            this.vegan = false;
        }
        else {
            this.categories.splice(this.categories.indexOf(category), 1);
        }
    };
    RecipeEditComponent.prototype.hasCategory = function (category) {
        return this.recipe.categories.includes(category);
    };
    RecipeEditComponent.prototype.toggleCategory = function (category) {
        if (!this.recipe.categories.includes(category)) {
            this.addCategory(category);
        }
        else {
            this.removeCategory(category);
        }
    };
    RecipeEditComponent.prototype.getCategories = function () {
        var categories = new Set();
        this.recipes.forEach(function (recipe) {
            recipe.categories.forEach(function (ctg) {
                categories.add(ctg);
            });
        });
        return Array.from(categories);
    };
    RecipeEditComponent.prototype.showHeroPicker = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, result, handle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = filestack.init(this.filestackKey);
                        return [4 /*yield*/, client.pick({
                                accept: ['image/*'],
                                maxFiles: 1,
                                maxSize: 10485760,
                                transformations: {
                                    crop: {
                                        circle: false
                                    }
                                }
                            })];
                    case 1:
                        result = _a.sent();
                        handle = result.filesUploaded[0].handle;
                        this.recipe.heroImage = 'https://process.filestackapi.com/resize=w:2000,fit:max/quality=value:80/compress/' + handle;
                        return [2 /*return*/];
                }
            });
        });
    };
    RecipeEditComponent.prototype.showDescPicker = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, result, handle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = filestack.init(this.filestackKey);
                        return [4 /*yield*/, client.pick({
                                accept: ['image/*'],
                                maxFiles: 1,
                                maxSize: 10485760,
                                transformations: {
                                    crop: {
                                        circle: false
                                    }
                                }
                            })];
                    case 1:
                        result = _a.sent();
                        handle = result.filesUploaded[0].handle;
                        this.recipe.descrImage = 'https://process.filestackapi.com/resize=w:2000,fit:max/quality=value:80/compress/' + handle;
                        return [2 /*return*/];
                }
            });
        });
    };
    RecipeEditComponent.prototype.gotoRecipe = function () {
        this.router.navigate(['/recipe', this.recipe._id]);
    };
    return RecipeEditComponent;
}());
RecipeEditComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__(349),
        styles: [__webpack_require__(250), __webpack_require__(72)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__services_recipe_service__["a" /* RecipeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_recipe_service__["a" /* RecipeService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object])
], RecipeEditComponent);

var _a, _b, _c;
//# sourceMappingURL=recipe-edit.component.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_recipe_service__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipeFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var RecipeFormComponent = (function () {
    function RecipeFormComponent(recipeService, router) {
        var _this = this;
        this.recipeService = recipeService;
        this.router = router;
        this.filestackKey = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].filestackKey;
        this.ingredients = [new __WEBPACK_IMPORTED_MODULE_3__recipe__["a" /* Ingredient */]('Test', 'Hint')];
        this.newIngredient = new __WEBPACK_IMPORTED_MODULE_3__recipe__["a" /* Ingredient */]('', '');
        this.categories = [];
        this.model = new __WEBPACK_IMPORTED_MODULE_3__recipe__["b" /* Recipe */]('', 2, 0, 1, 0, this.ingredients, '');
        this.vegan = false;
        this.vegetarian = false;
        // helper variables
        this.ingredientAdded = false;
        this.mdPreview = false;
        this.editIngr = new __WEBPACK_IMPORTED_MODULE_3__recipe__["a" /* Ingredient */]('', '');
        this.editModalOptions = {
            dismissible: false,
            complete: function () {
                _this.model.ingredients[_this.editIngrIndex] = _this.editIngr;
            }
        };
    }
    RecipeFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.recipeService.getAllRecipes().subscribe(function (recipes) {
            _this.recipes = recipes;
            var categories = new Set();
            _this.recipes.forEach(function (recipe) {
                recipe.categories.forEach(function (ctg) {
                    categories.add(ctg);
                });
            });
            var suggestions = Array.from(categories);
            var data = {};
            suggestions.forEach(function (ctg) {
                data[ctg] = null;
            });
            _this.autocomplete = {
                data: data,
            };
            window.scrollTo(0, 0);
        });
        this.model.description = '';
    };
    RecipeFormComponent.prototype.addRecipe = function () {
        if (this.vegetarian) {
            this.categories.push('Vegetarisch');
        }
        if (this.vegan) {
            this.categories.push('Vegan');
        }
        if (this.categories.length > 0) {
            this.model.categories = this.categories;
        }
        this.recipeService.addRecipe(this.model)
            .subscribe();
    };
    RecipeFormComponent.prototype.addIngredient = function () {
        if (this.newIngredient && this.newIngredient.name !== '') {
            var ingr = this.newIngredient;
            this.ingredients.push(ingr);
            this.newIngredient = new __WEBPACK_IMPORTED_MODULE_3__recipe__["a" /* Ingredient */]('', '');
        }
        if (!this.ingredientAdded) {
            // Remove initial empty ingredient on first addition
            this.ingredients.splice(0, 1);
            this.ingredientAdded = true;
        }
    };
    RecipeFormComponent.prototype.editIngredient = function (index) {
        this.editIngr = this.model.ingredients[index];
        this.editIngrIndex = index;
    };
    RecipeFormComponent.prototype.removeIngredient = function (ingredient) {
        this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
    };
    RecipeFormComponent.prototype.setPreview = function (preview) {
        this.mdPreview = preview;
    };
    RecipeFormComponent.prototype.addCategory = function (category) {
        if (category === 'Vegetarisch') {
            this.vegetarian = true;
        }
        else if (category === 'Vegan') {
            this.vegan = true;
        }
        else if (!this.categories) {
            this.categories = [category];
        }
        else if (this.categories.includes(category)) {
            // leave the categories as is
        }
        else {
            this.categories.push(category);
        }
    };
    RecipeFormComponent.prototype.removeCategory = function (category) {
        if (category === 'Vegetarisch') {
            this.vegetarian = false;
        }
        else if (category === 'Vegan') {
            this.vegan = false;
        }
        else {
            this.categories.splice(this.categories.indexOf(category), 1);
        }
    };
    RecipeFormComponent.prototype.hasCategory = function (category) {
        return this.categories.includes(category);
    };
    RecipeFormComponent.prototype.getCategories = function () {
        var categories = new Set();
        this.recipes.forEach(function (recipe) {
            recipe.categories.forEach(function (ctg) {
                categories.add(ctg);
            });
        });
        return Array.from(categories);
    };
    RecipeFormComponent.prototype.showHeroPicker = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, result, handle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = filestack.init(this.filestackKey);
                        return [4 /*yield*/, client.pick({
                                accept: ['image/*'],
                                maxFiles: 1,
                                transformations: {
                                    crop: {
                                        circle: false
                                    }
                                }
                            })];
                    case 1:
                        result = _a.sent();
                        handle = result.filesUploaded[0].handle;
                        this.heroFilename = result.filesUploaded[0].filename;
                        this.model.heroImage = 'https://process.filestackapi.com/resize=w:2000,fit:max/quality=value:80/compress/' + handle;
                        return [2 /*return*/];
                }
            });
        });
    };
    RecipeFormComponent.prototype.showDescPicker = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, result, handle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = filestack.init(this.filestackKey);
                        return [4 /*yield*/, client.pick({
                                accept: ['image/*'],
                                maxFiles: 1,
                                transformations: {
                                    crop: {
                                        circle: false
                                    }
                                }
                            })];
                    case 1:
                        result = _a.sent();
                        handle = result.filesUploaded[0].handle;
                        this.descrFilename = result.filesUploaded[0].filename;
                        this.model.descrImage = 'https://process.filestackapi.com/resize=w:2000,fit:max/quality=value:80/compress/' + handle;
                        return [2 /*return*/];
                }
            });
        });
    };
    RecipeFormComponent.prototype.gotoRecipes = function () {
        this.router.navigate(['/recipes']);
    };
    return RecipeFormComponent;
}());
RecipeFormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__(350),
        styles: [__webpack_require__(72)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__services_recipe_service__["a" /* RecipeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_recipe_service__["a" /* RecipeService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], RecipeFormComponent);

var _a, _b;
//# sourceMappingURL=recipe-form.component.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_materialize__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_zauberwort_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_recipe_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_current_query_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_scroll_service__ = __webpack_require__(97);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipeListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var RecipeListComponent = (function () {
    function RecipeListComponent(router, route, recipeService, queryService, scrollService, zauberwortService, toastService) {
        this.router = router;
        this.route = route;
        this.recipeService = recipeService;
        this.queryService = queryService;
        this.scrollService = scrollService;
        this.zauberwortService = zauberwortService;
        this.toastService = toastService;
        this.query = '';
        this.vegetarian = false;
        this.vegan = false;
        this.sortQuery = 'date';
        this.sortDesc = true;
        this.scrolled = true;
    }
    RecipeListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            if (params['code']) {
                _this.code = params['code'];
            }
        });
        // retrieve recipes from the API
        this.recipeService.getAllRecipes().subscribe(function (recipes) {
            _this.recipes = recipes;
            _this.getQuery();
            _this.scrolled = false;
        });
    };
    RecipeListComponent.prototype.ngAfterViewChecked = function () {
        if (!this.scrolled) {
            var yPos = this.scrollService.getScrollPos();
            window.scrollTo(0, yPos);
            this.scrolled = true;
        }
    };
    RecipeListComponent.prototype.getQuery = function () {
        this.query = this.queryService.getQuery().filterQuery;
        this.sortDesc = this.queryService.getQuery().sortDesc;
        this.sortQuery = this.queryService.getQuery().sortQuery;
    };
    RecipeListComponent.prototype.toggleCategory = function (ctg) {
        if (!this.query.includes(ctg)) {
            // the category is not present in the query
            if (this.query === '') {
                this.query = ctg;
            }
            else {
                this.query = this.query.concat(', ' + ctg);
            }
        }
        else {
            // category already present in query
            if (this.query.includes(',')) {
                // there are multiple categories in query
                if (this.query.endsWith(ctg)) {
                    this.query = this.query.replace((', ' + ctg), '');
                }
                else {
                    this.query = this.query.replace((ctg + ', '), '');
                }
            }
            else {
                this.query = '';
            }
        }
    };
    RecipeListComponent.prototype.hasCategory = function (ctg) {
        return this.query.includes(ctg);
    };
    RecipeListComponent.prototype.sort = function (sort) {
        if (sort === 'asc') {
            this.sortDesc = false;
        }
        else {
            this.sortDesc = true;
        }
    };
    RecipeListComponent.prototype.sortBy = function (sortby) {
        this.sortQuery = sortby;
    };
    RecipeListComponent.prototype.onSelect = function (recipe) {
        this.scrollService.setScrollPos(window.pageYOffset);
        this.queryService.setQuery(this.query, this.sortDesc, this.sortQuery);
        this.router.navigate(['/recipe', recipe._id]);
    };
    RecipeListComponent.prototype.newRecipe = function () {
        this.router.navigate(['/recipes/new']);
    };
    RecipeListComponent.prototype.login = function (zauberwort) {
        return __awaiter(this, void 0, void 0, function () {
            var successful;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.zauberwortService.requestPermissions(zauberwort.trim().toLowerCase())];
                    case 1:
                        successful = _a.sent();
                        if (successful) {
                            this.toastService.show('Du hast das Zauberwort gesprochen!', 4000, 'green rounded');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    RecipeListComponent.prototype.isLoggedIn = function () {
        return this.zauberwortService.canModify();
    };
    return RecipeListComponent;
}());
RecipeListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__(351),
        styles: [__webpack_require__(251)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_recipe_service__["a" /* RecipeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_recipe_service__["a" /* RecipeService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__services_current_query_service__["a" /* CurrentQueryService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_current_query_service__["a" /* CurrentQueryService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__services_scroll_service__["a" /* ScrollService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_scroll_service__["a" /* ScrollService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__services_zauberwort_service__["a" /* ZauberwortService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_zauberwort_service__["a" /* ZauberwortService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_materialize__["c" /* MzToastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng2_materialize__["c" /* MzToastService */]) === "function" && _g || Object])
], RecipeListComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=recipe-list.component.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_recipe_service__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipePrintComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RecipePrintComponent = (function () {
    function RecipePrintComponent(recipeService, route, router) {
        this.recipeService = recipeService;
        this.route = route;
        this.router = router;
    }
    RecipePrintComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.recipeService.getRecipe(params['id']); })
            .subscribe(function (recipe) { return _this.recipe = recipe; });
    };
    RecipePrintComponent.prototype.back = function () {
        this.router.navigate(['/recipe', this.recipe._id]);
    };
    return RecipePrintComponent;
}());
RecipePrintComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-recipe-print',
        template: __webpack_require__(352),
        styles: [__webpack_require__(252)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_recipe_service__["a" /* RecipeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_recipe_service__["a" /* RecipeService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object])
], RecipePrintComponent);

var _a, _b, _c;
//# sourceMappingURL=recipe-print.component.js.map

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_zauberwort_service__ = __webpack_require__(52);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModifyRecipesGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ModifyRecipesGuard = (function () {
    function ModifyRecipesGuard(router, zauberwort) {
        this.router = router;
        this.zauberwort = zauberwort;
    }
    ModifyRecipesGuard.prototype.canActivate = function () {
        var loggedIn = this.zauberwort.canModify();
        if (loggedIn) {
            return true;
        }
        else {
            this.router.navigate(['/recipes']);
        }
        return false;
    };
    return ModifyRecipesGuard;
}());
ModifyRecipesGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_zauberwort_service__["a" /* ZauberwortService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_zauberwort_service__["a" /* ZauberwortService */]) === "function" && _b || Object])
], ModifyRecipesGuard);

var _a, _b;
//# sourceMappingURL=modify-recipes.guard.js.map

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Recipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ingredient; });
var Recipe = (function () {
    function Recipe(title, servings, duration, difficulty, cookCount, ingredients, heroImage, description, descrImage, categories, createdAt, _id) {
        this.title = title;
        this.servings = servings;
        this.duration = duration;
        this.difficulty = difficulty;
        this.cookCount = cookCount;
        this.ingredients = ingredients;
        this.heroImage = heroImage;
        this.description = description;
        this.descrImage = descrImage;
        this.categories = categories;
        this.createdAt = createdAt;
        this._id = _id;
    }
    return Recipe;
}());

var Ingredient = (function () {
    function Ingredient(name, hint) {
        this.name = name;
        this.hint = hint;
    }
    return Ingredient;
}());

//# sourceMappingURL=recipe.js.map

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScrollService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ScrollService = (function () {
    function ScrollService() {
        this.scrollPos = 0;
    }
    ScrollService.prototype.setScrollPos = function (pos) {
        this.scrollPos = pos;
    };
    ScrollService.prototype.getScrollPos = function () {
        return this.scrollPos;
    };
    return ScrollService;
}());
ScrollService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], ScrollService);

//# sourceMappingURL=scroll.service.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false,
    filestackKey: 'AwD48ceQaWtGBs9plMog7z'
};
//# sourceMappingURL=environment.js.map

/***/ })

},[414]);
//# sourceMappingURL=main.bundle.js.map