const dataUrl = './assets/db/shopee.json'

fetch(dataUrl)
    .then(response => response.json())
    .then(renderItem)
    .then(responsive)
    .then(handlePagination)

function shuffer(){
    fetch(dataUrl)
        .then(response => response.json())
        .then(list => {
            list = list.sort(() => Math.random() - 0.5)
            return list;
        })
        .then(renderItem)
        .then(responsive)
        .then(handlePagination)
}

// main product

function renderItem(items) {
    var listProduct = document.getElementById('list-product');
    var htmls = items.map(function (item) {
        return `
        <div data="${item.id}" class="col l-2-4 m-3 c-6 home-product-item">
            <a class="home-product-item-link" href="#">
                <div class="home-product-item__img" style="background-image: url(./assets/img/home/${item.id}.PNG);"></div>
                <div class="home-product-item__info">
                    <h4 class="home-product-item__name">${item.name}</h4>
                    <div class="home-product-item__price">
                        <p class="home-product-item__price-old">${item.oldPrice}đ</p>
                        <p class="home-product-item__price-new">${item.newPrice}đ</p>
                        <i class="home-product-item__ship fas fa-shipping-fast"></i>
                    </div>
                    <div class="home-product-item__footer">
                        <div class="home-product-item__save">
                            <input type="checkbox" id="heart-save-${item.id}">
                            <label for="heart-save-${item.id}" class="far fa-heart"></label>
                        </div>
                        <div class="home-product-item__rating-star">
                            <i class="star-checked far fa-star"></i>
                            <i class="star-checked far fa-star"></i>
                            <i class="star-checked far fa-star"></i>
                            <i class="star-checked far fa-star"></i>
                            <i class="star-uncheck far fa-star"></i>
                        </div>
                        <div class="home-product-item__saled">Đã bán ${item.saled}</div>
                    </div>
                    <div class="home-product-item__origin">${item.origin}</div>
                    <div class="home-product-item__favourite">
                        Yêu thích
                    </div>
                    <div class="home-product-item__sale-off">
                        <div class="home-product-item__sale-off-value">${item.saleOff}%</div>
                        <div class="home-product-item__sale-off-label">GIẢM</div>
                    </div>
                </div>
                <div class="home-product-item-footer">Tìm sản phẩm tương tự</div>
            </a>
        </div>`;
    })
    listProduct.innerHTML = htmls.join('');
}

function responsive() {
    var listItem = document.querySelectorAll('.home-product-item');
    var bodyWidth = document.body.clientWidth;
    var listItemLength = listItem.length;
    
    if(bodyWidth < 740) {
        for(var i = listItemLength - 1; i >= Math.floor(listItemLength / 2) * 2; i--) {
            listItem[i].remove();
        }
    }
    else if(bodyWidth < 1024) {
        for(var i = listItemLength - 1; i >= Math.floor(listItemLength / 4) * 4; i--) {
            listItem[i].remove();
        }
    }
}

function checkPageArrow(){
    var paginationLink = document.querySelectorAll('.pagination-item-link');
    if(document.querySelector('.pagination-item--active a').textContent == 1){
        paginationLink[0].classList.add('pagination-item-link--disable');
        if(paginationLink[0].attributes.href){
            paginationLink[0].attributes.removeNamedItem('href');
        }
    }
    else {
        paginationLink[0].classList.remove('pagination-item-link--disable');
        if(!paginationLink[0].attributes.href){
            paginationLink[0].href = '#';
        }
    }
    if (document.querySelector('.pagination-item--active a').textContent == 8){
        paginationLink[6].classList.add('pagination-item-link--disable');
        if(paginationLink[6].attributes.href){
            paginationLink[6].attributes.removeNamedItem('href');
        }
    } 
    else {
        paginationLink[6].classList.remove('pagination-item-link--disable');
        if(!paginationLink[6].attributes.href){
            paginationLink[6].href = '#';
        }
    }
}

