var auto = document.querySelector('.auto');
var yUp = 0;
var xBackwards = 0;
var yDown = 0;
var xForward = 0;
var speed = 8;
var timeSpawnWall = 1000;
var speedWall = 5;
const listWall = [];
const listRoad = [];
const listGun = [];
const listFireOne = [];
const listFireTwo = [];
const listBomOne = [];
const listHepshechka = [];
const listPovestka = [];
var result = 0;
var hp = 100;
var durationWeapon = 10000;
var speedShootGun = 400; 
var damegePistol = 5;
var speedPovestka = -6;
var fire = document.querySelectorAll('.fire');
var rotat = document.querySelectorAll('.turn');
var score = document.querySelector('.value');
var health = document.querySelector('.health');
var life = document.querySelector('.text');
var weapon = document.querySelector('.weapon');
var valueTimeWeapon = document.querySelector('.value_time_weapon');
var value_weapon = document.querySelector('.value_weapon');
var war = document.querySelector('.war');
var w1 = document.querySelector('.w1');
var w2 = document.querySelector('.w2');
var fire_shot1 = document.querySelector('.fire_shot1');
var fire_shot2 = document.querySelector('.fire_shot2');
var defeat = document.querySelector('.defeat');
var defeatScore = document.querySelector('.defeat_score');
var score_value = document.querySelector('.score_value');
var voenkom = document.querySelector('.voenkom');
var anime = document.querySelector('.anime');

function dead() {
   defeat.style.display = 'block';
   defeat.style.animation = 'defeat 2s forwards';
   defeatScore.style.animation = 'weapon 4s forwards'
   score_value.innerHTML = result;
   score_value.style.animation = 'weapon 4s forwards'
   timeSpawnWall = 10000;
   speedWall = 0;
   speed = 0;
};

