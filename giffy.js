var giffy = (function(g) {

    'use strict';

    var el = document.querySelectorAll('.giffy'),
        modal,
        overlay,
        giffyWrapper,
        loadedImage,
        styles = [],

        UI = {

            applyCss: function(element, properties) {

                for (var key in properties) {

                    element.style[key] = properties[key];

                }
            },

            addClass: function(element, className) {

                element.className += className + " ";


            },

            removeClass: function(element, className) {

                element.className = element.className.replace(className, '');

            }
        };
    styles['overlay'] = {
        'height': '100%',
        'max-height': '100%',
        'width': '100%',
        'max-width': '100%',
        'background-color': '#000',
        'margin': '0px auto',
        'padding': '0px',
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'opacity': '0.99',
        'filter': 'alpha(opacity=99)',
        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=99)",
        '-khtml-opacity': '0.99',
        '-moz-opacity': '0.99',
        'cursor': 'pointer',
        'visibility': 'visible'

    };

    styles['sharedStyles'] = {

        '-moz-box-sizing': 'content-box',
        '-webkit-box-sizing': 'content-box',
        'box-sizing': 'content-box',
        'display': 'block'

    };



    g = {

        version: 1.01,

        init: function() {
            //main function

            createGiffyElement();

            for (var i = 0; i < el.length; i++) {

                preload(el[i]);

            }

        }

    }

    UI.openModal = function(getImage) {
        if (!modal.hasChildNodes()) {

            modal.appendChild(getImage);

            UI.addClass(document.body, 'giffy-active');
            UI.addClass(modal, 'active');

            UI.addClass(overlay, 'overlay-active');

            UI.applyCss(overlay, styles['overlay']);

        } else {
            return;
        }
    };

    UI.closeModal = function() {

        if (modal.classList.contains('active')) {

            UI.removeClass(document.body, 'giffy-active');
            UI.removeClass(modal, 'active');

            UI.removeClass(overlay, 'overlay-active');

            loadedImage = document.getElementById('loadedImage');

            loadedImage.parentNode.removeChild(loadedImage);

            modal.removeAttribute('style');

            overlay.removeAttribute('style');


        } else {

            //console.log('element is not alive');

            return;
        }

    };

    UI.bind = function(_element) {

        //handle the events
        _element.addEventListener('click', function(event) {

            event.stopPropagation();
            event.preventDefault();

            displayGiffyImage(this);


        }, false);

        window.addEventListener('keyup', function(event) {

            //console.log(document.activeElement)
            escape(event);

        }, false);

        overlay.addEventListener('click', function(event) {

            event.stopPropagation();

            event.preventDefault();

            UI.closeModal();


        }, false);


        var escape = function(event) {

            var activeElement = document.activeElement;

            //console.log(activeElement);

            if (event.keyCode == 27 && activeElement.classList[0] == "giffy" || activeElement.classList[0] == "giffy-active") {

                UI.closeModal();

            } else {
                return;
            }

        }



    };

    //helper functions

    var createGiffyElement = function() {

            overlay = document.createElement('div');

            modal = document.createElement('div');

            giffyWrapper = document.createElement('div');

            UI.addClass(overlay, 'overlay');

            UI.addClass(modal, 'modal');

            UI.addClass(giffyWrapper, 'giffyWrapper');

            giffyWrapper.appendChild(overlay);

            giffyWrapper.appendChild(modal);


            document.body.appendChild(giffyWrapper);

        },

        preload = function(_giffyElements) {

            var giffyLink = _giffyElements.getAttribute('data-link'),

                giffyImage = new Image();

            giffyImage.onload = function() {

                UI.addClass(_giffyElements, ' preloaded');

                UI.bind(_giffyElements);
            }

            giffyImage.src = giffyLink;
        },

        displayGiffyImage = function(_elem) {

            var imageSource = _elem.getAttribute('data-link'),
                image = new Image();
            image.id = 'loadedImage';
            image.onload = function() {
                image.height = this.height;
                image.width = this.width;
                //console.log('works');
                UI.applyCss(modal, styles['sharedStyles']);
                UI.applyCss(modal, {

                    'display': 'block',

                    'background-color': '#222',

                    'border': '5px solid #fff',

                    'cursor': 'default',

                    'height': image.height + 'px',

                    'width': image.width + 'px',

                    'position': 'absolute',

                    'top': '0px',

                    'right': '0px',

                    'bottom': '0px',

                    'left': '0px',

                    'margin': 'auto',

                    'float': 'none'

                });
                UI.applyCss(image, {
                    'float': 'none'
                });

            }
            image.src = imageSource;
            UI.openModal(image);
            UI.applyCss(overlay, styles['sharedStyles']);
            UI.applyCss(overlay, styles['overlay']);



        };


    return g;

})(giffy);