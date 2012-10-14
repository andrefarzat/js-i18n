i18n javascript library
=======================

Developed to use the gettext's pattern function _ to make ease the po file generation by [xgettext](http://www.linuxcommand.org/man_pages/xgettext1.html).


Usage
-----

Use the i18n function to register all translated texts in the main dictionary: 
  
    i18n({
        'key' : 'value',
        'text_key' : 'text in one language',
        ...
    });


To get the translated text, use _ function:

    document.getElementById('edit-link').innerHTML = _('Edit something');

Pluralize
---------

A helper to get the right text in quantities issues. Ex:

	var qty = document.querySelectorAll('#client-list li').length;

    var txt = pluralize({
    	'0' : _('The client list is empty'),
    	'1' : _('We only have one client'),
    	'2' : _('We have two clients'),
    	'7' : _('Seven! We have seven clients!'),
    	'other' : _('WoW! We have %s clients!')
    }, qty);


The first parameter is an object which can contain:

* An specific number (e.g.: '0', '1', '2', etc)
* The string 'one'. Alias for '1'.
* The string 'other'. The default choice.

obs: The first parameter must have the '0' and the 'other' properties.