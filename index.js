

let productCard = document.getElementById('productCard');
let dropdown = document.getElementById('dropdown');

function dropdownWorking(){
     let url = `https://dummyjson.com/products`;
     let dropdownValue = '';
     fetch(url).then((response)=>{
          return response.json();
     }).then((data)=>{
          let dropArray = [];
          for(let key in data.products){
               dropArray.push(data.products[key].category)
          }
          let newArr = [...new Set(dropArray)]
          // console.log(newArr)
          for(let dropValue in newArr){
               dropdownValue += `<option value="${newArr[dropValue]}">${newArr[dropValue]}</option>`
          }
          dropdown.innerHTML = `<option value="all">All Products</option>` + dropdownValue;
          getProducts();
     })
     
}
dropdownWorking();

function getProducts(){
     let url = `https://dummyjson.com/products`;
     let productHtml = '';
     let imageSlides = '';
     fetch(url).then((response)=>{
          return response.json();
     }).then((data)=>{
          for(let key in data.products){
               // console.log(data.products[key]);
               // console.log(dropdown.options[dropdown.selectedIndex].value);
               
               if(data.products[key].category === dropdown.options[dropdown.selectedIndex].value){
                    productHtml += `<div class="col-lg-6 col-12 flex-fill myProductCard">
                                        <section class="product">
                                             <div class="photo-container">
                                                  <div class="photo-main" style="background-image:url(${data.products[key].thumbnail});" alt="green apple slice">
                                                  </div>
                                                  <div class="photo-album">
                                                       <ul id="productSlides">`;
                                                       for(let allImages in data.products[key].images){
                                                            imageSlides += `<li>
                                                                                <img src="${data.products[key].images[allImages]}" alt="green apple">
                                                                           </li>`;
                                                       }
                                                       productHtml += imageSlides;
                                                       imageSlides = '';
                    productHtml +=          `</ul>
                                                  </div>
                                             </div>
                                             
                                             <div class="product__info">
                                                  <div class="title">
                                                       <h1 id="title">${data.products[key].title}</h1>
                                                       <span>Brand Name : ${data.products[key].brand}</span>
                                                  </div>
                                                  <div class="price">
                                                       $<span>${data.products[key].price}</span> (-${data.products[key].discountPercentage}% Off)
                                                  </div>
                                                  <strong>In Stock</strong> - ${data.products[key].stock}<br>
                                                  <div class="description">
                                                       ${data.products[key].description}
                                                  </div>
                                                  <a href="https://www.amazon.in/${data.products[key].category}" target="_blank" class="btn buy--btn">ADD TO CART</a>
                                             </div>
                                        </section>
                                   </div>`;
               }if(dropdown.options[dropdown.selectedIndex].value === 'all'){
                    productHtml += `<div class="col-lg-6 col-12 flex-fill myProductCard">
                                        <section class="product">
                                             <div class="photo-container">
                                                  <div class="photo-main" style="background-image:url(${data.products[key].thumbnail});" alt="green apple slice">
                                                  </div>
                                                  <div class="photo-album">
                                                       <ul id="productSlides">`;
                                                       for(let allImages in data.products[key].images){
                                                            imageSlides += `<li>
                                                                                <img src="${data.products[key].images[allImages]}" alt="green apple">
                                                                           </li>`;
                                                       }
                                                       productHtml += imageSlides;
                                                       imageSlides = '';
                    productHtml +=          `</ul>
                                                  </div>
                                             </div>
                                             
                                             <div class="product__info">
                                                  <div class="title">
                                                       <h1 id="title">${data.products[key].title}</h1>
                                                       <span>Brand Name : ${data.products[key].brand}</span>
                                                  </div>
                                                  <div class="price">
                                                       $<span>${data.products[key].price}</span> (-${data.products[key].discountPercentage}% Off)
                                                  </div>
                                                  <strong>In Stock</strong> - ${data.products[key].stock}<br>
                                                  <div class="description">
                                                       ${data.products[key].description}
                                                  </div>
                                                  <a href="https://www.amazon.in/${data.products[key].category}" target="_blank" class="btn buy--btn" disabled>ADD TO CART</a >
                                             </div>
                                        </section>
                                   </div>`;
               }
          }
          productCard.innerHTML = productHtml;
     })
}

getProducts()

// search products

let searchTxt = document.getElementById('searchTxt');
searchTxt.addEventListener('input', function(){
     let inputVal = searchTxt.value;
     let productCard = document.getElementsByClassName('myProductCard');
     Array.from(productCard).forEach(function(element){
          console.log(element)
          let cardTitle = element.getElementsByTagName("h1")[0].innerText;
          if(cardTitle.includes(inputVal)){
               element.style.display = "block";
          }else{
               element.style.display = "none";
          }
     })
})
