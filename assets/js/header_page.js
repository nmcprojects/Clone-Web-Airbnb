// Header
var rootCss = document.querySelector(':root');
var elementCovit_19 = document.querySelector(".info-covid-19");
var header = document.getElementById("header");
var headerSearchBtn = document.querySelector(".header__search-btn");
var headerSearchMain = header.querySelector(".header__search-main");

// sự kiện lăn chuột cho phần header 
var positionTop = elementCovit_19.clientHeight;
window.addEventListener("scroll",function() {

    if(header.offsetTop > positionTop) {
        
        headerSearchMain.classList.add("disappear");
        headerSearchBtn.classList.remove("disappear");

        // chỉnh lại màu sắc cho header
        header.style.setProperty('--header-logo-color', 'var(--primary-color)');
        header.style.setProperty('--header-text-color', '#000');
        header.style.setProperty('--header-background', '#fff');
        header.querySelector(".header").style.setProperty('box-shadow', '10px 0 10px rgba(0, 0, 0, 0.1)');
        header.style.setProperty('--header-nav-background-color-hover', '#f7f7f7');
        
    }
    else {
        var headerSearchFormElement = document.querySelector(".header__search-form");
        var position_top = headerSearchFormElement.offsetTop;
        headerSearchBtn.style.setProperty('--position-top', `${position_top}px`);
        headerSearchBtn.classList.add("disappear");
        headerSearchMain.classList.remove("disappear");

        // chỉnh lại màu sắc cho header
        header.style.setProperty('--header-logo-color', '#fff');
        header.style.setProperty('--header-text-color', '#fff');
        header.style.setProperty('--header-background', 'transparent');
        header.querySelector(".header").style.setProperty('box-shadow', 'none');
        header.style.setProperty('--header-nav-background-color-hover', '#567686');
    }
});

// Sự kiện lăn chuột đén cuối trang để ẩn navigation của header mobile
var footerElement = document.getElementById("footer");
var headerMobileNav = document.querySelector(".header__mobile-nav");
window.addEventListener("scroll",function() {
    if(window.scrollY > document.body.clientHeight - window.innerHeight - 10) {
        if(headerMobileNav) {
            headerMobileNav.style.animation = "run-down linear 0.2s 1";
        }
    }
    else {
        if(headerMobileNav) {
            headerMobileNav.style.animation = "run-up linear 0.2s 1";
        }
    }

});



// Sự kiện click vào nút nav user
var headerNavUser = document.querySelector(".header__nav-user");
var headerNavUserControl = document.querySelector(".header__nav-user-control");

headerNavUser.onclick = function() {

    var isAppear = !headerNavUserControl.classList.contains("disappear"); 

    turnOffAllBtn(); // tắt chể độ của các chức năng khác

    if(!isAppear) { /* Nếu nó chưa hiện rồi thì làm hiện control lên */ 
        headerNavUserControl.classList.remove("disappear"); 
    }
   
}



// Sự kiện click vào nút btn search;
headerSearchBtn.onclick = function() {

    // tắt chể độ của các chức năng khác
    turnOffAllBtn();

    headerSearchBtn.classList.add("disappear");
    headerSearchMain.classList.remove("disappear");
}

// Sự kiện Click header search option
var headerSearchOption = document.querySelector('.header__search-option');
var headerSearchOptionItemPlace = headerSearchOption.querySelector('.header__search-option-item.header__search-option-item--place')
var headerSearchOptionItemExperience = headerSearchOption.querySelector('.header__search-option-item.header__search-option-item--experience')

headerSearchOptionItemPlace.onclick = function() {

    turnOffAllBtn();
    
    if(headerSearchOptionItemExperience.classList.contains('header__search-option-item--active')) headerSearchOptionItemExperience.classList.remove('header__search-option-item--active');

    headerSearchOptionItemPlace.classList.add('header__search-option-item--active');

    // Đồng thời hiện các chế độ của option này lên
    var headerSearchFormItem = document.querySelectorAll('.header__search-form-item');
    headerSearchFormItem.forEach(function(item) {
        item.classList.remove('disappear');
        if(item.classList.contains('header__search-form-item-last--day')) item.classList.add('disappear');
    })


}
headerSearchOptionItemExperience.onclick = function() {

    turnOffAllBtn();

    if(headerSearchOptionItemPlace.classList.contains('header__search-option-item--active')) headerSearchOptionItemPlace.classList.remove('header__search-option-item--active');

    headerSearchOptionItemExperience.classList.add('header__search-option-item--active');

    // Đồng thời hiện các chế độ của option này lên
    var headerSearchFormItem = document.querySelectorAll('.header__search-form-item');
    headerSearchFormItem.forEach(function(item) {
        item.classList.add('disappear');
        if(item.classList.contains('header__search-form-item-last--day')) item.classList.remove('disappear');

    })
    headerSearchFormItem[0].classList.remove('disappear');
}