function move() {
	var autoY = auto.getBoundingClientRect().top;
	var autoX = auto.getBoundingClientRect().left;
	var autoH = auto.offsetHeight;
	var autoW = auto.offsetWidth;
		if(hp <= 0) {
			  dead();
			}
		
		if(autoY <= 35) {
				auto.style.top = autoY + 1 + 'px';
    		}
    	else if(autoY >= 555){
 				auto.style.top = autoY - 1 + 'px';
    		}
    	else {
				auto.style.top = autoY + yDown + yUp  + 'px';
     		};
    

    	if(autoX <= 0) {
            auto.style.left= autoX + 1 +'px';
		}
		else if(autoX >= 1167){
			auto.style.left= autoX - 1 +'px';
		}
		else {
    	auto.style.left = autoX + xBackwards + xForward +'px';
    	};

    	  if(listPovestka.length > 0) {
	    	listPovestka.forEach( function (item, index) {
		            povestkaY = item.getBoundingClientRect().top;
		            povestkaX = item.getBoundingClientRect().left;
		            povestkaH = item.offsetHeight;
		            povestkaW = item.offsetWidth;
		            
                     if(povestkaY < -50) {
                     	speedPovestka = 6;
                     }

                     if(povestkaY > 500) {
                     	speedPovestka = -6;
                     }

            		item.style.left = povestkaX - speedWall + 'px';
            		item.style.top = povestkaY + speedPovestka + 'px';	 
					 
  
	           		if(povestkaX + povestkaW < 0) {
	                	listPovestka.splice(index, 1);
	                	document.body.removeChild(item);
               		 };

		              if(autoX + autoW + 100 >= povestkaX && autoX <= povestkaX + povestkaW) {
                        	if(autoY + 30 + autoH >= povestkaY && autoY-34 <= povestkaY + povestkaH) {                                            	
                         		listPovestka.splice(index, 1);
	                			document.body.removeChild(item);
	                			defeat.textContent = 'Годен';
	                			anime.style.display = 'block';	                
	                			dead();
                    	};
           		 	};
		   	}
	   	)};

	    if(listHepshechka.length > 0) {
	    	listHepshechka.forEach( function (item, index) {
		            HepshechkaY = item.getBoundingClientRect().top;
		            HepshechkaX = item.getBoundingClientRect().left;
		            HepshechkaH = item.offsetHeight;
		            HepshechkaW = item.offsetWidth;

            		 item.style.left = HepshechkaX - speedWall + 'px';
				
  
	           		if(HepshechkaX + HepshechkaW < 0) {
	                	listHepshechka.splice(index, 1);
	                	document.body.removeChild(item);
               		 };

		              if(autoX + autoW + 100 >= HepshechkaX && autoX <= HepshechkaX + HepshechkaW) {
                        	if(autoY + 30 + autoH >= HepshechkaY && autoY-34 <= HepshechkaY + HepshechkaH) {                   
                         		if (hp < 100) {
                         			 if (hp < 100 && hp > 90) {hp= 100} else {hp+= 10};
                         		}
                         		if(hp >= 0) {
				                            life.innerHTML = hp;
		                    			}
                         		health.style.background = 'linear-gradient(to right, rgba(0,180,0,1) '+ hp +'%' +', rgba(0,0,0,0.3) 0%)';
                         		listHepshechka.splice(index, 1);
	                			document.body.removeChild(item);
                    	};
           		 	};
		   	}
	   	)};

       	if(listWall.length > 0) {
       		listWall.forEach( function (item, index) {
                wallY = item.getBoundingClientRect().top;
                wallX = item.getBoundingClientRect().left;
                wallH = item.offsetHeight;
                wallW = item.offsetWidth;
                
 	

                if(!item.innerHTML) {
                	item.innerHTML = randomNumber(10, 50);
                }

                if(item.innerHTML <= 0 && item.style.animation != 'backBom 0.6s') {
                	item.style.animation= 'backBom 0.6s forwards';                
                	item.style.color = 'transparent';
                }

                if (wallH + wallY >= 0 && wallH + wallY <= window.innerHeight) {
                		item.style.left = wallX - speedWall + 'px';
					}else{
				      listWall.splice(index, 1);
                	  document.body.removeChild(item);
					};
      
                if(wallX + wallW < 0) {
                	listWall.splice(index, 1);
                	document.body.removeChild(item);
                	result += 5;
                	score.innerHTML  = ' ' + result;
                };

                if(listFireOne.length > 0) {
	   				listFireOne.forEach( function(object, ind){
	   					FireOneY = object.getBoundingClientRect().top;
		            	FireOneX = object.getBoundingClientRect().left;
		           		FireOneH = object.offsetHeight;
		           	 	FireOneW = object.offsetWidth;
		            

		            	object.style.left = FireOneX + 4 + 'px';

			            if(FireOneX + FireOneW > 1366) {
			            	listFireOne.splice(ind, 1);
			            	document.body.removeChild(object);
			            };

	                    if(FireOneX + FireOneW >= wallX && FireOneX <= wallX + wallW) {
	                        	if(FireOneY + FireOneH >= wallY && FireOneY <= wallY + wallH) {
	                               if (item.innerHTML  >= 0) { 
	                               	item.innerHTML -= damegePistol;
	                              	listFireOne.splice(ind, 1);
			            		   	document.body.removeChild(object); 
			            		   	result += 1;
                					score.innerHTML  = ' ' + result;
			            		   }
	                        	}
	                        }
	   					});
	   				};

	   			 if(listFireTwo.length > 0) {
		   			listFireTwo.forEach( function(obj, inde){
		   				FireTwoY = obj.getBoundingClientRect().top;
			            FireTwoX = obj.getBoundingClientRect().left;
			            FireTwoH = obj.offsetHeight;
			            FireTwoW = obj.offsetWidth;
			            

			            obj.style.left = FireTwoX + 4 + 'px';

			            if(FireTwoX + FireTwoW > 1366) {
			            	listFireTwo.splice(inde, 1);
			            	document.body.removeChild(obj);
			            };

			            if(FireTwoX + FireTwoW >= wallX && FireTwoX <= wallX + wallW) {
                        	if(FireTwoY + FireTwoH >= wallY && FireTwoY <= wallY + wallH) {
	                              if (item.innerHTML >= 0) {
	                              	 item.innerHTML -= damegePistol;
	                              	 listFireTwo.splice(inde, 1);
				            	   	 document.body.removeChild(obj); 
				            	   	 result += 1;
                					 score.innerHTML  = ' ' + result;
				            	}		            	  
                        	};
                        }
		   			})
		   		};

                 if(autoX + autoW + 100 >= wallX && autoX <= wallX + wallW) {
                        if(autoY + 30 + autoH >= wallY && autoY-34 <= wallY + wallH) {
                        	var chec = getComputedStyle(item);
	                            if (chec.backgroundColor === 'rgb(0, 128, 0)') {	                            		
	                            	    item.style.animation= 'backBom 0.6s forwards';                
                						item.style.color = 'transparent';
			                           	hp -= item.innerHTML;
			                            health.style.background = 'linear-gradient(to right, rgba(0,180,0,1) '+ hp +'%' +', rgba(0,0,0,0.3) 0%)';
				                        if(hp >= 0) {
				                            life.innerHTML = hp;
		                    			}

		                    			if (hp <= 25) {
											life.style.color = 'red';
											health.style.background = 'linear-gradient(to right, rgba(248,0,0,1) '+ hp +'%' +', rgba(0,0,0,0.3) 0%)'
											health.style.animation = 'help 0.5s linear infinite';
										} else {health.style.animation = ''};

		                  }
                    }
             	}
       		}
       	)};

   		 	if(listRoad.length > 0) {
	   			listRoad.forEach( function (item, index) {
		            roadX = item.getBoundingClientRect().top;
		            roadY = item.getBoundingClientRect().left;
		            roadH = item.offsetHeight;
		            roadW = item.offsetWidth;

            		 item.style.left = roadY - speedWall - 10 + 'px';
				
  
	           		 if(roadY + roadW < 0) {
		            	listRoad.splice(index, 1);
		            	document.body.removeChild(item);
		            };
		   		}
	   	)};

	   		if(listGun.length > 0) {
	   			listGun.forEach( function (item, index) {
		            gunY = item.getBoundingClientRect().top;
		            gunX = item.getBoundingClientRect().left;
		            gunH = item.offsetHeight;
		            gunW = item.offsetWidth;

            		 item.style.left = gunX - speedWall + 'px';
				
  
	           		 if(gunX + gunW < 0 || item.style.left == '1325px') {
		            	listGun.splice(index, 1);
		            	document.body.removeChild(item);
		            };

		              if(autoX + autoW + 100 >= gunX && autoX <= gunX + gunW) {
                        	if(autoY + 30 + autoH >= gunY && autoY-34 <= gunY + gunH) {                   
                         		item.style.animation = 'gun 1s forwards linear';
                         		weapon.style.display = 'block';
     							weapon.style.animation = 'weapon 1.2s linear forwards';
                         		timeWeapon();
                    	};
           		 	};
		   	}
	   	)};	   

  requestAnimationFrame(move);
};

