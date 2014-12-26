// a plugin that basically allows you to click on image links and view them on a modal
// like imgur
var giffy = (function() {
    'use strict';

    var el = document.querySelectorAll('.giffy'),

        modal, //inactive

        overlay,

        loadedImage;

    function apply(element, properties) {

        for (var key in properties) {

            element.style[key] = properties[key];


        }

    }

    function createElem() {

        overlay = document.createElement('div');

        modal = document.createElement('div');

        overlay.className = 'overlay';

        modal.className = 'modal-inactive';

        overlay.appendChild(modal);

        document.body.appendChild(overlay);


    }

    //FIX ONCLICK FOR THE ELEMENT

    function onclick(_elem) {

        var imageSource = _elem.getAttribute('data-link'),
            image = new Image();
        image.id = 'loadedImage';
        image.onload = function() {


            image.height = this.height;
            image.width = this.width;

            apply(modal, {
                'height': image.height + 'px',
                'width': image.width + 'px'
            });



        }

        image.src = imageSource;


        openModal(image);



    }

    function onEscape(event) {

        if (event.keyCode == 27) {

            closeModal();

        } else {
            return;
        }



    }

    function addClass(element, classname) {

        element.classList.add(classname);

    }

    function removeClass(element, classname) {

        element.classList.remove(classname);

    }

    function closeModal() {
        //close the modalhere

        //console.log('modal has been closed');

        if (modal.classList.contains('active') /*&& check( document.querySelector( '.modal-active' ) )*/ ) {

            console.log('element is alive and needs to be closed');

            removeClass(modal, 'active');
            removeClass(overlay, 'overlay-active');

            //remove the element
            loadedImage = document.querySelector('#loadedImage');

            modal.removeChild(loadedImage);

            modal.removeAttribute('style');

            console.log(modal);


        } else {
            console.log('element is not alive');

            return; //do nothing since noting has been opened nor closed.
        }
    }


    function bind(_element) {
        //handle the events
        _element.addEventListener('click', function(event) {

            event.stopPropagation();
            event.preventDefault();

            onclick(this);


        }, false);
        _element.addEventListener('keyup', onEscape, false);
        overlay.addEventListener('click', closeModal, false);

    }

    function init() {

        createElem();
        load(el);



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

        console.log('modal has been opened');

        modal.appendChild(getImage);

        addClass(modal, 'active');

        addClass(overlay, 'overlay-active');

        apply(modal, {

            'position': 'absolute',

            'top': '0px',

            'right': '0px',

            'bottom': '0px',

            'left': '0px'
        });




    }




    return {
        init: init
    };



})();