// Đóng mở header search form <Click form search item>
var headerSearchForm = document.querySelector(".header__search-form-wrap");
var headerSearchFormItems = document.querySelectorAll(".header__search-form-item");

headerSearchFormItems.forEach(function(headerSearchFormItem) {
    headerSearchFormItem.onclick = function(event) {

        // tắt chể độ của các chức năng khác
        turnOffAllBtn();

        var headerSearchFormItemActive = headerSearchForm.querySelector(".header__search-form-item[active]");
        if(headerSearchFormItemActive) headerSearchFormItemActive.removeAttribute("active");
        var item = this;
        if(this.classList.contains("header__search-form-item-last")) { /* Nếu là phần tử cuối cùng(có class kia) */
            // Xử lý nếu click vào nút tìm kiếm
        }
        else {
            item = this;
        }
        item.setAttribute("active", "true") ;
        headerSearchForm.setAttribute("active", "true");
    }
})



// cập nhật số khách 
function updateAmountCustomer (elementChild) {

    var headerSearchFormItem;

    while(true) {
        elementChild = elementChild.parentElement;

        if(elementChild === null || elementChild === undefined) {
            headerSearchFormItem = null;
            break;
        }

        if(elementChild.classList.contains("header__search-form-item")) {
            headerSearchFormItem = elementChild;
            break;
        }
    }

    var headerSearchFormCusstomerAmountCounts = document.querySelectorAll(".header__search-form-customer__item-amount-count");
    var countCustomer = 0, countCustomerKid = 0;
    countCustomer = Number.parseInt(headerSearchFormCusstomerAmountCounts[0].textContent) + Number.parseInt(headerSearchFormCusstomerAmountCounts[1].textContent);
    countCustomerKid = headerSearchFormCusstomerAmountCounts[2].textContent;

    var headerSearchFormCusstomer = headerSearchFormItem.querySelector(".header__search-form-item-text");
    var headerSearchFormCusstomerDeleteBtn = headerSearchFormItem.querySelector(".header__search-form-delete");

    if(countCustomer + countCustomerKid > 0) {
        if(headerSearchFormCusstomer) {
            if(countCustomer != 0 && countCustomerKid != 0) headerSearchFormCusstomer.innerHTML = `${countCustomer} khách, ${countCustomerKid} em bé.`;
            else if(countCustomer != 0)  headerSearchFormCusstomer.innerHTML = `${countCustomer} khách`;
            else  headerSearchFormCusstomer.innerHTML = `${countCustomerKid} em bé.`;
        }

        // Add thêm btn xóa
        if(headerSearchFormCusstomerDeleteBtn) {
            headerSearchFormCusstomerDeleteBtn.classList.remove("disappear")
        }
    }
    else {
        if(headerSearchFormCusstomer) {
            headerSearchFormCusstomer.innerHTML = "Thêm khách";
        }
        // remove btn xóa
        if(headerSearchFormCusstomerDeleteBtn) {
            headerSearchFormCusstomerDeleteBtn.classList.add("disappear")
        }
    }


    // Thêm sự kiện click vào btn xóa Customers
    headerSearchFormCusstomerDeleteBtn.onclick = function(event) {
        
        if(headerSearchFormCusstomer) { 
            headerSearchFormCusstomer.innerHTML = "Thêm khách";
        }
        
        // cập nhật lại số khách;
        headerSearchFormCusstomerAmountCounts[0].textContent = 0; 
        headerSearchFormCusstomerAmountCounts[1].textContent = 0; 
        headerSearchFormCusstomerAmountCounts[2].textContent = 0; 

        // Cập nhật lại nút tăng giảm
        var btnDescending = document.querySelectorAll(".header__search-form-customer__item-amount-btn.header__search-form-customer__item-amount-btn--descending");
        var btnAscending = document.querySelectorAll(".header__search-form-customer__item-amount-btn.header__search-form-customer__item-amount-btn--ascending");
        btnDescending.forEach(function(item) {
            item.classList.add("header__search-form-customer__item-amount-btn--disable");
        })

        btnAscending.forEach(function(item) {
            item.classList.remove("header__search-form-customer__item-amount-btn--disable");
        })

        // ẩn nút xóa đi
        if(headerSearchFormCusstomerDeleteBtn) {
            headerSearchFormCusstomerDeleteBtn.classList.add("disappear")
        }
    }

}

