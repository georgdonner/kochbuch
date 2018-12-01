/* eslint-disable */
function pug_attr(t,e,n,f){return!1!==e&&null!=e&&(e||"class"!==t&&"style"!==t)?!0===e?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (descriptionHtml, doubleRes, recipe, servings, session) {pug_html = pug_html + "\u003C!DOCTYPE html\u003E\u003Chtml lang=\"de\"\u003E\u003Chead\u003E\u003Ctitle\u003E" + (pug_escape(null == (pug_interp = recipe.title) ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E\u003Cmeta charset=\"UTF-8\"\u003E\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"\u003E\u003Cmeta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\"\u003E\u003Cmeta name=\"theme-color\" content=\"#fff\"\u003E\u003Clink rel=\"icon\" href=\"\u002Fassets\u002Ftomato-icon.png\" sizes=\"32x32\"\u003E\u003Clink rel=\"icon\" href=\"\u002Fassets\u002Ftomato-icon-192.png\" sizes=\"192x192\"\u003E\u003Clink rel=\"apple-touch-icon-precomposed\" href=\"\u002Fassets\u002Ftomato-icon-180.png\"\u003E\u003Clink rel=\"stylesheet\" crossorigin=\"anonymous\" href=\"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Merriweather:300,400,700|Open+Sans:400,400i,600i,700\"\u003E\u003Clink rel=\"stylesheet\" href=\"\u002Fcss\u002Frecipe.css\"\u003E\u003C\u002Fhead\u003E\u003Cbody\u003E\u003Cdiv id=\"top-bar-container\"\u003E\u003Cdiv id=\"top-bar\"\u003E\u003Cbutton id=\"back\" href=\"\u002F\"\u003E\u003Csvg class=\"icon icon-arrow-left2\"\u003E\u003Cuse xlink:href=\"#icon-arrow-left2\"\u003E\u003C\u002Fuse\u003E\u003C\u002Fsvg\u003EAlle Rezepte\u003C\u002Fbutton\u003E";
if (session.planCode) {
pug_html = pug_html + "\u003Ca" + (pug_attr("href", `/plan/new?recipe=${recipe._id}`, true, true)) + "\u003EZum Wochenplan\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"container\"\u003E\u003Ch1 class=\"recipe-title\"\u003E" + (pug_escape(null == (pug_interp = recipe.title) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E";
if (recipe.image) {
var imgUrl = (width, highRes=false) => recipe.image.concat(`-/resize/${highRes ? width * 2 : width}x/`, `-/quality/${doubleRes ? 'lightest' : 'lighter'}/`, '-/progressive/yes/')
pug_mixins["source"] = pug_interp = function(width, sizes='100vw'){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Csource" + (pug_attr("media", `(min-width: ${width}px)`, true, true)+pug_attr("srcset", `${imgUrl(width)}, ${imgUrl(width, true)} 2x`, true, true)+pug_attr("sizes", sizes, true, true)) + "\u003E";
};
pug_html = pug_html + "\u003Cpicture\u003E";
pug_mixins["source"](1000, '1000px');
pug_mixins["source"](800);
pug_mixins["source"](600);
pug_mixins["source"](400);
pug_html = pug_html + "\u003Cimg" + (" class=\"recipe-img\""+pug_attr("src", imgUrl(1000), true, true)+pug_attr("alt", recipe.title, true, true)) + "\u003E\u003C\u002Fpicture\u003E";
}
pug_html = pug_html + "\u003Cdiv class=\"recipe-info\"\u003E\u003Cdiv class=\"duration\"\u003E" + (pug_escape(null == (pug_interp = recipe.duration) ? "" : pug_interp)) + " Minuten\u003C\u002Fdiv\u003E\u003Cdiv class=\"categories\"\u003E";
// iterate recipe.categories
;(function(){
  var $$obj = recipe.categories;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var ctg = $$obj[pug_index0];
pug_html = pug_html + "\u003Cspan\u003E" + (pug_escape(null == (pug_interp = ctg) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var ctg = $$obj[pug_index0];
pug_html = pug_html + "\u003Cspan\u003E" + (pug_escape(null == (pug_interp = ctg) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"recipe-main\"\u003E\u003Cdiv\u003E\u003Ch2 class=\"servings-header\"\u003E\u003Cspan\u003EZutaten\u003C\u002Fspan\u003E\u003Cdiv class=\"servings-control\"\u003E\u003Cbutton class=\"down\"\u003E-\u003C\u002Fbutton\u003E\u003Cspan" + (" id=\"servings\""+pug_attr("data-original", recipe.servings, true, true)) + "\u003E" + (pug_escape(null == (pug_interp = servings) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cbutton class=\"up\"\u003E+\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fh2\u003E\u003Cul" + (" id=\"ingredients\""+pug_attr("data-listcode", session.listCode, true, true)) + "\u003E";
// iterate recipe.ingredients
;(function(){
  var $$obj = recipe.ingredients;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var ingr = $$obj[pug_index1];
pug_html = pug_html + "\u003Cli\u003E\u003Cdiv class=\"content\"\u003E\u003Cspan" + (" class=\"name\""+pug_attr("data-name", ingr.name, true, true)) + "\u003E" + (pug_escape(null == (pug_interp = ingr.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan class=\"hint\"\u003E" + (pug_escape(null == (pug_interp = ingr.hint ? ` (${ingr.hint})` : '') ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
if (session.listCode) {
pug_html = pug_html + "\u003Cbutton class=\"cart\"\u003E\u003Csvg class=\"icon\"\u003E\u003Cuse xlink:href=\"#icon-add_shopping_cart\"\u003E\u003C\u002Fuse\u003E\u003C\u002Fsvg\u003E\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var ingr = $$obj[pug_index1];
pug_html = pug_html + "\u003Cli\u003E\u003Cdiv class=\"content\"\u003E\u003Cspan" + (" class=\"name\""+pug_attr("data-name", ingr.name, true, true)) + "\u003E" + (pug_escape(null == (pug_interp = ingr.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan class=\"hint\"\u003E" + (pug_escape(null == (pug_interp = ingr.hint ? ` (${ingr.hint})` : '') ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
if (session.listCode) {
pug_html = pug_html + "\u003Cbutton class=\"cart\"\u003E\u003Csvg class=\"icon\"\u003E\u003Cuse xlink:href=\"#icon-add_shopping_cart\"\u003E\u003C\u002Fuse\u003E\u003C\u002Fsvg\u003E\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E\u003Ch2\u003EZubereitung\u003C\u002Fh2\u003E\u003Cdiv class=\"border-bottom\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"description\"\u003E" + (null == (pug_interp = descriptionHtml) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv id=\"buttons\"\u003E";
if (session.authenticated) {
pug_html = pug_html + "\u003Ca" + (" class=\"button\""+pug_attr("href", `/recipe/${recipe._id}/edit`, true, true)) + "\u003EBearbeiten\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\u003Cbutton class=\"button\" id=\"cooking-mode\"\u003EKochmodus\u003C\u002Fbutton\u003E\u003Ca" + (" class=\"button\""+pug_attr("href", `/pdf/recipe/${recipe._id}`, true, true)+pug_attr("download", true, true, true)) + "\u003EPDF\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv id=\"toast\"\u003E\u003C\u002Fdiv\u003E\u003Cscript src=\"\u002Fscripts\u002Fnosleep.js\"\u003E\u003C\u002Fscript\u003E\u003Cscript src=\"\u002Fscripts\u002Flib\u002Frecipe.js\"\u003E\u003C\u002Fscript\u003E\u003Csvg aria-hidden=\"true\" style=\"position: absolute; width: 0; height: 0; overflow: hidden;\" version=\"1.1\" xmlns=\"http:\u002F\u002Fwww.w3.org\u002F2000\u002Fsvg\" xmlns:xlink=\"http:\u002F\u002Fwww.w3.org\u002F1999\u002Fxlink\"\u003E\u003Cdefs\u003E\u003C\u002Fdefs\u003E\u003Csymbol id=\"icon-arrow-left2\" viewbox=\"0 0 32 32\"\u003E\u003Ctitle\u003Earrow-left2\u003C\u002Ftitle\u003E\u003Cpath d=\"M12.586 27.414l-10-10c-0.781-0.781-0.781-2.047 0-2.828l10-10c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-6.586 6.586h19.172c1.105 0 2 0.895 2 2s-0.895 2-2 2h-19.172l6.586 6.586c0.39 0.39 0.586 0.902 0.586 1.414s-0.195 1.024-0.586 1.414c-0.781 0.781-2.047 0.781-2.828 0z\"\u003E\u003C\u002Fpath\u003E\u003C\u002Fsymbol\u003E\u003C\u002Fsvg\u003E\u003Csvg aria-hidden=\"true\" style=\"position: absolute; width: 0; height: 0; overflow: hidden;\" version=\"1.1\" xmlns=\"http:\u002F\u002Fwww.w3.org\u002F2000\u002Fsvg\" xmlns:xlink=\"http:\u002F\u002Fwww.w3.org\u002F1999\u002Fxlink\"\u003E\u003Cdefs\u003E\u003C\u002Fdefs\u003E\u003Csymbol id=\"icon-add_shopping_cart\" viewbox=\"0 0 24 24\"\u003E\u003Ctitle\u003Eadd_shopping_cart\u003C\u002Ftitle\u003E\u003Cpath d=\"M7.172 14.766c0 0.141 0.094 0.234 0.234 0.234h11.578v2.016h-12c-1.078 0-1.969-0.938-1.969-2.016 0-0.328 0.094-0.656 0.234-0.938l1.359-2.484-3.609-7.594h-2.016v-1.969h3.281c0.633 1.32 1.258 2.648 1.875 3.984 0.798 1.67 1.584 3.353 2.391 5.016h7.031c1.284-2.341 2.591-4.659 3.844-7.031l1.734 0.984-3.844 6.984c-0.328 0.609-0.984 1.031-1.734 1.031h-7.453l-0.891 1.641zM17.016 18c1.078 0 1.969 0.938 1.969 2.016s-0.891 1.969-1.969 1.969-2.016-0.891-2.016-1.969 0.938-2.016 2.016-2.016zM6.984 18c1.078 0 2.016 0.938 2.016 2.016s-0.938 1.969-2.016 1.969-1.969-0.891-1.969-1.969 0.891-2.016 1.969-2.016zM11.016 9v-3h-3v-2.016h3v-3h1.969v3h3v2.016h-3v3h-1.969z\"\u003E\u003C\u002Fpath\u003E\u003C\u002Fsymbol\u003E\u003C\u002Fsvg\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";}.call(this,"descriptionHtml" in locals_for_with?locals_for_with.descriptionHtml:typeof descriptionHtml!=="undefined"?descriptionHtml:undefined,"doubleRes" in locals_for_with?locals_for_with.doubleRes:typeof doubleRes!=="undefined"?doubleRes:undefined,"recipe" in locals_for_with?locals_for_with.recipe:typeof recipe!=="undefined"?recipe:undefined,"servings" in locals_for_with?locals_for_with.servings:typeof servings!=="undefined"?servings:undefined,"session" in locals_for_with?locals_for_with.session:typeof session!=="undefined"?session:undefined));;return pug_html;}