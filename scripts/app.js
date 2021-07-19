  var pages = document.getElementsByClassName('page'),
  book = document.getElementById('book'),
  menu = document.getElementById('menu'),
 
  isDragging = false,
  startPos = 0,
  startPosY = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  currentTranslateY = 0,
  prevTranslateY = 0,
  animationID,
  currentIndex = 0,
  flipLeft = true,
  //scrolling menu checker
  menuScrolled = true;

  for(var i = 0; i < pages.length; i++)
    {
      var page = pages[i];      
      page.style.zIndex = (pages.length - i);    

      page.addEventListener('touchstart', touchStart(i))
      page.addEventListener('touchend', touchEnd)
      page.addEventListener('touchmove', touchMove)
      // mouse events
      page.addEventListener('mousedown', touchStart(i))
      page.addEventListener('mouseup', touchEnd)
      page.addEventListener('mousemove', touchMove)
      //page.addEventListener('mouseleave', touchEnd)

      menu.addEventListener('touchstart', touchStart(i))
      menu.addEventListener('touchend', touchEnd)
      menu.addEventListener('touchmove', touchMove)
      // mouse events
      menu.addEventListener('mousedown', touchStart(i))
      menu.addEventListener('mouseup', touchEnd)
      menu.addEventListener('mousemove', touchMove)
    }
//menu.style.zIndex = 100;
// prevent menu popup on long press
window.oncontextmenu = function (event) {
  event.preventDefault()
  event.stopPropagation()
  return false
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}
function getPositionY(event) {
  return event.type.includes('mouse') ? event.pageY : event.touches[0].clientY
}

// use a HOF so we have index in a closure
function touchStart(index) {
  return function (event) {
    currentIndex = index
    startPos = getPositionX(event)
    startPosY = getPositionY(event)
    isDragging = true
    //animationID = requestAnimationFrame(animation)
    book.classList.add('grabbing')
  }
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event)
    const currentPositionY = getPositionY(event)
    currentTranslate = prevTranslate + currentPosition - startPos
    currentTranslateY = prevTranslateY + currentPositionY - startPos
  }
}

function touchEnd() {
  //cancelAnimationFrame(animationID)
  isDragging = false
  const movedBy = currentTranslate - prevTranslate
  const movedByY = currentTranslateY - prevTranslateY
  console.log(movedByY)
  menuScrolled = true;

  // if moved enough negative then snap to next slide if there is one
  if (movedBy < -100 && currentIndex < pages.length - 1){
    currentIndex += 1;
    flipLeft = true;
    menuScrolled = false;
    flipped();
  } 

  // if moved enough positive then snap to previous slide if there is one
  if (movedBy > 100 && currentIndex > 0){
    currentIndex -= 1;
    flipLeft = false;
    menuScrolled = false;
    flipped();
  }
  
  // scrolling menu
  if(menuScrolled)
  //scrollOutMenu 
  if(movedByY > 100)
   scrollOutMenu() 
  if(movedByY < -100)
  scrollInMenu()
  

  book.classList.remove('grabbing')
}

function flipped(){
  if (flipLeft)
              {                
                pages[currentIndex-1].classList.add('flipped');
              }
            else
              {
                pages[currentIndex].classList.remove('flipped')
              }
}

function scrollInMenu(){
  menu.classList.add('fade-in-section')
}
function scrollOutMenu(){
  menu.classList.remove('fade-in-section')
}
function lessionGoTo(){

}
function btn1Click(){
  console.log('Hello')
}