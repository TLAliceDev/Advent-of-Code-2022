import * as fs from 'fs'

function mapItemToPriority( char : string, index : number ) : number {
    let charCode = char.charCodeAt(index);
    if ( charCode < 97 ) {
        return charCode - 65 + 27;
    }
        //console.log(char.charAt(index), charCode-96);
    return charCode - 96;
}

function getBitPos(num : number) {
    let r = 0;
    while (num >>>= 1) // unroll for more speed...
    {
        r++;
    }
    return r;
}

function part1(inputs) {
    let sum = 0;
    inputs.forEach( (rucksack) => {
        let halfway = Math.floor(rucksack.length / 2);
        let compartment1 = rucksack.slice(0,halfway);
        let compartment2 = rucksack.slice(halfway,rucksack.length);
        let c1BitMask = 0;
        let c2BitMask = 0;
        let c1BitMaskU = 0;
        let c2BitMaskU = 0;
        let resultBitMask = 0;
        let resultBitMaskU = 0;
        for ( let i = 0; i < halfway; i++ )
        {
            let c1I = mapItemToPriority( compartment1, i );
            let c2I = mapItemToPriority( compartment2, i );
            if ( c1I <= 26 )
            {
                c1BitMask |= 1 << c1I;
            }
            else
            {
                c1BitMaskU |= 1 << (c1I - 26);
            }
            if ( c2I <= 26 )
            {
                c2BitMask |= 1 << c2I;
            }
            else
            {
                c2BitMaskU |= 1 << (c2I - 26);
            }
        }
        resultBitMask = c1BitMask & c2BitMask;
        resultBitMaskU = c1BitMaskU & c2BitMaskU;
        if ( resultBitMask )
        {
            sum += (getBitPos(resultBitMask));
        }
        else if ( resultBitMaskU )
        {
            sum += (getBitPos(resultBitMaskU) + 26);
        }
    } );
    return sum;
}

function part2(inputs) {
    let sum = 0;
    for ( let i = 0; i < inputs.length-3; i+=3 ) {
        let group1 = inputs[i];
        let group2 = inputs[i+1];
        let group3 = inputs[i+2];
        let g1BitMask = 0;
        let g2BitMask = 0;
        let g3BitMask = 0;
        let g1BitMaskU = 0;
        let g2BitMaskU = 0;
        let g3BitMaskU = 0;
        let resultBitMask = 0;
        let resultBitMaskU = 0;

        for ( let j = 0; j < group1.length; j++ )
        {
            let i = mapItemToPriority( group1, j );
            if ( i <= 26 )
            {
                g1BitMask |= 1 << i;
            }
            else
            {
                g1BitMaskU |= 1 << (i - 26);
            }
        }
        for ( let j = 0; j < group2.length; j++ )
        {
            let i = mapItemToPriority( group2, j );
            if ( i <= 26 )
            {
                g2BitMask |= 1 << i;
            }
            else
            {
                g2BitMaskU |= 1 << (i - 26);
            }
        }
        for ( let j = 0; j < group3.length; j++ )
        {
            let i = mapItemToPriority( group3, j );
            if ( i <= 26 )
            {
                g3BitMask |= 1 << i;
            }
            else
            {
                g3BitMaskU |= 1 << (i - 26);
            }
        }
        resultBitMask = g1BitMask & g2BitMask & g3BitMask;
        resultBitMaskU = g1BitMaskU & g2BitMaskU & g3BitMaskU;
        if ( resultBitMask )
        {
            sum += (getBitPos(resultBitMask) );
        }
        else if ( resultBitMaskU )
        {
            sum += (getBitPos(resultBitMaskU) + 26);
        }
    }
    return sum;
}

function day3() {
    const inputFile = fs.readFileSync('input','utf-8');
    const inputs = inputFile.split('\n');
    const part1Result = part1(inputs);
    const part2Result = part2(inputs);
    console.log(part1Result, part2Result);
}

day3();
