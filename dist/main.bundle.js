webpackJsonp([1,4],{

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_recipe_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_current_query_service__ = __webpack_require__(63);
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
    function RecipeDetailsComponent(recipeService, queryService, route, router) {
        this.recipeService = recipeService;
        this.queryService = queryService;
        this.route = route;
        this.router = router;
    }
    RecipeDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
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
        this.queryService.setQuery('', ctg);
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
    RecipeDetailsComponent.prototype.printView = function () {
        this.router.navigate(['/recipe', this.recipe._id, 'print']);
    };
    return RecipeDetailsComponent;
}());
RecipeDetailsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__(288),
        styles: [__webpack_require__(165), __webpack_require__(84)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_recipe_service__["a" /* RecipeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_recipe_service__["a" /* RecipeService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_current_query_service__["a" /* CurrentQueryService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_current_query_service__["a" /* CurrentQueryService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _d || Object])
], RecipeDetailsComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=recipe-details.component.js.map

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__recipe__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_recipe_service__ = __webpack_require__(25);
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
        this.recipeService = recipeService;
        this.route = route;
        this.router = router;
        this.filestackKey = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].filestackKey;
        this.newIngredient = new __WEBPACK_IMPORTED_MODULE_4__recipe__["a" /* Ingredient */]('', '');
        this.editing = false;
    }
    RecipeEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.recipeService.getRecipe(params['id']); })
            .subscribe(function (recipe) { return _this.recipe = recipe; });
        this.recipeService.getAllRecipes().subscribe(function (recipes) {
            _this.recipes = recipes;
        });
    };
    RecipeEditComponent.prototype.save = function () {
        this.recipeService.updateRecipe(this.recipe)
            .subscribe();
    };
    RecipeEditComponent.prototype.addIngredient = function () {
        if (this.newIngredient) {
            var ingr = this.newIngredient;
            this.recipe.ingredients.push(ingr);
            this.newIngredient = new __WEBPACK_IMPORTED_MODULE_4__recipe__["a" /* Ingredient */]('', '');
        }
    };
    RecipeEditComponent.prototype.editIngredient = function (index) {
        if (this.editing) {
            this.newIngredient = new __WEBPACK_IMPORTED_MODULE_4__recipe__["a" /* Ingredient */]('', '');
            this.editing = false;
        }
        else {
            this.editing = true;
            this.editIngr = index;
            this.newIngredient = this.recipe.ingredients[index];
        }
    };
    RecipeEditComponent.prototype.updateIngredient = function (index) {
        this.recipe.ingredients[index] = this.newIngredient;
        this.newIngredient = new __WEBPACK_IMPORTED_MODULE_4__recipe__["a" /* Ingredient */]('', '');
        this.editing = false;
    };
    RecipeEditComponent.prototype.removeIngredient = function (ingredient) {
        if (this.editing) {
            this.newIngredient = new __WEBPACK_IMPORTED_MODULE_4__recipe__["a" /* Ingredient */]('', '');
            this.editing = false;
        }
        this.recipe.ingredients.splice(this.recipe.ingredients.indexOf(ingredient), 1);
    };
    RecipeEditComponent.prototype.addCategory = function (category) {
        if (!this.recipe.categories) {
            this.recipe.categories = [category];
        }
        else if (this.recipe.categories.includes(category)) {
            // leave the categories as is
        }
        else {
            this.recipe.categories.push(category);
        }
    };
    RecipeEditComponent.prototype.removeCategory = function (category) {
        this.recipe.categories.splice(this.recipe.categories.indexOf(category), 1);
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
            var client, result, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = filestack.init(this.filestackKey);
                        return [4 /*yield*/, client.pick({
                                accept: ['image/*'],
                                maxFiles: 1
                            })];
                    case 1:
                        result = _a.sent();
                        url = result.filesUploaded[0].url;
                        this.recipe.heroImage = url;
                        return [2 /*return*/];
                }
            });
        });
    };
    RecipeEditComponent.prototype.showDescPicker = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, result, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = filestack.init(this.filestackKey);
                        return [4 /*yield*/, client.pick({
                                accept: ['image/*'],
                                maxFiles: 1
                            })];
                    case 1:
                        result = _a.sent();
                        url = result.filesUploaded[0].url;
                        this.recipe.descrImage = url;
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
        template: __webpack_require__(289),
        styles: [__webpack_require__(264), __webpack_require__(84)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__services_recipe_service__["a" /* RecipeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_recipe_service__["a" /* RecipeService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _c || Object])
], RecipeEditComponent);

var _a, _b, _c;
//# sourceMappingURL=recipe-edit.component.js.map

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_recipe_service__ = __webpack_require__(25);
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
        this.recipeService = recipeService;
        this.router = router;
        this.filestackKey = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].filestackKey;
        this.ingredients = [new __WEBPACK_IMPORTED_MODULE_3__recipe__["a" /* Ingredient */]('', '')];
        this.newIngredient = new __WEBPACK_IMPORTED_MODULE_3__recipe__["a" /* Ingredient */]('', '');
        this.categories = [];
        this.model = new __WEBPACK_IMPORTED_MODULE_3__recipe__["b" /* Recipe */]('', 2, 0, 1, 0, this.ingredients, '');
        // helper variables
        this.ingredientAdded = false;
        this.editing = false;
    }
    RecipeFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.recipeService.getAllRecipes().subscribe(function (recipes) {
            _this.recipes = recipes;
        });
    };
    RecipeFormComponent.prototype.addRecipe = function () {
        if (this.categories.length > 0) {
            this.model.categories = this.categories;
        }
        this.recipeService.addRecipe(this.model)
            .subscribe();
    };
    RecipeFormComponent.prototype.addIngredient = function () {
        if (this.newIngredient) {
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
        if (this.editing) {
            this.newIngredient = new __WEBPACK_IMPORTED_MODULE_3__recipe__["a" /* Ingredient */]('', '');
            this.editing = false;
        }
        else {
            this.editing = true;
            this.editIngr = index;
            this.newIngredient = this.model.ingredients[index];
        }
    };
    RecipeFormComponent.prototype.updateIngredient = function (index) {
        this.model.ingredients[index] = this.newIngredient;
        this.newIngredient = new __WEBPACK_IMPORTED_MODULE_3__recipe__["a" /* Ingredient */]('', '');
        this.editing = false;
    };
    RecipeFormComponent.prototype.removeIngredient = function (ingredient) {
        if (this.editing) {
            this.newIngredient = new __WEBPACK_IMPORTED_MODULE_3__recipe__["a" /* Ingredient */]('', '');
            this.editing = false;
        }
        this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
    };
    RecipeFormComponent.prototype.addCategory = function (category) {
        if (!this.categories.includes(category)) {
            this.categories.push(category);
        }
    };
    RecipeFormComponent.prototype.removeCategory = function (category) {
        this.categories.splice(this.categories.indexOf(category), 1);
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
            var client, result, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = filestack.init(this.filestackKey);
                        return [4 /*yield*/, client.pick({
                                accept: ['image/*'],
                                maxFiles: 1
                            })];
                    case 1:
                        result = _a.sent();
                        url = result.filesUploaded[0].url;
                        this.heroFilename = result.filesUploaded[0].filename;
                        this.model.heroImage = url;
                        return [2 /*return*/];
                }
            });
        });
    };
    RecipeFormComponent.prototype.showDescPicker = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, result, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = filestack.init(this.filestackKey);
                        return [4 /*yield*/, client.pick({
                                accept: ['image/*'],
                                maxFiles: 1
                            })];
                    case 1:
                        result = _a.sent();
                        url = result.filesUploaded[0].url;
                        this.descrFilename = result.filesUploaded[0].filename;
                        this.model.descrImage = url;
                        return [2 /*return*/];
                }
            });
        });
    };
    RecipeFormComponent.prototype.gotoRecipes = function () {
        this.router.navigate(['/recipes']);
    };
    RecipeFormComponent.prototype.show = function () {
        console.log(this.model);
    };
    return RecipeFormComponent;
}());
RecipeFormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__(290),
        styles: [__webpack_require__(84)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__services_recipe_service__["a" /* RecipeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_recipe_service__["a" /* RecipeService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _b || Object])
], RecipeFormComponent);

var _a, _b;
//# sourceMappingURL=recipe-form.component.js.map

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_recipe_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_current_query_service__ = __webpack_require__(63);
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




var RecipeListComponent = (function () {
    function RecipeListComponent(router, recipeService, queryService) {
        this.router = router;
        this.recipeService = recipeService;
        this.queryService = queryService;
        this.ingrQuery = '';
        this.ctgQuery = '';
    }
    RecipeListComponent.prototype.ngOnInit = function () {
        var _this = this;
        // retrieve recipes from the API
        this.recipeService.getAllRecipes().subscribe(function (recipes) {
            _this.recipes = recipes;
            _this.getQuery();
        });
    };
    RecipeListComponent.prototype.getQuery = function () {
        this.ingrQuery = this.queryService.getQuery().ingrQuery;
        this.ctgQuery = this.queryService.getQuery().ctgQuery;
    };
    RecipeListComponent.prototype.onSelect = function (recipe) {
        this.queryService.setQuery(this.ingrQuery, this.ctgQuery);
        this.router.navigate(['/recipe', recipe._id]);
    };
    RecipeListComponent.prototype.newRecipe = function () {
        this.router.navigate(['/recipes/new']);
    };
    return RecipeListComponent;
}());
RecipeListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__(291),
        styles: [__webpack_require__(265)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_recipe_service__["a" /* RecipeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_recipe_service__["a" /* RecipeService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_current_query_service__["a" /* CurrentQueryService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_current_query_service__["a" /* CurrentQueryService */]) === "function" && _c || Object])
], RecipeListComponent);

