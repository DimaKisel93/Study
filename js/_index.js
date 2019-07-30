(function(){
    const teamlist = document.querySelector('.team-acco');

    teamlist.addEventListener('click', event => {
       
        if (event.target.classList.contains('team-acco__trigger')){
            event.preventDefault();

            const _this = event.target;
            const item = _this.parentNode;
            const list = item.parentNode;
            const activeClassName = 'team-acco__item_active';
           
            list.getElementsByClassName(activeClassName)[0].classList.remove(activeClassName);
            item.classList.add(activeClassName);
        }
    });
})();
