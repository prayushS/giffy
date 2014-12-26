// a plugin that basically allows you to click on image links and view them on a modal
// like imgur
var giffy = (function() {
    'use strict';

    var el = document.querySelector('.giffy'),

        modal, //inactive

        overlay,

        loadedImage,

        dataLink = el.getAttribute('data-link'),

        getLink;

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

    function onclick(event) {

        event.stopPropagation();
        event.preventDefault();
        getLink = event.target.dataset.link;

        if (getLink) {

            openModal();

        } else if (event.target === overlay) {

            closeModal();

        } else {
            return;
        }

        console.log(getLink);

    }

    function onEscape(event) {

        if (event.keyCode == 27) {

            closeModal();

        } else {
            return;
        }



    }
/*
    function preload() {

        var giffyAll = document.querySelectorAll('.giffy');



        for (var c = 0; c < giffyAll.length; c++) {

            var giffyLink = giffyAll[c].getAttribute('data-link'),

                image = new Image(),

                setClass = giffyAll[c].className;

            image.onload = function() {


            }

            image.src = giffyLink;

        }

    }*/

    function addClass(element, classname) {

        element.classList.add(classname);

    }

    function removeClass(element, classname) {

        element.classList.remove(classname);

    }

    function closeModal() {

        if (modal.classList.contains('active')) {

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

    function loadPic() { //works as a helper function which loads the image asynchronously ( xhr )

        if (dataLink && getLink) { // if the data-link is true then start loading the image

            var img = new Image();
            img.id = 'loadedImage';
            img.onload = function() {

                img.height = this.height;
                img.width = this.width;

                console.log(img.height);
                console.log(img.width);

                apply(modal, {
                    'height': img.height + 'px',
                    'width': img.width + 'px'
                });



            }

            img.src = getLink;

            return img;

        } else {
            return;
        }

    }


    function active() {
        //handle the events
        document.addEventListener('click', onclick, false);
        document.addEventListener('keyup', onEscape, false);

    }

    function init() {
    
        active();
        createElem();


    }

    function openModal() {

        console.log('modal has been opened');

        modal.appendChild(loadPic());

        addClass(modal, 'active');

        addClass(overlay, 'overlay-active');

        apply(modal, {

            'position': 'absolute',

            'top': '0px',

            'right': '0px',

            'bottom': '0px',

            'left': '0px',
        });




    }




    return {
        init: init
    };



})();