var _a, _b, _c;
//# sourceMappingURL=recipe-list.component.js.map

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_recipe_service__ = __webpack_require__(25);
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
        template: __webpack_require__(292),
        styles: [__webpack_require__(266), __webpack_require__(165)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_recipe_service__["a" /* RecipeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_recipe_service__["a" /* RecipeService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _c || Object])
], RecipePrintComponent);

var _a, _b, _c;
//# sourceMappingURL=recipe-print.component.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Recipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ingredient; });
var Recipe = (function () {
    function Recipe(title, servings, duration, difficulty, cookCount, ingredients, heroImage, description, descrImage, categories, _id) {
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

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "@media only screen and (min-width: 992px) {\r\n    .mb-lg-4 {\r\n        margin-top: 0 !important;\r\n    }   \r\n}\r\n\r\n.img-fullwidth {\r\n    width: 100%;\r\n    height: 300px;\r\n    -o-object-fit: cover;\r\n       object-fit: cover;\r\n}\r\n\r\n.description-text {\r\n    /*white-space: pre-wrap;*/\r\n}\r\n\r\n.top-info {\r\n    line-height: 34px; \r\n    font-size: 16px;\r\n}\r\n\r\n.top-info .icon {\r\n    margin-right: 10px;\r\n    line-height: 34px;\r\n}\r\n\r\n.icon.icon-spoon-knife {\r\n    fill: #222;\r\n    position: absolute;\r\n    top: 50px;\r\n    right: 30px;\r\n    width: 20px;\r\n    height: 20px;\r\n}\r\n\r\n.icon.icon-chevron-left {\r\n    fill: #222;\r\n    position: absolute;\r\n    top: 50px;\r\n    left: 5px;\r\n    width: 2em;\r\n    height: 2em;\r\n}\r\n\r\n.icon.icon-star-o {\r\n    width: 0.9285714285714285em;\r\n    height: 0.9285714285714285em;\r\n}\r\n\r\n.icon {\r\n    width: 1em;\r\n    height: 1em;\r\n}\r\n\r\n.badge.cook-badge {\r\n    background-color: #222;\r\n    position: absolute;\r\n    top: 50px;\r\n    right: 5px;\r\n}\r\n\r\n@media only screen and (max-width: 767px) {\r\n    .icon.icon-spoon-knife {\r\n        top: 10px;\r\n    }\r\n\r\n    .icon.icon-chevron-left {\r\n        top: 10px;\r\n    }\r\n\r\n    .badge.cook-badge {\r\n        top: 10px;\r\n    }\r\n}\r\n\r\n.panel.panel-horizontal {\r\n    display:table;\r\n    width:100%;\r\n}\r\n.panel.panel-horizontal > .panel-heading, .panel.panel-horizontal > .panel-body, .panel.panel-horizontal > .panel-footer {\r\n    display:table-cell;\r\n    padding: 6px;\r\n}\r\n.panel.panel-horizontal > .panel-heading, .panel.panel-horizontal > .panel-footer {\r\n    width: 25%;\r\n    border:0;\r\n    vertical-align: middle;\r\n}\r\n.panel.panel-horizontal > .panel-heading {\r\n    border-right: 1px solid #ddd;\r\n    border-top-right-radius: 0;\r\n    border-bottom-left-radius: 4px;\r\n}\r\n.panel.panel-horizontal > .panel-footer {\r\n    border-left: 1px solid #ddd;\r\n    border-top-left-radius: 0;\r\n    border-bottom-right-radius: 4px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 182:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 182;


/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(64);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(17);
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
    }
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

/***/ 193:
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
        template: __webpack_require__(286),
        styles: [__webpack_require__(262)]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_markdown__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_routing_module__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__recipes_recipes_module__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__svgicons_svg_icon_svg_icon_component__ = __webpack_require__(202);
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
            __WEBPACK_IMPORTED_MODULE_9__svgicons_svg_icon_svg_icon_component__["a" /* SvgIconComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
            __WEBPACK_IMPORTED_MODULE_8__recipes_recipes_module__["a" /* RecipesModule */],
            __WEBPACK_IMPORTED_MODULE_7__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_5_angular2_markdown__["a" /* MarkdownModule */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__(53);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConverterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ConverterComponent = (function () {
    function ConverterComponent(modalService) {
        this.modalService = modalService;
        this.quantity = 0;
    }
    ConverterComponent.prototype.open = function (content) {
        var _this = this;
        this.modalService.open(content).result.then(function (result) {
            _this.quantity = 0;
        }, function (reason) {
            _this.quantity = 0;
        });
    };
    return ConverterComponent;
}());
ConverterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'converter',
        template: __webpack_require__(287),
        styles: [__webpack_require__(263)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]) === "function" && _a || Object])
], ConverterComponent);

var _a;
//# sourceMappingURL=converter.component.js.map

/***/ }),

/***/ 196:
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
                console.log('before' + quantity);
                value = convertMetrics(value);
                console.log('after' + quantity);
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
            var validMetric = /\d+\s?(g|kg|ml|l)/i;
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
                    return quotient.toString() + " \xBC";
                }
                return "\xBC";
            }
            if (remainder === 0.5) {
                if (quotient !== 0) {
                    return quotient.toString() + " \xBD";
                }
                return "\xBD";
            }
            if (remainder === 0.75) {
                if (quotient !== 0) {
                    return quotient.toString() + " \xBE";
                }
                return "\xBE";
            }
            return num.toString();
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

/***/ 197:
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

