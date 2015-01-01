// a plugin that basically allows you to click on image links and view them on a modal
// like imgur
var giffy = (function() {
    'use strict';

    var el = document.querySelectorAll('.giffy'),

        modal,

        overlay,

        giffyWrapper,

        loadedImage;
    


    function apply(element, properties) {

        for (var key in properties) {

            element.style[key] = properties[key];


        }

    }

    function createElem() {

        overlay = document.createElement('div');

        modal = document.createElement('div');

        giffyWrapper = document.createElement('div');

        overlay.className = 'overlay';

        modal.className = 'modal';

        giffyWrapper.className = 'giffyWrapper';

        giffyWrapper.appendChild(overlay);

        giffyWrapper.appendChild( modal );

       document.body.appendChild( giffyWrapper );


    }

    //FIX ONCLICK FOR THE ELEMENT

    function onclick(_elem) {

        var imageSource = _elem.getAttribute('data-link'),
            image = new Image();
        image.id = 'loadedImage';
        image.onload = function() {


            image.height = this.height;
            image.width = this.width;

            apply( modal, {

                'height': image.height + 'px',

                'width': image.width + 'px',

                'position': 'absolute',

                'top': '0px',

                'right': '0px',

                'bottom': '0px',

                'left': '0px',

                'margin':'auto',

                'float':'none'
                
            });

            apply( image, {
                'float':'none'
            } );



        }

        image.src = imageSource;


        openModal(image);



    }

    function preload(_giffyElements) {

        var giffyLink = _giffyElements.getAttribute('data-link'),
        giffyImage = new Image();

        giffyImage.onload = function(){

            _giffyElements.className += ' preloaded';

            bind( _giffyElements );
        }

        giffyImage.src = giffyLink;

        
    }

    function onEscape(event) {

        if (event.keyCode == 27) {

            closeModal();

        } else {
            return;
        }



    }

    function addClass(element, classname) {


        element.className += ' '+classname;

    }

    function removeClass(element, classname) {


        element.className = element.className.replace( classname, '' );

    }

    function closeModal() {

        if ( modal.classList.contains('active') ) {

            console.log('element is alive and needs to be closed');

            removeClass(modal, 'active');

            removeClass(overlay, 'overlay-active');

            //remove the element
            loadedImage = document.getElementById('loadedImage');

            loadedImage.parentNode.removeChild( loadedImage );

            modal.removeAttribute('style');

            console.log(modal);


        } else {

            console.log('element is not alive');

            return;
        }
    }


    function bind(_element) {
        //handle the events
        _element.addEventListener( 'click', function( event ) {

            event.stopPropagation();
            event.preventDefault();

            onclick(this);


        }, false );

        _element.addEventListener('keyup', onEscape, false);

        overlay.addEventListener('click', function( event){

            event.stopPropagation();

            event.preventDefault();

            closeModal();


        }, false);

    }

    function init() {

        createElem();
        
        for( var i = 0; i < el.length; i++ ){

            preload( el[ i ] );

        }



    }

    function load(_elem) {


        if (_elem.length) {

            for (var i = 0; i < _elem.length; i++) {

                bind(_elem[i]);

            }
        } else {
            return;
        }

    }

    function openModal(getImage) {

        if( !modal.hasChildNodes() ){

        modal.appendChild(getImage);

        addClass(modal, 'active');

        addClass(overlay, 'overlay-active');

}else{
    return;
}




    }




    return {
        init: init
    };



})();
