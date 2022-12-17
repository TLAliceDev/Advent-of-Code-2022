"use strict";
exports.__esModule = true;
var fs = require("fs");
function log(base, number) {
    return Math.log(number) / Math.log(base);
}
function mapItemToPriority(char, index) {
    var charCode = char.charCodeAt(index);
    if (charCode < 97) {
        return charCode - 65 + 27;
    }
    //console.log(char.charAt(index), charCode-96);
    return charCode - 96;
}
function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}
function getBitPos(num) {
    var r = 0;
    while (num >>>= 1) // unroll for more speed...
     {
        r++;
    }
    return r;
}
function part1(inputs) {
    var sum = 0;
    inputs.forEach(function (rucksack) {
        var halfway = Math.floor(rucksack.length / 2);
        var compartment1 = rucksack.slice(0, halfway);
        var compartment2 = rucksack.slice(halfway, rucksack.length);
        var c1BitMask = 0;
        var c2BitMask = 0;
        var c1BitMaskU = 0;
        var c2BitMaskU = 0;
        var resultBitMask = 0;
        var resultBitMaskU = 0;
        for (var i = 0; i < halfway; i++) {
            var c1I = mapItemToPriority(compartment1, i);
            var c2I = mapItemToPriority(compartment2, i);
            if (c1I <= 26) {
                c1BitMask |= 1 << c1I;
            }
            else {
                c1BitMaskU |= 1 << (c1I - 26);
            }
            if (c2I <= 26) {
                c2BitMask |= 1 << c2I;
            }
            else {
                c2BitMaskU |= 1 << (c2I - 26);
            }
        }
        resultBitMask = c1BitMask & c2BitMask;
        resultBitMaskU = c1BitMaskU & c2BitMaskU;
        if (resultBitMask) {
            sum += (getBitPos(resultBitMask));
        }
        else if (resultBitMaskU) {
            sum += (getBitPos(resultBitMaskU) + 26);
        }
    });
    return sum;
}
function part2(inputs) {
    var sum = 0;
    for (var i = 0; i < inputs.length - 3; i += 3) {
        var group1 = inputs[i];
        var group2 = inputs[i + 1];
        var group3 = inputs[i + 2];
        var g1BitMask = 0;
        var g2BitMask = 0;
        var g3BitMask = 0;
        var g1BitMaskU = 0;
        var g2BitMaskU = 0;
        var g3BitMaskU = 0;
        var resultBitMask = 0;
        var resultBitMaskU = 0;
        for (var j = 0; j < group1.length; j++) {
            var i_1 = mapItemToPriority(group1, j);
            if (i_1 <= 26) {
                g1BitMask |= 1 << i_1;
            }
            else {
                g1BitMaskU |= 1 << (i_1 - 26);
            }
        }
        for (var j = 0; j < group2.length; j++) {
            var i_2 = mapItemToPriority(group2, j);
            if (i_2 <= 26) {
                g2BitMask |= 1 << i_2;
            }
            else {
                g2BitMaskU |= 1 << (i_2 - 26);
            }
        }
        for (var j = 0; j < group3.length; j++) {
            var i_3 = mapItemToPriority(group3, j);
            if (i_3 <= 26) {
                g3BitMask |= 1 << i_3;
            }
            else {
                g3BitMaskU |= 1 << (i_3 - 26);
            }
        }
        resultBitMask = g1BitMask & g2BitMask & g3BitMask;
        resultBitMaskU = g1BitMaskU & g2BitMaskU & g3BitMaskU;
        if (resultBitMask) {
            sum += (getBitPos(resultBitMask));
        }
        else if (resultBitMaskU) {
            sum += (getBitPos(resultBitMaskU) + 26);
        }
    }
    return sum;
}
function day3() {
    var inputFile = fs.readFileSync('input', 'utf-8');
    var inputs = inputFile.split('\n');
    var part1Result = part1(inputs);
    var part2Result = part2(inputs);
    console.log(part1Result, part2Result);
}
day3();