/***/ 198:
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
    FilterRecipesPipe.prototype.transform = function (recipes, ingrQuery, ctgQuery) {
        if (ingrQuery == '' && ctgQuery == '') {
            return recipes;
        }
        var filteredRecipes = new Array();
        var ingrArray = ingrQuery.trim().split(',');
        var ctgArray = ctgQuery.trim().split(',');
        if (ctgQuery == '') {
            recipes.forEach(function (recipe) {
                var ingrArrayTmp = ingrArray.slice(0);
                recipe.ingredients.forEach(function (ingredient) {
                    ingrArrayTmp.forEach(function (ingr) {
                        if (ingredient.name.toLowerCase().indexOf(ingr.toLowerCase()) !== -1) {
                            ingrArrayTmp.splice(ingrArrayTmp.indexOf(ingr), 1);
                        }
                    });
                });
                if (ingrArrayTmp.length === 0) {
                    filteredRecipes.push(recipe);
                }
            });
            return filteredRecipes;
        }
        if (ingrQuery == '') {
            recipes.forEach(function (recipe) {
                var ctgArrayTmp = ctgArray.slice(0);
                if (recipe.categories) {
                    recipe.categories.forEach(function (category) {
                        ctgArrayTmp.forEach(function (ctg) {
                            if (category.toLowerCase().indexOf(ctg.toLowerCase()) !== -1) {
                                ctgArrayTmp.splice(ctgArrayTmp.indexOf(ctg), 1);
                            }
                        });
                    });
                }
                if (ctgArrayTmp.length === 0) {
                    filteredRecipes.push(recipe);
                }
            });
            return filteredRecipes;
        }
        recipes.forEach(function (recipe) {
            var ingrMatch = false;
            var ingrArrayTmp = ingrArray.slice(0);
            recipe.ingredients.forEach(function (ingredient) {
                ingrArrayTmp.forEach(function (ingr) {
                    if (ingredient.name.toLowerCase().indexOf(ingr.toLowerCase()) !== -1) {
                        ingrArrayTmp.splice(ingrArrayTmp.indexOf(ingr), 1);
                    }
                });
                if (ingrArrayTmp.length === 0) {
                    ingrMatch = true;
                }
            });
            if (recipe.categories && ingrMatch) {
                var ctgArrayTmp_1 = ctgArray.slice(0);
                recipe.categories.forEach(function (category) {
                    ctgArrayTmp_1.forEach(function (ctg) {
                        if (category.toLowerCase().indexOf(ctg.toLowerCase()) !== -1) {
                            ctgArrayTmp_1.splice(ctgArrayTmp_1.indexOf(ctg), 1);
                        }
                    });
                });
                if (ctgArrayTmp_1.length === 0) {
                    filteredRecipes.push(recipe);
                }
            }
        });
        return filteredRecipes;
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

/***/ 199:
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

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_recipe_details_recipe_details_component__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_recipe_form_recipe_form_component__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_recipe_list_recipe_list_component__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_recipe_edit_recipe_edit_component__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_recipe_print_recipe_print_component__ = __webpack_require__(148);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipeRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var recipeRoutes = [
    { path: 'recipes', component: __WEBPACK_IMPORTED_MODULE_4__components_recipe_list_recipe_list_component__["a" /* RecipeListComponent */] },
    { path: 'recipes/new', component: __WEBPACK_IMPORTED_MODULE_3__components_recipe_form_recipe_form_component__["a" /* RecipeFormComponent */] },
    { path: 'recipe/:id', component: __WEBPACK_IMPORTED_MODULE_2__components_recipe_details_recipe_details_component__["a" /* RecipeDetailsComponent */] },
    { path: 'recipe/:id/edit', component: __WEBPACK_IMPORTED_MODULE_5__components_recipe_edit_recipe_edit_component__["a" /* RecipeEditComponent */] },
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

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_markdown__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngui_auto_complete__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngui_auto_complete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__ngui_auto_complete__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_dnd__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng_inline_href__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng_inline_href___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng_inline_href__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_recipe_list_recipe_list_component__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_recipe_details_recipe_details_component__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_recipe_form_recipe_form_component__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_recipe_edit_recipe_edit_component__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_recipe_print_recipe_print_component__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_recipe_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_current_query_service__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__recipes_routing_module__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pipes_calc_servings_pipe__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pipes_filter_recipes_pipe__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pipes_difficulty_string_pipe__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_converter_converter_component__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pipes_round_pipe__ = __webpack_require__(199);
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
            __WEBPACK_IMPORTED_MODULE_15__recipes_routing_module__["a" /* RecipeRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */],
            __WEBPACK_IMPORTED_MODULE_3_angular2_markdown__["a" /* MarkdownModule */],
            __WEBPACK_IMPORTED_MODULE_5__ngui_auto_complete__["NguiAutoCompleteModule"],
            __WEBPACK_IMPORTED_MODULE_6_ng2_dnd__["a" /* DndModule */].forRoot()
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_7_ng_inline_href__["InlineHrefDirective"]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_9__components_recipe_details_recipe_details_component__["a" /* RecipeDetailsComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_recipe_form_recipe_form_component__["a" /* RecipeFormComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_recipe_list_recipe_list_component__["a" /* RecipeListComponent */],
            __WEBPACK_IMPORTED_MODULE_11__components_recipe_edit_recipe_edit_component__["a" /* RecipeEditComponent */],
            __WEBPACK_IMPORTED_MODULE_16__pipes_calc_servings_pipe__["a" /* CalcServingsPipe */],
            __WEBPACK_IMPORTED_MODULE_17__pipes_filter_recipes_pipe__["a" /* FilterRecipesPipe */],
            __WEBPACK_IMPORTED_MODULE_18__pipes_difficulty_string_pipe__["a" /* DifficultyStringPipe */],
            __WEBPACK_IMPORTED_MODULE_7_ng_inline_href__["InlineHrefDirective"],
            __WEBPACK_IMPORTED_MODULE_12__components_recipe_print_recipe_print_component__["a" /* RecipePrintComponent */],
            __WEBPACK_IMPORTED_MODULE_19__components_converter_converter_component__["a" /* ConverterComponent */],
            __WEBPACK_IMPORTED_MODULE_20__pipes_round_pipe__["a" /* RoundPipe */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_13__services_recipe_service__["a" /* RecipeService */],
            __WEBPACK_IMPORTED_MODULE_14__services_current_query_service__["a" /* CurrentQueryService */]
        ]
    })
], RecipesModule);

//# sourceMappingURL=recipes.module.js.map

/***/ }),

/***/ 202:
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
        template: __webpack_require__(293),
        styles: [__webpack_require__(267)]
    }),
    __metadata("design:paramtypes", [])
], SvgIconComponent);

