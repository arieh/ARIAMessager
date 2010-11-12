TestCase("Test using an existing element",{
    setUp : function(){
		/*:DOC += <div id='aria-messager'></div> */
		this.element = $('aria-messager');
        this.am = new ARIAMessager('aria-messager');
	}
	,"test creating by passing an element" : function(){
		assertTrue(this.element===this.am.element);
	}
	, "test styles are set when passing an element" : function(){
		assertEquals('hidden',this.element.getStyle('visibility'));
		assertEquals('absolute',this.element.getStyle('position'));
		assertEquals('0px',this.element.getStyle('top'));
	}
    , tearDown : function(){
        this.am.buffer.destroy();
        this.am.element.destroy();
        delete this.am; 
    }
});

TestCase("Test not using an existing element",{
    setUp : function(){this.am= new ARIAMessager;}
    ,"test creating without passing an element" : function(){
        assertNotNull(document.getElementById('airaMessage'));
    }	
    , "test styles are set when passing an element" : function(){
        assertEquals('hidden',this.am.element.getStyle('visibility'));
        assertEquals('absolute',this.am.element.getStyle('position'));
        assertEquals('0px',this.am.element.getStyle('top'));
    }
});

TestCase("Test Buffer Usages",{
    setUp : function(){this.am= new ARIAMessager;}
	, 'test buffer is created' : function(){
		assertEquals('element',typeOf(this.am.buffer));
		assertEquals(1,document.getElementsByTagName('input').length);
		assertEquals('hidden',this.am.buffer.get('type'));
		assertEquals('0',this.am.buffer.value);
	}
	, 'test update buffer changes buffer state' : function(){
		assertEquals(0,this.am.buffer.value);
		this.am.updateBuffer();
		assertEquals(1,this.am.buffer.value);
		assertEquals(1,this.am.buffer_state);
	}
	, tearDown : function(){
		this.am.buffer.destroy();
		this.am.element.destroy();
		delete this.am; 
	}
});

TestCase("Test Posting a message",{
    setUp : function(){
		this.am = new ARIAMessager;
    }
	, "test a message is posted" : Fixture(function(val){
		this.am.postMessage(val);
		assertEquals(val, this.am.element.get('html'));
	},
	   [ ['abc'] , ['cde'] , ['1avv cxc sds aaa'] ]
	,this)
	, "test buffer is updated when posting a message" : function(){
        this.am.updateBuffer = new Moock.Stub().called(1);
        this.am.postMessage('abc');
		this.am.updateBuffer.test();
	}
    , tearDown : function(){
        this.am.buffer.destroy();
        this.am.element.destroy();
        delete this.am; 
    }
});


