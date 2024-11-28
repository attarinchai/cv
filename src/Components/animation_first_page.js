createBubble(max,min,n){
  let bubbles = [];
  let w = max;
  let h = max;
  const gap = (max-min)/(n-1);
  //generate elements
  for (let i=1; i<=n; i++){
    bubbles = [...bubbles, <div className="unit increase" style={{width: w, height: h, backgroundColor:'teal', borderRadius: '50%'}}></div>];
    //style={styles} ...errors cannot mutate
    w -= gap;
    h -= gap;
  }

  //animate, loops
  function sizing(){
    function media(){
      let elements = document.getElementsByClassName('unit');
      let arr = Array.from(elements);
      
      arr.forEach(item => {
        let dW = parseInt(item.style.width);
        let dH = parseInt(item.style.height);    
        if(item.classList.contains('increase')){
          dW++;
          dH++;
          if(dW >= max){
            item.classList.remove('increase');
          }
        }
        else {
          dW--;
          dH--;
          if(dW <= min){
            item.classList.add('increase');
          }
        }
        item.style.width = dW + 'px';
        item.style.height = dH + 'px';
      });
    }
  }
  sizing();
  return bubbles;
}