requestAnimationFrame(move);


var timeWeapon = function(){
     setTimeout( function(){
     	war.style.display = 'flex';
     	value_weapon.style.display = 'none';
 		valueTimeWeapon.innerHTML = durationWeapon/1000;
     	counter(durationWeapon);
     }, 1000);

     setTimeout( function(){
     	war.style.display = 'none';
     	weapon.style.display = 'none';
     	value_weapon.style.display = 'block';
     }, durationWeapon + 1500);
}


function counter(durationWeapon) {
	var count = durationWeapon;
 	if(count >= 0) { 
 		  setTimeout( function () {
 		  	valueTimeWeapon.innerHTML = (count -1000)/1000;
     		count -= 1000;
     		counter(count);
 		}, 1000);
  	}else{
  		return	valueTimeWeapon.innerHTML = count;
	}
};


function randomNumber(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}



function createWall() {
	var wall = document.createElement('div');
	wall.classList.add('wall');
	wall.style.top = Math.random() * window.innerHeight + 'px';
	wall.style.left = window.innerWidth + 'px';
	document.body.appendChild(wall);
	listWall.push(wall);

};

function creatRoad() {
	var road = document.createElement('div');
    road.classList.add('road');
    road.style.top = window.innerHeight * 0.5 + 'px';
    road.style.left = window.innerWidth + 'px';
    document.body.appendChild(road);
    listRoad.push(road);

}

function creatGun() {
	var gun = document.createElement('div');
    gun.classList.add('gun');
    gun.style.top = Math.random() * window.innerHeight + 'px';
	gun.style.left = window.innerWidth + 'px';
    document.body.appendChild(gun);
    listGun.push(gun);
}

function creatHp() {
	var hepshechka = document.createElement('div');
    hepshechka.classList.add('hepshechka');
    hepshechka.style.top = Math.random() * window.innerHeight + 'px';
	hepshechka.style.left = window.innerWidth + 'px';
    document.body.appendChild(hepshechka);
    listHepshechka.push(hepshechka);
}

function creatPovestka() {
	var povestka = document.createElement('div');
    povestka.classList.add('povestka');
    povestka.style.top = Math.random() * window.innerHeight + 'px';
	povestka.style.left = window.innerWidth + 'px';
	povestka.innerHTML = 'Повicтка';
    document.body.appendChild(povestka);
    listPovestka.push(povestka);
}

setInterval( function() {
		createWall();
	}, timeSpawnWall);

setInterval( function() {
		creatPovestka();
	}, 25000);

setInterval( function() {
		creatHp();
	}, 5000);

setInterval( function() {
		creatRoad();
	}, speedWall * 100);

