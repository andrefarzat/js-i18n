/**
 * js i18n
 * Javascript library to apply internationalization.
 * @author André Farzat ( andrefarzat@gmail.com )
 */
(function (window) {
    "use strict";

    /**
     * Initializes the library
     * @param {object} dict The key-value dictionary
     */
    var i18n = function(dict) {
        if ( !dict ) {
            return;
        }

        if ( typeof dict !== 'object' ) {
            throw new Error('dict argument must be an object.');
        }

        if ( dict.length > 0 ) {
            throw new Error('dict argument cannot be an array.');
        }
        
        for ( var i in dict ){
            if ( dict.hasOwnProperty(i) ) {
                i18n._[i] = dict[i];
            }
        }

    };


    /**
     * returns the translated text
     * @param {string} key The key for the text.
     * @param {integer} [len] if passed, it will define which text will be returned. Empty, single or multiple.
     * @return {string}
     */
    i18n._ = function(key, len) {
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
    };

    /** Defining it as global */
    window.i18n = i18n;

    /** Creating the alias. First, do the check to avoid conflicts */
    if ( window._ === undefined ){
        window._ = i18n._;
    }

}(window));