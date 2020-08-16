import seedrandom from 'seedrandom';


function getRandomColor():string{
    const letters = '456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}
export function getColor(i:number):string{
    seedrandom(`${i}`,{global:true});
    return getRandomColor();
  }

export default getRandomColor;