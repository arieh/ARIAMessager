/*
---
description: A tool for posting message to screen readers, using the aria-live method

license: MIT-style

authors:
- Arieh Glazer

requires:
- core/1.2.4 : [Core,Element,Class,Class.Extras]

provides: [ARIAMessager]

...
*/
/*!
Copyright (c) 2010 Arieh Glazer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE 
*/

var ARIAMessager = new Class({
    Implements : [Options]
    
    , options : {
        level : 'assertive' //can also be either rude or polite
        , 'id' : 'airaMessage'        
    }
    
    , element : null
    , buffer : null
    , buffer_state : 0
    
    , initialize : function (el,opts){
        this.setOptions(opts);
        this.element = $(el);
        
        if (!this.element) this.createElement();
        
        this.setStyles();
        this.createBuffer();
    }
    
    /**
     *  creates a message container
     */
    , createElement : function(){
        this.element = new Element('div',{
            'id' : this.options.id
        }).inject(document.body);
    }
    
    /**
     * hides the container in an ubobstrusive way
     */
    ,setStyles : function(){
        this.element
            .set('aria-live',this.options.level)
            .setStyles({
                'visibility':'hidden'
                ,'position':'absolute'
                ,'top':0
            });
    }
    
    /**
     * in order to make screen readers update the content, we create a buffer that will trigger the update
     */
    , createBuffer : function(){
       this.buffer = new Element('input',{
            'type' : 'hidden'
            , 'value' : this.buffer_state
       }).inject(document.body);
    }
    
    /**
     *  posts a message to the screen reader
     *
     *  note - a new message will replcae the old one even if the screen reader hasn't finished reading it.
     *
     *  @param {String} msg a message to send
     */
    , postMessage : function(msg){
        this.element.set('html',msg);
        this.updateBuffer();
    }
    
    /**
     * forces an update in the screen reader's buffer
     */
    , updateBuffer : function(){
        this.buffer.setAttribute('value',this.buffer_state ? 0:1);
    }
});