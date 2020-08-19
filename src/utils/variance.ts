

export function calculateMean(coordinates:number[][]):(number[] ){
   if(!coordinates || coordinates.length===0){
       
      throw new Error('Unexpected error!');

   } else {
       const mean = Array.from({length:coordinates[0].length},() => 0);
       console.log('MEAN',mean,{length:coordinates[0].length})
       for(let i=0;i<coordinates.length;i++){
           for(let j=0;j<mean.length;j++){
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
         
        console.log("MEAN",mean)

        for(let i=0;i<coordinates.length;i++){

            for(let j=0;j<coordinates[i].length;j++){
                variance += Math.pow(mean[j]-coordinates[i][j],2)/(coordinates.length-1);
            }
            
        }
        return parseInt(variance.toFixed(1));

    }


}



export default calculateVariance;