//# sourceMappingURL=svg-icon.component.js.map

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(86);
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

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, ".icon-trash {\r\n  width: 0.7857142857142857em;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "@media only screen and (min-width: 992px) {\r\n    .recipe-block {\r\n        height: 125px;\r\n    }\r\n}\r\n\r\n.thumb-img {\r\n    height: 250px;\r\n    -o-object-fit: cover;\r\n       object-fit: cover;\r\n}\r\n\r\n.new-recipe {\r\n    position: fixed;\r\n    right: 50px;\r\n    bottom: 50px;\r\n    z-index: 1000;\r\n}\r\n\r\n.plus-button {\r\n    width: 100px;\r\n    height: 100px;\r\n}\r\n\r\n@media only screen and (max-width: 767px) {\r\n    .new-recipe {\r\n        right: 20px;\r\n        bottom: 20px;\r\n    }\r\n\r\n    .plus-button {\r\n        width: 75px;\r\n        height: 75px;\r\n    }\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "@media print {\r\n    .top-icons {\r\n        display: none;\r\n    }\r\n\r\n    h1::first-letter, h4::first-letter {\r\n        margin-top: 0;\r\n    }\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, ".icon {\r\n  display: inline-block;\r\n  width: 1em;\r\n  height: 1em;\r\n  stroke-width: 0;\r\n  stroke: currentColor;\r\n  fill: currentColor;\r\n}\r\n.icon-clock-o {\r\n  width: 0.8571428571428571em;\r\n}\r\n.icon-user {\r\n  width: 0.7142857142857142em;\r\n}\r\n.icon-trash {\r\n  width: 0.7857142857142857em;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 286:
/***/ (function(module, exports) {

module.exports = "<svg-icons></svg-icons>\r\n<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ 287:
/***/ (function(module, exports) {

module.exports = "<ng-template #content let-c=\"close\" let-d=\"dismiss\">\r\n  <div class=\"modal-header\">\r\n    <h4 class=\"modal-title\">Umrechner</h4>\r\n    <button type=\"button\" class=\"close\" (click)=\"d('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n  </div>\r\n  <div class=\"modal-body\">\r\n    <input type=\"number\" step=\"any\" class=\"form-control col-6 col-sm-8 d-inline-block\" name=\"ml\" [ngModel]=\"quantity | round:3\" (ngModelChange)=\"quantity=$event\">\r\n    <span class=\"pl-1 col-6 col-sm-4\"><strong>ml</strong> (Milliliter)</span>\r\n    <input type=\"number\" step=\"any\" class=\"form-control col-6 col-sm-8 d-inline-block\" name=\"l\" [ngModel]=\"quantity/1000 | round:3\" (ngModelChange)=\"quantity=$event*1000\">\r\n    <span class=\"pl-1 col-6 col-sm-4\"><strong>l</strong> (Liter)</span>\r\n    <input type=\"number\" step=\"any\" class=\"form-control col-6 col-sm-8 d-inline-block\" name=\"tl\" [ngModel]=\"quantity/5 | round:3\" (ngModelChange)=\"quantity=$event*5\">\r\n    <span class=\"pl-1 col-6 col-sm-4\"><strong>TL</strong> (Teelöffel)</span>\r\n    <input type=\"number\" step=\"any\" class=\"form-control col-6 col-sm-8 d-inline-block\" name=\"el\" [ngModel]=\"quantity/15 | round:3\" (ngModelChange)=\"quantity=$event*15\">\r\n    <span class=\"pl-1 col-6 col-sm-4\"><strong>EL</strong> (Esslöffel)</span>\r\n    <input type=\"number\" step=\"any\" class=\"form-control col-6 col-sm-8 d-inline-block\" name=\"kleine-tasse\" [ngModel]=\"quantity/125 | round:3\" (ngModelChange)=\"quantity=$event*125\">\r\n    <span class=\"pl-1 col-6 col-sm-4\"><strong>kleine</strong> Tasse</span>\r\n    <input type=\"number\" step=\"any\" class=\"form-control col-6 col-sm-8 d-inline-block\" name=\"grosse-tasse\" [ngModel]=\"quantity/200 | round:3\" (ngModelChange)=\"quantity=$event*200\">\r\n    <span class=\"pl-1 col-6 col-sm-4\"><strong>große</strong> Tasse</span>\r\n    <input type=\"number\" step=\"any\" class=\"form-control col-6 col-sm-8 d-inline-block\" name=\"cup\" [ngModel]=\"quantity/250 | round:3\" (ngModelChange)=\"quantity=$event*250\">\r\n    <span class=\"pl-1 col-6 col-sm-4\"><strong>Cup</strong> (amerik.)</span>\r\n  </div>\r\n</ng-template>\r\n\r\n<button type=\"button\" class=\"btn btn-secondary\" (click)=\"open(content)\">\r\n  <svg class=\"icon icon-refresh\"><use inlineHref=\"#icon-refresh\"></use></svg>\r\n  <span class=\"pl-1\">Umrechner</span>\r\n</button>\r\n"

/***/ }),

/***/ 288:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"recipe\">\r\n  <svg class=\"icon icon-chevron-left click\" (click)=\"gotoRecipes()\"><use inlineHref=\"#icon-chevron-left\"></use></svg>\r\n  <svg class=\"icon icon-spoon-knife click\" (click)=\"cooked()\"><use inlineHref=\"#icon-spoon-knife\"></use></svg>\r\n  <span class=\"badge cook-badge\">{{ recipe.cookCount }}</span>\r\n</div>\r\n<div class=\"container mt-5 mt-sm-0\" *ngIf=\"recipe\">\r\n  <h1 class=\"display-3 text-center mt-4 px-1\">{{ recipe.title }}</h1>\r\n  <hr class=\"my-4\">\r\n  <img *ngIf=\"recipe.heroImage\" class=\"img-fullwidth\" src=\"{{recipe.heroImage}}\" alt=\"{{recipe.title}}\">\r\n  <div class=\"row my-4\">\r\n    <div class=\"col-4 col-lg-2\">\r\n      <div class=\"input-group\">\r\n        <div class=\"input-group-addon\"><svg class=\"icon icon-user\"><use inlineHref=\"#icon-user\"></use></svg></div>\r\n        <input type=\"number\" [(ngModel)]=\"desiredServings\" name=\"servings\" id=\"servings\" class=\"form-control\">\r\n      </div>\r\n    </div>\r\n    <div class=\"col-8 col-lg-5 top-info text-center\">\r\n      <div *ngIf=\"recipe.categories\"><span *ngFor=\"let ctg of recipe.categories\" class=\"click\" (click)=\"searchCtg(ctg)\"> #<strong>{{ ctg }}</strong> </span></div>\r\n    </div>\r\n    <div class=\"col-6 col-lg-3 mt-3 mt-lg-0 top-info\">\r\n      <svg class=\"icon icon-clock-o\">\r\n        <use inlineHref=\"#icon-clock-o\"></use>\r\n      </svg>\r\n      <span>{{ recipe.duration }} Minuten</span>\r\n    </div>\r\n    <div class=\"col-6 col-lg-2 mt-3 mt-lg-0 top-info\">\r\n      <svg class=\"icon icon-star-o\">\r\n        <use inlineHref=\"#icon-star-o\"></use>\r\n      </svg>\r\n      <span>{{ recipe.difficulty | difficultyString }}</span>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-6\">\r\n      <h2 class=\"mb-4 d-inline-block\">Zutaten</h2>\r\n      <converter class=\"float-right\"></converter>\r\n      <ul class=\"list-group\">\r\n        <li class=\"list-group-item\" *ngFor=\"let ingredient of recipe.ingredients\">\r\n          {{ ingredient.name | calcServings:recipe.servings:desiredServings }}\r\n          <span *ngIf=\"ingredient.hint\" class=\"ml-1\">({{ ingredient.hint }})</span>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n    <div class=\"col-lg-6\">\r\n      <h2 class=\"my-4 mb-lg-4\">Zubereitung</h2>\r\n      <markdown *ngIf=\"recipe.description\" class=\"description-text\">{{ recipe.description }}</markdown>\r\n      <img #descrImage *ngIf=\"recipe.descrImage\" src=\"{{recipe.descrImage}}\"\r\n          alt=\"Recipe description\" class=\"img-fluid\">\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"my-3\">\r\n    <button class=\"btn btn-primary click\" type=\"button\" (click)=\"edit()\">Bearbeiten</button>\r\n    <!--<button class=\"btn btn-danger click\" type=\"button\" data-toggle=\"modal\" data-target=\"#deleteModal\">Löschen</button>-->\r\n    <button class=\"btn btn-secondary float-right hidden-sm-down click\" type=\"button\" (click)=\"printView()\">Druckansicht</button>\r\n  </div>\r\n\r\n  <div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" id=\"deleteModal\">\r\n    <div class=\"modal-dialog\" role=\"document\">\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header\">\r\n          <h4 class=\"modal-title\">Rezept löschen</h4>\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n          </button>\r\n        </div>\r\n        <div class=\"modal-body\">\r\n          <p>Möchtest du <strong>\"{{ recipe.title }}\"</strong> wirklich löschen?</p>\r\n        </div>\r\n        <div class=\"modal-footer\">\r\n          <button type=\"button\" class=\"btn btn-default click\" data-dismiss=\"modal\">Abbrechen</button>\r\n          <button type=\"button\" class=\"btn btn-danger click\" (click)=\"deleteRecipe(); gotoRecipes()\" data-dismiss=\"modal\">Löschen</button>\r\n        </div>\r\n      </div>\r\n      <!-- /.modal-content -->\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n  </div>\r\n  <!-- /.modal -->\r\n</div> "

/***/ }),

/***/ 289:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"recipe\" class=\"container\">\r\n  <form #recipeForm=\"ngForm\">\r\n    <h1 class=\"display-3 text-center mt-4\">{{ recipe.title }}</h1>\r\n    <hr class=\"my-4\">\r\n    <img *ngIf=\"recipe.heroImage\" class=\"img-fluid mb-3\" src=\"{{recipe.heroImage}}\" alt=\"{{recipe.title}}\">\r\n    <div class=\"input-group\">\r\n        <input type=\"text\" [(ngModel)]=\"recipe.title\" name=\"title\" class=\"form-control \" id=\"title\" required #title=\"ngModel\" placeholder=\"Titel\">\r\n        <span class=\"input-group-btn\">\r\n          <button type=\"button\" class=\"btn btn-secondary\" (click)=\"showHeroPicker()\">Neues Bild</button>\r\n        </span>\r\n    </div>\r\n    <div [hidden]=\"title.valid || title.pristine\"\r\n          class=\"alert alert-danger\">\r\n      Das Rezept muss einen Titel haben\r\n    </div>\r\n\r\n    <div class=\"row form-group mt-3 w-100 justify-content-center\">\r\n      <div class=\"col-sm-4 col-lg-2\">\r\n        <div class=\"input-group\">\r\n          <div class=\"input-group-addon\"><svg class=\"icon icon-user\"><use inlineHref=\"#icon-user\"></use></svg></div>\r\n          <input type=\"number\" [(ngModel)]=\"recipe.servings\" name=\"servings\" id=\"servings\" class=\"form-control\">\r\n        </div>\r\n      </div>\r\n      <div class=\"col-sm-6 offset-sm-2 offset-md-0 col-md-4 col-lg-4 offset-lg-1\">\r\n        <div class=\"input-group\">\r\n          <div class=\"input-group-addon\"><svg class=\"icon icon-clock-o\"><use inlineHref=\"#icon-clock-o\"></use></svg></div>\r\n          <input type=\"number\" [(ngModel)]=\"recipe.duration\" name=\"duration\" id=\"duration\" class=\"form-control\">\r\n          <div class=\"input-group-addon\">Minuten</div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-sm-12 col-md-4 col-lg-4 offset-lg-1 mt-3 mt-md-0\">\r\n        <div class=\"btn-group\" role=\"group\" aria-label=\"...\">\r\n          <button type=\"button\" class=\"btn btn-secondary click\" [ngClass]=\"{'active':recipe.difficulty==1}\" (click)=\"recipe.difficulty=1\">Einfach</button>\r\n          <button type=\"button\" class=\"btn btn-secondary click\" [ngClass]=\"{'active':recipe.difficulty==2}\" (click)=\"recipe.difficulty=2\">Mittel</button>\r\n          <button type=\"button\" class=\"btn btn-secondary click\" [ngClass]=\"{'active':recipe.difficulty==3}\" (click)=\"recipe.difficulty=3\">Schwer</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <h2 class=\"mb-3 section-header\">Zutaten</h2>\r\n    <div class=\"list-group\" dnd-sortable-container [sortableData]=\"recipe.ingredients\">\r\n      <div *ngFor=\"let ingr of recipe.ingredients; let i = index\" class=\"list-group-item\" dnd-sortable [sortableIndex]=\"i\">\r\n          {{ ingr.name }} <span *ngIf=\"ingr.hint!=''\"> ({{ ingr.hint }})</span>\r\n          <a class=\"pl-3 click\" (click)=\"editIngredient(i)\"><svg class=\"icon icon-pencil\"><use xlink:href=\"#icon-pencil\"></use></svg></a>\r\n          <button type=\"button\" class=\"close pl-3 click\" (click)=removeIngredient(ingr)><span aria-hidden=\"true\">&times;</span></button>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"!editing\" class=\"row form-group mt-3\">\r\n      <div class=\"col-sm-6\">\r\n        <div class=\"input-group\">\r\n          <span class=\"input-group-btn\">\r\n            <button class=\"btn btn-primary click hidden-lg-up\" type=\"button\" (click)=\"addIngredient()\">Enter</button>\r\n          </span>\r\n          <input type=\"text\" [(ngModel)]=\"newIngredient.name\" name=\"name\" class=\"form-control\" id=\"name\" \r\n                (keyup.enter)=\"addIngredient()\" placeholder=\"Enter drücken zum Hinzufügen\" #ingredient>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-sm-6\">\r\n        <div class=\"input-group\">\r\n          <div class=\"input-group-addon\">Hinweis</div>\r\n          <input type=\"text\" [(ngModel)]=\"newIngredient.hint\" name=\"hint\" class=\"form-control\" id=\"hint\" \r\n                (keyup.enter)=\"addIngredient(); ingredient.focus()\" placeholder=\"Klammern werden automatisch gesetzt\">\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"editing\" class=\"row form-group mt-3\">\r\n      <div class=\"col-sm-6\">\r\n        <div class=\"input-group\">\r\n          <span class=\"input-group-btn\">\r\n            <button class=\"btn btn-primary click hidden-lg-up\" type=\"button\" (click)=\"updateIngredient(editIngr)\">Enter</button>\r\n          </span>\r\n          <input type=\"text\" [(ngModel)]=\"newIngredient.name\" name=\"newName\" class=\"form-control\" id=\"newName\" \r\n                (keyup.enter)=\"updateIngredient(editIngr)\" placeholder=\"Enter drücken zum Bearbeiten\" #ingredient>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-sm-6\">\r\n        <div class=\"input-group\">\r\n          <div class=\"input-group-addon\">Hinweis</div>\r\n          <input type=\"text\" [(ngModel)]=\"newIngredient.hint\" name=\"newHint\" class=\"form-control\" id=\"newHint\" \r\n                (keyup.enter)=\"updateIngredient(editIngr)\" placeholder=\"Klammern werden automatisch gesetzt\">\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <h2 class=\"mb-3 section-header\">Info</h2>\r\n    <textarea rows=\"8\" [(ngModel)]=\"recipe.description\" name=\"description\" class=\"form-control\" id=\"description\" #description=\"ngModel\" placeholder=\"Beschreibung...\"></textarea>\r\n    <img *ngIf=\"recipe.descrImage\" class=\"img-fluid my-3\" src=\"{{recipe.descrImage}}\" alt=\"Recipe description\">\r\n    <button type=\"button\" class=\"btn btn-default click mt-3\" (click)=showDescPicker()>Neue Anleitung</button>\r\n\r\n      <h2 class=\"my-3 section-header\">Kategorien</h2>\r\n      <div class=\"mb-2 d-inline-block\" *ngFor=\"let ctg of recipe.categories\">\r\n        {{ ctg }}\r\n        <button type=\"button\" class=\"close px-2 click\" (click)=\"removeCategory(ctg)\"><span aria-hidden=\"true\">&times;</span></button>  \r\n      </div>\r\n      <div class=\"input-group\">\r\n        <span class=\"input-group-btn\">\r\n          <button class=\"btn btn-primary click hidden-lg-up\" type=\"button\" (click)=\"addCategory(category.value); category.value=''\">Enter</button>\r\n        </span>\r\n        <input *ngIf=\"recipes\" #category auto-complete type=\"text\" name=\"category\" class=\"form-control w-100\" id=\"category\" \r\n              (keyup.enter)=\"addCategory(category.value); category.value=''\" placeholder=\"Enter drücken zum Hinzufügen\" \r\n              [source]=\"getCategories()\" [min-chars]=\"1\" [accept-user-input]=\"true\" no-match-found-text=\"Kategorie ist neu\">\r\n      </div>\r\n      \r\n    <button type=\"button\" (click)=\"save(); gotoRecipe(recipe)\" class=\"btn btn-success my-3 click\" [disabled]=\"!recipeForm.form.valid\">Speichern</button>\r\n  </form>\r\n</div>\r\n"

/***/ }),

