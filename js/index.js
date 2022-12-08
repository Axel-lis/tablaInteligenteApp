const observer= new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        console.log(entry)
        if(entry.isIntersecting){
            entry.target.classList.add('show'); /*si solo se quiere mostrar una vez la animacion dejamos esto, else..*/
        }else{
            entry.target.classList.remove('show');
        }
    });
})

const hiddenElements= document.querySelectorAll('.hidden');
hiddenElements.forEach((el)=>observer.observe(el));
//navbar//
const toggleButton= document.getElementsByClassName('toggle-button')[0]
const navbarLinks= document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click',()=>{
    navbarLinks.classList.toggle('active')
} )
/*esto de arriba significa que si el boton de toggle se le hace click, cambia su clase a activp */