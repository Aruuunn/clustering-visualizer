

export function calculateMean(coordinates:number[][]):(number[] ){
   if(!coordinates || coordinates.length===0){
       
      throw new Error('Unexpected error!');

   } else {
       const mean = Array.from({length:coordinates[0].length},() => 0);

       for(let i=0;i<coordinates.length;i++){
           for(let j=0;j<mean.length;i++){
               mean[j] += coordinates[i][j]/coordinates.length;
           }
       }

       return mean;       
   }
}

export function calculateVariance(coordinates:number[][]):number{

    if(!coordinates || coordinates.length <= 1 ){
        return 0;
    } else {

        let variance = 0;
        const mean = calculateMean(coordinates);
         

        for(let i=0;i<coordinates.length;i++){

            for(let j=0;j<coordinates[i].length;i++){
                variance += Math.pow(mean[j]-coordinates[i][j],2)/(coordinates.length-1);

            }
            
        }
        return variance;

    }


}



export default calculateVariance;