/***/ 290:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <form #recipeForm=\"ngForm\">\r\n    <h1 class=\"display-3 text-center mt-4\">{{ model.title }}</h1>\r\n    <hr class=\"my-4\">\r\n    <div class=\"input-group\">\r\n      <input type=\"text\" [(ngModel)]=\"model.title\" name=\"title\" class=\"form-control \" id=\"title\" required #title=\"ngModel\" placeholder=\"Titel\">\r\n      <span class=\"input-group-btn\">\r\n        <button class=\"btn btn-secondary click\" type=\"button\" (click)=\"showHeroPicker()\">Titelbild</button>\r\n      </span>\r\n    </div>\r\n    <div class=\"text-right py-2\" *ngIf=\"model.heroImage\"> \"{{ heroFilename }}\" wurde erfolgreich hochgeladen!</div>\r\n    <div [hidden]=\"title.valid || title.pristine\"\r\n          class=\"alert alert-danger\">\r\n      Das Rezept muss einen Titel haben\r\n    </div>\r\n\r\n    <div class=\"row form-group mt-3 w-100 justify-content-center\">\r\n      <div class=\"col-sm-4 col-lg-2\">\r\n        <div class=\"input-group\">\r\n          <div class=\"input-group-addon\"><svg class=\"icon icon-user\"><use inlineHref=\"#icon-user\"></use></svg></div>\r\n          <input type=\"number\" [(ngModel)]=\"model.servings\" name=\"servings\" id=\"servings\" class=\"form-control\">\r\n        </div>\r\n      </div>\r\n      <div class=\"col-sm-6 offset-sm-2 offset-md-0 col-md-4 col-lg-4 offset-lg-1\">\r\n        <div class=\"input-group\">\r\n          <div class=\"input-group-addon\"><svg class=\"icon icon-clock-o\"><use inlineHref=\"#icon-clock-o\"></use></svg></div>\r\n          <input type=\"number\" [(ngModel)]=\"model.duration\" name=\"duration\" id=\"duration\" class=\"form-control\">\r\n          <div class=\"input-group-addon\">Minuten</div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-sm-12 col-md-4 col-lg-4 offset-lg-1 mt-3 mt-md-0\">\r\n        <div class=\"btn-group\" role=\"group\" aria-label=\"...\">\r\n          <button type=\"button\" class=\"btn btn-secondary click\" [ngClass]=\"{'active':model.difficulty==1}\" (click)=\"model.difficulty=1\">Einfach</button>\r\n          <button type=\"button\" class=\"btn btn-secondary click\" [ngClass]=\"{'active':model.difficulty==2}\" (click)=\"model.difficulty=2\">Mittel</button>\r\n          <button type=\"button\" class=\"btn btn-secondary click\" [ngClass]=\"{'active':model.difficulty==3}\" (click)=\"model.difficulty=3\">Schwer</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <h2 class=\"mb-3 section-header\">Zutaten</h2>\r\n    <div class=\"list-group\" dnd-sortable-container [sortableData]=\"ingredients\">\r\n      <div class=\"mb-2\" *ngFor=\"let ingr of ingredients; let i = index\" class=\"list-group-item\" dnd-sortable [sortableIndex]=\"i\">\r\n        <div *ngIf=\"ingr.name != ''\">\r\n          {{ ingr.name }} <span *ngIf=\"ingr.hint!=''\"> ({{ ingr.hint }})</span>\r\n          <a class=\"pl-3 click\" (click)=\"editIngredient(i)\"><svg class=\"icon icon-pencil\"><use xlink:href=\"#icon-pencil\"></use></svg></a>\r\n          <button *ngIf=\"ingredientAdded\" type=\"button\" class=\"close pl-3 click\" (click)=removeIngredient(ingr)><span aria-hidden=\"true\">&times;</span></button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    \r\n    <div *ngIf=\"!editing\" class=\"row form-group mt-3\">\r\n      <div class=\"col-sm-6\">\r\n        <div class=\"input-group\">\r\n          <span class=\"input-group-btn\">\r\n            <button class=\"btn btn-primary click hidden-lg-up\" type=\"button\" (click)=\"addIngredient()\">Enter</button>\r\n          </span>\r\n          <input type=\"text\" [(ngModel)]=\"newIngredient.name\" name=\"name\" class=\"form-control\" id=\"name\" \r\n                (keyup.enter)=\"addIngredient()\" placeholder=\"Enter drücken zum Hinzufügen\" #ingredient>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-sm-6\">\r\n        <div class=\"input-group\">\r\n          <div class=\"input-group-addon\">Hinweis</div>\r\n          <input type=\"text\" [(ngModel)]=\"newIngredient.hint\" name=\"hint\" class=\"form-control\" id=\"hint\" \r\n                (keyup.enter)=\"addIngredient(); ingredient.focus()\" placeholder=\"Klammern werden automatisch gesetzt\">\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"editing\" class=\"row form-group mt-3\">\r\n      <div class=\"col-sm-6\">\r\n        <div class=\"input-group\">\r\n          <span class=\"input-group-btn\">\r\n            <button class=\"btn btn-primary click hidden-lg-up\" type=\"button\" (click)=\"updateIngredient(editIngr)\">Enter</button>\r\n          </span>\r\n          <input type=\"text\" [(ngModel)]=\"newIngredient.name\" name=\"newName\" class=\"form-control\" id=\"newName\" \r\n                (keyup.enter)=\"updateIngredient(editIngr)\" placeholder=\"Enter drücken zum Bearbeiten\" #ingredient>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-sm-6\">\r\n        <div class=\"input-group\">\r\n          <div class=\"input-group-addon\">Hinweis</div>\r\n          <input type=\"text\" [(ngModel)]=\"newIngredient.hint\" name=\"newHint\" class=\"form-control\" id=\"newHint\" \r\n                (keyup.enter)=\"updateIngredient(editIngr)\" placeholder=\"Klammern werden automatisch gesetzt\">\r\n        </div>\r\n      </div>\r\n    </div>\r\n    \r\n    <h2 class=\"mb-3 section-header\">Info</h2>\r\n    <textarea rows=\"8\" [(ngModel)]=\"model.description\" name=\"description\" class=\"form-control\" id=\"description\" #description=\"ngModel\" placeholder=\"Beschreibung...\"></textarea>\r\n    <button type=\"button\" class=\"btn btn-default click mt-3\" (click)=showDescPicker()>Anleitung Hochladen</button>\r\n    <span *ngIf=\"model.descrImage\" class=\"pl-3\"> \"{{ descrFilename }}\" wurde erfolgreich hochgeladen!</span>\r\n\r\n    <h2 class=\"my-3 section-header\">Kategorien</h2>\r\n    <div class=\"mb-2 d-inline-block\" *ngFor=\"let ctg of categories\">\r\n      {{ ctg }}\r\n      <button type=\"button\" class=\"close px-2 click\" (click)=\"removeCategory(ctg)\"><span aria-hidden=\"true\">&times;</span></button>  \r\n    </div>\r\n    <div class=\"input-group ctg-input\">\r\n      <span class=\"input-group-btn\">\r\n        <button class=\"btn btn-primary click hidden-lg-up\" type=\"button\" (click)=\"addCategory(category.value); category.value=''\">Enter</button>\r\n      </span>\r\n      <input *ngIf=\"recipes\" #category auto-complete type=\"text\" name=\"category\" class=\"form-control w-100\" id=\"category\" \r\n              (keyup.enter)=\"addCategory(category.value); category.value=''\" placeholder=\"Enter drücken zum Hinzufügen\" \r\n              [source]=\"getCategories()\" [min-chars]=\"1\" [accept-user-input]=\"true\" no-match-found-text=\"Kategorie ist neu\">\r\n    </div>\r\n\r\n    <button type=\"button\" (click)=\"addRecipe(); gotoRecipes()\" class=\"btn btn-success my-3 click\" [disabled]=\"!recipeForm.form.valid\">Speichern</button>\r\n  </form>\r\n</div>"