/* ==> Tăng giảm số lượng của form khách (customer) trong header search form */
var headerSearchFormCusstomerAmountBtn = document.querySelectorAll(".header__search-form-customer__item-amount-btn");

headerSearchFormCusstomerAmountBtn.forEach(function(item) {
    item.onclick = function() {

        // Lấy phần tử tra để trỏ đến count của phần đó
        var headerSearchFormCustomerItem = item.parentElement;
        var headerSearchFormCusstomerAmountCount = headerSearchFormCustomerItem.querySelector(".header__search-form-customer__item-amount-count");

        if(item.classList.contains("header__search-form-customer__item-amount-btn--descending")) {// btn giảm

            if(!item.classList.contains("header__search-form-customer__item-amount-btn--disable")) { 

                var Count = headerSearchFormCusstomerAmountCount.textContent - 1;
                headerSearchFormCusstomerAmountCount.innerText = Count;
        
                if(Count == 0) item.classList.add("header__search-form-customer__item-amount-btn--disable")
                if(Count < 16) {
                    var headerSearchFormCusstomerAmountBtnAscending = headerSearchFormCustomerItem.querySelector(".header__search-form-customer__item-amount-btn.header__search-form-customer__item-amount-btn--ascending");

                    if(headerSearchFormCusstomerAmountBtnAscending.classList.contains("header__search-form-customer__item-amount-btn--disable")) {
                        headerSearchFormCusstomerAmountBtnAscending.classList.remove("header__search-form-customer__item-amount-btn--disable")
                    }
                }

            }
        }
        else { // btn tăng

            if(!item.classList.contains("header__search-form-customer__item-amount-btn--disable")) {

                var Count = Number.parseInt(headerSearchFormCusstomerAmountCount.textContent) + 1;
                headerSearchFormCusstomerAmountCount.innerText = Count;

                if(Count >= 16) item.classList.add("header__search-form-customer__item-amount-btn--disable");

                if(Count > 0) {
                    var headerSearchFormCusstomerAmountBtnDescending = headerSearchFormCustomerItem.querySelector(".header__search-form-customer__item-amount-btn.header__search-form-customer__item-amount-btn--descending");

                    if(headerSearchFormCusstomerAmountBtnDescending.classList.contains("header__search-form-customer__item-amount-btn--disable")) {
                        headerSearchFormCusstomerAmountBtnDescending.classList.remove("header__search-form-customer__item-amount-btn--disable");
                    }
                }
            }
        }


        updateAmountCustomer(item);
    }
})




// Tắt Hết các chế độ khi click vào 
function turnOffAllBtn() {

    
    // Tắt header nav user
    headerNavUserControl.classList.add("disappear");

    // Tắt form search về chế độ mặc định
    headerSearchFormItems.forEach(function(headerSearchFormItem) {
        var headerSearchFormItemActive = headerSearchForm.querySelector(".header__search-form-item--active.header__search-form-item[active]");
        if(headerSearchFormItemActive) headerSearchFormItemActive.removeAttribute("active");
        
        headerSearchFormItem.removeAttribute("active");
        headerSearchForm.removeAttribute("active");
    })

    
}




// Header Mobile
var headerSearchMobile = document.querySelector('.header__mobile-search');
var headerSearchFormMobile = document.querySelector('.header__mobile-form')
var headerSearchFormBtnDeleteMobile = document.querySelector('.header__mobile-form-delete')
var headerCancleMobile  = document.querySelector('.header__mobile-cancel');
var headerSearchPlaceMobile = document.querySelector('.header__mobile-search-place');


// Click vào nút  header search mobile
headerSearchFormMobile.onclick = function () {

    document.getElementById("header").style.setProperty('--header-background', '#fff'); 

    if(headerCancleMobile) headerCancleMobile.classList.remove("disappear");

    if(headerSearchPlaceMobile) headerSearchPlaceMobile.classList.remove("disappear");
}


// Click vào nút hủy trong header search mobile
headerCancleMobile.onclick = function () {

    document.getElementById("header").style.setProperty('--header-background', 'transperant'); 

    document.querySelector('.header__mobile-search-place').classList.add("disappear");
    document.querySelector('.header__mobile-cancel').classList.add("disappear");
    
}


// // khi focus vào header search form input thì hiện btn xóa
// console.log({headerSearchFormMobile})
// headerSearchFormMobile.querySelector('.header__mobile-form-input').onfocus = function() {
//     console.log(this.value.length)
//     if(this.value.length > 0) { 
//         headerSearchFormBtnDeleteMobile.classList.remove("disappear")
//     }
//     else headerSearchFormBtnDeleteMobile.classList.add("disappear")
// }
