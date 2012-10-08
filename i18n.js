/**
 * js i18n
 * @author André Farzat ( andrefarzat@gmail.com )
 *
 * Javascript library to apply internationalization.
 */
function i18n( dict ){
    "use strict";

    for( var i in dict ){
        if( dict.hasOwnProperty(i) ){
            i18n._[i] = dict[i];
        }
    }

}

/**
 * returns the translated text
 * @param {string} key The key for the text.
 * @param {integer} [len] if passed, it will define which text will be returned. Empty, single or multiple.
 * @return {string}
 */
i18n._ = function( key, len ){
    var txt = i18n._[key] || key;

    if( typeof txt === "string" ){
        return txt;
    }

    if( isNaN(len) || len < 0 ){
        len = 0;
    } else if( len > 2 ){
        len = 2;
    }

    if( txt.length === 2 && len === 1 ){
        len = 0;
    }

    return txt[len] || txt[len-1] || txt[len-2];
}

if( !window._ ){
    window._ = i18n._;
}