/***/ }),

/***/ 291:
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron jumbotron-fluid\">\r\n  <div class=\"container\">\r\n    <h1 class=\"display-3\">Maries und Georgs Rezeptebuch</h1>\r\n    <p class=\"lead\" >Durchsuche unser Kochbuch nach ausgewählten Rezepten, die wir hier mit Liebe zusammengestellt haben :)</p>\r\n    <hr class=\"my-4\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-5 mb-2 mb-md-0\">\r\n        <input [(ngModel)]=\"ingrQuery\" type=\"text\" class=\"form-control\" name=\"ingredient-search\" placeholder=\"Suche nach Zutaten z.B. Tomate, Kartoffel\">\r\n      </div>\r\n      <div class=\"col-md-5 mb-2 mb-md-0\">\r\n        <input [(ngModel)]=\"ctgQuery\" type=\"text\" class=\"form-control\" name=\"category-search\" placeholder=\"Suche nach Kategorien z.B. Pasta, Vegan\">\r\n      </div>\r\n      <div class=\"col-6 offset-3 offset-md-0 col-md-2\">\r\n        <button type=\"button\" class=\"btn btn-primary click\" (click)=\"newRecipe()\">Neues Rezept</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"new-recipe\">\r\n  <a class=\"click\" (click)=\"newRecipe()\"><img class=\"plus-button\" src=\"../../../assets/images/plus-button4.svg\" alt=\"\"></a>\r\n</div>\r\n\r\n<div class=\"container\">\r\n  <div *ngIf=\"recipes\" class=\"row\">\r\n    <div *ngFor=\"let recipe of recipes | filterRecipes:ingrQuery:ctgQuery\"\r\n      (click)=\"onSelect(recipe)\" class=\"col-lg-6 col-xl-4 click\">\r\n      <div class=\"card mb-4\">\r\n        <img *ngIf=\"recipe.heroImage\" class=\"card-img-top thumb-img\" src=\"{{recipe.heroImage}}\" alt=\"{{recipe.title}}\">\r\n        <img *ngIf=\"!recipe.heroImage\" class=\"card-img-top thumb-img\" src=\"../../../assets/images/comingsoon.jpg\" alt=\"Coming soon\">\r\n        <div class=\"card-block recipe-block\">\r\n          <h3 class=\"card-title\">{{ recipe.title }}</h3>\r\n        </div>\r\n        <div class=\"card-footer\">\r\n          <svg class=\"icon icon-clock-o\">\r\n            <use inlineHref=\"#icon-clock-o\"></use>\r\n          </svg>\r\n          <span>{{ recipe.duration }} Minuten</span>\r\n          <div *ngIf=\"recipe.categories\"><span *ngFor=\"let ctg of recipe.categories\" class=\"click\"> #<strong>{{ ctg }}</strong> </span></div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 292:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"recipe\" class=\"top-icons\">\r\n  <svg class=\"icon icon-chevron-left click\" (click)=\"back()\"><use inlineHref=\"#icon-chevron-left\"></use></svg>\r\n  <svg class=\"icon icon-spoon-knife click\"><use inlineHref=\"#icon-spoon-knife\"></use></svg>\r\n  <span class=\"badge cook-badge\">{{ recipe.cookCount }}</span>\r\n</div>\r\n\r\n<div class=\"container\" *ngIf=\"recipe\">\r\n  <h1 class=\"text-center mt-4 px-1\">{{ recipe.title }}</h1>\r\n  <div class=\"row my-4\">\r\n    <div class=\"col top-info\">\r\n        <svg class=\"icon icon-user\">\r\n          <use inlineHref=\"#icon-user\"></use>\r\n        </svg>\r\n        <span>{{ recipe.servings }}</span>\r\n    </div>\r\n    <div class=\"col top-info\">\r\n      <svg class=\"icon icon-clock-o\">\r\n        <use inlineHref=\"#icon-clock-o\"></use>\r\n      </svg>\r\n      <span>{{ recipe.duration }} Minuten</span>\r\n    </div>\r\n    <div class=\"col top-info\">\r\n      <svg class=\"icon icon-star-o\">\r\n        <use inlineHref=\"#icon-star-o\"></use>\r\n      </svg>\r\n      <span>{{ recipe.difficulty | difficultyString }}</span>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-6\">\r\n      <h4 class=\"mb-2 section-header\">Zutaten</h4>\r\n      <ul class=\"list-unstyled\">\r\n        <li class=\"mb-1\"*ngFor=\"let ingredient of recipe.ingredients\">\r\n          - {{ ingredient.name }}\r\n          <span *ngIf=\"ingredient.hint\" class=\"ml-1\">({{ ingredient.hint }})</span>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n    <div class=\"col-6\">\r\n      <h4 class=\"mb-2 section-header\">Zubereitung</h4>\r\n      <p *ngIf=\"recipe.description\">{{ recipe.description }}</p>\r\n      <img #descrImage *ngIf=\"recipe.descrImage\" src=\"{{recipe.descrImage}}\"\r\n          alt=\"Recipe description\" class=\"img-fluid\">\r\n    </div>\r\n  </div>\r\n"

