
"use strict"
	let renderer = PIXI.autoDetectRenderer(1,1);
    let container = new PIXI.Container();
    
	let button_url ="https://i.imgur.com/lD7qWpo.png";
	document.getElementById('button').appendChild(renderer.view);
	
    PIXI.loader
    .add(button_url)
    .load(setup);
    
    
    function setup(){
    	let button = new PIXI.Sprite(PIXI.loader.resources[button_url].texture);
        
        button.interactive =true;
        button.buttonMode =true;
        
        button
        .on("mouseup",convert)
        .on("touchend",convert);
        
       
        
        function convert()
        {
        	let shifting_value=document.getElementById('ShiftingValueInSeconds').value,
            getFontSize=document.getElementById('fontsize').value, openFontIndex=0,closeFont_bool=false,totalSubtitleIndex=0,
            
        	temp="",
            
            evaluation=0,
            
            hour_temp1=0,
            min_temp1=0,
            second_temp1=0;
            
            let hour_temp2=0;
            let min_temp2=0;
            let second_temp2=0;
           
        	let Get_Subtitles_Text = document.getElementById("Subtitles_Text_Area").value;
    		
            shifting_value = parseInt( shifting_value);
			//temp=Get_Subtitles_Text;
            
            if (isNaN(shifting_value))
           	{
            	 throw "Parameter is not a number!";
                 alert("Parameter is not a number!");
            }
            
            for (let loop=0;loop<Get_Subtitles_Text.length;loop++)
            {
                
            	if (Get_Subtitles_Text[loop+2]==':' && Get_Subtitles_Text[loop+3+2]==':' && Get_Subtitles_Text[loop+17+2]==':' && Get_Subtitles_Text[loop+20+2]==':')
                {
                	hour_temp1 = parseInt( Get_Subtitles_Text[loop-2+2]+Get_Subtitles_Text[loop-1+2] );
                    
                    min_temp1 = parseInt( Get_Subtitles_Text[loop+1+2]+Get_Subtitles_Text[loop+2+2] );
                    
                    second_temp1 = parseInt( Get_Subtitles_Text[loop+4+2]+Get_Subtitles_Text[loop+5+2] );
                
                
                
                	hour_temp2 = parseInt( Get_Subtitles_Text[loop+17-2+2]+Get_Subtitles_Text[loop+17-1+2] );
                    
                    min_temp2 = parseInt( Get_Subtitles_Text[loop+1+17+2]+Get_Subtitles_Text[loop+2+17+2] );
                    
                    second_temp2 = parseInt( Get_Subtitles_Text[loop+4+17+2]+Get_Subtitles_Text[loop+5+17+2] );
                    
                    
                   //set max thredshold for second, minute value
                    second_temp1+=shifting_value;
                    second_temp2+=shifting_value;
                    
                     if (second_temp1>=60)
          			 {
            		   	evaluation = parseInt(second_temp1/60);
            		    second_temp1=second_temp1- evaluation*60;
                        min_temp1 += evaluation;
           			 }
                     if (min_temp1>=60)
                     {
                     	evaluation = parseInt(min_temp1/60);
            		    min_temp1=evaluation*60 - min_temp1;
                        hour_temp1 += evaluation;
                     }
        	
            		 if (hour_temp1>=12)
                     {
                     		
                        console.log('Hour value is more than 12!!!');
                     }
                     
                     
                     //check for negative case
                     if (second_temp1<0)
                     {
                     	evaluation = parseInt(second_temp1/60)*-1+1;
                       
                        min_temp1-=evaluation;
                        
                        second_temp1 += evaluation*60;
                        
                     }
                     if (min_temp1<0)
                     {
                     	evaluation = parseInt(min_temp1/60)*-1+1;
                        
                        hour_temp1-=evaluation;
                        
                        min_temp1 += evaluation*60;
                     }
                     if (hour_temp1<0)
                     {
                     	alert('Negative value for hour is detected, automatically reset that time slot to 0,0,0');
                        min_temp1=0;
                        hour_temp1=0;
                        second_temp1=0;
                     
                     }
                     
                     //set max thredshold for second, minute value
                      if (second_temp2>=60)
          			 {
            		   	evaluation = parseInt(second_temp2/60);
            		    second_temp2=-evaluation*60 + second_temp2;
                        min_temp2 += evaluation;
           			 }
                     if (min_temp2>=60)
                     {
                     	evaluation = parseInt(min_temp2/60);
            		    min_temp2=evaluation*60 - min_temp2;
                        hour_temp2 += evaluation;
                     }
        	
            		 if (hour_temp2>=12)
                     {
                     		
                        console.log('Hour value is more than 12!!!');
                     }
                    
                    
                     //check for negative case
                     if (second_temp2<0)
                     {
                     	evaluation = parseInt(second_temp2/60)*-1+1;
                        
                        min_temp2-=evaluation;
                        
                        second_temp2 += evaluation*60;
                        
                     }
                     if (min_temp2<0)
                     {
                     	evaluation = parseInt(min_temp2/60)*-1+1;
                        
                        hour_temp2-=evaluation;
                        
                        min_temp2 += evaluation*60;
                     }
                     if (hour_temp2<0)
                     {
                     	alert('Negative value for hour is detected, automatically reset that time slot to 0,0,0');
                        min_temp2=0;
                        hour_temp2=0;
                        second_temp2=0;
                     
                     }
                    
                    /*
                    console.log(hour_temp1);
                    console.log(min_temp1);
                    console.log(second_temp1);
                    
                    console.log(hour_temp2);
                    console.log(min_temp2);
                    console.log(second_temp2);*/
                    
                    
                 	if (hour_temp1<10)
                    {
                    	hour_temp1 = '0'+hour_temp1;
                    }
                    if (hour_temp2<10)
                    {
                    	hour_temp2 = '0'+hour_temp2;
                    }
                    
                    if (min_temp1<10)
                    {
                    	min_temp1 = '0'+min_temp1;
                    }
                    if (min_temp2<10)
                    {
                    	min_temp2 = '0'+min_temp2;
                    }
                    
                    if (second_temp1<10)
                    {
                    	second_temp1 = '0'+second_temp1;
                    }
                    if (second_temp2<10)
                    {
                    	second_temp2 = '0'+second_temp2;
                    }
                 
                  	temp+=hour_temp1 + ':' + min_temp1 + ':' + second_temp1 + Get_Subtitles_Text[loop+8] + Get_Subtitles_Text[loop+9] + Get_Subtitles_Text[loop+10]+ Get_Subtitles_Text[loop+11] +" --> " + hour_temp2 + ':' + min_temp2 + ':' + second_temp2 ;
                   
                  
                   loop+=24;
                   openFontIndex=18+11-24;totalSubtitleIndex++;
                }
                else
                {
                	openFontIndex--;
                    temp+=Get_Subtitles_Text[loop];
                    
                    let totalDigits=0,x=0,temp5=totalSubtitleIndex;
                    for (x=0;x<10;x++){//convert the total sub index to overall digit present
                    	temp5/=10;totalDigits++;
                        temp5=Math.floor(temp5);
                        if (temp5<=0)
                        {
                        	break;
                        }
                    }
                    //console.log(totalDigits);
                	if (openFontIndex==0)//check if the index for inserting '<font....>' has reached
                    {
                    	//console.log(Get_Subtitles_Text[loop]);
                        temp+="<font color='FFFF00' /*size='"+getFontSize+"px'*/>";closeFont_bool=true;//if so, insert it and set closeFont to true;
                        //console.log(!isNaN(parseInt('23')));
                        
                    }
                    else if (Get_Subtitles_Text[loop+7-1+totalDigits]==':'&&Get_Subtitles_Text[loop+3+7-1+totalDigits]==':'&&closeFont_bool)
                    //check if the incoming time parameters is detected (indicating where the '</font>' should be placed)
                    {
                    temp+="</font>";closeFont_bool=false;//close the 'font' element
                    }
                    
                   
                }
                
                
               
             
            }
			temp+="</font>";
			document.getElementById('result').value=temp;
            
        	console.log('Original Length : '+ Get_Subtitles_Text.length)
            console.log('After Conversion, Length : '+temp.length);
           
        }
        
        
        container.addChild(button);
        renderer.backgroundColor=0xffffff;
        renderer.resize(button.width,button.height);
        renderer.render(container);
        
    }