setInterval( function() {
		creatGun();
	}, durationWeapon + 4000);


function checkAvailabilityDurection(direction, defaultValue) {
   	return direction != defaultValue;
}

document.addEventListener('keydown', function(e){ 

	if(e.keyCode === 38) {
		yUp = speed * -1;
       for (var valdown in rotat) {
           	   if (valdown < rotat.length) {
           	   	rotat[valdown].classList.add('rotatup')
           	   }else{
           	   	break
           	   }
           };
		if(checkAvailabilityDurection(yDown, 0)) {
        	yUp += speed * -1;
		}
	}

	if(e.keyCode === 40) {
		yDown = speed;

		 for (var valup in rotat) {
           	   if (valup < rotat.length) {
           	   	rotat[valup].classList.add('rotatdown')
           	   }else{
           	   	break
           	   }
           };

		if(checkAvailabilityDurection(yUp, 0)) {
        	yDown += speed;
		}
	}

	if(e.keyCode === 39) {
		xForward = speed;

		if(checkAvailabilityDurection(xBackwards, 0)) {
        	xForward += speed;
		}
	}

	if(e.keyCode === 37) {
		xBackwards = speed * -1;

		if(checkAvailabilityDurection(xForward, 0)) {
        	xBackwards += speed * -1;
		}
	}

	if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
		for (var i = 0; i < fire.length; i++) {
			fire[i].style.display = 'block';
		};

	}

	if(e.keyCode === 32 && gunFireOne === undefined) {
		if(weapon.style.display === 'block') {
			createElementWeapon('tytiFryti', 'div', 'gunBullet', w1.getBoundingClientRect().left, w1.getBoundingClientRect().top, listFireOne);
		    createElementWeapon('Fryti', 'div', 'gunBullet', w2.getBoundingClientRect().left, w2.getBoundingClientRect().top, listFireTwo);
		    fire_shot1.style.display = 'block';
		    setTimeout( function(){fire_shot1.style.display = 'none';},50);
		    fire_shot2.style.display = 'block';
		    setTimeout( function(){fire_shot2.style.display = 'none';},50);
		gunFireOne = setInterval( function() {
			if(weapon.style.display === 'block') {
				createElementWeapon('tytiFryti', 'div', 'gunBullet', w1.getBoundingClientRect().left, w1.getBoundingClientRect().top, listFireOne);
				createElementWeapon('Fryti', 'div', 'gunBullet', w2.getBoundingClientRect().left, w2.getBoundingClientRect().top, listFireTwo);
                fire_shot1.style.display = 'block';
		        setTimeout( function(){fire_shot1.style.display = 'none';},50);
		        fire_shot2.style.display = 'block';
		        setTimeout( function(){fire_shot2.style.display = 'none';},50);
		};
			}, speedShootGun);
	    }
    }
});

var gunFireOne;


document.addEventListener('keyup', function(e){


	if(e.keyCode === 39) {
		xForward = 0;

		if(!checkAvailabilityDurection(xBackwards, speed * 2 * -1)) {
        	xBackwards =  speed * -1; 
		}
	}

	if(e.keyCode === 37) {
		xBackwards = 0;	

		if(!checkAvailabilityDurection(xForward, speed * 2)) {
        	xForward =  speed; 
		}
		
	}	
	if(e.keyCode === 40) {
		yDown = 0;
         for (var valup in rotat) {
           	   if (valup < rotat.length) {
           	   	rotat[valup].classList.remove('rotatdown')
           	   }else{
           	   	break
           	   }
           };

		if(!checkAvailabilityDurection(yUp, speed * 2 * -1)) {
        	yUp = speed * -1; 
		}		
	}

	if(e.keyCode === 38) {
		yUp = 0;
          for (var valdown in rotat) {
           	   if (valdown < rotat.length) {
           	   	rotat[valdown].classList.remove('rotatup')
           	   }else{
           	   	break
           	   }
           };

		if(!checkAvailabilityDurection(yDown, speed * 2)) {
        	yDown = speed; 
		}	
	}

	if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
		for (var i = 0; i < fire.length; i++) {
			fire[i].style.display = 'none';
		};
	}


	if(e.keyCode === 32) {
		clearInterval(gunFireOne);
		gunFireOne = undefined;
	}

});



var createElementWeapon = function(name, typeObject, classObject, positionX, positionY, arrayName) {
     var name = document.createElement(typeObject);
     name.classList.add(classObject);
     name.style.top = positionY + 'px';
     name.style.left = positionX +'px';
     document.body.appendChild(name);
     arrayName.push(name);
     return name;
}