/***/ }),

/***/ 293:
/***/ (function(module, exports) {

module.exports = "<svg style=\"position: absolute; width: 0; height: 0; overflow: hidden;\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\r\n<defs>\r\n<symbol id=\"icon-spoon-knife\" viewBox=\"0 0 32 32\">\r\n<path d=\"M7 0c-3.314 0-6 3.134-6 7 0 3.31 1.969 6.083 4.616 6.812l-0.993 16.191c-0.067 1.098 0.778 1.996 1.878 1.996h1c1.1 0 1.945-0.898 1.878-1.996l-0.993-16.191c2.646-0.729 4.616-3.502 4.616-6.812 0-3.866-2.686-7-6-7zM27.167 0l-1.667 10h-1.25l-0.833-10h-0.833l-0.833 10h-1.25l-1.667-10h-0.833v13c0 0.552 0.448 1 1 1h2.604l-0.982 16.004c-0.067 1.098 0.778 1.996 1.878 1.996h1c1.1 0 1.945-0.898 1.878-1.996l-0.982-16.004h2.604c0.552 0 1-0.448 1-1v-13h-0.833z\"></path>\r\n</symbol>\r\n<symbol id=\"icon-chevron-left\" viewBox=\"0 0 21 28\">\r\n<path d=\"M18.297 4.703l-8.297 8.297 8.297 8.297c0.391 0.391 0.391 1.016 0 1.406l-2.594 2.594c-0.391 0.391-1.016 0.391-1.406 0l-11.594-11.594c-0.391-0.391-0.391-1.016 0-1.406l11.594-11.594c0.391-0.391 1.016-0.391 1.406 0l2.594 2.594c0.391 0.391 0.391 1.016 0 1.406z\"></path>\r\n</symbol>\r\n<symbol id=\"icon-user\" viewBox=\"0 0 20 28\">\r\n<title>user</title>\r\n<path d=\"M20 21.859c0 2.281-1.5 4.141-3.328 4.141h-13.344c-1.828 0-3.328-1.859-3.328-4.141 0-4.109 1.016-8.859 5.109-8.859 1.266 1.234 2.984 2 4.891 2s3.625-0.766 4.891-2c4.094 0 5.109 4.75 5.109 8.859zM16 8c0 3.313-2.688 6-6 6s-6-2.688-6-6 2.688-6 6-6 6 2.688 6 6z\"></path>\r\n</symbol>\r\n<symbol id=\"icon-clock-o\" viewBox=\"0 0 24 28\">\r\n<title>clock-o</title>\r\n<path d=\"M14 8.5v7c0 0.281-0.219 0.5-0.5 0.5h-5c-0.281 0-0.5-0.219-0.5-0.5v-1c0-0.281 0.219-0.5 0.5-0.5h3.5v-5.5c0-0.281 0.219-0.5 0.5-0.5h1c0.281 0 0.5 0.219 0.5 0.5zM20.5 14c0-4.688-3.813-8.5-8.5-8.5s-8.5 3.813-8.5 8.5 3.813 8.5 8.5 8.5 8.5-3.813 8.5-8.5zM24 14c0 6.625-5.375 12-12 12s-12-5.375-12-12 5.375-12 12-12 12 5.375 12 12z\"></path>\r\n</symbol>\r\n<symbol id=\"icon-edit\" viewBox=\"0 0 28 28\">\r\n<title>edit</title>\r\n<path d=\"M13.875 18.5l1.813-1.813-2.375-2.375-1.813 1.813v0.875h1.5v1.5h0.875zM20.75 7.25c-0.141-0.141-0.375-0.125-0.516 0.016l-5.469 5.469c-0.141 0.141-0.156 0.375-0.016 0.516s0.375 0.125 0.516-0.016l5.469-5.469c0.141-0.141 0.156-0.375 0.016-0.516zM22 16.531v2.969c0 2.484-2.016 4.5-4.5 4.5h-13c-2.484 0-4.5-2.016-4.5-4.5v-13c0-2.484 2.016-4.5 4.5-4.5h13c0.625 0 1.25 0.125 1.828 0.391 0.141 0.063 0.25 0.203 0.281 0.359 0.031 0.172-0.016 0.328-0.141 0.453l-0.766 0.766c-0.141 0.141-0.328 0.187-0.5 0.125-0.234-0.063-0.469-0.094-0.703-0.094h-13c-1.375 0-2.5 1.125-2.5 2.5v13c0 1.375 1.125 2.5 2.5 2.5h13c1.375 0 2.5-1.125 2.5-2.5v-1.969c0-0.125 0.047-0.25 0.141-0.344l1-1c0.156-0.156 0.359-0.187 0.547-0.109s0.313 0.25 0.313 0.453zM20.5 5l4.5 4.5-10.5 10.5h-4.5v-4.5zM27.438 7.063l-1.437 1.437-4.5-4.5 1.437-1.437c0.578-0.578 1.547-0.578 2.125 0l2.375 2.375c0.578 0.578 0.578 1.547 0 2.125z\"></path>\r\n</symbol>\r\n<symbol id=\"icon-trash\" viewBox=\"0 0 22 28\">\r\n<title>trash</title>\r\n<path d=\"M8 21.5v-11c0-0.281-0.219-0.5-0.5-0.5h-1c-0.281 0-0.5 0.219-0.5 0.5v11c0 0.281 0.219 0.5 0.5 0.5h1c0.281 0 0.5-0.219 0.5-0.5zM12 21.5v-11c0-0.281-0.219-0.5-0.5-0.5h-1c-0.281 0-0.5 0.219-0.5 0.5v11c0 0.281 0.219 0.5 0.5 0.5h1c0.281 0 0.5-0.219 0.5-0.5zM16 21.5v-11c0-0.281-0.219-0.5-0.5-0.5h-1c-0.281 0-0.5 0.219-0.5 0.5v11c0 0.281 0.219 0.5 0.5 0.5h1c0.281 0 0.5-0.219 0.5-0.5zM7.5 6h7l-0.75-1.828c-0.047-0.063-0.187-0.156-0.266-0.172h-4.953c-0.094 0.016-0.219 0.109-0.266 0.172zM22 6.5v1c0 0.281-0.219 0.5-0.5 0.5h-1.5v14.812c0 1.719-1.125 3.187-2.5 3.187h-13c-1.375 0-2.5-1.406-2.5-3.125v-14.875h-1.5c-0.281 0-0.5-0.219-0.5-0.5v-1c0-0.281 0.219-0.5 0.5-0.5h4.828l1.094-2.609c0.313-0.766 1.25-1.391 2.078-1.391h5c0.828 0 1.766 0.625 2.078 1.391l1.094 2.609h4.828c0.281 0 0.5 0.219 0.5 0.5z\"></path>\r\n</symbol>\r\n<symbol id=\"icon-star-o\" viewBox=\"0 0 26 28\">\r\n<title>star-o</title>\r\n<path d=\"M17.766 15.687l4.781-4.641-6.594-0.969-2.953-5.969-2.953 5.969-6.594 0.969 4.781 4.641-1.141 6.578 5.906-3.109 5.891 3.109zM26 10.109c0 0.281-0.203 0.547-0.406 0.75l-5.672 5.531 1.344 7.812c0.016 0.109 0.016 0.203 0.016 0.313 0 0.422-0.187 0.781-0.641 0.781-0.219 0-0.438-0.078-0.625-0.187l-7.016-3.687-7.016 3.687c-0.203 0.109-0.406 0.187-0.625 0.187-0.453 0-0.656-0.375-0.656-0.781 0-0.109 0.016-0.203 0.031-0.313l1.344-7.812-5.688-5.531c-0.187-0.203-0.391-0.469-0.391-0.75 0-0.469 0.484-0.656 0.875-0.719l7.844-1.141 3.516-7.109c0.141-0.297 0.406-0.641 0.766-0.641s0.625 0.344 0.766 0.641l3.516 7.109 7.844 1.141c0.375 0.063 0.875 0.25 0.875 0.719z\"></path>\r\n</symbol>\r\n<symbol id=\"icon-refresh\" viewBox=\"0 0 24 28\">\r\n<title>refresh</title>\r\n<path d=\"M23.609 16.5c0 0.031 0 0.078-0.016 0.109-1.328 5.531-5.891 9.391-11.656 9.391-3.047 0-6-1.203-8.219-3.313l-2.016 2.016c-0.187 0.187-0.438 0.297-0.703 0.297-0.547 0-1-0.453-1-1v-7c0-0.547 0.453-1 1-1h7c0.547 0 1 0.453 1 1 0 0.266-0.109 0.516-0.297 0.703l-2.141 2.141c1.469 1.375 3.422 2.156 5.437 2.156 2.781 0 5.359-1.437 6.813-3.813 0.375-0.609 0.562-1.203 0.828-1.828 0.078-0.219 0.234-0.359 0.469-0.359h3c0.281 0 0.5 0.234 0.5 0.5zM24 4v7c0 0.547-0.453 1-1 1h-7c-0.547 0-1-0.453-1-1 0-0.266 0.109-0.516 0.297-0.703l2.156-2.156c-1.484-1.375-3.437-2.141-5.453-2.141-2.781 0-5.359 1.437-6.813 3.813-0.375 0.609-0.562 1.203-0.828 1.828-0.078 0.219-0.234 0.359-0.469 0.359h-3.109c-0.281 0-0.5-0.234-0.5-0.5v-0.109c1.344-5.547 5.953-9.391 11.719-9.391 3.063 0 6.047 1.219 8.266 3.313l2.031-2.016c0.187-0.187 0.438-0.297 0.703-0.297 0.547 0 1 0.453 1 1z\"></path>\r\n</symbol>\r\n<symbol id=\"icon-pencil\" viewBox=\"0 0 24 28\">\r\n<title>pencil</title>\r\n<path d=\"M5.672 24l1.422-1.422-3.672-3.672-1.422 1.422v1.672h2v2h1.672zM13.844 9.5c0-0.203-0.141-0.344-0.344-0.344-0.094 0-0.187 0.031-0.266 0.109l-8.469 8.469c-0.078 0.078-0.109 0.172-0.109 0.266 0 0.203 0.141 0.344 0.344 0.344 0.094 0 0.187-0.031 0.266-0.109l8.469-8.469c0.078-0.078 0.109-0.172 0.109-0.266zM13 6.5l6.5 6.5-13 13h-6.5v-6.5zM23.672 8c0 0.531-0.219 1.047-0.578 1.406l-2.594 2.594-6.5-6.5 2.594-2.578c0.359-0.375 0.875-0.594 1.406-0.594s1.047 0.219 1.422 0.594l3.672 3.656c0.359 0.375 0.578 0.891 0.578 1.422z\"></path>\r\n</symbol>\r\n</defs>\r\n</svg>"

/***/ }),

/***/ 330:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(183);


/***/ }),

/***/ 63:
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
            ingrQuery: '',
            ctgQuery: ''
        };
    }
    CurrentQueryService.prototype.setQuery = function (ingr, ctg) {
        this.query = {
            ingrQuery: ingr,
            ctgQuery: ctg
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

/***/ 64:
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

/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, ".ctg-input > div {\r\n  width: 100% !important;\r\n}\r\n\r\n.ng-valid[required], .ng-valid.required  {\r\n  border-left: 5px solid #42A948; /* green */\r\n}\r\n.ng-invalid:not(form)  {\r\n  border-left: 5px solid #a94442; /* red */\r\n}\r\n\r\n.active {\r\n  background: lightblue;\r\n}\r\n\r\n.top-margin {\r\n  margin-top: 20px;\r\n}\r\n\r\n.icon-user {\r\n  height: 1em;\r\n  width: 1em;\r\n}\r\n.icon-clock-o {\r\n  height: 1em;\r\n  width: 1em;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ })

},[330]);
//# sourceMappingURL=main.bundle.js.map