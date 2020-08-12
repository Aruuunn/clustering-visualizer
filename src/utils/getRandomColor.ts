import seedrandom from 'seedrandom';


function getRandomColor() {
    var letters = '456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}
export function getColor(i:number){
    seedrandom(`${i}`,{global:true});
    return getRandomColor();
  }

export default getRandomColor;