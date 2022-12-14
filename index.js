var product = [{
    id: 1,
    img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    name: 'Nike',
    price: 4500,
    description: 'Nike Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo error facilis asperiores itaque cum possimus.',
    type: 'shoe'
}, {
    id: 2,
    img: 'https://images.unsplash.com/photo-1598403031688-e7cfd2c222c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    name: 'Adidas shirt',
    price: 1500,
    description: 'Adidas shirt  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo error facilis asperiores itaque cum possimus.',
    type: 'shirt'
}, {
    id: 3,
    img: 'https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YWRpZGFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    name: 'Adidas shoe',
    price: 3500,
    description: 'Adidas shoe  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo error facilis asperiores itaque cum possimus.',
    type: 'shoe'
}]

$(document).ready(() => {
    var html = '';
    for(let i = 0; i < product.length; i++){
        html += `<div onclick="openProductDetail(${i})" class="product-items ${product[i].type}">
                    <img class="product-img" src="${product[i].img}" alt="${product[i].name}">
                    <p style="font-size: 1.2vw;">${product[i].name}</p>
                    <p style="font-size: 1vw;">${numberWithCommas(product[i].price)} THB</p>
                </div>`;
    }

    $("#productlist").html(html)
})

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function searchsomething(elem){
    var value = $('#'+elem.id).val()
    console.log(value)

    var html = '';
    for(let i = 0; i < product.length; i++){
        if(product[i].name.includes(value)) {
            html += `<div onclick="openProductDetail(${i})" class="product-items ${product[i].type}">
                    <img class="product-img" src="${product[i].img}" alt="${product[i].name}">
                    <p style="font-size: 1.2vw;">${product[i].name}</p>
                    <p style="font-size: 1vw;">${numberWithCommas(product[i].price)} THB</p>
                </div>`;
        }
    }
    if(html == ''){
        $("#productlist").html(`<p>Not found product</p>`)
    } else {
        $("#productlist").html(html)
    }

}

function searchproduct(param){
    $(".product-items").css('display', 'none')
    if(param == 'all'){
        $(".product-items").css('display', 'block')
    } else {
        $("."+param).css('display','block')
    }
}

var productindex = 0;
function openProductDetail(index){
    productindex = index;
    console.log(productindex)
    $("#modalDesc").css('display','flex')
    $("#mdd-img").attr('src',product[index].img)
    $("#mdd-name").text(product[index].name)
    $("#mdd-price").text(numberWithCommas(product[index].price) + ' THB')
    $("#mdd-desc").text(product[index].description)
}

function closeModal(){
    $(".modal").css('display','none')
}


var cart = [];
function addtocart(){
    var pass = true;
    for(let i = 0; i < cart.length; i++){
        if(productindex == cart[i].index){
            cart[i].count++;
            pass = false
        }
    }

    if(pass){
        var obj = {
            index: productindex,
            id: product[productindex].id,
            name: product[productindex].name,
            price: product[productindex].price,
            img: product[productindex].img,
            count: 1
        };
        cart.push(obj)
    }
    console.log(cart)

    Swal.fire({
        icon: 'success',
        title: 'Add ' + product[productindex].name + ' to cart !'
    })
    $("#cartcount").css('display','flex').text(cart.length)
}

function openCart() {
    $("#modalCart").css('display','flex')
    rendercart();
}

function rendercart() {
    if(cart.length > 0) {
        var html = '';
        for(let i = 0; i < cart.length; i++){
            html += `<div class="cartlist-items">
            <div class="cartlist-left">
                <img src="${cart[i].img}" alt="cartlist">
                <div class="cartlist-detail">
                    <p style="font-size: 1.5vw;">${cart[i].name}</p>
                    <p style="font-size: 1.2vw;">${numberWithCommas(cart[i].price * cart[i].count)} THB</p>
                </div>
            </div>
            <div class="cartlist-right">
                <p onclick="deinitems('-', ${i})" class="btnc">-</p>
                <p id="countitems${i}" style="margin: 0 20px;">${cart[i].count}</p>
                <p onclick="deinitems('+', ${i})" class="btnc">+</p>
            </div>
        </div>`;
        }
        $("#mycart").html(html)

    } else {
        $("#mycart").html(`<p>Not found product list</p>`)
    }
}

function deinitems(action,index){
    if(action == '-'){
        if(cart[index].count > 0){
            cart[index].count--;
            $("#countitems"+index).text(cart[index].count)

            if(cart[index].count <= 0){
                Swal.fire({
                    icon: 'warning',
                    title: 'Are you sure to delete?',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    cancelButtonText: 'Cancel'
                }).then((res) => {
                    if(res.isConfirmed){
                        cart.splice(index,1)
                        console.log(cart)
                        rendercart();
                        $("#cartcount").css('display','flex').text(cart.length)

                        if(cart.length <= 0){
                            $("#cartcount").css('display','none')
                        }
                    } else {
                        cart[index].count++;
                        $("#countitems"+index).text(cart[index].count)
                    }
                })
            }
        }
    } else if(action == '+'){
        cart[index].count++;
        $("#countitems"+index).text(cart[index].count)
    }
}