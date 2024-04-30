const stars = document.querySelectorAll(".star");

stars.forEach(function(star){
    star.addEventListener("click",function(){
        const val = this.getAttribute('data-value');

        document.getElementById("stars").value = val;

        stars.forEach(s=> s.classList.remove("selected-star"));
        for(let i=0 ; i<val ; i++){
            stars[i].classList.add("selected-star");
        }    
    })
})