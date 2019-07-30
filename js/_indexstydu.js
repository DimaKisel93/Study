//acco team

(function(){
    const teamlist = document.querySelector('.team-acco');

    teamlist.addEventListener('click', event => {
       
        if (event.target.classList.contains('team-acco__trigger')){
            event.preventDefault();

            const _this = event.target;
            const item = _this.parentNode;
            const list = item.parentNode;
            const items = list.children;
            const content = _this.nextElementSibling;
            const contentHeight = content.firstElementChild.clientHeight;

            if (!item.classList.contains('team-acco__item_active')){
                for(let i=0;i< items.length;i++){
                    items[i].classList.remove('team-acco__item_active');
                    items[i].lastElementChild.style.height = 0;
                }

                item.classList.add('team-acco__item_active');
                content.style.height = contentHeight + 'px';
            } else{
                item.classList.remove('team-acco__item_active');
                content.style.height = 0;
            }
        }
    });
})();

//acco menu

(function(){
    const menuList = document.querySelector('.menu__list');
    menuList.addEventListener('click', event => {
        
        if(event.target.classList.contains('menu__trigger')){
            event.preventDefault();
            const _this = event.target;
            const item = _this.parentNode;
            const list = item.parentNode;
            const items = list.children;
            if(!item.classList.contains('menu__item--active')){
                for(let i=0;i<items.length;i++){
                    items[i].classList.remove('menu__item--active');
                }
                item.classList.add('menu__item--active');
            } else{
                item.classList.remove('menu__item--active');
            }
        }
        if(event.target.classList.contains('menu__title')){
            event.preventDefault();
            const _this = event.target;
            const trigger = _this.parentNode;
            const item = trigger.parentNode;
            const list = item.parentNode;
            const items = list.children;
            if(!item.classList.contains('menu__item--active')){
                for(let i=0;i<items.length;i++){
                    items[i].classList.remove('menu__item--active');
                }
                item.classList.add('menu__item--active');
            } else{
                item.classList.remove('menu__item--active');
            }
        }
    })

})();

//slider burger
(function(){
    const burgerContainer = document.querySelector('.burger__container');
    const burger = document.querySelector('.burger__content');
    const list = document.querySelector('.burger__list');
    const burgerWidth = burger.clientWidth;
    const itemsCount = list.children.length;
    const listWidth = burgerWidth * itemsCount;
    let activeSlide = null;
    const step = burgerWidth;
    let slidePos = 0;
    

    list.style.width = listWidth + 'px';

    burgerContainer.addEventListener('click', event =>{
        activeSlide = list.querySelector('.burger__item_active');
        
        if (event.target.classList.contains('burger__arrowright')){
            event.preventDefault();
            console.log('next');
            if(activeSlide.nextElementSibling) {
                slideTo('next');
            }    
            
        }else if (event.target.classList.contains('burger__arrowleft')){
            event.preventDefault();
            console.log('prev');
            if (activeSlide.previousElementSibling) slideTo('prev');
        }
    });
    function slideTo(vector) {
        if(vector === 'next') {
            slidePos += step;
            activeSlide.nextElementSibling.classList.add('burger__item_active');
        }else {
            slidePos -= step;
            activeSlide.previousElementSibling.classList.add('burger__item_active');
        }

        list.style.transform = `translateX(${-slidePos}px)`;
        activeSlide.classList.remove('burger__item_active');
    }
})();

//one-scroll

const section = $('.section');
const display = $('.main__content');
let inScroll = false;
const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

const setActiveMenuItem = itemEq =>{
    $('.fixed-menu__item').eq(itemEq).addClass('active').siblings().removeClass('active');
}

const performTransition = sectionEq =>{
    const position = `${-sectionEq * 100}%`;

    if (inScroll) return;
     
    inScroll === true;    

    section.eq(sectionEq).addClass('active').siblings().removeClass('active');

    display.css({
        transform : `translateY(${position})`,
        'webkit-transform' : `translateY(${position})`
    });

    const transitionDuration = parseInt(display.css('transition-duration')) * 1000; //время в мс
    inScroll === false;
    setActiveMenuItem(sectionEq);
    setTimeout(() =>{  
    }, transitionDuration + 300); // за 300 мс проходит инерция мышки
    
};

const scrollToSection = direction =>{
    const activeSection = section.filter('.active');
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if(direction === "up" && prevSection.length){
        performTransition(prevSection.index());
    }
    if(direction === "down" && nextSection.length){
        performTransition(nextSection.index());
    }

    switch (true){
        case direction === "up" && prevSection.length:
        performTransition(prevSection.index());
         break;
        case direction === "down" && nextSection.length:
        performTransition(nextSection.index());
         break;
    } 
}



$(document).on({
    wheel: e =>{
        const deltaY = e.originalEvent.deltaY;
        const direction = deltaY > 0
        ? 'down'
        : 'up'
        
        scrollToSection(direction);    
    },
    keydown: e =>{

        switch(e.keyCode){
            case 40:
                scrollToSection('down');
                break;
            case 38:
                scrollToSection('up');
                break;    
        };
    },
    touchmove: e => e.preventDefault()
});

$('[data-scroll-to]').on('click', e =>{
    e.preventDefault();

    const target = parseInt($(e.currentTarget).attr('data-scroll-to'));
    performTransition(target);
})

if(isMobile){$(document).swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        alert(direction);
        const swipeDirection = direction ==="down" ? 'up': 'down';
        scrollToSection(swipeDirection);
    }
  });
}






