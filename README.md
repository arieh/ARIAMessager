ARIAMessager
========
This little Class priveds an interface with which you can send messages to screen reader. This can be helpful to notify the reader that a certain part of the page was mdified/updated, or for creating interactive widgets that also work for screen readers.

*NOTE: I don't have the mney for a screen reader, so I've created this Class according to various articles and recommendations on the web. If you have a screen reader or access to one, I'll be happy to hear how this Class actually functions*

How to use
----------
The Class's messaging mechanism uses the `aria-live` attribute. This attribute tells the screen reader to notify the user whenever the element's content is changed. The Class uses a hidden element in the page to update new content.
The Class can either receive an element that you created, or create one of it's own. Usage example can be:

    #JS
    var AM = new ARIAMessager;
    
    /* simple use */
    AM.writeMessage('I've just added new content');
    
    
    /* real world example for notifing on AJAX changed */
    
    req = new Request.HTML({
            onSuccess : function(html){
                var message = "New Update Received. To read it, press  control g";
                
                /* this function should focus on the element. Not a reccomended way to use this, but its only a demo */
                function goto(e){
                    $('updated').set('tabindex',100);
                    document.removeEvent('keydown:keys(control+g)',goto);
                    e.stop();
                }
                
                AM.writeMessage(message);
                
                document.addEvent('keydown:keys(control+g)',goto);
            }
            , url : 'path/to/somewher'
            , update : $('updated')
        }).send();
        
 
 The Class also provides a helper tool for clearing JAWS virtual buffer (should work for v7+):
 
    #JS
    AM.updateBuffer();