function handlePagination(){
    var paginationItem = document.querySelectorAll('.pagination-item');
    var paginationLength = paginationItem.length;
    checkPageArrow();
    for(var i = 0; i < paginationLength; i++){
        if(i != 0 && i != 4 && i != paginationLength - 1){
            // handle active button
            var isActive = document.querySelector('.pagination-item--active a');
            if(isActive.attributes.href){
                isActive.attributes.removeNamedItem('href');
            }
            else {
                var paginationItemLink = document.querySelectorAll('.pagination-item-link');
                paginationItemLink[i].setAttribute('href', '#');
            }
            // handle other button
            paginationItem[1].onclick = function(){
                var content = this.querySelector('a').textContent;
                var paginationItemLink = document.querySelectorAll('.pagination-item-link');
                if(content >= 2){
                    paginationItemLink[1].textContent = Number(paginationItemLink[1].textContent) - 1;
                    paginationItemLink[2].textContent = Number(paginationItemLink[2].textContent) - 1;
                    paginationItemLink[3].textContent = Number(paginationItemLink[3].textContent) - 1;
                    document.querySelector('.pagination-item--active').classList.remove('pagination-item--active');
                    paginationItem[2].classList.add('pagination-item--active');
                    shuffer();
                }
                if(content < 2){
                    document.querySelector('.pagination-item--active').classList.remove('pagination-item--active');
                    this.classList.add('pagination-item--active');
                }
                checkPageArrow();
            }
            paginationItem[2].onclick = function(){
                document.querySelector('.pagination-item--active').classList.remove('pagination-item--active');
                this.classList.add('pagination-item--active');
                shuffer();
                checkPageArrow();
            }
            paginationItem[3].onclick = function(e){
                var content = this.querySelector('a').textContent;
                var paginationItemLink = document.querySelectorAll('.pagination-item-link');
                if(content < 7){
                    paginationItemLink[1].textContent = Number(paginationItemLink[1].textContent) + 1;
                    paginationItemLink[2].textContent = Number(paginationItemLink[2].textContent) + 1;
                    paginationItemLink[3].textContent = Number(paginationItemLink[3].textContent) + 1;
                    document.querySelector('.pagination-item--active').classList.remove('pagination-item--active');
                    paginationItem[2].classList.add('pagination-item--active');
                    shuffer();
                }
                if(content == 7){
                    document.querySelector('.pagination-item--active').classList.remove('pagination-item--active');
                    this.classList.add('pagination-item--active');
                    e.preventDefault();
                }
                checkPageArrow();
            }
            paginationItem[5].onclick = function(e){
                var content = document.querySelector('.pagination-item--active a').textContent;
                if(content != 8){
                    var paginationItemLink = document.querySelectorAll('.pagination-item-link');
                    document.querySelector('.pagination-item--active').classList.remove('pagination-item--active');
                    this.classList.add('pagination-item--active');
                    paginationItemLink[1].textContent = 5;
                    paginationItemLink[2].textContent = 6;
                    paginationItemLink[3].textContent = 7;
                    shuffer();
                    checkPageArrow();
                }
                else {
                    e.preventDefault();
                }
            }
        }
        else if (i == 0 || i == paginationLength - 1){
            var paginationItemLink = document.querySelectorAll('.pagination-item-link');
            // arrow left
            paginationItem[0].onclick = function(){
                if(document.querySelector('.pagination-item--active a').textContent == 8){
                    document.querySelector('.pagination-item--active').classList.remove('pagination-item--active');
                    paginationItem[3].classList.add('pagination-item--active');
                }
                else if(document.querySelector('.pagination-item--active a').textContent == 2){
                    document.querySelector('.pagination-item--active').classList.remove('pagination-item--active');
                    paginationItem[1].classList.add('pagination-item--active');
                }
                else if(document.querySelector('.pagination-item--active a').textContent > 1){
                    paginationItemLink[1].textContent = Number(paginationItemLink[1].textContent) - 1;
                    paginationItemLink[2].textContent = Number(paginationItemLink[2].textContent) - 1;
                    paginationItemLink[3].textContent = Number(paginationItemLink[3].textContent) - 1;
                    shuffer();
                }
                checkPageArrow();
            }
            // arrow right
            paginationItem[paginationLength - 1].onclick = function(){
                if(document.querySelector('.pagination-item--active a').textContent == 7){
                    document.querySelector('.pagination-item--active').classList.remove('pagination-item--active');
                    paginationItem[5].classList.add('pagination-item--active');
                }
                else if(document.querySelector('.pagination-item--active a').textContent == 1){
                    document.querySelector('.pagination-item--active').classList.remove('pagination-item--active');
                    paginationItem[2].classList.add('pagination-item--active');
                }
                else if(document.querySelector('.pagination-item--active a').textContent < 7){
                    paginationItemLink[1].textContent = Number(paginationItemLink[1].textContent) + 1;
                    paginationItemLink[2].textContent = Number(paginationItemLink[2].textContent) + 1;
                    paginationItemLink[3].textContent = Number(paginationItemLink[3].textContent) + 1;
                    shuffer();
                }
                checkPageArrow();
            }
        }
    }
}

// catagory

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
