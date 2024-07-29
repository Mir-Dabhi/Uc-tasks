const yoyoyo ="yope yuyu";
console.log(yoyoyo);

function bunt() {
    let jet = yoyoyo;
    let arc = jet.replace(/\s+/g, '');  
    let mir = [];
    let babuchak =[];
    

    
    arc = arc.split('');

    for (let i = 0; i < arc.length; i++) {
        let k = arc[i];

        
        if (arc[i] === null) {
            continue;
        }

        else {
            if( arc[i] !== null){
                babuchak.push(arc[i]);
            }
        let count = 0;
                for (let j = 0; j < arc.length; j++) {
                   if (arc[j] === k) {
                count++;
                 
                arc[j] = null;
                    }
                }

                mir.push(count);}
    }
    

     
for( let m = 0 ; m <mir.length; m++){
    console.log(babuchak[m]," : " ,mir[m] );
}
    
}

 bunt();


