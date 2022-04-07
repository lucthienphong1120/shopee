
function shuffer(){
    fetch('./assets/js/db.json')
        .then(response => response.json())
        .then(list => {
            list = list.sort(() => Math.random() - 0.5)
            return list;
        })
        .then(renderItem)
        .then(responsive)
        .then(handlePagination)
}

var headerCatagoryItem = document.querySelectorAll('.header__sort-item');

for(var i = 0; i < 4; i++){
    headerCatagoryItem[i].onclick = function(){
        var headerCatagoryActive = document.querySelector('.header__sort-item--active');
        headerCatagoryActive.classList.remove('header__sort-item--active');
        this.classList.add('header__sort-item--active');
        shuffer();
    }

}

var mobileCatagoryItem = document.querySelectorAll('.mobile-category-item');

for(var i = 0; i < mobileCatagoryItem.length; i++){
    mobileCatagoryItem[i].onclick = function(){
        shuffer();
    }
}

var homeFilter = document.querySelectorAll('.home-filter-btn');

for(var i = 0; i < 3; i++){
    homeFilter[i].onclick = function(){
        var homeFilterActive = document.querySelector('.home-filter-btn.btn--primary');
        homeFilterActive.classList.remove('btn--primary');
        this.classList.add('btn--primary');
        shuffer();
    }
}

var homeFilterSort = document.querySelectorAll('.home-filter-sort-item-link');

for(var i = 0; i < 2; i++){
    homeFilterSort[i].onclick = function(){
        shuffer();
    }
}

var homeFilterPage = document.querySelectorAll('.home-filter-page-btn');

homeFilterPage[0].onclick = function(){
    var currentPage = document.querySelector('.home-filter-page-now');
    if(currentPage.textContent != 1){
        currentPage.textContent = Number(currentPage.textContent) - 1;
        shuffer();
    }
    if(currentPage.textContent != 14){
        homeFilterPage[1].classList.remove('home-filter-page-btn--disable');
    }
    if(currentPage.textContent == 1){
        homeFilterPage[0].classList.add('home-filter-page-btn--disable');
    }
}
homeFilterPage[1].onclick = function(){
    var currentPage = document.querySelector('.home-filter-page-now');
    if(currentPage.textContent != 14){
        currentPage.textContent = Number(currentPage.textContent) + 1;
        shuffer();
    }
    if(currentPage.textContent != 1){
        homeFilterPage[0].classList.remove('home-filter-page-btn--disable');
    }
    if(currentPage.textContent == 14){
        homeFilterPage[1].classList.add('home-filter-page-btn--disable');
    }
}
