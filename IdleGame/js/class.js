class Bohater {
    constructor(array) {
      this.name = array[0];
      this.cost = array[1];
      this.dmg = array[2];
      this.type = array[3];
      this.level = array[4];
  
      const lol = this;
  
      let newdiv = document.createElement("div");
      newdiv.className = "bohater";
      newdiv.innerHTML = this.name;
  
      
  
      let btn = document.createElement("button");
      btn.innerHTML = "GO";
      //btn.name = this.name;
  
      btn.addEventListener("click", function() {
        lol.level++;
        console.log(`Name: ${lol.name} Level: ${lol.level}`);
      });
  
      newdiv.appendChild(btn);
  
  
      newdiv.addEventListener("click", function() {
        if (newdiv.classList.contains("selected"))
          newdiv.classList.remove("selected");
        else
          newdiv.classList.add("selected");
      });
  
  
  
      document.getElementById("bohaterowie").append(newdiv);
  
  
    }
  }